import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureToggleProviderComponent } from './ngx-feature-toggle-provider.component';
import { FeatureToggleDirective } from './ngx-feature-toggle.directive';
import { FeatureToggleWhenDisabledDirective } from './ngx-feature-toggle-when-disabled.directive';

@NgModule({
  declarations: [FeatureToggleProviderComponent, FeatureToggleDirective, FeatureToggleWhenDisabledDirective],
  exports: [FeatureToggleProviderComponent, FeatureToggleDirective, FeatureToggleWhenDisabledDirective],
  imports: [CommonModule],
})
export class FeatureToggleModule { }
