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

  @Input() featureToggleService: any = {};
  private currentConfig: any = {};

  ngOnInit() {
    if (typeof this.featureToggleService !== 'object') {
      throw new Error('Attribute `featureToggleService` should not be null or empty');
    }
    this.setFeatureToggles();
  }

  ngDoCheck() {
    const shouldUpdateFeatureToggles = this.currentConfig !== this.featureToggleService;
    if (shouldUpdateFeatureToggles) {
      this.setFeatureToggles();
    }
  }

  private setFeatureToggles() {
    this.currentConfig = this.featureToggleService;
    setConfigurationObject(
      this.featureToggleService
    );
  }
}
