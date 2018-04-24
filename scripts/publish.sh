#!/bin/bash

npm run test && \
npm run build && \
npm run bundlesize && \
node ./scripts/build.js && \
npm version $PKG_VERSION -m "v%s"
