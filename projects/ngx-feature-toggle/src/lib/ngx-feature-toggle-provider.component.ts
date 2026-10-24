import { Component, Input, OnInit, DoCheck, inject } from '@angular/core';
import { FeatureToggleService } from './ngx-feature-toggle.service';
import { FeatureToggleServiceConfig } from './ngx-feature-toggle.util';

/**
 * @deprecated Use `provideFeatureToggles()` when bootstrapping, or `FeatureToggleService.set()`.
 */
@Component({
  selector: 'feature-toggle-provider',
  template: '<ng-content></ng-content>',
})
export class FeatureToggleProviderComponent implements DoCheck, OnInit {
  @Input()
  features: FeatureToggleServiceConfig = {};

  readonly #service = inject(FeatureToggleService);

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
      this.#service.set(this.features);
    }
  }
}
