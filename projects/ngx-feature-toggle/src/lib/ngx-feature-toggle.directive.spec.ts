import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FeatureToggleDirective } from './ngx-feature-toggle.directive';
import { FeatureToggleWhenDisabledDirective } from './ngx-feature-toggle-when-disabled.directive';
import { FeatureToggleProviderComponent } from './ngx-feature-toggle-provider.component';
import { set } from 'feature-toggle-service';

@Component({
  selector: 'kp-container',
  template: `
    <div>
      <div class="first" *featureToggle="'enableFirstText'">
        <p>Feature toggle enabled</p>
        <div class="second" *featureToggle="'enableSecondText'">
          Feature toggle disabled
        </div>
        <div class="third" *featureToggleWhenDisabled="'enableSecondText'">
          Feature toggle rendered when disabled
        </div>
      </div>
    </div>
  `,
})
class ContainerComponent {}

describe('Component: FeatureToggle', () => {
  const stub: any = {};
  let fixture: any;

  beforeEach(async () => {
    set({ enableFirstText: true });

    fixture = TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        FeatureToggleDirective,
        FeatureToggleWhenDisabledDirective,
        FeatureToggleProviderComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(ContainerComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    set({ enableFirstText: false });
  });

  describe('When featureToggle is enabled', () => {
    it('should render the component content', () => {
      expect(fixture.nativeElement.querySelector('.first').innerText).toContain(
        'Feature toggle enabled',
      );
    });
  });

  describe('When featureToggle is disabled', () => {
    it('should NOT render the component content', () => {
      expect(fixture.nativeElement.querySelector('.second')).toEqual(null);
    });

    it('should update when feature toggle data change', () => {
      expect(fixture.nativeElement.querySelector('.first').innerText).not.toEqual(null);

      set({ enableFirstText: false });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.first')).toEqual(null);
    });

    it('should render the component content if it has `featureToggleWhenDisabled` directive', () => {
      const textContent = fixture.nativeElement.querySelector('.third').innerText;
      expect(textContent).toContain('Feature toggle rendered when disabled');
    });
  });

  describe('When featureToggle is enabled', () => {
    it('should render the component content', () => {
      const textContent = fixture.nativeElement.querySelector('.third').innerText;
      expect(textContent).toContain('Feature toggle rendered when disabled');
    });
  });
});
