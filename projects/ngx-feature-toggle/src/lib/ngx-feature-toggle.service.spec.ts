import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FeatureToggleProviderComponent } from './ngx-feature-toggle-provider.component';
import { FeatureToggleDirective } from './ngx-feature-toggle.directive';
import { FeatureToggleService, provideFeatureToggles } from './ngx-feature-toggle.service';
import { isOn as isGloballyOn, setFeatureToggles } from './ngx-feature-toggle.util';

describe('FeatureToggleService', () => {
  afterEach(() => {
    setFeatureToggles({ serviceGlobal: false });
  });

  it('should set the feature toggles via `provideFeatureToggles()`', () => {
    TestBed.configureTestingModule({ providers: [provideFeatureToggles({ enabled: true, disabled: false })] });
    const service = TestBed.inject(FeatureToggleService);

    expect(service.isOn('enabled')).toBe(true);
    expect(service.isOn('disabled')).toBe(false);
    expect(service.isOn(['enabled', '!disabled'])).toBe(true);
    expect(service.isOn(({ isOn }) => isOn('enabled'))).toBe(true);
  });

  it('should expose the feature toggles as a signal', () => {
    const service = TestBed.inject(FeatureToggleService);

    service.set({ signalFeature: true });

    expect(service.toggles()).toEqual(expect.objectContaining({ signalFeature: true }));
  });

  it('should keep the feature toggles per application (e.g. per server-side rendering request)', () => {
    TestBed.configureTestingModule({ providers: [provideFeatureToggles({ perApp: true })] });
    expect(TestBed.inject(FeatureToggleService).isOn('perApp')).toBe(true);

    // A new application has a new root injector
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [provideFeatureToggles({ another: true })] });

    expect(TestBed.inject(FeatureToggleService).isOn('perApp')).toBe(false);
    expect(isGloballyOn('perApp')).toBe(false);
  });

  it('should follow the deprecated `setFeatureToggles()`', () => {
    const service = TestBed.inject(FeatureToggleService);

    setFeatureToggles({ serviceGlobal: true });

    expect(service.isOn('serviceGlobal')).toBe(true);
  });

  it('should apply the `feature-toggle-provider` toggles to the application only', () => {
    @Component({
      imports: [FeatureToggleProviderComponent],
      template: `<feature-toggle-provider [features]="{ providerFeature: true }" />`,
    })
    class ProviderHostComponent {}

    const fixture = TestBed.createComponent(ProviderHostComponent);
    fixture.detectChanges();

    expect(TestBed.inject(FeatureToggleService).isOn('providerFeature')).toBe(true);
    expect(isGloballyOn('providerFeature')).toBe(false);
  });

  describe('reactivity', () => {
    @Component({
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [FeatureToggleDirective],
      template: `<p *featureToggle="'reactiveFeature'">reactive content</p>`,
    })
    class OnPushHostComponent {}

    it('should update `*featureToggle` in an `OnPush` component when the toggles change', async () => {
      const fixture = TestBed.createComponent(OnPushHostComponent);
      await fixture.whenStable();
      expect(fixture.nativeElement.textContent).not.toContain('reactive content');

      // Outside change detection, e.g. after an HTTP request or from another component
      TestBed.inject(FeatureToggleService).set({ reactiveFeature: true });
      await fixture.whenStable();

      expect(fixture.nativeElement.textContent).toContain('reactive content');
    });
  });
});
