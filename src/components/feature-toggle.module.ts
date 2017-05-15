import { NgModule } from '@angular/core';

import { FeatureToggleDirective } from './feature-toggle.directive';
import { FeatureToggleServiceProvider } from './feature-toggle.provider';

const ANGULAR_FEATURE_TOGGLE_DIRECTIVES: any[] = [
  FeatureToggleDirective
];

const ANGULAR_FEATURE_TOGGLE_PROVIDERS: any[] = [
  FeatureToggleServiceProvider
];

@NgModule({
  declarations: ANGULAR_FEATURE_TOGGLE_DIRECTIVES,
  exports: ANGULAR_FEATURE_TOGGLE_DIRECTIVES,
  providers: ANGULAR_FEATURE_TOGGLE_PROVIDERS
})

export class FeatureToggleModule { }
