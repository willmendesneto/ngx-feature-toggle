import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureToggleProviderComponent } from './ngx-feature-toggle-provider.component';
import { FeatureToggleDirective } from './ngx-feature-toggle.directive';

@NgModule({
  declarations: [FeatureToggleProviderComponent, FeatureToggleDirective],
  exports: [FeatureToggleProviderComponent, FeatureToggleDirective],
  imports: [CommonModule],
})
export class FeatureToggleModule {}
