import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxFeatureToggleCanActivateGuard } from '../../projects/ngx-feature-toggle/src/lib/ngx-feature-toggle-can-activate-guard.router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { set } from 'feature-toggle-service';
// tslint:disable-next-line: max-line-length
import { NgxFeatureToggleCanActivateChildGuard } from '../../projects/ngx-feature-toggle/src/lib/ngx-feature-toggle-can-activate-child-guard.router';
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
    canActivate: [NgxFeatureToggleCanActivateGuard],
    data: {
      featureToggle: ['enableSecondText'],
      redirectTo: '/error',
    },
  },
  {
    path: 'restrict',
    component: RestrictPageDueFeatureToggleComponent,
    canActivate: [NgxFeatureToggleCanActivateGuard],
    data: {
      featureToggle: ['!enableSecondText'],
      redirectTo: '/error',
    },
  },
  {
    path: 'error',
    component: ErrorComponent,
    canActivate: [NgxFeatureToggleCanActivateGuard],
    data: {
      featureToggle: ['enableFirstText'],
    },
  },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [NgxFeatureToggleCanActivateGuard],
    canActivateChild: [NgxFeatureToggleCanActivateChildGuard],
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
