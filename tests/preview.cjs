// Explicit local-only visual test fixture. Never bundled with the public site.
if(process.env.VERCEL)throw Error('Local preview only');
process.env.PORT='4174';process.env.ADMIN_PASSWORD='local-test-password-only';
process.env.UPSTASH_REDIS_REST_URL='https://fixture.invalid';process.env.UPSTASH_REDIS_REST_TOKEN='fixture';
const s=require('../lib/server.cjs'),store=new Map(),networkFetch=global.fetch;
store.set(s.PREFIX+'name:00000000-0000-0000-0000-000000000001',JSON.stringify({id:'00000000-0000-0000-0000-000000000001',name:'TEST ONLY — Ploni ben Plonis',status:'approved',expiresAt:Date.now()+86400000}));
store.set(s.PREFIX+'fundraising',JSON.stringify({raised:1200,goal:5000,donors:12,updatedAt:Date.now()}));
for(const q of s.questions.parshas)store.set(s.PREFIX+'quiz:'+q.id,s.quizHash(q));
global.fetch=async(url,options)=>{
  if(url!=='https://fixture.invalid')return networkFetch(url,options);
  const [op,...a]=JSON.parse(options.body);let result;
  if(op==='GET')result=store.get(a[0])??null;
  else if(op==='SET'){store.set(a[0],a[1]);result='OK';}
  else if(op==='MGET')result=a.map(k=>store.get(k)??null);
  else if(op==='DEL'){store.delete(a[0]);result=1;}
  else if(op==='EVAL'){
    const [script,n,...args]=a,keys=args.slice(0,n),v=args.slice(n);
    if(script.includes("local n=redis.call('INCR'")){result=(store.get(keys[0])||0)+1;store.set(keys[0],result);}
    else if(script.includes('local ids='))result=[...store.entries()].filter(([k])=>k.startsWith(s.PREFIX+'name:')).map(([,v])=>v);
    else if(script.includes("ARGV[5]=='new'")){store.set(keys[1],v[2]);result=1;}
    else if(script.includes("redis.call('DEL'")){store.delete(keys[0]);result=1;}
    else throw Error('Unknown fixture command');
  }else throw Error('Unknown fixture operation');
  return {ok:true,json:async()=>({result})};
};
console.log('LOCAL TEST DATA ONLY. This is not production storage.');
require('../scripts/dev.cjs');
