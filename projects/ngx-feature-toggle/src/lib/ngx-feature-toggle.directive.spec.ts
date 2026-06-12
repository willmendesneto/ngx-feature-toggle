import { ApplicationRef, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { evaluateFeatureToggle, FeatureTogglePredicate, setFeatureToggles } from './ngx-feature-toggle.util';
import { FeatureToggleDirective } from './ngx-feature-toggle.directive';

@Component({
  selector: 'kp-container',
  standalone: true,
  imports: [FeatureToggleDirective],
  template: `
    <div>
      <div class="feature-toggle-enabled" *featureToggle="'enableFirstText'">
        <p>Feature toggle enabled</p>
        <div
          class="feature-toggle-disabled"
          *featureToggle="'enableSecondText'"
        >
          Feature toggle disabled
        </div>

        <div
          class="feature-toggle-enabled-with-exclamation-mark"
          *featureToggle="'!enableFirstText'"
        >
          Feature toggle disabled since it's enabled and it has <b>!</b> at
          front.
        </div>

        <div
          class="feature-toggle-disabled-with-exclamation-mark"
          *featureToggle="'enableFirstText'"
        >
          Feature toggle enabled since it's disabled and it has <b>!</b> at
          front.
        </div>

        <div
          class="combined-feature-toggles-with-truthly-option"
          *featureToggle="['enableFirstText', '!enableSecondText']"
        >
          <p>
            This is a combined condition. It shows if <b>enableFirstText</b> is
            true and <b>enableSecondText</b> is falsy. If both cases are
            correct, then the "featureToggle" is enabled and rendering this
            component.
          </p>
        </div>

        <div
          class="combined-feature-toggles-with-falsy-option"
          *featureToggle="['enableFirstText', 'enableSecondText']"
        >
          <p>
            This is a combined condition, but the content should not be
            rendered. It shows if <b>enableFirstText</b> is and
            <b>enableSecondText</b> are true.
          </p>
        </div>
      </div>
    </div>
  `,
})
class ContainerComponent {}

describe('Component: FeatureToggle', () => {
  let fixture: ComponentFixture<ContainerComponent>;

  it('should evaluate feature toggles from the service', () => {
    setFeatureToggles({ enableFirstText: true });
    expect(evaluateFeatureToggle('enableFirstText')).toBeTruthy();
  });

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

  describe('When featureToggle is enabled', () => {
    it('should render the component content', () => {
      expect(
        fixture.nativeElement.querySelector('.feature-toggle-enabled').textContent
      ).toContain('Feature toggle enabled');
    });

    it('should NOT render the component content if feature toggle is enabled and it contains `!` as first string', () => {
      expect(
        fixture.nativeElement.querySelector(
          '.feature-toggle-enabled-with-exclamation-mark'
        )
      ).toEqual(null);
    });
  });

  describe('When featureToggle is disabled', () => {
    it('should NOT render the component content', () => {
      expect(
        fixture.nativeElement.querySelector('.feature-toggle-disabled')
      ).toEqual(null);
    });

    it('should update when feature toggle data change', () => {
      expect(
        fixture.nativeElement.querySelector('.feature-toggle-enabled').textContent
      ).not.toEqual(null);

      setFeatureToggles({ enableFirstText: false });
      fixture.destroy();
      fixture = TestBed.createComponent(ContainerComponent);
      fixture.detectChanges();
      TestBed.inject(ApplicationRef).tick();

      expect(fixture.nativeElement.querySelector('.feature-toggle-enabled')).toEqual(null);
    });

    it('should render the component content if feature toggle is disabled and it contains `!` as first string', () => {
      expect(
        fixture.nativeElement.querySelector(
          '.feature-toggle-disabled-with-exclamation-mark'
        ).textContent
      ).toContain(
        // tslint:disable-next-line: quotemark
        "Feature toggle enabled since it's disabled and it has ! at front"
      );
    });
  });

  describe('When featureToggle receives an array of features', () => {
    it('should render the component content if `enableFirstText` is true and `enableSecondText` is falsy', () => {
      const textContent = fixture.nativeElement.querySelector(
        '.combined-feature-toggles-with-truthly-option'
      ).textContent;

      expect(textContent).toContain(
        // tslint:disable-next-line: max-line-length
        'This is a combined condition. It shows if enableFirstText is true and enableSecondText is falsy. If both cases are correct, then the "featureToggle" is enabled and rendering this component.'
      );
    });

    it('should NOT render the component content if `enableFirstText` and `enableSecondText` are not truthly', () => {
      expect(
        fixture.nativeElement.querySelector(
          '.combined-feature-toggles-with-falsy-option'
        )
      ).toEqual(null);
    });
  });
});

@Component({
  selector: 'kp-callback-container',
  standalone: true,
  imports: [FeatureToggleDirective],
  template: `
    <div class="feature-toggle-callback-or" *featureToggle="myFn">
      <p>Callback OR feature toggle enabled</p>
    </div>
  `,
})
class CallbackContainerComponent {
  myFn: FeatureTogglePredicate = ({ isOn }) => isOn('enableFirstText') || isOn('enableSecondText');
}

describe('Component: FeatureToggle callback', () => {
  let fixture: ComponentFixture<CallbackContainerComponent>;

  beforeEach(async () => {
    setFeatureToggles({ enableFirstText: true, enableSecondText: false });

    await TestBed.configureTestingModule({
      imports: [CallbackContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CallbackContainerComponent);
    fixture.detectChanges();
    TestBed.inject(ApplicationRef).tick();
  });

  afterEach(() => {
    setFeatureToggles({ enableFirstText: false, enableSecondText: false });
  });

  describe('When featureToggle receives a callback', () => {
    it('should render the component content when callback returns true', () => {
      expect(fixture.nativeElement.querySelector('.feature-toggle-callback-or').textContent).toContain(
        'Callback OR feature toggle enabled',
      );
    });

    it('should NOT render the component content when callback returns false', () => {
      setFeatureToggles({ enableFirstText: false, enableSecondText: false });
      fixture.destroy();
      fixture = TestBed.createComponent(CallbackContainerComponent);
      fixture.detectChanges();
      TestBed.inject(ApplicationRef).tick();

      expect(fixture.nativeElement.querySelector('.feature-toggle-callback-or')).toEqual(null);
    });

    it('should update when feature toggle data changes', () => {
      expect(fixture.nativeElement.querySelector('.feature-toggle-callback-or')).not.toEqual(null);

      setFeatureToggles({ enableFirstText: false, enableSecondText: false });
      fixture.destroy();
      fixture = TestBed.createComponent(CallbackContainerComponent);
      fixture.detectChanges();
      TestBed.inject(ApplicationRef).tick();

      expect(fixture.nativeElement.querySelector('.feature-toggle-callback-or')).toEqual(null);
    });
  });
});
