import { ApplicationRef, ChangeDetectorRef, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureToggleModule } from './ngx-feature-toggle.module';
import {
  createFeatureToggleContext,
  FeatureToggleServiceConfig,
  setFeatureToggles,
} from './ngx-feature-toggle.util';

@Component({
  selector: 'kp-container',
  standalone: true,
  imports: [FeatureToggleModule],
  template: `
    <div>
      <feature-toggle-provider [features]="featureToggleData">
        <div class="feature-toggle-component" *featureToggle="'enableFirstText'">
          <p>Enabled content</p>
          <div class="feature-toggle-component" *featureToggle="'enableSecondText'">Disabled content</div>
        </div>
      </feature-toggle-provider>
    </div>
  `,
})
class ContainerComponent {
  featureToggleData: FeatureToggleServiceConfig = {
    enableFirstText: true,
    enableSecondText: false,
  };
}

describe('Component: FeatureToggleProviderComponent', () => {
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async () => {
    setFeatureToggles({ enableFirstText: true });

    await TestBed.configureTestingModule({
      imports: [ContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerComponent);
    fixture.detectChanges();
    TestBed.inject(ApplicationRef).tick();
  });

  afterEach(() => {
    setFeatureToggles({ enableFirstText: false });
  });

  it('should render the enabled children content', () => {
    const elementText = fixture.nativeElement.querySelectorAll('.feature-toggle-component')[0].textContent;
    expect(elementText).toContain('Enabled content');
  });

  it('should NOT render the disabled content', () => {
    const elementText = fixture.nativeElement.querySelectorAll('.feature-toggle-component')[0].textContent;
    expect(elementText).not.toContain('Disabled content');
  });

  it('should apply feature toggles when provider initializes', () => {
    setFeatureToggles({});
    fixture.detectChanges();

    const context = createFeatureToggleContext();
    expect(context.isOn('enableFirstText')).toBeTruthy();
    expect(context.isOn('enableSecondText')).toBeFalsy();
  });

  describe('change detection', () => {
    // Components are `OnPush` by default since Angular 22, so mark the container as changed
    const runChangeDetection = () => {
      fixture.componentRef.injector.get(ChangeDetectorRef).markForCheck();
      fixture.detectChanges();
    };

    it('should not apply the feature toggles again on every change detection', () => {
      // Changed somewhere else in the app
      setFeatureToggles({ enableSecondText: true });

      runChangeDetection();
      runChangeDetection();

      expect(createFeatureToggleContext().isOn('enableSecondText')).toBe(true);
    });

    it('should apply the feature toggles when a new object with different values is passed', () => {
      fixture.componentInstance.featureToggleData = { enableFirstText: true, enableSecondText: true };
      runChangeDetection();

      expect(fixture.nativeElement.textContent).toContain('Disabled content');
    });

    it('should apply the feature toggles when the same object is mutated', () => {
      (fixture.componentInstance.featureToggleData as { enableSecondText: boolean }).enableSecondText = true;
      runChangeDetection();

      expect(createFeatureToggleContext().isOn('enableSecondText')).toBe(true);
    });
  });
});
