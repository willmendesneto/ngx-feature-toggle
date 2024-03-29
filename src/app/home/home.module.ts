import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

import { FeatureToggleModule } from '../../../projects/ngx-feature-toggle/src/public-api';
import { HelloComponent } from '../hello.component';

@NgModule({
  declarations: [HomeComponent, HelloComponent],
  imports: [BrowserModule, FeatureToggleModule],
  providers: [],
  bootstrap: [HomeComponent],
})
export class HomeModule {}
