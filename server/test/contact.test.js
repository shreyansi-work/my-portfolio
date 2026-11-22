import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createApp } from '../src/app.js';
import { loadConfig } from '../src/config.js';

const valid = {
  name: '  Asha Patel ',
  email: 'Asha@Example.com',
  subject: 'Full Stack role',
  message: 'Hello Shreyansi, we would like to talk about a Full Stack position.',
  website: '',
  elapsedMs: 8000,
};

function startServer({ store, rateMax = 100, dist } = {}) {
  const config = { ...loadConfig({}), contactRateLimitMax: rateMax, clientDist: dist || '/nonexistent' };
  const app = createApp({ config, contactStore: store });
  return new Promise((resolve) => {
    const server = app.listen(0, () => resolve({ server, base: `http://127.0.0.1:${server.address().port}` }));
  });
}
const post = (base, body, raw = false) =>
  fetch(`${base}/api/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: raw ? body : JSON.stringify(body),
  });

function fakeStore(ready = true) {
  const saved = [];
  return { saved, isReady: () => ready, async save(doc) { saved.push(doc); return { id: String(saved.length) }; } };
}

let ctx;
let store;
before(async () => {
  store = fakeStore();
  ctx = await startServer({ store });
});
after(() => ctx.server.close());

test('health reports ok and database state', async () => {
  const res = await fetch(`${ctx.base}/api/health`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.status, 'ok');
  assert.equal(body.db, 'connected');
});

test('valid message is stored with cleaned values and returns 201', async () => {
  const res = await post(ctx.base, valid);
  assert.equal(res.status, 201);
  assert.equal((await res.json()).ok, true);
  assert.equal(store.saved.length, 1);
  assert.equal(store.saved[0].name, 'Asha Patel');
  assert.equal(store.saved[0].email, 'asha@example.com');
});

test('invalid fields return 400 with field errors and store nothing', async () => {
  const before = store.saved.length;
  const res = await post(ctx.base, { ...valid, name: 'A', email: 'not-an-email', subject: 'x', message: 'short' });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.deepEqual(Object.keys(body.fieldErrors).sort(), ['email', 'message', 'name', 'subject']);
  assert.equal(store.saved.length, before);
});

test('non-string fields are rejected', async () => {
  const res = await post(ctx.base, { ...valid, name: { $gt: '' }, email: ['a@b.co'] });
  assert.equal(res.status, 400);
});

test('honeypot submissions look successful but are not stored', async () => {
  const before = store.saved.length;
  const res = await post(ctx.base, { ...valid, website: 'http://spam.example' });
  assert.equal(res.status, 200);
  assert.equal(store.saved.length, before);
});

test('forms submitted too quickly are rejected', async () => {
  const res = await post(ctx.base, { ...valid, elapsedMs: 300 });
  assert.equal(res.status, 400);
});

test('malformed JSON returns 400 and oversized bodies return 413', async () => {
  assert.equal((await post(ctx.base, '{not json', true)).status, 400);
  assert.equal((await post(ctx.base, JSON.stringify({ ...valid, message: 'x'.repeat(20000) }), true)).status, 413);
});

test('unknown API routes return JSON 404', async () => {
  const res = await fetch(`${ctx.base}/api/nope`);
  assert.equal(res.status, 404);
  assert.equal((await res.json()).ok, false);
});

test('rate limit returns 429 after the allowed number of messages', async () => {
  const limited = await startServer({ store: fakeStore(), rateMax: 2 });
  try {
    assert.equal((await post(limited.base, valid)).status, 201);
    assert.equal((await post(limited.base, valid)).status, 201);
    assert.equal((await post(limited.base, valid)).status, 429);
  } finally {
    limited.server.close();
  }
});

test('contact form reports 503 when no database is configured or ready', async () => {
  const none = await startServer({ store: null });
  const notReady = await startServer({ store: fakeStore(false) });
  try {
    assert.equal((await post(none.base, valid)).status, 503);
    assert.equal((await post(notReady.base, valid)).status, 503);
    assert.equal((await (await fetch(`${none.base}/api/health`)).json()).db, 'not_configured');
  } finally {
    none.server.close();
    notReady.server.close();
  }
});

test('serves the built site and falls back to index.html for unknown routes', async () => {
  const dist = fs.mkdtempSync(path.join(os.tmpdir(), 'dist-'));
  fs.writeFileSync(path.join(dist, 'index.html'), '<!doctype html><title>Test site</title>');
  const site = await startServer({ store: fakeStore(), dist });
  try {
    const home = await fetch(`${site.base}/`);
    assert.equal(home.status, 200);
    assert.match(await home.text(), /Test site/);
    const deep = await fetch(`${site.base}/some/client/route`);
    assert.equal(deep.status, 200);
    assert.match(await deep.text(), /Test site/);
    assert.equal((await fetch(`${site.base}/api/unknown`)).status, 404); // API 404 is not swallowed by the fallback
    assert.match(home.headers.get('content-security-policy') || '', /default-src 'self'/);
  } finally {
    site.server.close();
    fs.rmSync(dist, { recursive: true, force: true });
  }
});
