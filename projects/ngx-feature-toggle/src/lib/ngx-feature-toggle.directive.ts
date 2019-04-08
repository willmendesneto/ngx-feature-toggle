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
  selector: '[featureToggle]',
})

export class FeatureToggleDirective implements OnInit, DoCheck {

  @Input() public featureToggle: string;
  private isOn = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    if (!this.featureToggle) {
      throw new Error('Attribute `featureToggle` should not be null or empty');
    }
    this.shouldRender();
  }

  ngDoCheck() {
    if (this.isOn !== isOn(this.featureToggle)) {
      this.shouldRender();
    }
  }

  private shouldRender() {
    this.isOn = isOn(this.featureToggle);
    if (this.isOn) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
