// Deliberate allowlist: never publish server code, question drafts, or backups.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
for (const name of ['index.html', 'share-preview.jpg', 'community.js', 'community.css', 'learning-data.js', 'admin.html', 'admin.js', 'admin.css']) {
  fs.copyFileSync(path.join(root, name), path.join(root, 'dist', name));
}
console.log('Built public site. Review drafts and server secrets are excluded.');
fs.copyFileSync(path.join(root,'node_modules/@vercel/analytics/dist/index.mjs'),path.join(root,'dist/analytics.js'));
