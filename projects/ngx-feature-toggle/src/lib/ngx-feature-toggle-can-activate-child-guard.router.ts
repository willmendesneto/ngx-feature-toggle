import { Injectable, isDevMode } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Route,
  CanActivateChild,
  Router,
} from '@angular/router';
import { isOn } from 'feature-toggle-service';

@Injectable({ providedIn: 'root' })
export class NgxFeatureToggleCanActivateChildGuard implements CanActivateChild {
  constructor(private router: Router) {}

  isDevMode() {
    return isDevMode();
  }

  canActivateChild(route: ActivatedRouteSnapshot | Route): boolean {
    const DEV_MODE = this.isDevMode();
    if (
      !route ||
      !route.data ||
      (typeof route.data.featureToggle !== 'string' &&
        !Array.isArray(route.data.featureToggle))
    ) {
      if (DEV_MODE) {
        console.error(
          // tslint:disable-next-line: max-line-length
          '`NgxFeatureToggleCanActivateChildGuard` need to receive `featureToggle` as data as an array or string in your route configuration.'
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
}
