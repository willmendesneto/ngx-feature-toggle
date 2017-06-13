/* tslint:disable */
import { Component } from '@angular/core';

@Component({
  selector: 'code-example-about-container',
  template: `
<section>
  <h3>Why Feature toggle?</h3>
  <p cite="">
    This is a common concept, but why use this directive instead solve it via server-side rendering?
  </p>
  <p>The idea of this directive is make this process transparent and easier. So the main point is integrate this directive with other tooling process, such as:</p>
  <ul>
    <li>Server-side rendering;</li>
    <li>Progressive rendering;</li>
    <li>Any other that yoy like :)</li>
  </ul>
  <p>You can integrate with WebSockets or handling this in a EventSourcing architecture. It's totally transparent for you and you can integrate easier in your application</p>
  <br>
  <hr>
</section>
  `
})

export class CodeExampleAboutContainerComponent {
}
