import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FeatureToggleModule } from '../../projects/ngx-feature-toggle/src/lib/ngx-feature-toggle.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FeatureToggleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
