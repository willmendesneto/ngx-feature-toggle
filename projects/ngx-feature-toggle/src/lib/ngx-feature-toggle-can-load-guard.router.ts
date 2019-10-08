import { Injectable, isDevMode } from '@angular/core';
import { Route, CanLoad } from '@angular/router';

import { isOn } from 'feature-toggle-service';

@Injectable({ providedIn: 'root' })
export class NgxFeatureToggleCanLoadGuard implements CanLoad {
  isDevMode() {
    return isDevMode();
  }

  canLoad(route: Route): boolean {
    const DEV_MODE = this.isDevMode();
    if (!route || !route.data || !route.data.featureToggle) {
      if (DEV_MODE) {
        console.error(
          '`NgxFeatureToggleCanLoadGuard` need to receive `featureToggle` as data in your route configuration.',
        );
      }
      return false;
    }

    if (!Array.isArray(route.data.featureToggle)) {
      if (DEV_MODE) {
        console.error(
          '`NgxFeatureToggleCanLoadGuard` need to receive `featureToggle` as data as an array in your route configuration.',
        );
      }
      return false;
    }

    const userCanAccess = route.data.featureToggle.every(toggle =>
      toggle[0] === '!' ? !isOn(toggle.replace('!', '')) : isOn(toggle),
    );

    return userCanAccess;
  }
}
