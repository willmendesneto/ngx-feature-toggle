const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const bundlesizeConfig = require('../package.json').bundlesize;

function parseSize(size) {
  const match = /^(\d+(?:\.\d+)?)(KB|MB|B)$/i.exec(size.trim());
  if (!match) {
    throw new Error(`Invalid size format: ${size}`);
  }

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  if (unit === 'KB') {
    return value * 1024;
  }

  if (unit === 'MB') {
    return value * 1024 * 1024;
  }

  return value;
}

let hasError = false;

for (const item of bundlesizeConfig) {
  const filePath = path.resolve(item.path);

  if (!fs.existsSync(filePath)) {
    console.error(`Bundle file not found: ${item.path}`);
    hasError = true;
    continue;
  }

  const size = zlib.gzipSync(fs.readFileSync(filePath)).length;
  const maxSize = parseSize(item.maxSize);

  if (size > maxSize) {
    console.error(
      `${item.path} is ${(size / 1024).toFixed(2)}KB gzipped, which exceeds the limit of ${item.maxSize}`,
    );
    hasError = true;
    continue;
  }

  console.log(`${item.path} is ${(size / 1024).toFixed(2)}KB gzipped (limit: ${item.maxSize})`);
}

if (hasError) {
  process.exit(1);
}
