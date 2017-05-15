import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FeatureToggleDirective } from '../components/feature-toggle.directive';
import { FeatureToggleServiceProvider } from '../components/feature-toggle.provider';

@Component({
  selector: 'kp-container',
  template: `
  <div>
    <div class="feature-toggle-component" *featureToggle="'enableFirstText'">
      <p>Feature toggle enabled</p>
      <div class="feature-toggle-component" *featureToggle="'enableSecondText'">Feature toggle disabled</div>
    </div>
  </div>
  `
})

class ContainerComponent {
}

describe('Directive: FeatureToggle', () => {

  let stub: any = {};
  let fixture: any;

  beforeEach(() => {
    stub.FeatureToggleServiceProvider = {
       isOn: (key) => key == 'enableFirstText'
    };

    fixture = TestBed.configureTestingModule({
      declarations: [ ContainerComponent, FeatureToggleDirective ],
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
    it('should render the component content', async(() => {
      expect(fixture.nativeElement.querySelectorAll('.feature-toggle-component')[0].innerText).toBe('Feature toggle enabled');
    }));
  });

  describe('When featureToggle is enabled', () => {
    it('should NOT render the component content', async(() => {
      expect(fixture.nativeElement.querySelectorAll('.feature-toggle-component')[1]).toBe(undefined);
    }));
  });
});
