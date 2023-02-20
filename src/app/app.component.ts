import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'ngx-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  featureToggleData: {
    [k: string]: boolean;
  } = {
    enableFirstText: false,
    enableSecondText: true,
  };

  intervalId: number | undefined;

  constructor(private zone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Required because Protractor current behavior
      // More details in https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular
      this.zone.runOutsideAngular(() => {
        this.intervalId = window.setInterval(() => {
          this.zone.run(() => {
            Object.keys(this.featureToggleData).map(
              key => (this.featureToggleData[key] = !this.featureToggleData[key]),
            );
          });
          // increase/decrease this number to see the
          // current feature toggle component behavior
        }, 5000);
      });
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
