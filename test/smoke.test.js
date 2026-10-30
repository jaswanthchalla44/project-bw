const { test } = require('node:test');
const assert = require('node:assert');

// Expects the server to already be running; this file does not start it.
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test('GET /health returns 200 and { status: "ok" }', async () => {
  const res = await fetch(`${BASE_URL}/health`);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { status: 'ok' });
});

test('GET /api/status returns time and visits without incrementing visits', async () => {
  const first = await fetch(`${BASE_URL}/api/status`);
  assert.strictEqual(first.status, 200);
  const firstBody = await first.json();
  assert.strictEqual(typeof firstBody.time, 'string');
  assert.strictEqual(typeof firstBody.visits, 'number');

  const second = await fetch(`${BASE_URL}/api/status`);
  assert.strictEqual(second.status, 200);
  const secondBody = await second.json();
  assert.strictEqual(secondBody.visits, firstBody.visits);
});

test('GET / returns 200 HTML containing "Deploy Test App v1"', async () => {
  const res = await fetch(`${BASE_URL}/`);
  assert.strictEqual(res.status, 200);
  const html = await res.text();
  assert.ok(html.includes('Deploy Test App v1'), 'response body missing "Deploy Test App v1"');
});
