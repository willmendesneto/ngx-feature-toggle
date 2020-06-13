import { Injectable, isDevMode } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Route,
  CanActivateChild,
} from '@angular/router';

import { isOn } from 'feature-toggle-service';

@Injectable({ providedIn: 'root' })
export class NgxFeatureToggleCanActivateChildGuard implements CanActivateChild {
  isDevMode() {
    return isDevMode();
  }

  canActivateChild(route: ActivatedRouteSnapshot | Route): boolean {
    const DEV_MODE = this.isDevMode();
    if (!route || !route.data || !route.data.featureToggle) {
      if (DEV_MODE) {
        console.error(
          '`NgxFeatureToggleCanActivateChildGuard` need to receive `featureToggle` as data in your route configuration.'
        );
      }
      return false;
    }

    const isFeatureToggleOn = (toggle) =>
      toggle[0] === '!' ? !isOn(toggle.replace('!', '')) : isOn(toggle);

    if (typeof route.data.featureToggle === 'string') {
      return isFeatureToggleOn(route.data.featureToggle as string);
    } else if (Array.isArray(route.data.featureToggle)) {
      return (route.data.featureToggle as string[]).every(isFeatureToggleOn);
    }

    if (DEV_MODE) {
      console.error(
        '`NgxFeatureToggleCanActivateChildGuard` need to receive `featureToggle` as data as an array or string in your route configuration.'
      );
    }
    return false;
  }
}
