'use strict';
const crypto = require('node:crypto');
const questions = require('../content/parsha-questions.REVIEW.json');
const PREFIX = 'tba:v1:';
const LIFE = 30 * 86400;
class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }
function ready() { return !!((process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) && (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN) && process.env.ADMIN_PASSWORD?.length >= 16); }
async function redis(...command) {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!ready()) throw new HttpError(503, 'Setup required: connect Redis and set ADMIN_PASSWORD (at least 16 characters).');
  const response = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(command), signal: AbortSignal.timeout(6000) });
  if (!response.ok) throw new HttpError(503, 'Temporarily unavailable. Please try again later.');
  const data = await response.json();
  if (data.error) throw new HttpError(503, 'Temporarily unavailable. Please try again later.');
  return data.result;
}
function israelDay(now = new Date()) { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jerusalem', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now); }
function week(now = new Date()) { const d = new Date(israelDay(now) + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() - d.getUTCDay()); return d.toISOString().slice(0, 10); }
function hash(value, purpose = 'token') { return crypto.createHmac('sha256', purpose === 'rate' ? (process.env.RATE_LIMIT_SECRET || process.env.ADMIN_PASSWORD || '') : (process.env.ADMIN_PASSWORD || '')).update(purpose + ':' + value).digest('hex'); }
function equal(a, b) { const aa = crypto.createHash('sha256').update(String(a)).digest(), bb = crypto.createHash('sha256').update(String(b)).digest(); return crypto.timingSafeEqual(aa, bb); }
function issueToken() { const body = `${Date.now() + 3600000}.${crypto.randomBytes(16).toString('hex')}`; return body + '.' + hash(body); }
function isAdmin(req) { const token = (req.headers.authorization || '').replace(/^Bearer /, ''); const parts = token.split('.'); return parts.length === 3 && /^\d+$/.test(parts[0]) && Number(parts[0]) > Date.now() && Number(parts[0]) <= Date.now() + 3600000 && equal(parts[2], hash(parts.slice(0, 2).join('.'))); }
function requireAdmin(req) { if (!ready() || !isAdmin(req)) throw new HttpError(401, 'Please sign in again.'); }
function guard(req, res) {
  res.setHeader('Cache-Control', 'no-store'); res.setHeader('X-Content-Type-Options', 'nosniff');
  if (!['GET', 'POST'].includes(req.method)) throw new HttpError(405, 'Method not allowed.');
  if (req.method === 'POST') {
    const origin = req.headers.origin;
    const host = req.headers.host;
    if (origin && origin !== `https://${host}` && !(process.env.NODE_ENV !== 'production' && origin === `http://${host}`)) throw new HttpError(403, 'Please use the form on this website.');
    if (!(req.headers['content-type'] || '').startsWith('application/json')) throw new HttpError(415, 'JSON required.');
    if (Number(req.headers['content-length'] || 0) > 4096) throw new HttpError(413, 'Request too large.');
  }
}
function body(req) { let b = req.body; if (typeof b === 'string') { if (b.length > 4096) throw new HttpError(413, 'Request too large.'); try { b = JSON.parse(b); } catch { throw new HttpError(400, 'Invalid request.'); } } if (!b || typeof b !== 'object' || Array.isArray(b) || JSON.stringify(b).length > 4096) throw new HttpError(400, 'Invalid request.'); return b; }
// One atomic command and bounded lifetime; raw addresses are never saved or logged.
const RATE = "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end; return n";
async function rate(req, action, max, seconds = 3600) {
  const ip = String(req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const key = PREFIX + 'rate:' + action + ':' + hash(israelDay() + ':' + ip, 'rate');
  if (Number(await redis('EVAL', RATE, 1, key, seconds)) > max) throw new HttpError(429, 'Please wait before trying again.');
}
function cleanName(value) { if (typeof value !== 'string') throw new HttpError(400, 'Please enter a name.'); const name = value.normalize('NFC').replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069<>]/g, '').replace(/\s+/g, ' ').trim(); if (name.length < 3 || name.length > 100) throw new HttpError(400, 'Use 3–100 characters for the name.'); return name; }
function goalData(b) {
  if (b.hide === true) return null;
  const { raised, goal, donors } = b;
  if (typeof raised !== 'number' || !Number.isFinite(raised) || raised < 0 || raised > 1e9 || typeof goal !== 'number' || !Number.isFinite(goal) || goal <= 0 || goal > 1e9 || !(donors === null || (Number.isSafeInteger(donors) && donors >= 0 && donors <= 1e7))) throw new HttpError(400, 'Enter valid amounts and an optional whole donor count.');
  return { raised: Math.round(raised * 100) / 100, goal: Math.round(goal * 100) / 100, donors, updatedAt: Date.now(), source: 'manual' };
}
const LIST = "redis.call('ZREMRANGEBYSCORE',KEYS[1],'-inf',ARGV[1]); local ids=redis.call('ZRANGE',KEYS[1],0,299); local out={}; for _,id in ipairs(ids) do local v=redis.call('GET',ARGV[2]..id); if v then table.insert(out,v) end end; return out";
async function list(all = false) { const rows = await redis('EVAL', LIST, 1, PREFIX + 'names', Date.now(), PREFIX + 'name:'); return rows.map(JSON.parse).filter(r => r.expiresAt > Date.now() && (all || r.status === 'approved')); }
const SAVE = "redis.call('ZREMRANGEBYSCORE',KEYS[1],'-inf',ARGV[1]); if ARGV[5]=='new' and redis.call('ZCARD',KEYS[1])>=300 then return 0 end; if ARGV[5]=='edit' then local old=redis.call('GET',KEYS[2]); if not old then return -1 end; if old~=ARGV[6] then return -2 end end; redis.call('SET',KEYS[2],ARGV[3],'PXAT',ARGV[4]); redis.call('ZADD',KEYS[1],ARGV[4],ARGV[2]); return 1";
async function saveName(row, isNew = false, expected = '') { const result = await redis('EVAL', SAVE, 2, PREFIX + 'names', PREFIX + 'name:' + row.id, Date.now(), row.id, JSON.stringify(row), row.expiresAt, isNew ? 'new' : 'edit', expected); if (result === -2) throw new HttpError(409, 'Another admin changed this name. Refresh and try again.'); if (result !== 1) throw new HttpError(result === 0 ? 429 : 404, result === 0 ? 'The list is full. Please try later.' : 'This name has expired or was removed.'); }
function quizHash(q) { return crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex'); }
function normalize(value) { return String(value).toLowerCase().replace(/^parashat\s+/, '').normalize('NFD').replace(/[\u0300-\u036f'’\s-]/g, ''); }
function findQuiz(value) { return questions.parshas.find(q => [q.id, q.en, ...(q.aliases || [])].some(s => normalize(s) === normalize(value))); }
async function publicQuiz(value) { const q = findQuiz(value); if (!q) return null; const approved = await redis('GET', PREFIX + 'quiz:' + q.id); return approved === quizHash(q) ? q : null; }
async function counts() { const w = week(); const values = await redis('MGET', PREFIX + 'visits:' + w, PREFIX + 'said:' + w, PREFIX + 'fundraising'); return { visits: Number(values[0] || 0), said: Number(values[1] || 0), fundraising: values[2] ? JSON.parse(values[2]) : null }; }
async function count(kind) { return Number(await redis('EVAL', RATE, 1, PREFIX + kind + ':' + week(), 8 * 86400)); }
function sendError(res, error) { res.status(error.status || 503).json({ error: error.status ? error.message : 'Temporarily unavailable. Please try again later.' }); }
module.exports = { PREFIX, LIFE, HttpError, ready, redis, israelDay, week, equal, issueToken, isAdmin, requireAdmin, guard, body, rate, cleanName, goalData, list, saveName, questions, quizHash, findQuiz, publicQuiz, counts, count, sendError };
