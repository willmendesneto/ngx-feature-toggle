import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { FeatureToggleServiceProvider } from './feature-toggle.provider';

@Component({
  selector: 'feature-toggle-provider',
  template: `<ng-content></ng-content>`
})

export class FeatureToggleProvider implements OnInit {

  @Input() featureToggleService: any = {};

  constructor(
    private featureToggleServiceProvider: FeatureToggleServiceProvider
  ) {}

  ngOnInit() {
    if (typeof this.featureToggleService !== 'object') {
      throw new Error('Attribute `featureToggleService` should not be null or empty');
    }

    this.featureToggleServiceProvider.setConfigurationObject(
      this.featureToggleService
    );
  }
}
