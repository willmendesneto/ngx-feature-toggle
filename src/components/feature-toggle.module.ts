import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureToggleProviderComponent } from './feature-toggle-provider.component';
import { FeatureToggleComponent } from './feature-toggle.component';

const ANGULAR_FEATURE_TOGGLE_DIRECTIVES: any[] = [
  FeatureToggleProviderComponent,
  FeatureToggleComponent
];

const ANGULAR_FEATURE_TOGGLE_PROVIDERS: any[] = [
];

@NgModule({
  declarations: ANGULAR_FEATURE_TOGGLE_DIRECTIVES,
  exports: ANGULAR_FEATURE_TOGGLE_DIRECTIVES,
  providers: ANGULAR_FEATURE_TOGGLE_PROVIDERS,
  imports: [ CommonModule ]
})

export class FeatureToggleModule { }
