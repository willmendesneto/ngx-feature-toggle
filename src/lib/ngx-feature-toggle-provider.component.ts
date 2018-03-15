import {
  Component,
  Input,
  OnInit,
  DoCheck
} from '@angular/core';
import { setConfigurationObject } from 'feature-toggle-service';

@Component({
  selector: 'feature-toggle-provider',
  template: `<ng-content></ng-content>`
})

export class FeatureToggleProviderComponent implements DoCheck, OnInit {

  @Input() features: { [k: string]: any; } = {};

  private currentConfig: any = {};

  ngOnInit() {
    if (typeof this.features !== 'object') {
      throw new Error('Attribute `featureToggleService` should not be null or empty');
    }
    this.setFeatureToggles();
  }

  ngDoCheck() {
    const shouldUpdateFeatureToggles = this.currentConfig !== this.features;
    if (shouldUpdateFeatureToggles) {
      this.setFeatureToggles();
    }
  }

  private setFeatureToggles() {
    this.currentConfig = this.features;
    setConfigurationObject(
      this.features
    );
  }
}
