const { version } = require('./package.json');
const fs = require('fs');

try {
  const pkg = JSON.parse(fs.readFileSync(`${__dirname}/dist/package.json`, 'utf8'));
  const pkgWithVersion = { ...pkg, version };

  fs.writeFileSync(`${__dirname}/dist/package.json`, JSON.stringify(pkgWithVersion, null, 2));
} catch (error) {
  throw error;
  process.exit();
}
