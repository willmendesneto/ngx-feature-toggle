# NGX Feature Toggle

[![Dependency Status](https://david-dm.org/willmendesneto/ngx-feature-toggle.svg)](https://david-dm.org/willmendesneto/ngx-feature-toggle)
[![npm](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/ngx-feature-toggle-sample)

[![NPM](https://nodei.co/npm/ngx-feature-toggle.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/ngx-feature-toggle)
[![NPM](https://nodei.co/npm-dl/ngx-feature-toggle.png?height=3&months=3)](https://npmjs.org/ngx-feature-toggle)

[![CI](https://github.com/willmendesneto/ngx-feature-toggle/actions/workflows/ci.yml/badge.svg)](https://github.com/willmendesneto/ngx-feature-toggle/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/willmendesneto/ngx-feature-toggle/badge.svg?branch=main)](https://coveralls.io/r/willmendesneto/ngx-feature-toggle?branch=main)
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

Try out the demos on Stackblitz:

- [Components and directives example](https://stackblitz.com/edit/ngx-feature-toggle-sample)
- [Routing Guards example](https://stackblitz.com/edit/ngx-feature-toggle-routing-guard-sample)

## Install

You can get it on NPM installing `ngx-feature-toggle` module as a project dependency.

```shell
npm install ngx-feature-toggle --save
```

## Setup

Set your feature toggles with `provideFeatureToggles()` when bootstrapping your application, and import the standalone `FeatureToggleDirective` in the components that use `*featureToggle`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideFeatureToggles } from 'ngx-feature-toggle';

bootstrapApplication(AppComponent, {
  providers: [
    provideFeatureToggles({
      enableFirstText: false,
      enableSecondText: true,
    }),
  ],
});
```

Your feature toggle configuration can come from different sources, such as an HTTP request, RxJS streams, CQRS events or files. To change it at runtime, use `FeatureToggleService` (see [Change feature toggles at runtime](#change-feature-toggles-at-runtime)).

Each application keeps its own feature toggles, so with server-side rendering they don't leak between requests. `*featureToggle` updates when the toggles change, also in `OnPush` components (the default since Angular 22) and zoneless applications.

## Module

### Components and Directives

- `*featureToggle` (`FeatureToggleDirective`): renders the content when the feature toggle configuration is enabled. It receives a toggle name (prefix it with `!` to check that it's disabled), a list of names that must all be enabled, or a callback;
- `provideFeatureToggles(config)`: sets the feature toggles of the application;
- `FeatureToggleService`: reads and changes the feature toggles at runtime;
- `featureToggleGuard`: route guard for `canMatch`, `canActivate` and `canActivateChild`;

```typescript
import { Component } from '@angular/core';
import { FeatureToggleDirective } from 'ngx-feature-toggle';

@Component({
  selector: 'component-docs',
  imports: [FeatureToggleDirective],
  template: `
    <div *featureToggle="'enableSecondText'">
      <p>condition is true and "featureToggle" is enabled.</p>
    </div>
    <div *featureToggle="'enableFirstText'">
      <p>condition is false and "featureToggle" is disabled. In that case this content should not be rendered.</p>
    </div>
    <div *featureToggle="'!enableFirstText'">
      <p>
        condition is false and "featureToggle" is disabled
        <b>but it has "!" as a prefix of the feature toggle to be checked.</b>
        In that case this content should be rendered.
      </p>
    </div>
    <div
      class="combined-feature-toggles-with-truthly-option"
      *featureToggle="['!enableFirstText', 'enableSecondText']"
    >
      <p>
        This is a combined condition. It shows if <b>enableSecondText</b> is true and <b>enableFirstText</b> is falsy,
        but it has "!" as a prefix. If both cases are correct, then the "featureToggle" is enabled and rendering this
        component.
      </p>
    </div>
  `,
})
export class ComponentDocsComponent {}
```

#### Callback predicate on `*featureToggle`

`*featureToggle` also accepts a **callback predicate** for OR, mixed AND/OR, or any custom rule. Bind a stable component method reference (avoid inline template lambdas):

```typescript
import { Component } from '@angular/core';
import { FeatureToggleDirective, FeatureTogglePredicate } from 'ngx-feature-toggle';

type AppFeatureToggles = {
  enableFirstText: boolean;
  enableSecondText: boolean;
};

@Component({
  selector: 'component-docs',
  imports: [FeatureToggleDirective],
  template: `
    <div *featureToggle="myFn">
      <p>Renders when enableFirstText OR enableSecondText is enabled.</p>
    </div>
  `,
})
export class ComponentDocsComponent {
  myFn: FeatureTogglePredicate<AppFeatureToggles> = ({ isOn }) => isOn('enableFirstText') || isOn('enableSecondText');
}
```

| `featureToggle` input | Semantics |
|-----------------------|-----------|
| `string` | Single toggle (`!` prefix for negation) |
| `string[]` | **AND** — all toggles must match |
| `callback` | Custom logic — OR, mixed, or any rule |

#### Typed `isOn` in callbacks

Use `FeatureTogglePredicate<T>` so `isOn` only accepts keys from your feature-flag map at **compile time**:

```typescript
export const listOfToggles = { A: true, C: false } as const;
type AppFeatureFlags = typeof listOfToggles;

myFn: FeatureTogglePredicate<AppFeatureFlags> = ({ isOn }) =>
  isOn('A') && isOn('C');
  // isOn('B') ← TypeScript error
```

| Call | Configured? | Value | Result |
|------|-------------|-------|--------|
| `isOn('A')` | Yes | `true` | `true` |
| `isOn('C')` | Yes | `false` | `false` |
| `isOn('B')` | No | — | `false` |

Use `!isOn('key')` for negation in callbacks, or `isToggleOn('!key')` for parity with string/array `!` prefix syntax.

### Change feature toggles at runtime

Inject `FeatureToggleService` to read or change the feature toggles of the application. New values are merged with the current ones, and every `*featureToggle` updates:

```typescript
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FeatureToggleService } from 'ngx-feature-toggle';

@Component({
  selector: 'beta-opt-in',
  template: `
    <button (click)="enableBeta()">Try the beta</button>
    <pre>{{ featureToggles.toggles() | json }}</pre>
  `,
  imports: [JsonPipe],
})
export class BetaOptInComponent {
  readonly featureToggles = inject(FeatureToggleService);

  enableBeta() {
    this.featureToggles.set({ enableBeta: true });
  }
}
```

| Member | Description |
| ------ | ----------- |
| `toggles` | Current feature toggles, as a signal |
| `set(config)` | Merges `config` with the current feature toggles |
| `isOn(config)` | Checks a toggle name, a list of names or a callback. It tracks the toggles in reactive contexts (e.g. `computed()`) |

### Public API

Import only from `ngx-feature-toggle`:

| Export | Consumer use |
|--------|----------------|
| `provideFeatureToggles()` | Set the feature toggles when bootstrapping |
| `FeatureToggleService` | Read and change the feature toggles at runtime |
| `FeatureToggleDirective` | `*featureToggle` in templates |
| `featureToggleGuard` | Route `canMatch` / `canActivate` / `canActivateChild` |
| `FeatureToggleServiceConfig` | Type your flag map |
| `FeatureTogglePredicate` | Type callback predicates for routes and `*featureToggle` |

Deprecated, but still available: `setFeatureToggles()` (use `provideFeatureToggles()` or `FeatureToggleService`; it sets the toggles of every application), `FeatureToggleProviderComponent` (`<feature-toggle-provider>`, use `provideFeatureToggles()`), `FeatureToggleModule` (import `FeatureToggleDirective`) and `NgxFeatureToggleRouteGuard` (use `featureToggleGuard`).

Evaluation logic is internal to the library — configure `featureToggle` as a string, array, or callback on routes and templates.

### Route Guards

In some scenarios when you need to prevent the route to be loaded, you can use `featureToggleGuard` as `canMatch`, by passing the configuration of the feature toggle to be checked in your route data.

```js
...
export const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [featureToggleGuard],
    data: {
      // Using array as configuration
      featureToggle: [
        // This configuration will check if feature toggle is enabled
        'enableSecondText',
        // This configuration will check if feature toggle is disabled
        // since it has `!` prefix in the configuration
        '!enableFirstText'
      ],
    },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [featureToggleGuard],
    data: {
      // Using string as configuration
      featureToggle: 'enableSecondText',
    },
  },
];
...
```

Also, you can use `featureToggleGuard` as `canActivate` to check if the route should be activated or not by passing the configuration of the feature toggle to be checked in your route data.

```js
...
export const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [featureToggleGuard],
    data: {
      // Using array as configuration
      featureToggle: [
        // This configuration will check if feature toggle is enabled
        'enableSecondText',
        // This configuration will check if feature toggle is disabled
        // since it has `!` prefix in the configuration
        '!enableFirstText'
      ],
    },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [featureToggleGuard],
    data: {
      // Using string as configuration
      featureToggle: 'enableSecondText',
    },
  },
];
...
```

In both route guards you can pass route data with feature toggle as an array. For scenarios when you need to check for feature toggles enabled and/or disabled you can easily configure it by passing `!` if the application should check if the feature toggle is disabled

```js
...
export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [featureToggleGuard],
    data: {
      // Using array as configuration
      featureToggle: [
        // This configuration will check if feature toggle is enabled
        'enableSecondText',
        // This configuration will check if feature toggle is disabled
        // since it has `!` prefix in the configuration
        '!enableFirstText'
      ],
    },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [featureToggleGuard],
    data: {
      // Using string as configuration
      featureToggle: 'enableSecondText',
    },
  },
];
...
```

In this case, we are combining the checks. So the component will be activated if `enableSecondText` is configured as `true` AND `enableFirstText` is configured as `false`. With that configuration you can have all the flexibility to cover different scenarios in your app.

#### Callback predicate on route `data.featureToggle`

Route guards also accept a callback on `featureToggle` for OR or mixed logic:

```typescript
import { featureToggleGuard } from 'ngx-feature-toggle';

export const routes: Routes = [
  {
    path: 'callback-demo',
    component: CallbackDemoComponent,
    canActivate: [featureToggleGuard],
    data: {
      featureToggle: ({ isOn }) => isOn('enableFirstText') || isOn('enableSecondText'),
      redirectTo: '/error',
    },
  },
];
```

For reusable predicates, extract a typed function:

```typescript
import { FeatureTogglePredicate } from 'ngx-feature-toggle';

export const canAccessCallbackRoute: FeatureTogglePredicate = ({ isOn }) =>
  isOn('enableFirstText') || isOn('enableSecondText');
```

Use `featureToggleGuard` as `canActivateChild` to control when the child component of a specific component can be activated via routing.

```js
...
export const routes: Routes = [
  {
    path: 'customer',
    component: CustomerComponent,
    canActivateChild: [featureToggleGuard],
    children: [
      {
        path: ':id',
        component: CustomerDetailComponent,
        // This is the featureToggle configuration for
        // the child component. It can also use
        // a combination of feature toggles
        data: {
          featureToggle: [
            // This configuration will check if feature toggle is enabled
            'enableCustomerPage',
            // This configuration will check if feature toggle is disabled
            // since it has `!` prefix in the configuration
            '!enableChildrenNavigation'],
        },
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivateChild: [featureToggleGuard],
    children: [
      {
        path: ':id',
        component: DashboardDetailsComponent,
        // This is the featureToggle configuration for
        // the child component. It can also use
        // a combination of feature toggles
        data: {
          // using string to configure
          featureToggle: 'enableDashboardDetailsPage',
        },
      },
    ],
  },
];
...
```

#### Redirects

You might have some specific requirements that you should redirect a user to a specific route in case of a feature flag is disabled. For that, you can use `redirectTo` as a mechanism to redirect a user in a specific route when it tries to access in a route with `featureToggleGuard` and the feature toggle is disabled. The guard redirects by returning a `UrlTree`, so the router handles the redirect.

For advanced scenarios you can use a combination of route guards AND redirects. E.G.

```js
...
export const routes: Routes = [
  {
    path: 'customer',
    component: CustomerComponent,
    canMatch: [featureToggleGuard],
    canActivate: [featureToggleGuard],
    canActivateChild: [featureToggleGuard],
    // This is the featureToggle configuration for
    // the parent component
    data: {
      featureToggle: ['enableCustomerPage'],
      // If feature toggle is disabled, the user will be redirected to `/error` URL
      redirectTo: '/error'
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
          // If one (or all of them) of the feature toggle is disabled, the user will be redirected to `/customer-error` URL
          // Note that you can use redirects for the main url and their children
          redirectTo: '/customer-error'
        },
      },
    ],
  },
];
...
```

## Development

### Run demo locally

1. This project uses [Angular CLI](https://cli.angular.io/) as base. That means you just need to run `npm start` and access the link `http://localhost:4200` in your browser

### Run tests

1. Run `npm test` for run tests. In case you want to test using watch, please use `npm run tdd`

### Other checks

- `npm run build:ssr && npm run test:ssr`: builds the demo with server-side rendering, starts the server and checks the rendered pages
- `npm run check:min-peer`: builds the package and compiles an app using the minimum Angular version supported (`integration/angular-min-peer`)
- `npm run build:pkg && npm run bundlesize`: checks the package bundle size

### Publish

this project is using `np` package to publish, which makes things straightforward. EX: `np <patch|minor|major> --contents=dist/ngx-feature-toggle`

> For more details, [please check np package on npmjs.com](https://www.npmjs.com/package/np)

## Contribute

For any type of contribution, please follow the instructions in [CONTRIBUTING.md](https://github.com/willmendesneto/ngx-feature-toggle/blob/main/CONTRIBUTING.md) and read [CODE_OF_CONDUCT.md](https://github.com/willmendesneto/ngx-feature-toggle/blob/main/CODE_OF_CONDUCT.md) files.

## Author

**Wilson Mendes (willmendesneto)**

- <https://twitter.com/willmendesneto>
- <http://github.com/willmendesneto>
