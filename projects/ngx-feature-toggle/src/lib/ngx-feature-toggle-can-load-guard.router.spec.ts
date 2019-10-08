import { NgxFeatureToggleCanLoadGuard } from './ngx-feature-toggle-can-load-guard.router';
import { Route } from '@angular/router';
import { set } from 'feature-toggle-service';

describe('Component: NgxFeatureToggleCanLoadGuard', () => {
  beforeEach(() => {
    set({ isFirstFeatureEnabled: true, isSecondFeatureEnabled: false });
    spyOn(console, 'error');
  });

  afterEach(() => {
    set({ isFirstFeatureEnabled: false, isSecondFeatureEnabled: false });
  });

  it('should return `false` if feature toggle is not configured in application level', () => {
    const instance = new NgxFeatureToggleCanLoadGuard();
    expect(
      instance.canLoad({
        path: 'home',
        data: {
          featureToggle: ['thisFeatureToggleDoesNotExist'],
        },
      } as Route),
    ).toBeFalsy();
  });

  it('should return `false` if feature toggle is not added in route', () => {
    const instance = new NgxFeatureToggleCanLoadGuard();

    const result = instance.canLoad({
      path: 'home',
    } as Route);

    expect(result).toBeFalsy();
    expect(console.error).toHaveBeenCalledWith(
      '`NgxFeatureToggleCanLoadGuard` need to receive `featureToggle` as data in your route configuration.',
    );
  });

  it('should return `false` if feature toggle is not added in route', () => {
    const instance = new NgxFeatureToggleCanLoadGuard();

    const result = instance.canLoad({
      data: {
        featureToggle: {},
      },
    } as Route);

    expect(result).toBeFalsy();
    expect(console.error).toHaveBeenCalledWith(
      '`NgxFeatureToggleCanLoadGuard` need to receive `featureToggle` as data as an array in your route configuration.',
    );
  });

  it('should return `false` if feature toggle is disabled', () => {
    const instance = new NgxFeatureToggleCanLoadGuard();

    expect(
      instance.canLoad({
        data: {
          featureToggle: ['isSecondFeatureEnabled'],
        },
      } as Route),
    ).toBeFalsy();
  });

  it('should NOT console errors if code is running in production mode', () => {
    const instance = new NgxFeatureToggleCanLoadGuard();
    spyOn(instance, 'isDevMode').and.returnValue(false);

    instance.canLoad({
      data: {
        featureToggle: {},
      },
    } as Route);

    instance.canLoad({
      data: {},
    } as Route);
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should return `true` if feature toggle is enabled', () => {
    const instance = new NgxFeatureToggleCanLoadGuard();

    expect(
      instance.canLoad({
        data: {
          featureToggle: ['isFirstFeatureEnabled'],
        },
      } as Route),
    ).toBeTruthy();
  });

  it('should return `true` if feature toggle is disabled AND route configuration starts with `!`', () => {
    const instance = new NgxFeatureToggleCanLoadGuard();

    expect(
      instance.canLoad({
        data: {
          featureToggle: ['!isSecondFeatureEnabled'],
        },
      } as Route),
    ).toBeTruthy();
  });

  it('should return `true` if combination of feature toggles are thruthy', () => {
    const instance = new NgxFeatureToggleCanLoadGuard();

    expect(
      instance.canLoad({
        data: {
          featureToggle: ['isFirstFeatureEnabled', '!isSecondFeatureEnabled'],
        },
      } as Route),
    ).toBeTruthy();
  });
});
