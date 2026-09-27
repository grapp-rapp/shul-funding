# Builds site.html from index.html by inlining every image as a data: URI.
# The published page must be one self-contained file - it cannot load images
# from anywhere else - so each photo gets shrunk, re-compressed, and pasted
# straight into the HTML as text.
#
# Run it with:   powershell -ExecutionPolicy Bypass -File "build.ps1"

Add-Type -AssemblyName System.Drawing

$root   = Split-Path -Parent $MyInvocation.MyCommand.Path
$imgDir = Join-Path $root "images"
# template.html is the one you edit. Two files come out of it:
#
#   index.html    a COMPLETE web page - doctype, <head>, viewport meta, the lot.
#                 This is what gets uploaded and served to real visitors.
#   artifact.html the same page as body content only, no <html>/<head>, because
#                 the Claude artifact preview supplies its own wrapper.
#
# The split exists because a page served without <meta name="viewport"> is laid
# out at ~980px on a phone and then zoomed out, which makes every word tiny.
# Never edit either output by hand; the next build overwrites them.
$source   = Join-Path $root "template.html"
$output   = Join-Path $root "index.html"
$fragment = Join-Path $root "artifact.html"

# token -> file, max width in pixels, JPEG quality (1-100), output format.
# The logo is forced to JPEG: as a PNG it encoded to 439 KB, and because it is
# embedded three times (tab icon, header, footer) that alone tripled the page.
$jobs = @(
  @{ Token = "__IMG_ROOM__";  File = "room-wide.jpg";    Width = 1500; Quality = 72; Format = "jpeg" },
  @{ Token = "__IMG_WALL__";  File = "sefarim-wall.jpg"; Width = 1100; Quality = 68; Format = "jpeg" },
  @{ Token = "__IMG_CHAV__";  File = "chavrusa.jpg";     Width = 1100; Quality = 68; Format = "jpeg" },
  @{ Token = "__IMG_DEDI__";  File = "dedication.jpg";   Width = 1100; Quality = 68; Format = "jpeg" },
  @{ Token = "__IMG_LOGO__";  File = "logo.png";         Width = 440;  Quality = 82; Format = "jpeg" },
  @{ Token = "__IMG_ICON__";  File = "logo.png";         Width = 64;   Quality = 80; Format = "jpeg" },
  @{ Token = "__IMG_POST__";  File = "clip-poster.jpg";  Width = 960;  Quality = 70; Format = "jpeg" }
)

# Files embedded byte-for-byte (already compressed elsewhere - see notes below).
# clip.mp4 is produced from the original phone video with:
#   ffmpeg -i VID....mp4 -vf "scale=960:-2,fps=24" -c:v libx264 -profile:v main
#          -crf 32 -preset slower -pix_fmt yuv420p -c:a aac -b:a 56k -ac 1
#          -movflags +faststart images\clip.mp4
# The original is VP9-in-MP4, which iPhones will not play; H.264 is universal.
# NOTE: images/howto.mp4 (the how-to walkthrough) is no longer used - the
# donation link now preselects the fund, so the walkthrough was removed. The
# file is kept in images/ in case it is ever wanted back.
$rawJobs = @(
  @{ Token = "__VID_CLIP__";  File = "clip.mp4";   Mime = "video/mp4" }
)

