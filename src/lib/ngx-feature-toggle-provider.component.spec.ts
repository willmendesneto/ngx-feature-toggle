import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FeatureToggleProviderComponent } from './ngx-feature-toggle-provider.component';
import { FeatureToggleComponent } from './ngx-feature-toggle.component';
import { setConfigurationObject } from 'feature-toggle-service';

@Component({
  selector: 'kp-container',
  template: `
  <div>
    <feature-toggle-provider [features]="featureToggleData">
      <feature-toggle
        class="feature-toggle-component"
        [featureName]="'enableFirstText'">
        <p>Enabled content</p>
        <feature-toggle
          class="feature-toggle-component"
          [featureName]="'enableSecondText'">
          Disabled content
        </feature-toggle>
      </feature-toggle>
    </feature-toggle-provider>
  </div>
  `
})

class ContainerComponent {
  featureToggleData: any = {
    enableFirstText: true,
    enableSecondText: false
  };
}

describe('Component: FeatureToggleProviderComponent', () => {

  let fixture: any;
  let nativeElement: any;
  const stub: any = {};

  beforeEach(async () => {
    setConfigurationObject({ enableFirstText: true });

    fixture = TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        FeatureToggleProviderComponent,
        FeatureToggleComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .createComponent(ContainerComponent);
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should render the enabled children content', () => {
    const elementText = fixture
                          .nativeElement
                          .querySelectorAll('.feature-toggle-component')[0].innerText;
    expect(elementText).toContain('Enabled content');
  });

  it('should NOT render the disabled content', () => {
    const elementText = fixture
                          .nativeElement
                          .querySelectorAll('.feature-toggle-component')[0].innerText;
    expect(elementText).not.toContain('Disabled content');
  });

});
