# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]

## [7.4.5][] - 2020-06-13

### Added

- Adding support for accept array or string as feature toggle configuration of

  - `NgxFeatureToggleCanLoadGuard`
  - `NgxFeatureToggleCanActivateGuard`
  - `NgxFeatureToggleCanActivateChildGuard`

- `*featureToggle` now supports a string or an array of toggles to be checked

```html
<div
  class="feature-toggle-enabled-with-exclamation-mark"
  *featureToggle="'enableFirstText'"
>
  Feature toggle is enabled if `enableFirstText` is true
</div>

<div
  class="feature-toggle-enabled-with-exclamation-mark"
  *featureToggle="['enableFirstText', 'enableSecondText']"
>
  Feature toggle is enabled if both feature toggles are true
</div>
```

### Updated

- Breaking changes:
  - `*featureToggleWhenDisabled` directive was removed since we can have the same behavior by using `*featureToggle` directive and passing `!` as a prefix for the feature toggle.

```html
<div
  class="feature-toggle-enabled-with-exclamation-mark"
  *featureToggle="'enableFirstText'"
>
  Feature toggle is enabled
</div>
<div
  class="feature-toggle-enabled-with-exclamation-mark"
  *featureToggle="'!enableFirstText'"
>
  Feature toggle disabled since it's enabled and it has <b>!</b> at front.
</div>
```

## [7.4.4][] - 2020-06-01

### Fixed

- Fixing README.md

## [7.4.3][] - 2020-06-01

### Fixed

- Fixing package publish

## [7.4.2][] - 2020-06-01

### Fixed

- N/A

## [7.4.1][] - 2020-06-01

### Fixed

- Fixing post install command
- Fixing `npm audit` command
- Fixing warning messages during `npm run build` command
- Fixing issue with publish command when building package in ivy mode

## [7.4.0][] - 2020-06-01

### Updated

- Upgrading @angular/cli to version 9
- Fixing single quotes in `.editorconfig` file

## [7.3.0][] - 2020-05-14

### Updated

- Upgrading NodeJS to `v12.16.2`
- Updating `feature-toggle-service` to `v5.0.1`

## [7.2.1][] - 2020-02-26

### Updated

- Updating to NodeJS v12.14.1

### Fixed

- Solving peerDependency warning when installing library in an Angular 9 project

## [7.2.0][] - 2019-10-10

### Updated

- Updating docs with Route Guards section, showing different usage for the components, directives and route guards

### Added

- Adding new `NgxFeatureToggleCanActivateChildGuard` to control when the child component of a specific component can be activate via routing. It can be passed as an array of items.

```js
...
export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [NgxFeatureToggleCanActivateGuard],
    canActivateChild: [NgxFeatureToggleCanActivateChildGuard],
    // This is the featureToggle configuration for
    // the parent component
    data: {
      featureToggle: ['enableCustomerPage'],
    },
    children: [
      {
        path: ':id',
        component: CustomerDetailComponent,
        // This is the featureToggle configuration for
        // the child component. It can also use
        // a combination of feature toggles
        data: {
          featureToggle: ['enableCustomerPage', '!enableChildrenNavigation'],
        },
      },
    ],
  },
];
...
```

## [7.1.0][] - 2019-10-09

### Added

- Adding new docs for route guards configuration
- Adding new `NgxFeatureToggleCanLoadGuard` to control when the component can be loaded via routing. It can be passed as an array of items.

```js
...
export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canLoad: [NgxFeatureToggleCanLoadGuard],
    data: {
      featureToggle: ['enableSecondText'],
    },
  },
];
...
```

- Adding new `NgxFeatureToggleCanActivateGuard` to control when the component can be activate via routing. It can be passed as an array of items.

```js
...
export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [NgxFeatureToggleCanActivateGuard],
    data: {
      featureToggle: ['enableSecondText'],
    },
  },
];
...
```

## [7.0.2][] - 2019-06-22

### Updated

- Updating `feature-toggle-service` to `v4.1.1` for better editor/ide integration and use package types

<img width="701" alt="Added method description for Editor/IDE integration" src="https://user-images.githubusercontent.com/1252570/59961226-53d91480-9518-11e9-8f3f-acbaf952e955.png">

## [7.0.1][] - 2019-06-09

### Updated

- Updating Angular CLI to v8

## [7.0.0][] - 2019-04-09

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
      <b>and it has "featureToggleWhenDisabled" directive.</b> In that case this
      content should be rendered.
    </p>
  </div>
</feature-toggle-provider>
```

- Avoiding add multiple components in first-page load. The components with enabled features were added thrice.

### Updated

- Updated module docs for including new directives
- Updating github templates for issues and pull requests
- Updating NPM keywords for package

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
[unreleased]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v7.0.2...HEAD
[7.0.2]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v7.0.1...v7.0.2
[7.0.1]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v7.0.0...v7.0.1
[7.0.0]: https://github.com/willmendesneto/ngx-feature-toggle/tree/v7.0.0
[unreleased]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v7.1.0...HEAD
[7.1.0]: https://github.com/willmendesneto/ngx-feature-toggle/tree/v7.1.0
[unreleased]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v7.2.0...HEAD
[7.2.0]: https://github.com/willmendesneto/ngx-feature-toggle/tree/v7.2.0
[unreleased]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v7.2.1...HEAD
[7.2.1]: https://github.com/willmendesneto/ngx-feature-toggle/tree/v7.2.1
[unreleased]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v7.3.0...HEAD
[7.3.0]: https://github.com/willmendesneto/ngx-feature-toggle/tree/v7.3.0
[unreleased]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v7.4.0...HEAD
[7.4.0]: https://github.com/willmendesneto/ngx-feature-toggle/tree/v7.4.0
[unreleased]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v7.4.2...HEAD
[7.4.2]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v7.4.1...v7.4.2
[7.4.1]: https://github.com/willmendesneto/ngx-feature-toggle/tree/v7.4.1
[unreleased]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v7.4.3...HEAD
[7.4.3]: https://github.com/willmendesneto/ngx-feature-toggle/tree/v7.4.3
[unreleased]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v7.4.4...HEAD
[7.4.4]: https://github.com/willmendesneto/ngx-feature-toggle/tree/v7.4.4


[Unreleased]: https://github.com/willmendesneto/ngx-feature-toggle/compare/v7.4.5...HEAD
[7.4.5]: https://github.com/willmendesneto/ngx-feature-toggle/tree/v7.4.5