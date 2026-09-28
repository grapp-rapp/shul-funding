const s = require('../lib/server.cjs');
const { randomUUID } = require('node:crypto');
module.exports = async function(req, res) {
  try {
    s.guard(req, res);
    if (!s.ready()) return res.status(200).json({ available: false });
    if (req.method === 'GET') {
      if (req.query?.quiz) return res.status(200).json({ quiz: await s.publicQuiz(String(req.query.quiz).slice(0, 100)) });
      const [names, counts] = await Promise.all([s.list(), s.counts()]);
      return res.status(200).json({ available: true, names: names.map(({ name, expiresAt }) => ({ name, expiresAt })), ...counts });
    }
    const b = s.body(req);
    if (b.action === 'visit') return res.status(200).json({ visits: await s.count('visits') });
    if (b.action === 'said') { await s.rate(req, 'said', 5, 86400); return res.status(200).json({ said: await s.count('said') }); }
    if (b.action === 'submit') {
      if (b.website) return res.status(200).json({ ok: true });
      await s.rate(req, 'submit', 3, 86400);
      if (b.consent !== true) throw new s.HttpError(400, 'Please confirm you have permission to submit this name.');
      const now = Date.now();
      await s.saveName({ id: randomUUID(), name: s.cleanName(b.name), status: 'pending', createdAt: now, expiresAt: now + s.LIFE * 1000 }, true);
      return res.status(200).json({ ok: true });
    }
    throw new s.HttpError(400, 'Unknown action.');
  } catch (e) { s.sendError(res, e); }
};
