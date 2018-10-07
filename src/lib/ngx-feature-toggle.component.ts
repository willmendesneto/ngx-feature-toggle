import { Component, Input, OnInit, ElementRef, NgZone, DoCheck } from '@angular/core';

import { isOn } from 'feature-toggle-service';

@Component({
  selector: 'feature-toggle',
  template: '<ng-content *ngIf="shouldRender()"></ng-content>',
})
export class FeatureToggleComponent implements DoCheck, OnInit {
  @Input()
  featureName: string;

  constructor(private _el: ElementRef, private _zone: NgZone) {}

  ngOnInit() {
    if (!this.featureName) {
      throw new Error('Attribute `featureName` should not be null or empty');
    }
    this.shouldRender();
  }

  ngDoCheck() {
    this._zone.runOutsideAngular(() => {
      this.shouldRender();
    });
  }

  shouldRender() {
    const showWhenDisabled = this._el.nativeElement.getAttribute('showWhenDisabled') !== null;
    const toggleState = isOn(this.featureName);

    return toggleState === !showWhenDisabled;
  }
}
