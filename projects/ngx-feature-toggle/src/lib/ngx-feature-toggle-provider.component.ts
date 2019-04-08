import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { set } from 'feature-toggle-service';

@Component({
  selector: 'feature-toggle-provider',
  template: `
    <ng-content></ng-content>
  `,
})
export class FeatureToggleProviderComponent implements DoCheck, OnInit {
  @Input()
  features: { [k: string]: any } = {};

  private currentConfig: { [k: string]: any } = {};

  ngOnInit() {
    if (typeof this.features !== 'object') {
      throw new Error('Attribute `features` should not be null or empty');
    }
    this.setFeatureToggles();
  }

  ngDoCheck() {
    this.setFeatureToggles();
  }

  private setFeatureToggles() {
    if (this.currentConfig !== this.features) {
      this.currentConfig = this.features;
      set(this.features);
    }
  }
}
