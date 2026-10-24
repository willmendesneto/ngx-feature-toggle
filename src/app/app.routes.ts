import { Routes } from '@angular/router';
import { featureToggleGuard, FeatureTogglePredicate } from 'ngx-feature-toggle';
import { CallbackDemoComponent } from './callback-demo/callback-demo.component';
import { CustomerDetailComponent } from './customer/customer-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { RestrictPageDueFeatureToggleComponent } from './restrict-page-due-feature-toggle/restrict-page-due-feature-toggle.component';

const callbackDemoGuard: FeatureTogglePredicate = ({ isOn }) => isOn('enableFirstText') || isOn('enableSecondText');

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canMatch: [featureToggleGuard],
    canActivate: [featureToggleGuard],
    data: {
      featureToggle: ['enableSecondText'],
      redirectTo: '/error',
    },
  },
  {
    path: 'restrict',
    component: RestrictPageDueFeatureToggleComponent,
    canActivate: [featureToggleGuard],
    data: {
      featureToggle: ['!enableSecondText'],
      redirectTo: '/error',
    },
  },
  {
    path: 'callback-demo',
    component: CallbackDemoComponent,
    canActivate: [featureToggleGuard],
    data: {
      featureToggle: callbackDemoGuard,
      redirectTo: '/error',
    },
  },
  {
    path: 'error',
    component: ErrorComponent,
    canActivate: [featureToggleGuard],
    data: {
      featureToggle: ['enableFirstText'],
    },
  },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [featureToggleGuard],
    canActivateChild: [featureToggleGuard],
    data: {
      featureToggle: ['enableCustomerPage'],
      redirectTo: '/error',
    },
    children: [
      {
        path: ':id',
        component: CustomerDetailComponent,
        data: {
          featureToggle: ['enableCustomerPage', '!enableChildrenNavigation'],
          redirectTo: '/error',
        },
      },
    ],
  },
  { path: '**', redirectTo: '/home' },
];
