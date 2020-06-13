import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  DoCheck,
  isDevMode,
} from '@angular/core';

import { isOn } from 'feature-toggle-service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[featureToggleWhenDisabled]',
})
export class FeatureToggleWhenDisabledDirective implements OnInit, DoCheck {
  @Input() public featureToggleWhenDisabled: string[] | string;
  private isOff = true;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    if (!this.featureToggleWhenDisabled) {
      throw new Error(
        'Attribute `featureToggleWhenDisabled` should not be null or empty'
      );
    }
    this.shouldRender();
  }

  ngDoCheck() {
    if (this.isOff !== this.isOnCheck(this.featureToggleWhenDisabled)) {
      this.shouldRender();
    }
  }

  shouldRender() {
    this.isOff = this.isOnCheck(this.featureToggleWhenDisabled);
    if (this.isOff) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  isOnCheck(featureToggle: string[] | string) {
    const DEV_MODE = isDevMode();

    const isFeatureToggleOff = (toggle) =>
      toggle[0] === '!' ? isOn(toggle.replace('!', '')) : !isOn(toggle);

    if (typeof featureToggle === 'string') {
      return isFeatureToggleOff(featureToggle as string);
    } else if (Array.isArray(featureToggle)) {
      return (featureToggle as string[]).every(isFeatureToggleOff);
    } else if (DEV_MODE) {
      console.error(
        '`NgxFeatureToggle`: `featureToggleWhenDisabled` should receive an array or an string as a value.'
      );
    }
  }
}
