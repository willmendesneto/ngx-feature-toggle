import { NgxFeatureToggleCanActivateGuard } from './ngx-feature-toggle-can-activate-guard.router';
import { Route } from '@angular/router';
import { set } from 'feature-toggle-service';

describe('Component: NgxFeatureToggleCanActivateGuard', () => {
  beforeEach(() => {
    set({ isFirstFeatureEnabled: true, isSecondFeatureEnabled: false });
    spyOn(console, 'error');
  });

  afterEach(() => {
    set({ isFirstFeatureEnabled: false, isSecondFeatureEnabled: false });
  });

  it('should return `false` if feature toggle is not configured in application level', () => {
    const instance = new NgxFeatureToggleCanActivateGuard();
    expect(
      instance.canActivate({
        path: 'home',
        data: {
          featureToggle: ['thisFeatureToggleDoesNotExist'],
        },
      } as Route)
    ).toBeFalsy();
    expect(
      instance.canActivate({
        path: 'home',
        data: {
          featureToggle: 'thisFeatureToggleDoesNotExist',
        },
      } as Route)
    ).toBeFalsy();
  });

  it('should return `false` if feature toggle is not added in route', () => {
    const instance = new NgxFeatureToggleCanActivateGuard();

    const result = instance.canActivate({
      path: 'home',
    } as Route);

    expect(result).toBeFalsy();
    expect(console.error).toHaveBeenCalledWith(
      '`NgxFeatureToggleCanActivateGuard` need to receive `featureToggle` as data in your route configuration.'
    );
  });

  it('should return `false` if feature toggle is not added in route', () => {
    const instance = new NgxFeatureToggleCanActivateGuard();

    const result = instance.canActivate({
      data: {
        featureToggle: {},
      },
    } as Route);

    expect(result).toBeFalsy();
    expect(console.error).toHaveBeenCalledWith(
      '`NgxFeatureToggleCanActivateGuard` need to receive `featureToggle` as data as an array or string in your route configuration.'
    );
  });

  it('should return `false` if feature toggle is disabled', () => {
    const instance = new NgxFeatureToggleCanActivateGuard();

    expect(
      instance.canActivate({
        data: {
          featureToggle: ['isSecondFeatureEnabled'],
        },
      } as Route)
    ).toBeFalsy();

    expect(
      instance.canActivate({
        data: {
          featureToggle: 'isSecondFeatureEnabled',
        },
      } as Route)
    ).toBeFalsy();
  });

  it('should NOT console errors if code is running in production mode', () => {
    const instance = new NgxFeatureToggleCanActivateGuard();
    spyOn(instance, 'isDevMode').and.returnValue(false);

    instance.canActivate({
      data: {
        featureToggle: {},
      },
    } as Route);

    instance.canActivate({
      data: {},
    } as Route);
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should return `true` if feature toggle is enabled', () => {
    const instance = new NgxFeatureToggleCanActivateGuard();

    expect(
      instance.canActivate({
        data: {
          featureToggle: ['isFirstFeatureEnabled'],
        },
      } as Route)
    ).toBeTruthy();

    expect(
      instance.canActivate({
        data: {
          featureToggle: 'isFirstFeatureEnabled',
        },
      } as Route)
    ).toBeTruthy();
  });

  it('should return `true` if feature toggle is disabled AND route configuration starts with `!`', () => {
    const instance = new NgxFeatureToggleCanActivateGuard();

    expect(
      instance.canActivate({
        data: {
          featureToggle: ['!isSecondFeatureEnabled'],
        },
      } as Route)
    ).toBeTruthy();

    expect(
      instance.canActivate({
        data: {
          featureToggle: '!isSecondFeatureEnabled',
        },
      } as Route)
    ).toBeTruthy();
  });

  it('should return `true` if combination of feature toggles are thruthy', () => {
    const instance = new NgxFeatureToggleCanActivateGuard();

    expect(
      instance.canActivate({
        data: {
          featureToggle: ['isFirstFeatureEnabled', '!isSecondFeatureEnabled'],
        },
      } as Route)
    ).toBeTruthy();
  });
});
