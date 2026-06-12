import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { FeatureToggleModule } from 'ngx-feature-toggle';
import { ErrorComponent } from './error/error.component';
import { HomeModule } from './home/home.module';

import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer/customer-detail.component';
import { CallbackDemoComponent } from './callback-demo/callback-demo.component';
import { RestrictPageDueFeatureToggleComponent } from './restrict-page-due-feature-toggle/restrict-page-due-feature-toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    CustomerComponent,
    CustomerDetailComponent,
    CallbackDemoComponent,
    RestrictPageDueFeatureToggleComponent,
  ],
  imports: [BrowserModule, FeatureToggleModule, AppRoutingModule, HomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
