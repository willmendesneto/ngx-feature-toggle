import { Injectable, isDevMode, Optional } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Route,
  CanActivateChild,
  Router,
  CanMatch,
  CanActivate,
} from '@angular/router';
import { FeatureToggleService } from './ngx-feature-toggle.service';
import { evaluateFeatureToggle, isValidFeatureToggleConfig } from './ngx-feature-toggle.util';

@Injectable({ providedIn: 'root' })
export class NgxFeatureToggleRouteGuard implements CanActivateChild, CanMatch, CanActivate {
  // `service` is optional to keep supporting `new NgxFeatureToggleRouteGuard(router)`,
  // which falls back to the toggles set via `setFeatureToggles()`
  constructor(
    private router: Router,
    @Optional() private service?: FeatureToggleService,
  ) {}

  isDevMode() {
    return isDevMode();
  }

  private isOnCheck(route: ActivatedRouteSnapshot | Route): boolean {
    if (!route || !route.data || !isValidFeatureToggleConfig(route.data.featureToggle)) {
      if (this.isDevMode()) {
        console.error(
          '`NgxFeatureToggleRouteGuard` need to receive `featureToggle` as data as a string, an array or a function in your route configuration.',
        );
      }
      return false;
    }

    const hasTogglesOn = this.service
      ? this.service.isOn(route.data.featureToggle)
      : evaluateFeatureToggle(route.data.featureToggle);

    if (!hasTogglesOn && route.data.redirectTo !== null && route.data.redirectTo !== undefined) {
      this.router.navigate([].concat(route.data.redirectTo));
    }

    return hasTogglesOn;
  }

  canMatch(route: Route): boolean {
    return this.isOnCheck(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot | Route): boolean {
    return this.isOnCheck(route);
  }

  canActivate(route: ActivatedRouteSnapshot | Route): boolean {
    return this.isOnCheck(route);
  }
}
