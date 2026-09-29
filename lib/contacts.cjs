const s = require('./server.cjs');
const { randomUUID } = require('node:crypto');
const index = s.PREFIX + 'contacts', prefix = s.PREFIX + 'contact:';
function field(value, min, max) {
  if (typeof value !== 'string') throw new s.HttpError(400, 'Please complete all fields.');
  const text = value.normalize('NFC').replace(/[\u0000-\u0008\u000b-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, '').trim();
  if (text.length < min || text.length > max) throw new s.HttpError(400, 'Please check the field lengths.');
  return text;
}
function validate(b) {
  const name = field(b.name, 2, 80), email = field(b.email, 3, 254), message = field(b.message, 10, 1500);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new s.HttpError(400, 'Please enter a valid email address.');
  return { name, email, message };
}
async function submit(b) {
  const now = Date.now(), row = { ...validate(b), id: randomUUID(), status:'new', createdAt:now, expiresAt:now + 90 * 86400000 };
  const script = "redis.call('ZREMRANGEBYSCORE',KEYS[1],'-inf',ARGV[1]); if redis.call('ZCARD',KEYS[1])>=100 then return 0 end; redis.call('SET',KEYS[2],ARGV[2],'PXAT',ARGV[3]); redis.call('ZADD',KEYS[1],ARGV[3],ARGV[4]); return 1";
  if (await s.redis('EVAL',script,2,index,prefix+row.id,now,JSON.stringify(row),row.expiresAt,row.id) !== 1) throw new s.HttpError(429,'The inbox is full. Please email us instead.');
}
async function list() {
  const script = "redis.call('ZREMRANGEBYSCORE',KEYS[1],'-inf',ARGV[1]); local ids=redis.call('ZRANGE',KEYS[1],0,99); local out={}; for _,id in ipairs(ids) do local v=redis.call('GET',ARGV[2]..id); if v then table.insert(out,v) end end; return out";
  return (await s.redis('EVAL',script,1,index,Date.now(),prefix)).map(JSON.parse).filter(row=>row.expiresAt>Date.now()).sort((a,b)=>b.createdAt-a.createdAt);
}
async function update(b) {
  if (!/^[a-f0-9-]{36}$/.test(b.id || '')) throw new s.HttpError(400,'Invalid request.');
  const key=prefix+b.id;
  if(b.operation==='remove') { await s.redis('EVAL',"redis.call('DEL',KEYS[1]); return redis.call('ZREM',KEYS[2],ARGV[1])",2,key,index,b.id); return; }
  if(!['done','new'].includes(b.operation)) throw new s.HttpError(400,'Invalid action.');
  const raw=await s.redis('GET',key);
  if(!raw) throw new s.HttpError(404,'This request has expired or was removed.');
  const row=JSON.parse(raw);row.status=b.operation;
  const script="if redis.call('GET',KEYS[1])~=ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2],'KEEPTTL'); return 1";
  if(await s.redis('EVAL',script,1,key,raw,JSON.stringify(row))!==1) throw new s.HttpError(409,'The request changed. Refresh and try again.');
}
module.exports={validate,submit,list,update};
