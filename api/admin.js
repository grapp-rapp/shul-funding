const s = require('../lib/server.cjs');
module.exports = async function(req, res) {
  try {
    s.guard(req, res);
    if (!s.ready()) throw new s.HttpError(503, 'Setup required: connect Redis and set ADMIN_PASSWORD (at least 16 characters).');
    const b = req.method === 'POST' ? s.body(req) : {};
    if (b.action === 'login') {
      await s.rate(req, 'login', 8, 900);
      if (typeof b.password !== 'string' || !s.equal(b.password, process.env.ADMIN_PASSWORD)) throw new s.HttpError(401, 'Incorrect password.');
      return res.status(200).json({ token: s.issueToken() });
    }
    s.requireAdmin(req);
    if (req.method === 'GET') {
      const [names, counts, approved] = await Promise.all([s.list(true), s.counts(), s.redis('MGET', ...s.questions.parshas.map(q => s.PREFIX + 'quiz:' + q.id))]);
      return res.status(200).json({ names, ...counts, quizzes: s.questions.parshas.map((q, i) => ({ ...q, digest: s.quizHash(q), approved: approved[i] === s.quizHash(q) })) });
    }
    if (b.action === 'fundraising') { const data = s.goalData(b); await s.redis('SET', s.PREFIX + 'fundraising', JSON.stringify(data)); return res.status(200).json({ ok: true }); }
    if (b.action === 'quiz') {
      const q = s.findQuiz(b.id);
      if (!q || b.digest !== s.quizHash(q) || typeof b.approved !== 'boolean') throw new s.HttpError(400, 'The questions changed. Refresh and review them again.');
      if (b.approved && b.ravReviewed !== true) throw new s.HttpError(400, 'Confirm the rav reviewed these questions first.');
      if (b.approved) await s.redis('SET', s.PREFIX + 'quiz:' + q.id, s.quizHash(q));
      else await s.redis('DEL', s.PREFIX + 'quiz:' + q.id);
      return res.status(200).json({ ok: true });
    }
    if (b.action === 'name') {
      if (!/^[a-f0-9-]{36}$/.test(b.id || '')) throw new s.HttpError(400, 'Invalid name.');
      const key = s.PREFIX + 'name:' + b.id;
      if (b.operation === 'remove') { await s.redis('EVAL', "redis.call('DEL',KEYS[1]); return redis.call('ZREM',KEYS[2],ARGV[1])", 2, key, s.PREFIX + 'names', b.id); return res.status(200).json({ ok: true }); }
      const raw = await s.redis('GET', key);
      if (!raw) throw new s.HttpError(404, 'This name has expired or was removed.');
      const row = JSON.parse(raw);
      if (b.operation === 'approve') { if (b.name !== undefined) row.name = s.cleanName(b.name); row.status = 'approved'; }
      else if (b.operation === 'edit') row.name = s.cleanName(b.name);
      else if (b.operation === 'renew') row.expiresAt = Date.now() + s.LIFE * 1000;
      else throw new s.HttpError(400, 'Invalid action.');
      await s.saveName(row, false, raw);
      return res.status(200).json({ ok: true });
    }
    throw new s.HttpError(400, 'Unknown action.');
  } catch (e) { s.sendError(res, e); }
};
