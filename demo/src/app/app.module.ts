import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MdToolbarModule, MdCardModule, MdTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FeatureToggleModule } from 'ngx-feature-toggle';

import { EXAMPLES } from './examples';
import { DemoComponent } from './app.component';

@NgModule({
  declarations: [
    DemoComponent,
    ...EXAMPLES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FeatureToggleModule,
    CommonModule,
    MdToolbarModule,
    MdCardModule,
    MdTabsModule,
    BrowserAnimationsModule
  ],
  bootstrap: [DemoComponent]
})

export class NGXFeatureToggleDemoModule {}
