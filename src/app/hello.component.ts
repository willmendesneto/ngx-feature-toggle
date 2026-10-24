import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, inject, input, PLATFORM_ID } from '@angular/core';
import { FeatureToggleDirective, FeatureTogglePredicate, FeatureToggleService } from 'ngx-feature-toggle';

@Component({
  selector: 'ngx-app-hello',
  templateUrl: './hello.component.html',
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `,
  ],
  imports: [FeatureToggleDirective],
})
export class HelloComponent {
  readonly name = input('');

  anotherFn: FeatureTogglePredicate = ({ isOn }) => isOn('enableAnother');

  constructor() {
    const featureToggles = inject(FeatureToggleService);
    featureToggles.set({ enableAnother: true });

    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }

    const intervalId = setInterval(
      () => featureToggles.set({ enableAnother: !featureToggles.isOn('enableAnother') }),
      2000,
    );
    inject(DestroyRef).onDestroy(() => clearInterval(intervalId));
  }
}
