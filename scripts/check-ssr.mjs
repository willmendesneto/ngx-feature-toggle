// Starts the SSR server built via `npm run build:ssr` and checks that it renders the demo app,
// including the feature toggles. CI only built SSR, so server startup errors weren't caught.
import { spawn } from 'node:child_process';

const PORT = process.env.PORT || '4100';
const BASE_URL = `http://localhost:${PORT}`;
const TIMEOUT_MS = 20_000;

// Path -> content rendered only when its feature toggles are on
const PAGES = {
  // Prerendered (static file)
  '/home': 'condition is true and',
  // Rendered on demand by the server, guarded by `canActivate` and `canActivateChild`
  '/customer/1': 'Customer Detail: ID 1',
};

const server = spawn(process.execPath, ['dist/ngx-feature-toggle-demo/server/server.mjs'], {
  env: { ...process.env, PORT },
  stdio: ['ignore', 'inherit', 'inherit'],
});

const fail = message => {
  console.error(`SSR check failed: ${message}`);
  server.kill();
  process.exit(1);
};

server.on('exit', code => fail(`server exited with code ${code}`));

const waitForServer = async () => {
  const startedAt = Date.now();
  while (Date.now() - startedAt < TIMEOUT_MS) {
    try {
      return await fetch(BASE_URL);
    } catch {
      await new Promise(resolve => setTimeout(resolve, 250));
    }
  }
  fail(`server didn't respond in ${TIMEOUT_MS}ms`);
};

await waitForServer();

for (const [path, expectedContent] of Object.entries(PAGES)) {
  const response = await fetch(`${BASE_URL}${path}`);
  const html = await response.text();

  if (response.status !== 200 || !html.includes(expectedContent)) {
    fail(`GET ${path} returned ${response.status} without "${expectedContent}"`);
  }
  console.log(`GET ${path} -> ${response.status}`);
}

server.removeAllListeners('exit');
server.kill();
console.log('SSR check passed');
