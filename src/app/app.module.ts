import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { FeatureToggleModule } from '../../projects/ngx-feature-toggle/src/lib/ngx-feature-toggle.module';
import { ErrorComponent } from './error/error.component';
import { HomeModule } from './home/home.module';

import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer/customer-detail.component';

@NgModule({
  declarations: [AppComponent, ErrorComponent, CustomerComponent, CustomerDetailComponent],
  imports: [BrowserModule, FeatureToggleModule, AppRoutingModule, HomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
