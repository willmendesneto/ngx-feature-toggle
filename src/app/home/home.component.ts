import { isPlatformBrowser, JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, PLATFORM_ID } from '@angular/core';
import { FeatureToggleDirective, FeatureTogglePredicate, FeatureToggleService } from 'ngx-feature-toggle';
import { HelloComponent } from '../hello.component';

@Component({
  selector: 'ngx-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [FeatureToggleDirective, HelloComponent, JsonPipe],
})
export class HomeComponent {
  readonly featureToggles = inject(FeatureToggleService);

  myFn: FeatureTogglePredicate = ({ isOn }) => isOn('enableFirstText') || isOn('enableSecondText');

  constructor() {
    this.featureToggles.set({ enableFirstText: false, enableSecondText: true });

    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }

    // `*featureToggle` updates when the toggles change, no zone.js needed
    const intervalId = setInterval(
      () =>
        this.featureToggles.set({
          enableFirstText: !this.featureToggles.isOn('enableFirstText'),
          enableSecondText: !this.featureToggles.isOn('enableSecondText'),
        }),
      5000,
    );
    inject(DestroyRef).onDestroy(() => clearInterval(intervalId));
  }
}
