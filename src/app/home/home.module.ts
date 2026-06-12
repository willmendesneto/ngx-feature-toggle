import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

import { FeatureToggleModule } from 'ngx-feature-toggle';
import { HelloComponent } from '../hello.component';

@NgModule({
  declarations: [HomeComponent, HelloComponent],
  imports: [BrowserModule, FeatureToggleModule],
  exports: [HomeComponent, HelloComponent],
})
export class HomeModule {}
