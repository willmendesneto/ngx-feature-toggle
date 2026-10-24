import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { FeatureToggleServiceConfig, setFeatureToggles } from './ngx-feature-toggle.util';

@Component({
  selector: 'feature-toggle-provider',
  template: '<ng-content></ng-content>',
  standalone: true,
})
export class FeatureToggleProviderComponent implements DoCheck, OnInit {
  @Input()
  features: FeatureToggleServiceConfig = {};

  // Serialized `features` applied last time, so `ngDoCheck` only calls `set()`
  // when the values change, including mutations of the same object
  private appliedFeatures: string | undefined;

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
    const features = JSON.stringify(this.features);
    if (this.appliedFeatures !== features) {
      this.appliedFeatures = features;
      setFeatureToggles(this.features);
    }
  }
}
