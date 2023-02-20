import { NgxFeatureToggleRouteGuard } from './ngx-feature-toggle-route-guard.router';
import { Route } from '@angular/router';
import { set } from 'feature-toggle-service';

const fakeRouter = {
  navigate: () => {},
} as any;

describe('Component: NgxFeatureToggleRouteGuard', () => {
  beforeEach(() => {
    set({ isFirstFeatureEnabled: true, isSecondFeatureEnabled: false });
    spyOn(console, 'error');
    spyOn(fakeRouter, 'navigate');
  });

  afterEach(() => {
    set({ isFirstFeatureEnabled: false, isSecondFeatureEnabled: false });
  });

  // We have the same test for all the route guards methods
  // So that, we are keeping the same behaviour as before
  ['canActivateChild', 'canLoad', 'canActivate'].forEach((routeGuardMethod: string) => {
    const method = routeGuardMethod as keyof NgxFeatureToggleRouteGuard;

    describe(`#${method}()`, () => {
      it('should return `false` if feature toggle is not configured in application level', () => {
        const instance = new NgxFeatureToggleRouteGuard(fakeRouter);

        expect(
          instance[method]({
            path: 'home',
            data: {
              featureToggle: ['thisFeatureToggleDoesNotExist'],
            },
          } as Route),
        ).toBeFalsy();
      });

      it('should return `false` if feature toggle key does not exist in route', () => {
        const instance = new NgxFeatureToggleRouteGuard(fakeRouter);

        const result = instance[method]({
          path: 'home',
        } as Route);

        expect(result).toBeFalsy();
        expect(console.error).toHaveBeenCalledWith(
          '`NgxFeatureToggleRouteGuard` need to receive `featureToggle` as data as an array or string in your route configuration.',
        );
      });

      it('should return `false` if feature toggle is not added in route as an array', () => {
        const instance = new NgxFeatureToggleRouteGuard(fakeRouter);

        const result = instance[method]({
          data: {
            featureToggle: {},
          },
        } as Route);

        expect(result).toBeFalsy();
        expect(console.error).toHaveBeenCalledWith(
          '`NgxFeatureToggleRouteGuard` need to receive `featureToggle` as data as an array or string in your route configuration.',
        );
      });

      it('should return `false` if feature toggle is disabled', () => {
        const instance = new NgxFeatureToggleRouteGuard(fakeRouter);

        expect(
          instance[method]({
            data: {
              featureToggle: ['isSecondFeatureEnabled'],
            },
          } as Route),
        ).toBeFalsy();
      });

      it('should return `false` and redirect to the specific URL if feature toggle is disabled AND route contains `redirectTo`', () => {
        const instance = new NgxFeatureToggleRouteGuard(fakeRouter);

        expect(
          instance[method]({
            data: {
              featureToggle: ['isSecondFeatureEnabled'],
              redirectTo: '/redirect-url',
            },
          } as Route),
        ).toBeFalsy();
        expect(fakeRouter.navigate).toHaveBeenCalledWith(['/redirect-url']);
      });

      it('should NOT console errors if code is running in production mode', () => {
        const instance = new NgxFeatureToggleRouteGuard(fakeRouter);
        spyOn(instance, 'isDevMode').and.returnValue(false);

        instance[method]({
          data: {
            featureToggle: {},
          },
        } as Route);

        instance[method]({
          data: {},
        } as Route);
        expect(console.error).not.toHaveBeenCalled();
      });

      it('should return `true` if feature toggle is enabled', () => {
        const instance = new NgxFeatureToggleRouteGuard(fakeRouter);

        expect(
          instance[method]({
            data: {
              featureToggle: ['isFirstFeatureEnabled'],
            },
          } as Route),
        ).toBeTruthy();
      });

      it('should return `true` if feature toggle is disabled AND route configuration starts with `!`', () => {
        const instance = new NgxFeatureToggleRouteGuard(fakeRouter);

        expect(
          instance[method]({
            data: {
              featureToggle: ['!isSecondFeatureEnabled'],
            },
          } as Route),
        ).toBeTruthy();
      });

      it('should return `true` if combination of feature toggles are thruthy', () => {
        const instance = new NgxFeatureToggleRouteGuard(fakeRouter);

        expect(
          instance[method]({
            data: {
              featureToggle: ['isFirstFeatureEnabled', '!isSecondFeatureEnabled'],
            },
          } as Route),
        ).toBeTruthy();
      });
    });
  });
});
