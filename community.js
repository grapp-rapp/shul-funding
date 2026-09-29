/* Loaded after the main page. External data is always rendered as text. */
(function() {
  'use strict';
  const D = window.LearningData, $ = id => document.getElementById(id);
  const words = {
    en: { title:'Learn & daven', intro:'A little Torah for today. Choose your city, find your daily learning, and daven together.', open:'Open Weekly Parsha', today:'Today in Israel', city:'Choose your city for zmanim', choose:'Select a city…', daytime:'Hebrew date for the daytime. Choose a city to update it after sunset.', after:'Hebrew date updated after sunset.', times:'Today’s zmanim', methods:'Israel local time. Alos: 16.1°; Shema MGA: 16.1°; tefilla: GRA; tzeis and havdalah: 8.5°. Candle lighting follows Hebcal’s city setting. Check your community’s minhag.', credit:'Calendar and times: Hebcal (CC BY 4.0)', daily:'Today’s learning', dailyNote:'Daily schedules follow today’s civil date in Israel. Texts open on Sefaria.', tehillim:'Today’s Tehillim', monthly:'Monthly cycle · Hebrew day', noCity:'Choose a city to see local zmanim and candle lighting.', list:'Davening together', listIntro:'Names for a refuah sheleimah. Every name is reviewed before it appears and stays for 30 days unless renewed.', empty:'No names on the list yet.', name:'Hebrew name and mother’s name', nameHint:'For example: Ploni ben Plonis. Please leave out surnames, contact details and medical information.', consent:'I have permission to submit this name for a public Tehillim list.', submit:'Submit for approval', submitted:'Thank you. The name has been sent for review.', said:'I said Tehillim today', thanks:'Thank you for joining in', saidCount:'Tehillim said for the list this week:', reportNote:'Counts button presses reported by visitors, not unique people. Week starts Sunday in Israel.', failed:'Couldn’t save just now. Please try again later.', limited:'Please wait before trying again.', quiz:'Questions for the Shabbos table', show:'Show answers', hide:'Hide answers', print:'Print for the Shabbos table', printNote:'Prints the questions on one page, without the answers.', raised:'raised of', goal:'goal', donors:'donors', progress:'Be part of their Torah', updated:'Updated', visits:'visits this week', visitNote:'Page loads, not unique visitors.', holiday:'This week’s reading', reading:'This week’s parsha', candles:'Candle lighting', havdalah:'Havdalah', source:'Source', dates:'Hebrew date', afterChoose:'Choose a city for the Hebrew date after sunset.', shared:'Torah B’Ahava · Shabbos table questions', sefaria:'Learning schedules and texts: Sefaria' },
    he: { title:'לומדים ומתפללים', intro:'קצת תורה להיום. בחרו עיר, מצאו את הלימוד היומי והצטרפו לתפילה.', open:'לפרשת השבוע', today:'היום בארץ ישראל', city:'בחרו עיר להצגת הזמנים', choose:'בחירת עיר…', daytime:'התאריך העברי לשעות היום. בחרו עיר כדי לעדכן אותו לאחר השקיעה.', after:'התאריך העברי עודכן לאחר השקיעה.', times:'זמני היום', methods:'שעון ישראל. עלות: 16.1°; ק״ש מג״א: 16.1°; תפילה: הגר״א; צאת והבדלה: 8.5°. הדלקת נרות לפי הגדרת העיר ב־Hebcal. בדקו את מנהג הקהילה שלכם.', credit:'לוח וזמנים: Hebcal (CC BY 4.0)', daily:'הלימוד היומי', dailyNote:'סדרי הלימוד לפי התאריך האזרחי היום בישראל. הטקסטים נפתחים בספריא.', tehillim:'התהילים של היום', monthly:'חלוקה חודשית · יום בחודש', noCity:'בחרו עיר להצגת זמני היום והדלקת נרות.', list:'מתפללים ביחד', listIntro:'שמות לרפואה שלמה. כל שם נבדק לפני פרסומו ונשאר ברשימה 30 יום, אלא אם חודש.', empty:'עדיין אין שמות ברשימה.', name:'שם עברי ושם האם', nameHint:'לדוגמה: פלוני בן פלונית. בלי שם משפחה, פרטי קשר או פרטים רפואיים.', consent:'יש לי רשות להגיש את השם לרשימת תהילים ציבורית.', submit:'שליחה לאישור', submitted:'תודה. השם נשלח לבדיקה.', said:'אמרתי תהילים היום', thanks:'תודה שהצטרפתם', saidCount:'דיווחים על אמירת תהילים לרשימה השבוע:', reportNote:'המונה סופר דיווחי מבקרים בלחיצה, ולא אנשים שונים. השבוע מתחיל ביום ראשון בישראל.', failed:'השמירה לא הצליחה כרגע. נסו שוב מאוחר יותר.', limited:'אנא המתינו לפני ניסיון נוסף.', quiz:'שאלות לשולחן שבת', show:'הצגת תשובות', hide:'הסתרת תשובות', print:'הדפסה לשולחן שבת', printNote:'מדפיס את השאלות בעמוד אחד, בלי התשובות.', raised:'נאספו מתוך', goal:'יעד', donors:'תורמים', progress:'קחו חלק בתורה שלהם', updated:'עודכן', visits:'ביקורים השבוע', visitNote:'טעינות עמוד, ולא מבקרים שונים.', holiday:'הקריאה השבוע', reading:'פרשת השבוע', candles:'הדלקת נרות', havdalah:'הבדלה', source:'מקור', dates:'תאריך עברי', afterChoose:'בחרו עיר להצגת התאריך העברי אחרי השקיעה.', shared:'תורה באהבה · שאלות לשולחן שבת', sefaria:'סדרי לימוד וטקסטים: ספריא' }
  };
  Object.assign(words.en,{requestTitle:'Request a name for Tehillim',requestButton:'Request a name by email',requestNote:'Email us the Hebrew name and mother’s name, with permission to publish it. Please leave out contact and medical details. We review requests and add names ourselves.',emailNote:'Opens your email app. Review the message and press Send there.'});
  Object.assign(words.he,{requestTitle:'בקשת הוספת שם לתהילים',requestButton:'שליחת בקשה באימייל',requestNote:'שלחו לנו את השם העברי ושם האם, עם רשות לפרסם אותו. בלי פרטי קשר או פרטים רפואיים. נבדוק את הבקשה ונוסיף את השם בעצמנו.',emailNote:'פותח את אפליקציית הדואר שלכם. בדקו את ההודעה ולחצו שם על שליחה.'});
  Object.assign(words.en,{contactTitle:'Contact the program',contactIntro:'Have a question or want to help? Send a private message to the program admin.',contactName:'Your name',contactEmail:'Your email for a reply',contactMessage:'Your message',contactPrivacy:'Your name, email and message are visible only to the admin and are stored for up to 90 days. Please leave out sensitive personal information.',contactSend:'Send message',contactSent:'Thank you. Your message is in the admin inbox.',contactFail:'Your message was not saved. Please try later or email us below.',contactLimit:'Please wait before trying again, or email us below.',contactFallback:'Or email gershyrapp@gmail.com',contactUnavailable:'The contact form is unavailable right now. Please email us instead.'});
  Object.assign(words.he,{contactTitle:'יצירת קשר עם התוכנית',contactIntro:'יש שאלה או רוצים לעזור? שלחו הודעה פרטית למנהל התוכנית.',contactName:'השם שלכם',contactEmail:'אימייל לקבלת תשובה',contactMessage:'ההודעה שלכם',contactPrivacy:'השם, האימייל וההודעה גלויים רק למנהל ונשמרים עד 90 יום. אנא הימנעו ממידע אישי רגיש.',contactSend:'שליחת הודעה',contactSent:'תודה. ההודעה התקבלה בתיבת הפניות של המנהל.',contactFail:'ההודעה לא נשמרה. נסו מאוחר יותר או שלחו אימייל בקישור למטה.',contactLimit:'אנא המתינו לפני ניסיון נוסף, או שלחו אימייל בקישור למטה.',contactFallback:'אפשר גם לשלוח אימייל ל־gershyrapp@gmail.com',contactUnavailable:'טופס הפנייה אינו זמין כרגע. אפשר לפנות באימייל.'});
  const labels = [['alotHaShachar','Alos hashachar','עלות השחר'],['sunrise','Netz','הנץ החמה'],['sofZmanShmaMGA16Point1','Sof zman Shema · MGA 16.1°','סוף זמן ק״ש · מג״א 16.1°'],['sofZmanShma','Sof zman Shema · GRA','סוף זמן ק״ש · הגר״א'],['sofZmanTfilla','Sof zman tefilla · GRA','סוף זמן תפילה · הגר״א'],['chatzot','Chatzos','חצות'],['minchaGedola','Mincha gedola','מנחה גדולה'],['sunset','Shkiah','שקיעה'],['tzeit85deg','Tzeis · 8.5°','צאת הכוכבים · 8.5°']];
  const courses = [['Daf Yomi','Daf Yomi','דף יומי'],['Daily Mishnah','Mishna Yomis','משנה יומית'],['Halakhah Yomit','Halacha Yomis','הלכה יומית'],['Tanakh Yomi','Tanach Yomi','תנ״ך יומי']];
  let language = document.documentElement.lang === 'he' ? 'he' : 'en', dateData, nextDate, timesData, calendar, learning, quiz, community, afterSunset = false, quizShown = false, said = false, generation = 0, lastDay = '', lastSunset = false;
  const tr = key => words[language][key], index = () => language === 'he' ? 2 : 1;
  function node(tag, text, cls) { const el = document.createElement(tag); if (text != null) el.textContent = text; if (cls) el.className = cls; return el; }
  function link(text, href) { const a = node('a', text); a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a; }
  function time(value) { return new Intl.DateTimeFormat(language === 'he' ? 'he-IL' : 'en-GB', { timeZone:'Asia/Jerusalem', hour:'2-digit',minute:'2-digit',hour12:false }).format(new Date(value)); }
  function dayText(value) { return new Intl.DateTimeFormat(language === 'he' ? 'he-IL' : 'en-GB', { timeZone:'Asia/Jerusalem', weekday:'short',day:'numeric',month:'short' }).format(new Date(value.length === 10 ? value + 'T12:00:00Z' : value)); }
  async function json(url, options = {}) { const res = await fetch(url, { credentials:'omit', signal:AbortSignal.timeout(12000), ...options }); if (!res.ok) { const e = new Error('request'); e.status = res.status; throw e; } return res.json(); }
  const post = data => json('/api/community', { method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data) });
  const host = $('community');
  host.innerHTML = `<div class="community-head"><div><h2 data-c="title"></h2><p data-c="intro"></p></div><button class="btn btn-ghost" id="community-parsha" data-c="open"></button></div>
  <div class="community-grid">
    <article class="community-card" id="date-card"><h3 data-c="today"></h3><div id="date-content" hidden></div><label for="zmanim-city" data-c="city"></label><select id="zmanim-city"></select><p class="fine" id="city-hint" data-c="noCity"></p><div id="times-content" hidden></div><div id="calendar-content" hidden></div><p class="fine"><a href="https://www.hebcal.com/" target="_blank" rel="noopener noreferrer" data-c="credit"></a></p></article>
    <article class="community-card" id="daily-card" hidden><h3 data-c="daily"></h3><ul class="learning-links" id="learning-links"></ul><div id="monthly-content"></div><p class="fine" data-c="dailyNote"></p><a class="fine" href="https://www.sefaria.org/calendars" target="_blank" rel="noopener noreferrer" data-c="sefaria"></a></article>
    <article class="community-card" id="quiz-card" hidden><div class="print-heading" data-c="shared"></div><h3 data-c="quiz"></h3><p id="quiz-title"></p><ol class="quiz-questions" id="quiz-questions"></ol><div class="community-actions"><button class="btn btn-ghost" id="quiz-toggle" aria-expanded="false" aria-controls="quiz-questions" data-c="show"></button><button class="btn btn-ghost" id="quiz-print" data-c="print"></button></div><p class="fine no-print" data-c="printNote"></p></article>
    <article class="community-card" id="contact-card"><h3 data-c="contactTitle"></h3><p data-c="contactIntro"></p><p id="contact-unavailable" data-c="contactUnavailable"></p><form id="contact-form" hidden><label for="contact-name" data-c="contactName"></label><input id="contact-name" name="sender" minlength="2" maxlength="80" required autocomplete="name" dir="auto"><label for="contact-email" data-c="contactEmail"></label><input id="contact-email" name="email" type="email" maxlength="254" required autocomplete="email" dir="ltr"><label for="contact-message" data-c="contactMessage"></label><textarea id="contact-message" name="message" minlength="10" maxlength="1500" rows="5" required dir="auto" aria-describedby="contact-privacy"></textarea><div class="trap" aria-hidden="true"><label for="contact-website">Website</label><input id="contact-website" name="website" tabindex="-1" autocomplete="off"></div><p class="fine" id="contact-privacy" data-c="contactPrivacy"></p><button class="btn btn-solid" type="submit" data-c="contactSend"></button></form><p id="contact-status" class="community-status" role="status"></p><a href="mailto:gershyrapp@gmail.com" data-c="contactFallback"></a></article>
    <article class="community-card" id="email-request"><h3 data-c="requestTitle"></h3><p data-c="requestNote"></p><a class="btn btn-ghost" id="request-email" data-c="requestButton"></a><p class="fine" data-c="emailNote"></p><a href="mailto:gershyrapp@gmail.com">gershyrapp@gmail.com</a></article>
    <article class="community-card" id="tehillim-card" hidden><h3 data-c="list"></h3><p data-c="listIntro"></p><ul class="tehillim-names" id="tehillim-names"></ul><p id="said-count"></p><button class="btn btn-solid" id="said-button" data-c="said"></button><p class="fine" data-c="reportNote"></p><p class="community-status" id="name-status" role="status"></p></article>
    <article class="community-card" id="community-fundraising" hidden><h3 data-c="progress"></h3><p id="fundraising-amount"></p><progress class="community-progress" id="community-progress" max="100" value="0"></progress><p id="donor-count" hidden></p><p class="fine" id="fundraising-updated"></p><button class="btn btn-solid" id="community-donate"></button></article>
  </div><p class="visits" id="weekly-visits" hidden></p>`;
  function paintStatic() {
    language = document.documentElement.lang === 'he' ? 'he' : 'en';
    host.setAttribute('aria-label',tr('title'));
    host.querySelectorAll('[data-c]').forEach(el => { el.textContent = tr(el.dataset.c); });
    $('request-email').href = 'mailto:gershyrapp@gmail.com?subject=' + encodeURIComponent(language === 'he' ? 'בקשת שם לתהילים — תורה באהבה' : 'Tehillim name request — Torah B’Ahava') + '&body=' + encodeURIComponent(language === 'he' ? 'שלום, אשמח לבקש הוספת שם לרשימת התהילים.\n\nהשם העברי ושם האם: \n\nהאם יש רשות לפרסם את השם ברשימה הציבורית? ' : 'Hello, I would like to request a name for the Tehillim list.\n\nHebrew name and mother’s name: \n\nDo you have permission for this name to appear on the public list? ');
    const selected = $('zmanim-city').value;
    $('zmanim-city').replaceChildren(new Option(tr('choose'),''), ...D.cities.map(c => new Option(c[index()],c[0])));
    $('zmanim-city').value = selected;
    $('community-donate').textContent = language === 'he' ? 'לתרומה' : 'Donate';
    renderDate(); renderTimes(); renderCalendar(); renderLearning(); renderQuiz(); renderCommunity();
  }
  function renderDate() {
    const box = $('date-content'); box.replaceChildren(); box.hidden = !dateData;
    if (!dateData) return;
    const he = node('p', dateData.hebrew, 'he-date'); he.lang = 'he'; he.dir = 'rtl';
    const en = node('p', `${dateData.hd} ${dateData.hm} ${dateData.hy}`, 'en-date'); en.lang = 'en'; en.dir = 'ltr';
    box.append(he,en,node('p', afterSunset ? tr('after') : (!$('zmanim-city').value ? tr('daytime') : dayText(lastDay)), 'fine'));
  }
  function renderTimes() {
    const box = $('times-content'); box.replaceChildren(); box.hidden = !timesData;
    $('city-hint').hidden = !!$('zmanim-city').value;
    if (!timesData) return;
    const dl = node('dl',null,'zmanim');
    for (const row of labels) if (timesData.times[row[0]]) dl.append(node('dt',row[index()]),node('dd',time(timesData.times[row[0]])));
    box.append(node('p',tr('times') + ' · ' + dayText(lastDay)),dl,node('p',tr('methods'),'fine'));
  }
  function reading() { return calendar?.items?.find(x => x.category === 'parashat') || calendar?.items?.find(x => x.yomtov && x.leyning); }
  function renderCalendar() {
    const box = $('calendar-content'); box.replaceChildren(); box.hidden = !calendar;
    if (!calendar) return;
    const r = reading();
    if (r) box.append(node('p', `${tr(r.category === 'parashat' ? 'reading' : 'holiday')}: ${language === 'he' ? r.hebrew : r.title} · ${dayText(r.date)}`));
    if (!$('zmanim-city').value) return;
    for (const event of calendar.items || []) if (['candles','havdalah'].includes(event.category) && event.date.slice(0,10) >= lastDay) {
      const p = node('div',null,'holy-time'); p.append(node('strong',`${tr(event.category === 'candles' ? 'candles' : 'havdalah')} · ${time(event.date)}`),node('span',dayText(event.date)));
      if (event.memo) p.append(node('p',event.memo,'fine'));
      box.append(p);
    }
  }
  function renderLearning() {
    const ul = $('learning-links'); ul.replaceChildren();
    for (const row of courses) {
      const item = learning?.calendar_items?.find(x => x.title?.en === row[0]);
      if (!item?.url || !item.displayValue) continue;
      let url; try { url = new URL(item.url, 'https://www.sefaria.org/'); } catch { continue; }
      if (url.protocol !== 'https:' || url.hostname !== 'www.sefaria.org') continue;
      const li = node('li'); li.append(node('strong',row[index()]),link(item.displayValue[language] || item.displayValue.en,url.href)); ul.append(li);
    }
    const monthly = $('monthly-content'); monthly.replaceChildren();
    if (dateData && nextDate) {
      const range = D.tehillim(dateData.hd, nextDate.hd);
      if (range) { monthly.append(node('strong',tr('tehillim')),node('p',`${tr('monthly')} ${dateData.hd}`,'fine'),link((language === 'he' ? 'תהילים ' : 'Psalms ') + range,'https://www.sefaria.org/Psalms.' + range.replace(':','.'))); }
    }
    $('daily-card').hidden = !ul.children.length && !monthly.children.length;
  }
  function renderQuiz() {
    $('quiz-card').hidden = !quiz;
    if (!quiz) return;
    const r = reading(); $('quiz-title').textContent = quiz[language] + (r ? ' · ' + dayText(r.date) : '');
    $('quiz-questions').replaceChildren();
    for (const item of quiz.questions) {
      const li = node('li',item[language].q), answer = node('div',item[language].a,'quiz-answer'); answer.hidden = !quizShown;
      answer.append(node('div',tr('source') + ': ' + item.ref,'quiz-source')); li.append(answer); $('quiz-questions').append(li);
    }
    $('quiz-toggle').textContent = tr(quizShown ? 'hide' : 'show'); $('quiz-toggle').setAttribute('aria-expanded',String(quizShown));
  }
  function renderCommunity() {
    const active = !!community?.available;
    $('contact-form').hidden = !active; $('contact-unavailable').hidden = active;
    $('tehillim-card').hidden = !active; $('weekly-visits').hidden = !active;
    if (!active) return;
    const currentNames = community.names.filter(row => row.expiresAt > Date.now());
    $('tehillim-names').replaceChildren(...(currentNames.length ? currentNames.map(row => { const li=node('li',row.name);li.dir='auto';return li; }) : [node('li',tr('empty'))]));
    $('said-count').textContent = tr('saidCount') + ' ' + community.said.toLocaleString();
    $('said-button').disabled = said; $('said-button').textContent = tr(said ? 'thanks' : 'said');
    $('weekly-visits').textContent = `${community.visits.toLocaleString()} ${tr('visits')} · ${tr('visitNote')}`;
    const f = community.fundraising; $('community-fundraising').hidden = !f || !Number.isFinite(f.raised) || !(f.goal > 0);
    if ($('community-fundraising').hidden) return;
    const money = n => new Intl.NumberFormat(language === 'he' ? 'he-IL':'en-IL',{style:'currency',currency:'ILS',minimumFractionDigits:0,maximumFractionDigits:2}).format(n);
    const label = language === 'he' ? `${money(f.raised)} ${tr('raised')} ${money(f.goal)}` : `${money(f.raised)} ${tr('raised')} ${money(f.goal)} ${tr('goal')}`;
    $('fundraising-amount').textContent = label; $('community-progress').value = Math.min(100,100*f.raised/f.goal); $('community-progress').setAttribute('aria-label',label);
    $('donor-count').hidden = f.donors == null; $('donor-count').textContent = `${f.donors ?? ''} ${tr('donors')}`;
    $('fundraising-updated').textContent = tr('updated') + ' ' + dayText(new Date(f.updatedAt).toISOString());
  }
  async function refreshLearning() {
    const ticket = ++generation; lastDay = D.israelDay(); lastSunset = false;
    const date = lastDay, city = $('zmanim-city').value;
    timesData = null; calendar = null; dateData = null; nextDate = null; learning = null; quiz = null; quizShown = false;
    renderDate();renderTimes();renderCalendar();renderLearning();renderQuiz();
    const apply = fn => data => { if (ticket === generation) { fn(data); } };
    const [year,month,day] = date.split('-');
    const saturday = D.addDays(date,(6-new Date(date+'T12:00:00Z').getUTCDay()+7)%7);
    const calUrl = city ? `https://www.hebcal.com/shabbat?cfg=json&geonameid=${city}&i=on&M=on&gy=${year}&gm=${month}&gd=${day}` : `https://www.hebcal.com/hebcal?v=1&cfg=json&i=on&s=on&maj=on&start=${saturday}&end=${saturday}`;
    const calTask = json(calUrl).then(apply(async data => {
      calendar = data; renderCalendar();
      const r = reading();
      // Festivals without a regular sedra do not silently use another week's quiz.
      const quizName = r?.category === 'parashat' ? r.title : (/^Deuteronomy 33:1-34:12/.test(r?.leyning?.torah || '') ? 'Vezot Haberakhah' : null);
      if (quizName) {
        try { const result = await json('/api/community?quiz=' + encodeURIComponent(quizName)); if (ticket === generation) { quiz = result.quiz || null; renderQuiz(); } } catch { /* no reviewed quiz available */ }
      }
    })).catch(() => {});
    const dailyTask = json(`https://www.sefaria.org/api/calendars?diaspora=0&year=${year}&month=${month}&day=${day}&timezone=Asia%2FJerusalem`).then(apply(data => { learning=data;renderLearning(); })).catch(() => {});
    let times;
    if (city) { try { times = await json(`https://www.hebcal.com/zmanim?cfg=json&geonameid=${city}&date=${date}`); if (times.location?.cc !== 'IL' || !times.times?.sunset) times=null; } catch {} }
    if (ticket !== generation) return;
    timesData = times; renderTimes();
    afterSunset = !!times && Date.now() >= Date.parse(times.times.sunset); lastSunset=afterSunset;
    const hebDate = D.addDays(date,afterSunset ? 1 : 0);
    await Promise.allSettled([calTask,dailyTask,
      Promise.all([json(`https://www.hebcal.com/converter?cfg=json&date=${hebDate}&g2h=1`),json(`https://www.hebcal.com/converter?cfg=json&date=${D.addDays(hebDate,1)}&g2h=1`)]).then(apply(([a,b]) => { dateData=a;nextDate=b;renderDate();renderLearning(); }))]);
  }
  $('zmanim-city').addEventListener('change',refreshLearning);
  $('community-parsha').addEventListener('click',() => $('parsha').click());
  $('community-donate').addEventListener('click',() => document.querySelector('.donate')?.click());
  $('quiz-toggle').addEventListener('click',() => { quizShown=!quizShown;renderQuiz(); });
  $('quiz-print').addEventListener('click',() => { document.body.classList.add('print-quiz'); window.print(); });
  window.addEventListener('afterprint',() => document.body.classList.remove('print-quiz'));
  $('said-button').addEventListener('click',async () => { $('said-button').disabled=true; try { const result=await post({action:'said'}); if (!Number.isFinite(result.said)) throw new Error('unavailable'); community.said=result.said;said=true;renderCommunity(); } catch(e) { $('name-status').textContent=tr(e.status===429?'limited':'failed');$('said-button').disabled=false; } });
  $('contact-form').addEventListener('submit',async event=>{
    event.preventDefault(); const form=event.currentTarget,button=form.querySelector('button');button.disabled=true;
    try { const result=await post({action:'contact',name:form.elements.sender.value,email:form.elements.email.value,message:form.elements.message.value,website:form.elements.website.value});if(result.ok!==true)throw new Error('unavailable');form.reset();$('contact-status').dataset.c='contactSent'; }
    catch(error){$('contact-status').dataset.c=error.status===429?'contactLimit':'contactFail';}
    finally{$('contact-status').textContent=tr($('contact-status').dataset.c);button.disabled=false;}
  });
  window.addEventListener('langchange',paintStatic);
  paintStatic(); refreshLearning();
  json('/api/community').then(async result => { community=result;renderCommunity(); if(result.available) { try { const value=await post({action:'visit'}); community.visits=value.visits;renderCommunity(); } catch {} } }).catch(() => {});
  function checkDate() { if (document.hidden) return; renderCommunity(); if (lastDay!==D.israelDay()) { json('/api/community').then(result=>{community=result;said=false;renderCommunity();}).catch(()=>{}); } if (lastDay!==D.israelDay() || (!lastSunset && timesData && Date.now()>=Date.parse(timesData.times.sunset))) refreshLearning(); }
  document.addEventListener('visibilitychange',checkDate); setInterval(checkDate,60000);
})();
