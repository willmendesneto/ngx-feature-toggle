import { isPlatformBrowser } from '@angular/common';
import { Component, Input, OnInit, NgZone, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';

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
})
export class HelloComponent implements OnInit, OnDestroy {
  @Input() name: string = '';

  anotherFeatureToggleData: {
    [k: string]: boolean;
  } = {
    enableAnother: true,
  };

  intervalId: number | undefined;

  ngOnInit() {
    console.error('HelloComponent - ngDoCheck() - Should not be called', this.name);
    if (isPlatformBrowser(this.platformId)) {
      // Required because Protractor current behavior
      // More details in https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular
      this.zone.runOutsideAngular(() => {
        this.intervalId = window.setInterval(() => {
          this.zone.run(() => {
            Object.keys(this.anotherFeatureToggleData).forEach(
              key => (this.anotherFeatureToggleData[key] = !this.anotherFeatureToggleData[key]),
            );
          });
          // increase/decrease this number to see the
          // current feature toggle component behavior
        }, 2000);
      });
    }
  }

  constructor(private zone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
