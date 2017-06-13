import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FeatureToggleComponent } from '../components/feature-toggle.component';
import { FeatureToggleProviderComponent } from '../components/feature-toggle-provider.component';
import { FeatureToggleServiceProvider } from '../components/feature-toggle.provider';

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

  beforeEach(() => {
    stub.FeatureToggleServiceProvider = {
       isOn: (key: string) => key === 'enableFirstText'
    };

    fixture = TestBed.configureTestingModule({
      declarations: [ ContainerComponent, FeatureToggleComponent, FeatureToggleProviderComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [{
        provide: FeatureToggleServiceProvider,
        useValue: stub.FeatureToggleServiceProvider
      }]
    })
    .createComponent(ContainerComponent);
    fixture.detectChanges();
  });

  describe('When featureToggle is enabled', () => {
    it('should render the component content', () => {
      expect(fixture.nativeElement.querySelector('.first').innerText).toContain('Feature toggle enabled');
    });
  });

  describe('When featureToggle is enabled', () => {
    it('should NOT render the component content', () => {
      expect(fixture.nativeElement.querySelector('.second')).toBe(null);
    });
  });

  describe('When featureToggle is enabled', () => {
    it('should render the component content', () => {
      const textContent = fixture.nativeElement.querySelector('.third').innerText;
      expect(textContent).toContain('Feature toggle rendered when disabled');
    });
  });
});
