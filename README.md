# NGX Feature Toggle

[![Dependency Status](https://david-dm.org/willmendesneto/ngx-feature-toggle.svg)](https://david-dm.org/willmendesneto/ngx-feature-toggle)
[![npm](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/ngx-feature-toggle-sample)

[![NPM](https://nodei.co/npm/ngx-feature-toggle.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/ngx-feature-toggle)
[![NPM](https://nodei.co/npm-dl/ngx-feature-toggle.png?height=3&months=3)](https://npmjs.org/ngx-feature-toggle)

[![Build Status](https://circleci.com/gh/willmendesneto/ngx-feature-toggle.svg?style=shield)](https://circleci.com/gh/willmendesneto/ngx-feature-toggle)
[![Coverage Status](https://coveralls.io/repos/willmendesneto/ngx-feature-toggle/badge.svg?branch=master)](https://coveralls.io/r/willmendesneto/ngx-feature-toggle?branch=master)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-feature-toggle.svg)](https://bundlephobia.com/result?p=ngx-feature-toggle)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

Your module to handle with [feature toggles](http://martinfowler.com/bliki/FeatureToggle.html) in Angular applications easier.

## Why Feature toggle?

> This is a common concept, but why use this directive instead solve it via server-side rendering?

The idea of this directive is make this process transparent and easier. So the main point is integrate this directive with other tooling process, such as:

- Server-side rendering;
- Progressive rendering;
- Any other that you like :)

You can integrate with WebSockets or handling this in a EventSourcing architecture. It's totally transparent for you and you can integrate easier in your application.

- [Demo](#demo)
- [Install](#install)
- [Setup](#setup)
- [Development](#development)
- [Contribute](#contribute)

## Demo

Take a look on the [docs](https://willmendesneto.github.io/ngx-feature-toggle/index.html) or try out our [demo on Stackblitz](https://stackblitz.com/edit/ngx-feature-toggle-sample)!

## Install

You can get it on NPM installing `ngx-feature-toggle` module as a project dependency.

```shell
npm install ngx-feature-toggle --save
```

## Setup

You'll need to add `FeatureToggleModule` to your application module. So that, the `featureToggle` components will be accessible in your application.

```typescript
@NgModule({
  declarations: [
    YourAppComponent
  ],
  imports: [
    FeatureToggleModule,
    ...
  ],
  providers: [],
  bootstrap: [YourAppComponent]
})

export class YourAppComponent {}

```

Now you just need to add a configuration in your application root component. Your feature toggle configuration can be added using different approaches, such as:

- RXJS subscribe information;
- HTTP Request;
- CQRS event data;
- File information;
- etc;

After that, you can use the `featureToggle` components and directives in your templates, passing the string based on the feature toggle configuration data.

- `feature-toggle-provider`: Handle with feature toggle configuration in your application. It adds the default values of your enabled/disabled features;
- `*featureToggle`: Directive that handles with feature toggle check. So that, the component will be rendered/removed based on the feature toggle configuration is enabled;
- `*featureToggleWhenDisabled`: Directive that handles with feature toggle check. So that, the component will be rendered/removed when the feature toggle configuration is disabled;

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'component-docs',
  template: `
    <feature-toggle-provider [features]="featureToggleData">
      <div *featureToggle="'enableSecondText'">
        <p>condition is true and "featureToggle" is enabled.</p>
      </div>
      <div *featureToggle="'enableFirstText'">
        <p>
          condition is false and "featureToggle" is disabled. In that case this content should not
          be rendered.
        </p>
      </div>
      <div *featureToggleWhenDisabled="'enableFirstText'">
        <p>
          condition is false and "featureToggle" is disabled
          <b>and it has "featureToggleWhenDisabled" directive.</b> In that case this content should
          be rendered.
        </p>
      </div>
    </feature-toggle-provider>
  `,
})
export class ComponentDocsComponent {
  public featureToggleData: any = {
    enableFirstText: false,
    enableSecondText: true,
  };
}
```

## Development

### Run demo locally

1. This project uses [Angular CLI](https://cli.angular.io/) as base. That means you just need to run `npm start` and access the link `http://localhost:4200` in your browser

### Run tests

1. Run `npm test` for run tests. In case you want to test using watch, please use `npm run tdd`

### Publish

this project is using `np` package to publish, which makes things straightforward. EX: `np <patch|minor|major> --contents=dist/ngx-feature-toggle`

> For more details, [please check np package on npmjs.com](https://www.npmjs.com/package/np)

## Contribute

For any type of contribution, please follow the instructions in [CONTRIBUTING.md](https://github.com/willmendesneto/ngx-feature-toggle/blob/master/CONTRIBUTING.md) and read [CODE_OF_CONDUCT.md](https://github.com/willmendesneto/ngx-feature-toggle/blob/master/CODE_OF_CONDUCT.md) files.

## Author

**Wilson Mendes (willmendesneto)**

- <https://twitter.com/willmendesneto>
- <http://github.com/willmendesneto>
