import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxFeatureToggleRouteGuard } from '../../projects/ngx-feature-toggle/src/lib/ngx-feature-toggle-route-guard.router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { set } from 'feature-toggle-service';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer/customer-detail.component';
import { RestrictPageDueFeatureToggleComponent } from './restrict-page-due-feature-toggle/restrict-page-due-feature-toggle.component';

set({
  enableFirstText: true,
  enableSecondText: true,
  enableCustomerPage: true,
  enableChildrenNavigation: false,
});

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canLoad: [NgxFeatureToggleRouteGuard],
    canActivate: [NgxFeatureToggleRouteGuard],
    data: {
      featureToggle: ['enableSecondText'],
      redirectTo: '/error',
    },
  },
  {
    path: 'restrict',
    component: RestrictPageDueFeatureToggleComponent,
    canActivate: [NgxFeatureToggleRouteGuard],
    data: {
      featureToggle: ['!enableSecondText'],
      redirectTo: '/error',
    },
  },
  {
    path: 'error',
    component: ErrorComponent,
    canActivate: [NgxFeatureToggleRouteGuard],
    data: {
      featureToggle: ['enableFirstText'],
    },
  },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [NgxFeatureToggleRouteGuard],
    canActivateChild: [NgxFeatureToggleRouteGuard],
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
