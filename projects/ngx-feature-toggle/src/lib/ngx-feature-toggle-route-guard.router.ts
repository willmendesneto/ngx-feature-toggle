import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, Route, CanActivateChild, Router, CanLoad, CanActivate } from '@angular/router';
import { evaluateFeatureToggle, isValidFeatureToggleConfig } from './ngx-feature-toggle.util';

@Injectable({ providedIn: 'root' })
export class NgxFeatureToggleRouteGuard implements CanActivateChild, CanLoad, CanActivate {
  constructor(private router: Router) {}

  isDevMode() {
    return isDevMode();
  }

  private isOnCheck(route: ActivatedRouteSnapshot | Route): boolean {
    if (!route || !route.data || !isValidFeatureToggleConfig(route.data.featureToggle)) {
      if (this.isDevMode()) {
        console.error(
          // tslint:disable-next-line: max-line-length
          '`NgxFeatureToggleRouteGuard` need to receive `featureToggle` as data as an array or string in your route configuration.',
        );
      }
      return false;
    }

    const hasTogglesOn = evaluateFeatureToggle(route.data.featureToggle);

    if (!hasTogglesOn && route.data.redirectTo !== null && route.data.redirectTo !== undefined) {
      this.router.navigate([].concat(route.data.redirectTo));
    }

    return hasTogglesOn;
  }

  canLoad(route: Route): boolean {
    return this.isOnCheck(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot | Route): boolean {
    return this.isOnCheck(route);
  }

  canActivate(route: ActivatedRouteSnapshot | Route): boolean {
    return this.isOnCheck(route);
  }
}
