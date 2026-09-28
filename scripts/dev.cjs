// Serves only the same public allowlist as production. Does not expose drafts.
require('./build-web.cjs');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../dist');
http.createServer(async(req,res)=>{
  const url=new URL(req.url,'http://localhost');
  res.status=function(n){this.statusCode=n;return this;};res.json=function(v){this.setHeader('Content-Type','application/json');this.end(JSON.stringify(v));};
  if(['/api/community','/api/admin'].includes(url.pathname)){
    let body='';for await(const chunk of req){body+=chunk;if(body.length>4096){res.status(413).json({error:'Too large'});return;}}
    req.body=body;req.query=Object.fromEntries(url.searchParams);await require('../api/'+url.pathname.split('/').pop()+'.js')(req,res);return;
  }
  const name=url.pathname==='/'?'index.html':url.pathname==='/admin'?'admin.html':url.pathname.slice(1);
  if(!/^[a-z0-9.-]+$/.test(name)){res.statusCode=404;res.end();return;}
  const file=path.join(root,name);if(!fs.existsSync(file)){res.statusCode=404;res.end();return;}
  res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg'})[path.extname(file)]||'text/plain');fs.createReadStream(file).pipe(res);
}).listen(Number(process.env.PORT || 4173),'127.0.0.1',()=>console.log('Local preview http://127.0.0.1:'+(process.env.PORT || 4173)));
