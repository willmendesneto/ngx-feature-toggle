/*
 * Public API Surface of ngx-feature-toggle
 */

export { FeatureToggleModule } from './lib/ngx-feature-toggle.module';
export { FeatureToggleProviderComponent } from './lib/ngx-feature-toggle-provider.component';
export { FeatureToggleDirective } from './lib/ngx-feature-toggle.directive';
export { NgxFeatureToggleRouteGuard } from './lib/ngx-feature-toggle-route-guard.router';
export {
  FeatureToggleServiceConfig,
  FeatureTogglePredicate,
  setFeatureToggles,
} from './lib/ngx-feature-toggle.util';
