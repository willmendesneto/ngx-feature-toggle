/* tslint:disable */
import { Component } from '@angular/core';

@Component({
  selector: 'code-example-setup-container',
  template: `
<section>
  <h3>Setup</h3>

  <p>You'll need to add FeatureToggleModule to your application module. So that, the featureToggle directive will be accessible in your application.</p>

  <p>Now you just need to add a configuration in your application root component. Your feature toggle configuration can be added using different approaches, such as:</p>

  <ul>
    <li>RXJS subscribe information;</li>
    <li>HTTP Request;</li>
    <li>CQRS event data;</li>
    <li>File information;</li>
    <li>etc;</li>
  </ul>

  <p>After that, you can use the featureToggle directive in your templates, passing the string based on the feature toggle configuration data.</p>

  <h4>HTML</h4>
  <p>Inside your main component, add the information into the FeatureToggleServiceProvider and add this information by key information provided for your service.</p>
  <p><b>*</b> for more details, please see <a href="https://github.com/pleerock/ngx-progress-bar/tree/master/demo/src/app/app.module.ts">demo folder in Github repository</a></p>

</section>
  `
})

export class CodeExampleSetupContainerComponent {
}
