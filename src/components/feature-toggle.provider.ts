import { Injectable } from '@angular/core';

@Injectable()
export class FeatureToggleServiceProvider {
  private settings: any = {};

  isOn(key: string): boolean {
    return !!this.settings[key];
  }

  isOff(key: string): boolean {
    return !this.isOn(key);
  }

  setConfigurationObject(obj: {}): void {
    this.settings = obj;
  }
}
