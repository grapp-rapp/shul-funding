const {test,beforeEach}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
process.env.ADMIN_PASSWORD='test-only-password-long-enough';
process.env.UPSTASH_REDIS_REST_URL='https://test.invalid';process.env.UPSTASH_REDIS_REST_TOKEN='test-token';
const s=require('../lib/server.cjs'),D=require('../learning-data.js');
const publicApi=require('../api/community'),adminApi=require('../api/admin');
let store;
beforeEach(()=>{store=new Map();global.fetch=async(url,options)=>{assert.equal(url,'https://test.invalid');const c=JSON.parse(options.body),[op,...a]=c;let result;
  if(op==='GET')result=store.get(a[0])??null;
  else if(op==='SET'){store.set(a[0],a[1]);result='OK';}
  else if(op==='MGET')result=a.map(k=>store.get(k)??null);
  else if(op==='DEL'){store.delete(a[0]);result=1;}
  else if(op==='EVAL'){
    const [script,n,...args]=a,keys=args.slice(0,n),v=args.slice(n);
    if(script.includes("local n=redis.call('INCR'")){result=(store.get(keys[0])||0)+1;store.set(keys[0],result);}
    else if(script.includes('local ids=')){result=[...store.entries()].filter(([k])=>k.startsWith(s.PREFIX+'name:')).map(([,v])=>v);}
    else if(script.includes("ARGV[5]=='new'")){store.set(keys[1],v[2]);result=1;}
    else if(script.includes("redis.call('DEL'")){store.delete(keys[0]);result=1;}
    else throw Error('Unexpected Lua command');
  }else throw Error('Unexpected command '+op);
  return {ok:true,json:async()=>({result})};};});
