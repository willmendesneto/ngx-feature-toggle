import { NgxFeatureToggleCanLoadGuard } from './ngx-feature-toggle-can-load-guard.router';
import { Route } from '@angular/router';
import { set } from 'feature-toggle-service';

const fakeRouter = {
  navigate: () => {},
} as any;

describe('Component: NgxFeatureToggleCanLoadGuard', () => {
  beforeEach(() => {
    set({ isFirstFeatureEnabled: true, isSecondFeatureEnabled: false });
    spyOn(console, 'error');
    spyOn(fakeRouter, 'navigate');
  });

  afterEach(() => {
    set({ isFirstFeatureEnabled: false, isSecondFeatureEnabled: false });
  });

  it('should return `false` if feature toggle is not configured in application level', () => {
    const instance = new NgxFeatureToggleCanLoadGuard(fakeRouter);
    expect(
      instance.canLoad({
        path: 'home',
        data: {
          featureToggle: ['thisFeatureToggleDoesNotExist'],
        },
      } as Route)
    ).toBeFalsy();

    expect(
      instance.canLoad({
        path: 'home',
        data: {
          featureToggle: 'thisFeatureToggleDoesNotExist',
        },
      } as Route)
    ).toBeFalsy();
  });

  it('should return `false` if feature toggle does not exist in route', () => {
    const instance = new NgxFeatureToggleCanLoadGuard(fakeRouter);

    const result = instance.canLoad({
      path: 'home',
    } as Route);

    expect(result).toBeFalsy();
    expect(console.error).toHaveBeenCalledWith(
      '`NgxFeatureToggleCanLoadGuard` need to receive `featureToggle` as data as an array or string in your route configuration.'
    );
  });

  it('should return `false` if feature toggle is not added in route as an array or string', () => {
    const instance = new NgxFeatureToggleCanLoadGuard(fakeRouter);

    const result = instance.canLoad({
      data: {
        featureToggle: {},
      },
    } as Route);

    expect(result).toBeFalsy();
    expect(console.error).toHaveBeenCalledWith(
      '`NgxFeatureToggleCanLoadGuard` need to receive `featureToggle` as data as an array or string in your route configuration.'
    );
  });

  it('should return `false` if feature toggle is disabled', () => {
    const instance = new NgxFeatureToggleCanLoadGuard(fakeRouter);

    expect(
      instance.canLoad({
        data: {
          featureToggle: ['isSecondFeatureEnabled'],
        },
      } as Route)
    ).toBeFalsy();

    expect(
      instance.canLoad({
        data: {
          featureToggle: 'isSecondFeatureEnabled',
        },
      } as Route)
    ).toBeFalsy();
  });

  it('should return `false` and redirect to the specific URL if feature toggle is disabled AND route contains `redirectTo`', () => {
    const instance = new NgxFeatureToggleCanLoadGuard(fakeRouter);

    expect(
      instance.canLoad({
        data: {
          featureToggle: ['isSecondFeatureEnabled'],
          redirectTo: '/redirect-url',
        },
      } as Route)
    ).toBeFalsy();
    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/redirect-url']);
  });

  it('should NOT console errors if code is running in production mode', () => {
    const instance = new NgxFeatureToggleCanLoadGuard(fakeRouter);
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
    const instance = new NgxFeatureToggleCanLoadGuard(fakeRouter);

    expect(
      instance.canLoad({
        data: {
          featureToggle: ['isFirstFeatureEnabled'],
        },
      } as Route)
    ).toBeTruthy();

    expect(
      instance.canLoad({
        data: {
          featureToggle: 'isFirstFeatureEnabled',
        },
      } as Route)
    ).toBeTruthy();
  });

  it('should return `true` if feature toggle is disabled AND route configuration starts with `!`', () => {
    const instance = new NgxFeatureToggleCanLoadGuard(fakeRouter);

    expect(
      instance.canLoad({
        data: {
          featureToggle: ['!isSecondFeatureEnabled'],
        },
      } as Route)
    ).toBeTruthy();

    expect(
      instance.canLoad({
        data: {
          featureToggle: '!isSecondFeatureEnabled',
        },
      } as Route)
    ).toBeTruthy();
  });

  it('should return `true` if combination of feature toggles are thruthy', () => {
    const instance = new NgxFeatureToggleCanLoadGuard(fakeRouter);

    expect(
      instance.canLoad({
        data: {
          featureToggle: ['isFirstFeatureEnabled', '!isSecondFeatureEnabled'],
        },
      } as Route)
    ).toBeTruthy();
  });
});
