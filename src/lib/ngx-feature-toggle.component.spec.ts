import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FeatureToggleComponent } from './ngx-feature-toggle.component';
import { FeatureToggleProviderComponent } from './ngx-feature-toggle-provider.component';
import { setConfigurationObject } from 'feature-toggle-service';

@Component({
  selector: 'kp-container',
  template: `
  <div>
    <feature-toggle class="first" [featureName]="'enableFirstText'">
      <p>Feature toggle enabled</p>
      <feature-toggle class="second" [featureName]="'enableSecondText'">
        Feature toggle disabled
      </feature-toggle>
      <feature-toggle class="third" [featureName]="'enableSecondText'" showWhenDisabled>
        Feature toggle rendered when disabled
      </feature-toggle>
    </feature-toggle>
  </div>
  `
})

class ContainerComponent {
}

describe('Component: FeatureToggle', () => {

  const stub: any = {};
  let fixture: any;

  beforeEach(async () => {

    setConfigurationObject({ enableFirstText: true });

    fixture = TestBed.configureTestingModule({
      declarations: [ ContainerComponent, FeatureToggleComponent, FeatureToggleProviderComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .createComponent(ContainerComponent);
    fixture.detectChanges();
  });

  describe('When featureToggle is enabled', () => {
    it('should render the component content', () => {
      expect(fixture.nativeElement.querySelector('.first').innerText).toContain('Feature toggle enabled');
    });
  });

  describe('When featureToggle is disabled', () => {
    it('should NOT render the component content', () => {
      expect(fixture.nativeElement.querySelector('.second').innerText).toEqual('');
    });

    it('should update when feature toggle data change', () => {
      expect(fixture.nativeElement.querySelector('.first').innerText).not.toEqual('');

      setConfigurationObject({ enableFirstText: false });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.first').innerText).toEqual('');

    });

    it('should render the component content if it has `showWhenDisabled` attribute', () => {
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
