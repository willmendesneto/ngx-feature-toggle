import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureToggleProviderComponent } from './ngx-feature-toggle-provider.component';
import { FeatureToggleComponent } from './ngx-feature-toggle.component';

@NgModule({
  declarations: [
    FeatureToggleProviderComponent,
    FeatureToggleComponent
  ],
  exports: [
    FeatureToggleProviderComponent,
    FeatureToggleComponent
  ],
  imports: [ CommonModule ]
})

export class FeatureToggleModule { }
