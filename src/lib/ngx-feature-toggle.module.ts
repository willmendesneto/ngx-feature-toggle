import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureToggleProviderComponent } from './ngx-feature-toggle-provider.component';
import { FeatureToggleComponent } from './ngx-feature-toggle.component';

const ANGULAR_FEATURE_TOGGLE_DIRECTIVES: any[] = [
  FeatureToggleProviderComponent,
  FeatureToggleComponent
];

@NgModule({
  declarations: ANGULAR_FEATURE_TOGGLE_DIRECTIVES,
  exports: ANGULAR_FEATURE_TOGGLE_DIRECTIVES,
  imports: [ CommonModule ]
})

export class FeatureToggleModule { }
