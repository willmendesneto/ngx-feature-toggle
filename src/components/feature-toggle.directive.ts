import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { FeatureToggleServiceProvider } from './feature-toggle.provider';

@Directive({
  selector: '[featureToggle]'
})

export class FeatureToggleDirective implements OnInit {

  @Input() featureToggle: string;

  private isEnabled: boolean = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private featureToggleServiceProvider: FeatureToggleServiceProvider
  ) {}

  ngOnInit() {
    this.isEnabled = this.featureToggleServiceProvider.isOn(this.featureToggle);

    if (this.isEnabled) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
