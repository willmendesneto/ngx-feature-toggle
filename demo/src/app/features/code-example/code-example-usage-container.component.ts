/* tslint:disable */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'code-example-usage-container',
  template: `
<section>
  <h3>Instalation and usage</h3>
  <p>You can get it on NPM installing ngx-feature-toggle module as a project dependency.</p>
  <code-example [source]="source"></code-example>
  <br>
  <hr>
</section>
  `
})

export class CodeExampleUsageContainerComponent {
  @Input() source: string = '';
}