async function call(fn,body,token,headers={}){const req={method:body?'POST':'GET',headers:{host:'example.com',origin:'https://example.com','content-type':'application/json','x-vercel-forwarded-for':'192.0.2.1',...(token?{authorization:'Bearer '+token}:{}),...headers},body,query:{}};const res={code:200,headers:{},setHeader(k,v){this.headers[k]=v;},status(n){this.code=n;return this;},json(v){this.data=v;}};await fn(req,res);return res;}
test('all 54 single and 7 double parshas have 5 bilingual draft questions',()=>{assert.equal(s.questions.parshas.length,61);const ids=new Set();for(const q of s.questions.parshas){assert(!ids.has(q.id));ids.add(q.id);assert.equal(q.questions.length,5);for(const x of q.questions){for(const lang of ['en','he']){assert(x[lang].q?.length>5);assert(x[lang].a?.length>1);}assert(x.ref);}}});
test('weekly names resolve accents, punctuation, apostrophes and doubles',()=>{for(const name of ['Parashat Bereshit',"Parashat Sh’lach","Parashat Achrei Mot-Kedoshim","Parashat Nitzavim-Vayeilech", "Parashat Beha’alotcha"]){assert(s.findQuiz(name),name);}});
test('dates use Israel timezone and Sunday week boundary',()=>{assert.equal(s.israelDay(new Date('2026-09-26T22:00:00Z')),'2026-09-27');assert.equal(s.week(new Date('2026-09-26T20:00:00Z')),'2026-09-20');assert.equal(s.week(new Date('2026-09-26T22:00:00Z')),'2026-09-27');});
test('Tehillim short month combines last two portions; Psalm 119 splits by verse',()=>{assert.equal(D.tehillim(29,1),'140-150');assert.equal(D.tehillim(29,30),'140-144');assert.equal(D.tehillim(30,1),'145-150');assert.equal(D.tehillim(25,26),'119:1-96');assert.equal(D.tehillim(26,27),'119:97-176');});
test('tokens are signed, expire, and fail after password change',()=>{const t=s.issueToken(),req={headers:{authorization:'Bearer '+t}};assert(s.isAdmin(req));assert(!s.isAdmin({headers:{authorization:'Bearer '+t+'x'}}));const old=process.env.ADMIN_PASSWORD;process.env.ADMIN_PASSWORD='another-long-test-password';assert(!s.isAdmin(req));process.env.ADMIN_PASSWORD=old;});
test('admin requires authentication; login rejects wrong password and rate limits',async()=>{assert.equal((await call(adminApi)).code,401);assert.equal((await call(adminApi,{action:'login',password:'wrong'})).code,401);assert.equal((await call(adminApi,{action:'login',password:process.env.ADMIN_PASSWORD})).code,200);for(let i=0;i<7;i++)await call(adminApi,{action:'login',password:'wrong'});assert.equal((await call(adminApi,{action:'login',password:'wrong'})).code,429);});
test('cross-site mutations are rejected',async()=>{assert.equal((await call(publicApi,{action:'submit',name:'Test name',consent:true},null,{origin:'https://evil.invalid'})).code,403);});
test('submissions stay pending, honeypot does not save, approval exposes only public fields',async()=>{const h=await call(publicApi,{action:'submit',name:'Bot Name',consent:true,website:'bot'});assert.equal(h.code,200);assert.equal(store.size,0);
  await call(publicApi,{action:'submit',name:'Test ben Test',consent:true,website:''});assert.equal((await call(publicApi)).data.names.length,0);
  const row=JSON.parse([...store.entries()].find(([k])=>k.startsWith(s.PREFIX+'name:'))[1]);assert.equal(row.status,'pending');assert(Math.abs(row.expiresAt-Date.now()-30*86400000)<1000);
  const t=s.issueToken();await call(adminApi,{action:'name',id:row.id,operation:'approve'},t);const pub=(await call(publicApi)).data;assert.deepEqual(Object.keys(pub.names[0]).sort(),['expiresAt','name']);
  await call(adminApi,{action:'name',id:row.id,operation:'edit',name:'Edited ben Test'},t);assert.equal((await call(publicApi)).data.names[0].name,'Edited ben Test');
  await call(adminApi,{action:'name',id:row.id,operation:'remove'},t);assert.equal((await call(publicApi)).data.names.length,0);
});
test('expired names never leak even before Redis cleans up',async()=>{store.set(s.PREFIX+'name:expired',JSON.stringify({name:'Expired',status:'approved',expiresAt:Date.now()-1}));assert.equal((await call(publicApi)).data.names.length,0);});
test('only a signed-in admin can add a name directly to the public list',async()=>{assert.equal((await call(adminApi,{action:'addName',name:'Test ben Test'})).code,401);assert.equal(store.size,0);const token=s.issueToken();assert.equal((await call(adminApi,{action:'addName',name:'Test ben Test'},token)).code,200);assert.equal((await call(publicApi)).data.names[0].name,'Test ben Test');assert.equal((await call(adminApi,{action:'addName',name:'a'.repeat(101)},token)).code,400);});
test('quiz is not public until exact content is approved, and can be unpublished',async()=>{const q=s.questions.parshas[0];assert.equal(await s.publicQuiz(q.id),null);const t=s.issueToken();assert.equal((await call(adminApi,{action:'quiz',id:q.id,digest:s.quizHash(q),approved:true},t)).code,400);await call(adminApi,{action:'quiz',id:q.id,digest:s.quizHash(q),approved:true,ravReviewed:true},t);assert.equal((await s.publicQuiz(q.id)).id,q.id);store.set(s.PREFIX+'quiz:'+q.id,'old-version');assert.equal(await s.publicQuiz(q.id),null);});
test('manual figures validate missing, negative and malformed amounts and preserve known zero',()=>{for(const b of [{raised:-1,goal:100,donors:null},{raised:'10',goal:100,donors:null},{raised:5,goal:0,donors:null},{raised:0,goal:100,donors:1.5}])assert.throws(()=>s.goalData(b));assert.equal(s.goalData({raised:0,goal:100,donors:null}).raised,0);assert.equal(s.goalData({hide:true}),null);});
test('visits store only a weekly number, not an IP identifier',async()=>{await call(publicApi,{action:'visit'});assert.deepEqual([...store.keys()],[s.PREFIX+'visits:'+s.week()]);});
test('name length and control characters are handled safely',()=>{assert.throws(()=>s.cleanName('a'.repeat(101)));assert.throws(()=>s.cleanName('  '));assert.equal(s.cleanName('Test\u202e <Name>'),'Test Name');});
test('public build excludes drafts, sources and secrets; page scripts parse',()=>{for(const f of fs.readdirSync('dist'))assert(!/REVIEW|server|template|\.env/.test(f));const html=fs.readFileSync('index.html','utf8');for(const m of html.matchAll(/<script(.*?)>([\s\S]*?)<\/script>/g)){if(!m[1].includes('module'))new vm.Script(m[2]);}for(const name of ['admin.js','community.js','learning-data.js'])new vm.Script(fs.readFileSync(name,'utf8'));});
