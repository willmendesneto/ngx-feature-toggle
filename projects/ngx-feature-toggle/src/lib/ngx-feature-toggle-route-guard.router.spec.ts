import { NgxFeatureToggleRouteGuard } from './ngx-feature-toggle-route-guard.router';
import { Route, Router } from '@angular/router';
import { FeatureTogglePredicate, setFeatureToggles } from './ngx-feature-toggle.util';

const orCallback: FeatureTogglePredicate = ({ isOn }) =>
  isOn('isFirstFeatureEnabled') || isOn('isSecondFeatureEnabled');

const mixedCallback: FeatureTogglePredicate = ({ isOn }) =>
  isOn('isFirstFeatureEnabled') && (isOn('isSecondFeatureEnabled') || isOn('isFirstFeatureEnabled'));

const failingCallback: FeatureTogglePredicate = ({ isOn }) => isOn('isSecondFeatureEnabled');

const passingCallback: FeatureTogglePredicate = ({ isOn }) => isOn('isFirstFeatureEnabled');

const navigateMock = vi.fn();
const fakeRouter = {
  navigate: navigateMock,
} as unknown as Router;

describe('Component: NgxFeatureToggleRouteGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    navigateMock.mockReset();
    setFeatureToggles({ isFirstFeatureEnabled: true, isSecondFeatureEnabled: false });
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    setFeatureToggles({ isFirstFeatureEnabled: false, isSecondFeatureEnabled: false });
  });

  // We have the same test for all the route guards methods
  // So that, we are keeping the same behaviour as before
  ['canActivateChild', 'canMatch', 'canActivate'].forEach((routeGuardMethod: string) => {
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

      it('should return `false` if feature toggle is disabled and `redirectTo` is null', () => {
        const instance = new NgxFeatureToggleRouteGuard(fakeRouter);

        expect(
          instance[method]({
            data: {
              featureToggle: ['isSecondFeatureEnabled'],
            },
          } as Route),
        ).toBeFalsy();

        expect(navigateMock).not.toHaveBeenCalled();
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
        expect(navigateMock).toHaveBeenCalledWith(['/redirect-url']);
      });

      it('should return `false` and redirect to the specific URL if feature toggle is disabled AND `redirectTo` is null', () => {
        const instance = new NgxFeatureToggleRouteGuard(fakeRouter);
        const redirectTo = '';

        expect(
          instance[method]({
            data: {
              featureToggle: ['isSecondFeatureEnabled'],
              redirectTo,
            },
          } as Route),
        ).toBeFalsy();

        expect(navigateMock).toHaveBeenCalledWith([redirectTo]);
      });

      it('should NOT console errors if code is running in production mode', () => {
        const instance = new NgxFeatureToggleRouteGuard(fakeRouter);
        vi.spyOn(instance, 'isDevMode').mockReturnValue(false);

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

      describe('When featureToggle is a callback', () => {
        beforeEach(() => {
          setFeatureToggles({ isFirstFeatureEnabled: true, isSecondFeatureEnabled: false });
        });

        it('should return `true` when OR callback matches any registered flag', () => {
          const instance = new NgxFeatureToggleRouteGuard(fakeRouter);

          expect(
            instance[method]({
              data: {
                featureToggle: orCallback,
              },
            } as Route),
          ).toBeTruthy();
        });

        it('should return `true` when mixed AND/OR callback matches', () => {
          const instance = new NgxFeatureToggleRouteGuard(fakeRouter);

          expect(
            instance[method]({
              data: {
                featureToggle: mixedCallback,
              },
            } as Route),
          ).toBeTruthy();
        });

        it('should return `false` and redirect when callback fails and `redirectTo` is set', () => {
          const instance = new NgxFeatureToggleRouteGuard(fakeRouter);

          expect(
            instance[method]({
              data: {
                featureToggle: failingCallback,
                redirectTo: '/redirect-url',
              },
            } as Route),
          ).toBeFalsy();

          expect(navigateMock).toHaveBeenCalledWith(['/redirect-url']);
        });

        it('should NOT console errors when feature toggle is a function', () => {
          const instance = new NgxFeatureToggleRouteGuard(fakeRouter);

          instance[method]({
            data: {
              featureToggle: passingCallback,
            },
          } as Route);

          expect(console.error).not.toHaveBeenCalled();
        });
      });
    });
  });
});
