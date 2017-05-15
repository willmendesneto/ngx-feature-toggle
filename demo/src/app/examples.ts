/* tslint:disable */
import { Component } from '@angular/core';
import { FeatureToggleServiceProvider } from 'ngx-feature-toggle';

@Component({
  selector: 'component-docs',
  templateUrl: './templates/component-docs.html'
})

export class ComponentDocsComponent {
  public featureToggleData: any = {
    enableFirstText: false,
    enableSecondText: true
  };

  public constructor(
    private featureToggleServiceProvider:FeatureToggleServiceProvider
  ) {
    featureToggleServiceProvider.setConfigurationObject(this.featureToggleData);
  }
}

export const EXAMPLES:any[] = [
  ComponentDocsComponent
];
