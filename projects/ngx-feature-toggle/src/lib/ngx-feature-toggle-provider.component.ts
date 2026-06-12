import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { FeatureToggleServiceConfig, setFeatureToggles } from './ngx-feature-toggle.util';

@Component({
  selector: 'feature-toggle-provider',
  template: '<ng-content></ng-content>',
})
export class FeatureToggleProviderComponent implements DoCheck, OnInit {
  @Input()
  features: FeatureToggleServiceConfig = {};

  private currentConfig: FeatureToggleServiceConfig = {};

  ngOnInit() {
    if (typeof this.features !== 'object') {
      throw new Error('Attribute `features` should not be null or empty');
    }
    this.applyFeatureToggles();
  }

  ngDoCheck() {
    this.applyFeatureToggles();
  }

  private applyFeatureToggles() {
    if (this.currentConfig !== this.features) {
      // Using `Object.assign()` method for bundle size decreasing purposes
      // It's required since it needs a new memory reference
      // for the new object value
      this.currentConfig = Object.assign({}, this.features);
      setFeatureToggles(this.features);
    }
  }
}
