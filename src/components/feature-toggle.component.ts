import {
  Component,
  Input,
  OnInit,
  ElementRef
} from '@angular/core';

import { FeatureToggleServiceProvider } from './feature-toggle.provider';

@Component({
  selector: 'feature-toggle',
  template: '<ng-content></ng-content>'
})

export class FeatureToggleComponent implements OnInit {

  @Input() featureName: string;

  private isEnabled = false;

  constructor(
    private el: ElementRef,
    private featureToggleServiceProvider: FeatureToggleServiceProvider
  ) {}

  ngOnInit() {
    if (!this.featureName) {
      throw new Error('Attribute `featureName` should not be null or empty');
    }

    const showWhenDisabled = this.el.nativeElement.getAttribute('showWhenDisabled') !== null;
    this.isEnabled = this.featureToggleServiceProvider.isOn(this.featureName);

    const toggleState = this.featureToggleServiceProvider.isOn(this.featureName);
    this.isEnabled = toggleState === !showWhenDisabled;
    if (!this.isEnabled) {
      this.el.nativeElement.remove();
    }
  }
}
