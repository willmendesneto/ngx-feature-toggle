/* tslint:disable */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'code-example-live-container',
  template: `
<section>
  <br>
  <mat-card class="code-example-tab-container">
    <h2>Example</h2>
    <mat-tab-group>
      <mat-tab label="Typescript">
        <code-example [source]="ts"></code-example>
      </mat-tab>
      <mat-tab label="HTML">
        <code-example [source]="html"></code-example>
      </mat-tab>
      <mat-tab label="Live code">
        <br>
        <p>Feature Toggle Configuration Data: </p>
        <p><b>{{ featureToggleData | json }}</b></p>
        <hr>
        <feature-toggle [featureName]="'enableSecondText'">
          <p>condition is true and \`featureToggle\` is enabled.</p>
          <feature-toggle [featureName]="'enableFirstText'">
            <p>condition is false and \`featureToggle\` is disabled. In that case this content should not be rendered.</p>
          </feature-toggle>
          <feature-toggle [featureName]="'enableFirstText'" showWhenDisabled >
            <p>condition is false and \`featureToggle\` is disabled and it has \`showWhenDisabled\` attribute. In that case this content should be rendered.</p>
          </feature-toggle>
        </feature-toggle>
      </mat-tab>
    </mat-tab-group>
  </mat-card>
</section>
  `
})

export class CodeExampleLiveContainerComponent {
  @Input() featureToggleData: any = {};
  @Input() ts: string = '';
  @Input() html: string = '';
}
