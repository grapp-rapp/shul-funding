/* No password or token is written to cookies, localStorage, URLs, or logs. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  let token = '', state;
  const message = text => { $('status').textContent=text; };
  function node(tag,text,cls) { const n=document.createElement(tag); if(text!=null)n.textContent=text;if(cls)n.className=cls;return n; }
  async function request(data) {
    const r=await fetch('/api/admin',{method:data?'POST':'GET',headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},body:data?JSON.stringify(data):undefined,credentials:'omit',cache:'no-store',signal:AbortSignal.timeout(15000)});
    const value=await r.json(); if(!r.ok){if(r.status===401 && token)logout();throw new Error(value.error || 'Please try again.');}return value;
  }
  function logout(){token='';state=null;$('panel').hidden=true;$('logout').hidden=true;$('login').hidden=false;$('password').value='';$('names').replaceChildren();$('quiz-review').replaceChildren();}
  async function load(){state=await request();$('panel').hidden=false;$('login').hidden=true;$('logout').hidden=false;
    const f=state.fundraising;$('raised-admin').value=f?.raised??'';$('goal-admin').value=f?.goal??'';$('donors-admin').value=f?.donors??'';
    renderNames();const old=$('quiz-select').value;$('quiz-select').replaceChildren(...state.quizzes.map(q=>new Option(`${q.approved?'✓':'Draft'} · ${q.en} / ${q.he}`,q.id)));if(old)$('quiz-select').value=old;renderQuiz();
  }
  async function action(data,success,button){if(button)button.disabled=true;try{await request(data);await load();message(success);}catch(e){message(e.message);}finally{if(button)button.disabled=false;}}
  $('login').addEventListener('submit',async e=>{e.preventDefault();const button=e.currentTarget.querySelector('button');button.disabled=true;try{const result=await request({action:'login',password:$('password').value});$('password').value='';token=result.token;await load();message('Signed in.');}catch(error){message(error.message);}finally{button.disabled=false;}});
  $('logout').addEventListener('click',()=>{logout();message('Signed out.');});
  $('add-name').addEventListener('submit',async e=>{e.preventDefault();const button=e.currentTarget.querySelector('button');button.disabled=true;try{await request({action:'addName',name:$('new-name').value});$('new-name').value='';await load();message('Name added to the public list for 30 days. / השם נוסף לרשימה ל־30 יום.');}catch(error){message(error.message);}finally{button.disabled=false;}});
  $('refresh').addEventListener('click',()=>load().then(()=>message('Updated.')).catch(e=>message(e.message)));
  $('fundraising').addEventListener('submit',e=>{e.preventDefault();action({action:'fundraising',raised:Number($('raised-admin').value),goal:Number($('goal-admin').value),donors:$('donors-admin').value===''?null:Number($('donors-admin').value)},'Figures saved. Refresh the public page to see them.',e.currentTarget.querySelector('button'));});
  $('hide-fundraising').addEventListener('click',e=>action({action:'fundraising',hide:true},'Progress bar hidden.',e.currentTarget));
  function renderNames(){const box=$('names');box.replaceChildren();if(!state.names.length){box.append(node('p','No current names.'));return;}
    for(const row of [...state.names].sort((a,b)=>a.status.localeCompare(b.status)).reverse()){
      const card=node('div',null,'name-row');card.append(node('p',row.status==='pending'?'Pending / ממתין לאישור':'Approved / מאושר',row.status));
      const input=node('input');input.value=row.name;input.maxLength=100;input.minLength=3;input.setAttribute('aria-label','Edit name / עריכת שם');input.dir='auto';card.append(input,node('p','Expires: '+new Date(row.expiresAt).toLocaleDateString('en-GB',{timeZone:'Asia/Jerusalem'}),'fine'));
      const actions=node('div',null,'actions');
      for(const [op,text] of [['edit','Save edit'],...(row.status==='pending'?[['approve','Approve']]:[]),['renew','Renew 30 days'],['remove','Remove']]){
        const b=node('button',text,'secondary');b.addEventListener('click',()=>{if(op==='remove'&&!confirm('Remove this name from the list? This cannot be undone.'))return;action({action:'name',id:row.id,operation:op,...(['edit','approve'].includes(op)?{name:input.value}:{})},'Name updated.',b);});actions.append(b);
      } card.append(actions);box.append(card);
    }
  }
  function renderQuiz(){const q=state.quizzes.find(q=>q.id===$('quiz-select').value),box=$('quiz-review');box.replaceChildren();if(!q)return;
    box.append(node('p',q.approved?'Approved for publication / אושר לפרסום':'Draft — not public / טיוטה — אינה מוצגת באתר',q.approved?'approved':'pending'));
    for(const [i,item] of q.questions.entries()){const div=node('div',null,'question');div.append(node('strong',`${i+1}. ${item.en.q}`),node('p',item.en.a));const he=node('div');he.dir='rtl';he.lang='he';he.append(node('strong',item.he.q),node('p',item.he.a));div.append(he,node('p','Source: '+item.ref,'fine'));box.append(div);}
    const label=node('label'),check=node('input');check.type='checkbox';label.append(check,document.createTextNode('A rav has reviewed and approved this exact set in both languages.'));box.append(label);
    const publish=node('button','Approve this parsha');publish.disabled=true;check.addEventListener('change',()=>publish.disabled=!check.checked);publish.addEventListener('click',()=>action({action:'quiz',id:q.id,digest:q.digest,approved:true,ravReviewed:check.checked},'This question set is approved.',publish));box.append(publish);
    if(q.approved){const hide=node('button','Unpublish','secondary');hide.addEventListener('click',()=>action({action:'quiz',id:q.id,digest:q.digest,approved:false},'Questions hidden from the site.',hide));box.append(hide);}
  }
  $('quiz-select').addEventListener('change',renderQuiz);
})();
