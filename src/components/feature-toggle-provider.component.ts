import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { setConfigurationObject } from 'feature-toggle-service';

@Component({
  selector: 'feature-toggle-provider',
  template: `<ng-content></ng-content>`
})

export class FeatureToggleProviderComponent implements OnInit {

  @Input() featureToggleService: any = {};

  ngOnInit() {
    if (typeof this.featureToggleService !== 'object') {
      throw new Error('Attribute `featureToggleService` should not be null or empty');
    }

    setConfigurationObject(
      this.featureToggleService
    );
  }
}
