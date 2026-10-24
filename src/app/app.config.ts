import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideFeatureToggles } from 'ngx-feature-toggle';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideFeatureToggles({
      enableFirstText: true,
      enableSecondText: true,
      enableCustomerPage: true,
      enableChildrenNavigation: false,
    }),
  ],
};
