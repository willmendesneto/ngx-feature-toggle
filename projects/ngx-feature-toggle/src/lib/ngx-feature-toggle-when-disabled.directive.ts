import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  DoCheck,
} from '@angular/core';

import { isOn } from 'feature-toggle-service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[featureToggleWhenDisabled]',
})

export class FeatureToggleWhenDisabledDirective implements OnInit, DoCheck {

  @Input() public featureToggleWhenDisabled: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    if (!this.featureToggleWhenDisabled) {
      throw new Error('Attribute `featureToggleWhenDisabled` should not be null or empty');
    }
    this.shouldRender();
  }

  ngDoCheck() {
    this.shouldRender();
  }

  shouldRender() {
    if (!isOn(this.featureToggleWhenDisabled)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
