import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxFeatureToggleCanActivateGuard } from '../../projects/ngx-feature-toggle/src/lib/ngx-feature-toggle-can-activate-guard.router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { set } from 'feature-toggle-service';

set({
  enableFirstText: true,
  enableSecondText: true,
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
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
