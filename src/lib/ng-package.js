module.exports = {
  '$schema': `${__dirname}/../../node_modules/ng-packagr/ng-package.schema.json`,
  dest: `${__dirname}./../../dist`,
  lib: {
    entryFile: 'index.ts',
    licensePath: 'LICENSE',
    umdModuleIds: {
      'feature-toggle-service': 'FeatureToggleService'
    }
  }
}
