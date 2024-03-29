import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, DoCheck, isDevMode } from '@angular/core';

import { isOn } from 'feature-toggle-service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[featureToggle]',
})
export class FeatureToggleDirective implements OnInit, DoCheck {
  @Input() public featureToggle: string[] | string | undefined;
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

  isOnCheck(featureToggle: string[] | string | undefined) {
    if (typeof featureToggle !== 'string' && !Array.isArray(featureToggle)) {
      if (isDevMode()) {
        console.error('`NgxFeatureToggle`: `featureToggle` should receive an array or an string as a value.');
      }
      return false;
    }

    return ([].concat(featureToggle as any) as string[]).every(toggle =>
      toggle[0] === '!' ? !isOn(toggle.replace('!', '')) : isOn(toggle),
    );
  }
}