function Convert-ToDataUri {
    param([string]$Path, [int]$MaxWidth, [int]$Quality, [string]$Format)

    $img = [System.Drawing.Image]::FromFile($Path)
    try {
        $w = $img.Width; $h = $img.Height
        if ($w -gt $MaxWidth) {
            $h = [int][Math]::Round($h * ($MaxWidth / $w))
            $w = $MaxWidth
        }

        $bmp = New-Object System.Drawing.Bitmap $w, $h
        $g   = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        # JPEG has no alpha channel, so flatten onto white first - otherwise any
        # transparent pixels come out black.
        if ($Format -eq "jpeg") { $g.Clear([System.Drawing.Color]::White) }
        $g.DrawImage($img, 0, 0, $w, $h)
        $g.Dispose()

        $isPng = $Format -eq "png"
        $ms    = New-Object System.IO.MemoryStream

        if ($isPng) {
            $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
            $mime = "image/png"
        } else {
            $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
                     Where-Object { $_.MimeType -eq "image/jpeg" }
            $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
            $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
                [System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
            $bmp.Save($ms, $codec, $ep)
            $ep.Dispose()
            $mime = "image/jpeg"
        }

        $bytes = $ms.ToArray()
        $ms.Dispose(); $bmp.Dispose()

        [PSCustomObject]@{
            Uri   = "data:$mime;base64," + [Convert]::ToBase64String($bytes)
            KB    = [Math]::Round($bytes.Length / 1KB)
            Dims  = "$($w)x$($h)"
        }
    }
    finally { $img.Dispose() }
}

$html = Get-Content $source -Raw -Encoding UTF8

foreach ($j in $jobs) {
    $path = Join-Path $imgDir $j.File
    if (-not (Test-Path $path)) {
        Write-Output ("  SKIP  {0,-16} (images\{1} not found)" -f $j.Token, $j.File)
        continue
    }
    $r = Convert-ToDataUri -Path $path -MaxWidth $j.Width -Quality $j.Quality -Format $j.Format
    $html = $html.Replace($j.Token, $r.Uri)
    Write-Output ("  ok    {0,-16} {1,10}  {2,5} KB" -f $j.Token, $r.Dims, $r.KB)
}

foreach ($j in $rawJobs) {
    $path = Join-Path $imgDir $j.File
    if (-not (Test-Path $path)) {
        Write-Output ("  SKIP  {0,-16} (images\{1} not found)" -f $j.Token, $j.File)
        continue
    }
    $bytes = [System.IO.File]::ReadAllBytes($path)
    $html  = $html.Replace($j.Token, "data:$($j.Mime);base64," + [Convert]::ToBase64String($bytes))
    Write-Output ("  ok    {0,-16} {1,10}  {2,5} KB" -f $j.Token, "raw", [Math]::Round($bytes.Length / 1KB))
}

# Any token still sitting in the file means its media is missing. Drop those
# tags entirely rather than shipping a broken-image icon or a dead player.
$before = $html.Length
$html = [regex]::Replace($html, '(?s)\s*<video[^>]*src="__VID_[A-Z]+__".*?</video>', '')
$html = [regex]::Replace($html, '\s*<(img|link)[^>]*(src|href)="__IMG_[A-Z]+__"[^>]*>', '')
if ($html.Length -ne $before) { Write-Output "  note  removed tags for missing media" }

$utf8 = New-Object System.Text.UTF8Encoding $false

# 1. Body-only fragment, for the Claude artifact preview.
[System.IO.File]::WriteAllText($fragment, $html, $utf8)

# 2. Complete standalone document, for the live site. Lift <title> and the
#    favicon out of the body and put them where they belong.
$title = ""
$icon  = ""
if ($html -match '(?s)<title>(.*?)</title>')   { $title = $matches[1] }
if ($html -match '(<link rel="icon"[^>]*>)')   { $icon  = $matches[1] }
$body = $html -replace '(?s)<title>.*?</title>\s*', '' -replace '<link rel="icon"[^>]*>\s*', ''

$doc = @"
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#F1F3F0">
<meta name="description" content="A bein hazmanim learning program. Be part of their Torah.">
<title>$title</title>
$icon
</head>
<body>
$body
</body>
</html>
"@
[System.IO.File]::WriteAllText($output, $doc, $utf8)

$finalKB = [Math]::Round((Get-Item $output).Length / 1KB)
Write-Output ""
Write-Output "  built index.html     -  $finalKB KB  (upload this one - full page)"
Write-Output "  built artifact.html  -  preview fragment"
