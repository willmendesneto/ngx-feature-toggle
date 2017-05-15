import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'example-app',
  template: `
    <div class="examples">
      <component-docs></component-docs>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class DemoComponent {
}
