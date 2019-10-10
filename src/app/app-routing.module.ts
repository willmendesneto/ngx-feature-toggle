import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxFeatureToggleCanActivateGuard } from '../../projects/ngx-feature-toggle/src/lib/ngx-feature-toggle-can-activate-guard.router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { set } from 'feature-toggle-service';
import { NgxFeatureToggleCanActivateChildGuard } from '../../projects/ngx-feature-toggle/src/lib/ngx-feature-toggle-can-activate-child-guard.router';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer/customer-detail.component';

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
    },
    children: [
      {
        path: ':id',
        component: CustomerDetailComponent,
        data: {
          featureToggle: ['enableCustomerPage', '!enableChildrenNavigation'],
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
