# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]

### Fixed

- Fixed component to trigger Angular Lifecycle of components inside

If this PR contains a breaking change, please describe the impact and migration
path for existing applications: …

It removed `<feature-toggle>` component. Instead of it it will add 2 new directives:

- `*featureToggle`: Directive that handles with feature toggle check. So that, the component will be rendered/removed based on the feature toggle configuration is enabled;
- `*featureToggleWhenDisabled`: Directive that handles with feature toggle check. So that, the component will be rendered/removed when the feature toggle configuration is disabled;

So that, the new flow will be:

```html
<feature-toggle-provider [features]="featureToggleData">
  <div *featureToggle="'enableSecondText'">
    <p>condition is true and "featureToggle" is enabled.</p>
  </div>
  <div *featureToggleWhenDisabled="'enableFirstText'">
    <p>
      condition is false and "featureToggle" is disabled
      <b>and it has "featureToggleWhenDisabled" directive.</b> In that case this content should be
      rendered.
    </p>
  </div>
</feature-toggle-provider>
```

### Updated

- Updated module docs for including new directives
- Updating github templates for issues and pull requests

## [6.0.1][] - 2018-12-18

### Updated

- Adding more information in package.json for the library

## [6.0.0][] - 2018-12-18

### Updated

- Using `@angular/cli` structure
- Decreasing module bundle size
- Updating `script/build.js` to bump library version at build time
- Updating publish steps on `README.md` to use library `dist` folder

### Added

- Adding badges for Stackblitz and license
- Adding `CODE_OF_CONDUCT.md` file

## [5.2.6][] - 2018-10-07

### Updated

- Bumping `feature-toggle-service` to 4.0.0
- Decreasing bundle size to `808B`

## [5.2.5][] - 2018-05-28

### Updated

- Adding publish steps on `README.md`

## [5.2.4][] - 2018-05-28

### Updated

- Updating the npm scripts to add support for `np`
- Updating scripts to publish package

## [5.2.3][] - 2018-05-28

### Updated

- Updating the npm scripts to add support for `np`
- Updating scripts to publish package

## [5.2.2][] - 2018-04-25

### Fixed

- Fixing NPM publish script

## [5.2.1][] - 2018-04-25

### Fixed

- Fixing NPM publish task to v5.2.0

## [5.1.11][] - 2018-04-24

### Fixed

- Fixing NPM publish task to v5.1.12

## [5.1.8][] - 2018-04-24

### Fixed

- Fixing NPM publish task to v5.1.8

## [5.1.7][] - 2018-04-24

### Fixed

- Fixing NPM publish task

## [5.1.6][] - 2018-04-24

- Fixing NPM publish task

## [5.1.5][] - 2018-04-24

### Updated

- Decreasing the bundle to `839B`
- Updating NPM tasks

## [5.1.1][] - 2018-03-19

- Fixing published bundle

## [5.0.0][] - 2018-03-19

### Changed

- Using `ng-packagr` as package bundle

### Security

- Updating NPM packages

### Removed

- Changing `featureToggleService` to `features` prop on `<feature-toggle-provider />` component

[unreleased]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v5.2.5...HEAD
[5.2.5]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v5.2.4...v5.2.5
[5.2.4]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v5.2.3...v5.2.4
[5.2.3]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v5.2.3...v5.2.3
[5.2.3]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v5.2.2...v5.2.3
[5.2.2]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v5.2.1...v5.2.2
[5.2.1]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v5.1.11...v5.2.1
[5.1.11]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v5.1.8...v5.1.11
[5.1.8]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v5.1.7...v5.1.8
[5.1.7]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v5.1.6...v5.1.7
[5.1.6]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v5.1.5...v5.1.6
[5.1.5]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v5.1.0...v5.1.5
[5.1.1]: https://github.com/willmendesneto/ngx-feature-toggle/tree/v5.1.1
[5.0.0]: https://github.com/willmendesneto/ngx-feature-toggle/tree/v5.0.0
[unreleased]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v5.2.6...HEAD
[5.2.6]: https://github.com/willmendesneto/ngx-feature-toggle/tree/v5.2.6
[unreleased]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v6.0.0...HEAD
[6.0.0]: https://github.com/willmendesneto/ngx-feature-toggle/tree/v6.0.0
[unreleased]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v6.0.1...HEAD
[6.0.1]: https://github.com/willmendesneto/ngx-feature-toggle/tree/v6.0.1
