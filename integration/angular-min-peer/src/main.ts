import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import {
  FeatureToggleDirective,
  FeatureTogglePredicate,
  FeatureToggleProviderComponent,
  FeatureToggleServiceConfig,
  NgxFeatureToggleRouteGuard,
  setFeatureToggles,
} from 'ngx-feature-toggle';

const toggles: FeatureToggleServiceConfig = { enableHeader: true, enableBeta: false };
const isBetaOrHeader: FeatureTogglePredicate = ({ isOn }) => isOn('enableBeta') || isOn('enableHeader');

setFeatureToggles(toggles);

// Uses the public API of the package, compiled with `strictTemplates`
@Component({
  selector: 'app-root',
  imports: [FeatureToggleProviderComponent, FeatureToggleDirective],
  template: `
    <feature-toggle-provider [features]="toggles">
      <h1 *featureToggle="'enableHeader'">Header</h1>
      <p *featureToggle="['enableHeader', '!enableBeta']">Stable</p>
      <p *featureToggle="isBetaOrHeader">Callback</p>
    </feature-toggle-provider>
  `,
})
class AppComponent {
  toggles = toggles;
  isBetaOrHeader = isBetaOrHeader;
}

const routes: Routes = [
  {
    path: 'beta',
    component: AppComponent,
    canMatch: [NgxFeatureToggleRouteGuard],
    canActivate: [NgxFeatureToggleRouteGuard],
    data: { featureToggle: ['enableBeta'], redirectTo: '/' },
  },
];

bootstrapApplication(AppComponent, { providers: [provideRouter(routes)] });
