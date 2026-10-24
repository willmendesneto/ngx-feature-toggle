import { inject, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, UrlTree } from '@angular/router';
import { FeatureToggleService } from './ngx-feature-toggle.service';
import { isValidFeatureToggleConfig } from './ngx-feature-toggle.util';

/**
 * Functional route guard for `canMatch`, `canActivate` and `canActivateChild`. It reads
 * `featureToggle` (a toggle name, a list of names or a callback) from the route `data`, and
 * redirects to `data.redirectTo` (if any) when the feature toggles are off.
 *
 * @example
 * { path: 'beta', canMatch: [featureToggleGuard], data: { featureToggle: 'enableBeta', redirectTo: '/' } }
 */
export const featureToggleGuard = (route: Route | ActivatedRouteSnapshot): boolean | UrlTree => {
  const { featureToggle, redirectTo } = route.data ?? {};

  if (!isValidFeatureToggleConfig(featureToggle)) {
    if (isDevMode()) {
      console.error(
        '`featureToggleGuard` need to receive `featureToggle` as data as a string, an array or a function in your route configuration.',
      );
    }
    return false;
  }

  if (inject(FeatureToggleService).isOn(featureToggle)) {
    return true;
  }

  // Returning a `UrlTree` lets the router redirect, instead of navigating while it's matching routes
  return redirectTo === null || redirectTo === undefined
    ? false
    : inject(Router).createUrlTree(([] as string[]).concat(redirectTo));
};
