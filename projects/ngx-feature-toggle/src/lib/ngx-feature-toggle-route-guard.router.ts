import { Injectable, isDevMode } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Route,
  CanActivateChild,
  Router,
  CanLoad,
  CanActivate,
} from '@angular/router';
import { isOn } from 'feature-toggle-service';

@Injectable({ providedIn: 'root' })
export class NgxFeatureToggleRouteGuard
  implements CanActivateChild, CanLoad, CanActivate {
  constructor(private router: Router) {}

  isDevMode() {
    return isDevMode();
  }

  private isOnCheck(route: ActivatedRouteSnapshot | Route): boolean {
    if (
      !route ||
      !route.data ||
      (typeof route.data.featureToggle !== 'string' &&
        !Array.isArray(route.data.featureToggle))
    ) {
      if (this.isDevMode()) {
        console.error(
          // tslint:disable-next-line: max-line-length
          '`NgxFeatureToggleRouteGuard` need to receive `featureToggle` as data as an array or string in your route configuration.'
        );
      }
      return false;
    }

    const hasAllTogglesOn = ([].concat(
      route.data.featureToggle
    ) as string[]).every((toggle) =>
      toggle[0] === '!' ? !isOn(toggle.replace('!', '')) : isOn(toggle)
    );

    if (!hasAllTogglesOn && route.data.redirectTo) {
      this.router.navigate([].concat(route.data.redirectTo));
    }

    return hasAllTogglesOn;
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
