# NGX Feature Toggle

[![Greenkeeper badge](https://badges.greenkeeper.io/willmendesneto/ngx-feature-toggle.svg)](https://greenkeeper.io/)

[![npm version](https://badge.fury.io/js/ngx-feature-toggle.svg)](http://badge.fury.io/js/ngx-feature-toggle) [![npm downloads](https://img.shields.io/npm/dm/ngx-feature-toggle.svg)](https://npmjs.org/ngx-feature-toggle)

[![Build Status](https://travis-ci.org/willmendesneto/ngx-feature-toggle.svg?branch=master)](https://travis-ci.org/willmendesneto/ngx-feature-toggle)
[![Coverage Status](https://coveralls.io/repos/willmendesneto/ngx-feature-toggle/badge.svg?branch=master)](https://coveralls.io/r/willmendesneto/ngx-feature-toggle?branch=master)
[![Dependency Status](https://david-dm.org/willmendesneto/ngx-feature-toggle.svg)](https://david-dm.org/willmendesneto/ngx-feature-toggle)

[![NPM](https://nodei.co/npm/ngx-feature-toggle.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/ngx-feature-toggle)
[![NPM](https://nodei.co/npm-dl/ngx-feature-toggle.png?height=3&months=3)](https://npmjs.org/ngx-feature-toggle)

Your module to handle with [feature toggles](http://martinfowler.com/bliki/FeatureToggle.html) in Angular applications easier.

## Why Feature toggle?

> This is a common concept, but why use this directive instead solve it via server-side rendering?

The idea of this directive is make this process transparent and easier. So the main point is integrate this directive with other tooling process, such as:
- Server-side rendering;
- Progressive rendering;
- Any other that you like :)

You can integrate with WebSockets or handling this in a EventSourcing architecture. It's totally transparent for you and you can integrate easier in your application.


* [Demo](#demo)
* [Install](#install)
* [Setup](#setup)
* [Development](#development)
* [Contribute](#contribute)


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

After that, you can use the `featureToggle` components in your templates, passing the string based on the feature toggle configuration data.

- `feature-toggle-provider`: Handle with feature toggle configuration in your application. It adds the default values of your enabled/disabled features;
- `feature-toggle`: Handle with feature toggle check. So that, the component will be rendered/removed based on the feature toggle provider configuration;

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'component-docs',
  template: `
<feature-toggle-provider [featureToggleService]="featureToggleData">
  <feature-toggle [featureName]="'enableSecondText'">
    <p>condition is true and "featureToggle" is enabled.</p>
    <feature-toggle [featureName]="'enableFirstText'">
      <p>condition is false and "featureToggle" is disabled. In that case this content should not be rendered.</p>
    </feature-toggle>
    <feature-toggle [featureName]="'enableFirstText'" showWhenDisabled >
      <p>condition is false and "featureToggle" is disabled and it has "showWhenDisabled" attribute.</p>
      <p>In that case this content should be rendered.</p>
    </feature-toggle>
  </feature-toggle>
</feature-toggle-provider>
`
})

export class ComponentDocsComponent {
  public featureToggleData: any = {
    enableFirstText: false,
    enableSecondText: true
  };
}

```


## Development

Run demo locally:

1. build lib `npm run demo-server` (`npm run demo-dev-server` to run `dem`/src` content in watch mode)

### Publish

1. `npm run publish`

### Update `gh-pages` demo content

1. npm run demo-gh-pages

### Analizing src bundle

1. npm run bundle-report

### Analizing demo bundle

1. npm run demo-build-report
2. npm run analyze -- demo/dist/<name-of-the-file>.js


## Contribute

For contributions, please follow the instructions in [CONTRIBUTING.md](https://github.com/willmendesneto/ngx-feature-toggle/blob/master/CONTRIBUTING.md) file.


## Author

**Wilson Mendes (willmendesneto)**
+ <https://plus.google.com/+WilsonMendes>
+ <https://twitter.com/willmendesneto>
+ <http://github.com/willmendesneto>
