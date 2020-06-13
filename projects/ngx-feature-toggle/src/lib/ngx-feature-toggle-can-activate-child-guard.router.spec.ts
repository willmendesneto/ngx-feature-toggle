import { NgxFeatureToggleCanActivateChildGuard } from './ngx-feature-toggle-can-activate-child-guard.router';
import { Route } from '@angular/router';
import { set } from 'feature-toggle-service';

describe('Component: NgxFeatureToggleCanActivateChildGuard', () => {
  beforeEach(() => {
    set({ isFirstFeatureEnabled: true, isSecondFeatureEnabled: false });
    spyOn(console, 'error');
  });

  afterEach(() => {
    set({ isFirstFeatureEnabled: false, isSecondFeatureEnabled: false });
  });

  it('should return `false` if feature toggle is not configured in application level', () => {
    const instance = new NgxFeatureToggleCanActivateChildGuard();
    expect(
      instance.canActivateChild({
        path: 'home',
        data: {
          featureToggle: ['thisFeatureToggleDoesNotExist'],
        },
      } as Route)
    ).toBeFalsy();
  });

  it('should return `false` if feature toggle is not added in route', () => {
    const instance = new NgxFeatureToggleCanActivateChildGuard();

    const result = instance.canActivateChild({
      path: 'home',
    } as Route);

    expect(result).toBeFalsy();
    expect(console.error).toHaveBeenCalledWith(
      '`NgxFeatureToggleCanActivateChildGuard` need to receive `featureToggle` as data in your route configuration.'
    );
  });

  it('should return `false` if feature toggle is not added in route', () => {
    const instance = new NgxFeatureToggleCanActivateChildGuard();

    const result = instance.canActivateChild({
      data: {
        featureToggle: {},
      },
    } as Route);

    expect(result).toBeFalsy();
    expect(console.error).toHaveBeenCalledWith(
      '`NgxFeatureToggleCanActivateChildGuard` need to receive `featureToggle` as data as an array or string in your route configuration.'
    );
  });

  it('should return `false` if feature toggle is disabled', () => {
    const instance = new NgxFeatureToggleCanActivateChildGuard();

    expect(
      instance.canActivateChild({
        data: {
          featureToggle: ['isSecondFeatureEnabled'],
        },
      } as Route)
    ).toBeFalsy();
  });

  it('should NOT console errors if code is running in production mode', () => {
    const instance = new NgxFeatureToggleCanActivateChildGuard();
    spyOn(instance, 'isDevMode').and.returnValue(false);

    instance.canActivateChild({
      data: {
        featureToggle: {},
      },
    } as Route);

    instance.canActivateChild({
      data: {},
    } as Route);
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should return `true` if feature toggle is enabled', () => {
    const instance = new NgxFeatureToggleCanActivateChildGuard();

    expect(
      instance.canActivateChild({
        data: {
          featureToggle: ['isFirstFeatureEnabled'],
        },
      } as Route)
    ).toBeTruthy();
  });

  it('should return `true` if feature toggle is disabled AND route configuration starts with `!`', () => {
    const instance = new NgxFeatureToggleCanActivateChildGuard();

    expect(
      instance.canActivateChild({
        data: {
          featureToggle: ['!isSecondFeatureEnabled'],
        },
      } as Route)
    ).toBeTruthy();
  });

  it('should return `true` if combination of feature toggles are thruthy', () => {
    const instance = new NgxFeatureToggleCanActivateChildGuard();

    expect(
      instance.canActivateChild({
        data: {
          featureToggle: ['isFirstFeatureEnabled', '!isSecondFeatureEnabled'],
        },
      } as Route)
    ).toBeTruthy();
  });
});
