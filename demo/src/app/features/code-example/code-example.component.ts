/* tslint:disable */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'code-example',
  template: `
    <pre><code>{{ source }}</code></pre>
  `
})

export class CodeExampleComponent {
  @Input() source: string = '';
}
