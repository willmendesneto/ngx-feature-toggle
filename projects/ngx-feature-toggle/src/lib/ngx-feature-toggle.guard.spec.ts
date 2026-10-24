import { TestBed } from '@angular/core/testing';
import { Route, Router, UrlTree } from '@angular/router';
import { provideRouter } from '@angular/router';
import { featureToggleGuard } from './ngx-feature-toggle.guard';
import { provideFeatureToggles } from './ngx-feature-toggle.service';
import { FeatureTogglePredicate } from './ngx-feature-toggle.util';

describe('featureToggleGuard', () => {
  const runGuard = (data: Route['data']) =>
    TestBed.runInInjectionContext(() => featureToggleGuard({ path: 'page', data }));

  const serialize = (result: boolean | UrlTree) =>
    result instanceof UrlTree ? TestBed.inject(Router).serializeUrl(result) : result;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideFeatureToggles({ enabled: true, disabled: false })],
    });
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return `true` when the feature toggles are on', () => {
    expect(runGuard({ featureToggle: 'enabled' })).toBe(true);
    expect(runGuard({ featureToggle: ['enabled', '!disabled'] })).toBe(true);
    expect(runGuard({ featureToggle: (({ isOn }) => isOn('enabled')) as FeatureTogglePredicate })).toBe(true);
  });

  it('should return `false` when the feature toggles are off and there is no `redirectTo`', () => {
    expect(runGuard({ featureToggle: 'disabled' })).toBe(false);
    expect(runGuard({ featureToggle: 'disabled', redirectTo: null })).toBe(false);
  });

  it('should redirect via `UrlTree` when the feature toggles are off', () => {
    expect(serialize(runGuard({ featureToggle: 'disabled', redirectTo: '/error' }))).toBe('/error');
    expect(serialize(runGuard({ featureToggle: ['enabled', 'disabled'], redirectTo: ['/customer', 1] }))).toBe(
      '/customer/1',
    );
  });

  it('should return `false` and log an error when `featureToggle` is invalid', () => {
    expect(runGuard({})).toBe(false);
    expect(runGuard(undefined)).toBe(false);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('`featureToggle` as data'));
  });

  it('should be usable as `canMatch`, `canActivate` and `canActivateChild`', () => {
    const route: Route = {
      path: 'page',
      canMatch: [featureToggleGuard],
      canActivate: [featureToggleGuard],
      canActivateChild: [featureToggleGuard],
    };

    expect(route.canMatch).toHaveLength(1);
  });
});
