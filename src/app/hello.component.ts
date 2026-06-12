import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FeatureTogglePredicate } from 'ngx-feature-toggle';

@Component({
  selector: 'ngx-app-hello',
  templateUrl: './hello.component.html',
  standalone: false,
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `,
  ],
})
export class HelloComponent implements OnInit, OnDestroy {
  @Input() name: string = '';

  anotherFeatureToggleData: {
    enableAnother: boolean;
  } = {
    enableAnother: true,
  };

  anotherFn: FeatureTogglePredicate = ({ isOn }) => isOn('enableAnother');

  intervalId: number | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.intervalId = window.setInterval(() => {
      (Object.keys(this.anotherFeatureToggleData) as Array<keyof typeof this.anotherFeatureToggleData>).forEach(
        key => (this.anotherFeatureToggleData[key] = !this.anotherFeatureToggleData[key]),
      );
    }, 2000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
