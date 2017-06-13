/* tslint:disable */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'code-example-main-container',
  template: `
<main>
  <md-card class="container">
    <feature-toggle-provider [featureToggleService]="featureToggleData">
      <code-example-about-container></code-example-about-container>
      <code-example-usage-container
        [source]="npmInstallSource"
        >
      </code-example-usage-container>
      <code-example-setup-container></code-example-setup-container>
      <code-example-live-container
        [featureToggleData]="featureToggleData"
        [ts]="moduleIntegrationSource"
        [html]="componentIntegrationSource"
        >
      </code-example-live-container>
    </feature-toggle-provider>
  </md-card>
</main>
  `
})

export class CodeExampleMainContainerComponent {
  @Input() featureToggleData: any = {};
  @Input() npmInstallSource: string = '';
  @Input() moduleIntegrationSource: string = '';
  @Input() componentIntegrationSource: string = '';
}
