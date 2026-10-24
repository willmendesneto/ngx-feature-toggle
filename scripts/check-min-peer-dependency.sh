#!/usr/bin/env bash
# Builds the package and installs it in an Angular app using the minimum `peerDependencies`
# version (`integration/angular-min-peer`), checking that the published package works there
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
APP_DIR="$ROOT_DIR/integration/angular-min-peer"

cd "$ROOT_DIR"
npm run build:pkg

TARBALL="$(cd dist/ngx-feature-toggle && npm pack --silent --pack-destination "$APP_DIR")"

cd "$APP_DIR"
# `--legacy-peer-deps`: the app lists every dependency it needs, and npm fails while
# auto-installing the optional peer dependencies of `@angular/build` (e.g. Vitest)
npm install --no-audit --no-fund --legacy-peer-deps
npm install --no-audit --no-fund --legacy-peer-deps --no-save "./$TARBALL"
npm run build
