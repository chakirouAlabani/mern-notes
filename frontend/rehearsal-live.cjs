const assert = require('node:assert/strict');
const base = 'http://127.0.0.1:3000';
let cookie = '';
async function call(path, method = 'GET', body, expected = 200) {
  const response = await fetch(base + path, {
    method, headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) },
    body: body ? JSON.stringify(body) : undefined
  });
  assert.equal(response.status, expected, method + ' ' + path);
  const cookies = response.headers.getSetCookie();
  if (cookies.length) cookie = cookies.map(value => value.split(';')[0]).join('; ');
  return response.status === 204 ? null : response.json();
}
(async () => {
  assert.equal((await fetch(base, { headers: { Accept: 'text/html' } })).status, 200);
  assert.equal((await fetch(base + '/privacy', { headers: { Accept: 'text/html' } })).status, 200);
  assert.deepEqual(await call('/api/health'), { status: 'ok' });
  const suffix = Date.now().toString();
  await call('/api/users/signup', 'POST', {
    username: 'rehearsal' + suffix, email: 'rehearsal' + suffix + '@example.test',
    password: 'temporary-rehearsal-password'
  }, 201);
  assert.deepEqual(await call('/api/notes'), []);
  const created = await call('/api/notes', 'POST', { title: 'Rehearsal', text: 'Create' }, 201);
  const changed = await call('/api/notes/' + created._id, 'PATCH', { title: 'Updated', text: 'Edit' });
  assert.equal(changed.title, 'Updated');
  await call('/api/notes/' + created._id, 'DELETE', undefined, 204);
  assert.deepEqual(await call('/api/notes'), []);
  console.log('LIVE STACK PASS: index, privacy route, health, signup session, empty account, create/edit/delete');
})().catch(error => { console.error(error); process.exit(1); });
