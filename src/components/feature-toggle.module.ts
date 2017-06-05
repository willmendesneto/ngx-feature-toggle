import { NgModule } from '@angular/core';

import { FeatureToggleProvider } from './feature-toggle-provider.component';
import { FeatureToggleServiceProvider } from './feature-toggle.provider';
import { FeatureToggleComponent } from './feature-toggle.component';

const ANGULAR_FEATURE_TOGGLE_DIRECTIVES: any[] = [
  FeatureToggleProvider,
  FeatureToggleComponent
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
