import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync as asyncMethod } from '@angular/core/testing';
import { FeatureToggleProviderComponent } from './ngx-feature-toggle-provider.component';
import { FeatureToggleDirective } from './ngx-feature-toggle.directive';
import { set, FeatureToggleServiceConfig } from 'feature-toggle-service';

@Component({
  selector: 'kp-container',
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
  let fixture: any;
  let nativeElement: any;
  const stub: any = {};

  beforeEach(
    asyncMethod(() => {
      set({ enableFirstText: true });

      fixture = TestBed.configureTestingModule({
        declarations: [ContainerComponent, FeatureToggleProviderComponent, FeatureToggleDirective],
        schemas: [NO_ERRORS_SCHEMA],
      }).createComponent(ContainerComponent);
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
    }),
  );

  afterEach(() => {
    set({ enableFirstText: false });
  });

  it('should render the enabled children content', () => {
    const elementText = fixture.nativeElement.querySelectorAll('.feature-toggle-component')[0].innerText;
    expect(elementText).toContain('Enabled content');
  });

  it('should NOT render the disabled content', () => {
    const elementText = fixture.nativeElement.querySelectorAll('.feature-toggle-component')[0].innerText;
    expect(elementText).not.toContain('Disabled content');
  });
});
