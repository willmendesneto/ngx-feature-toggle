import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, DoCheck, isDevMode } from '@angular/core';

import { evaluateFeatureToggle, FeatureToggleConfig, isValidFeatureToggleConfig } from './ngx-feature-toggle.util';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[featureToggle]',
})
export class FeatureToggleDirective implements OnInit, DoCheck {
  @Input() public featureToggle: FeatureToggleConfig | undefined;
  private isOn = false;

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

  ngOnInit() {
    if (!this.featureToggle) {
      throw new Error('Attribute `featureToggle` should not be null or empty');
    }
    this.shouldRender();
  }

  ngDoCheck() {
    if (this.isOn !== this.isOnCheck(this.featureToggle)) {
      this.shouldRender();
    }
  }

  private shouldRender() {
    this.isOn = this.isOnCheck(this.featureToggle);
    if (this.isOn) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  isOnCheck(featureToggle: FeatureToggleConfig | undefined) {
    if (!isValidFeatureToggleConfig(featureToggle)) {
      if (isDevMode()) {
        console.error(
          '`NgxFeatureToggle`: `featureToggle` should receive a string, an array, or a function as a value.',
        );
      }
      return false;
    }

    return evaluateFeatureToggle(featureToggle);
  }
}
