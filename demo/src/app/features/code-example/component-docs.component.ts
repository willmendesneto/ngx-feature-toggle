/* tslint:disable */
import { Component } from '@angular/core';

@Component({
  selector: 'component-docs',
  template: `
<code-example-header-container></code-example-header-container>
<code-example-main-container
  [featureToggleData]="featureToggleData"
  [npmInstallSource]="getNPMInstallSource()"
  [moduleIntegrationSource]="getModuleIntegrationSource()"
  [componentIntegrationSource]="getComponentIntegrationSource()"
  >
</code-example-main-container>
<code-example-footer-container></code-example-footer-container>
`
})

export class ComponentDocsComponent {
  public featureToggleData: any = {
    enableFirstText: false,
    enableSecondText: true
  };

  getNPMInstallSource(): string {
return `
$ npm install --save ngx-feature-toggle
`;
  }

  getModuleIntegrationSource(): string {
return `
import { FeatureToggleModule } from 'ngx-feature-toggle';
...
@NgModule({
  ...
  declarations: [
    YourAppComponent
  ],
  imports: [ FeatureToggleModule ],
  bootstrap: [YourAppComponent]
  ...
})

export class YourAppComponent {
}
...
`;
  }

  getComponentIntegrationSource(): string {
    return `
<feature-toggle [featureName]="'enableSecondText'">
  <p>condition is true and \`featureToggle\` is enabled.</p>
  <feature-toggle [featureName]="'enableFirstText'">
    <p>condition is false and \`featureToggle\` is disabled.</p>
    <p>In that case this content should not be rendered.</p>
  </feature-toggle>
  <feature-toggle [featureName]="'enableFirstText'" showWhenDisabled >
    <p>condition is false and \`featureToggle\` is disabled and it has \`showWhenDisabled\` attribute.</p>
    <p>In that case this content should be rendered.</p>
  </feature-toggle>
</feature-toggle>
`;

  }
}
