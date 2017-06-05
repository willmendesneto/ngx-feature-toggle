/* tslint:disable */
import { Component } from '@angular/core';

@Component({
  selector: 'component-docs',
  templateUrl: './templates/component-docs.html'
})

export class ComponentDocsComponent {
  public featureToggleData: any = {
    enableFirstText: false,
    enableSecondText: true
  };
}

export const EXAMPLES:any[] = [
  ComponentDocsComponent
];
