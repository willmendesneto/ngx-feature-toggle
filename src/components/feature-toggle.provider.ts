import { Injectable } from '@angular/core';

const FeatureToggleService = require('feature-toggle-service');
const featureToggleService = new FeatureToggleService();

@Injectable()
export class FeatureToggleServiceProvider {
  isOn(key: string): boolean {
    return featureToggleService.isOn(key);
  }

  isOff(key: string): boolean {
    return featureToggleService.isOff(key);
  }

  setConfigurationObject(obj: {}): void {
    return featureToggleService.setConfigurationObject(obj);
  }
}
