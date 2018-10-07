import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FeatureToggleModule } from '../lib/ngx-feature-toggle.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FeatureToggleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
