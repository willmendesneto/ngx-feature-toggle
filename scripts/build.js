const { version } = require('./../package.json');
const fs = require('fs');
const semver = require('semver');

const SEMVER_INCREMENTS = ['patch', 'minor', 'major'];

if (!process.env.PKG_VERSION || !SEMVER_INCREMENTS.includes(process.env.PKG_VERSION)) {
  throw new Error('Please run the command with `PKG_VERSION=<patch|minor|major> node build.js`')
}

const newVersion = semver.inc(version, process.env.PKG_VERSION);

try {
  const pkg = JSON.parse(fs.readFileSync(`${__dirname}/../dist/package.json`, 'utf8'));
  const pkgWithVersion = { ...pkg, version: newVersion };

  fs.writeFileSync(`${__dirname}/../dist/package.json`, JSON.stringify(pkgWithVersion, null, 2));
} catch (error) {
  throw error;
  process.exit();
}
