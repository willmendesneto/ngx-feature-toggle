import { NgModule } from '@angular/core';
import { FeatureToggleProviderComponent } from './ngx-feature-toggle-provider.component';
import { FeatureToggleDirective } from './ngx-feature-toggle.directive';

/**
 * @deprecated Import the standalone `FeatureToggleDirective` instead, and set the toggles via `provideFeatureToggles()`.
 */
@NgModule({
  imports: [FeatureToggleProviderComponent, FeatureToggleDirective],
  exports: [FeatureToggleProviderComponent, FeatureToggleDirective],
})
export class FeatureToggleModule {}
