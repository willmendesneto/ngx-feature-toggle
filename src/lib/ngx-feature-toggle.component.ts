import {
  Component,
  Input,
  OnInit,
  ElementRef,
  NgZone,
  DoCheck
} from '@angular/core';

import { isOn } from 'feature-toggle-service';

@Component({
  selector: 'feature-toggle',
  template: '<ng-content *ngIf="isEnabled"></ng-content>'
})

export class FeatureToggleComponent implements DoCheck, OnInit {
  @Input() featureName: string;

  isEnabled = false;

  constructor(
    private _el: ElementRef,
    private _zone: NgZone
  ) {}

  ngOnInit() {
    if (!this.featureName) {
      throw new Error('Attribute `featureName` should not be null or empty');
    }
    this.checkIfContentShouldBeRendered();
  }

  ngDoCheck() {
    this._zone.runOutsideAngular(() => {
      this.checkIfContentShouldBeRendered();
    });
  }

  private checkIfContentShouldBeRendered() {
    const showWhenDisabled = this._el.nativeElement.getAttribute('showWhenDisabled') !== null;
    const toggleState = isOn(this.featureName);

    this.isEnabled = toggleState === !showWhenDisabled;
  }
}
