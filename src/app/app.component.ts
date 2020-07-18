import { Component, NgZone, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  featureToggleData: any = {
    enableFirstText: false,
    enableSecondText: true,
  };

  intervalId;

  constructor(private zone: NgZone) {
    // Required because Protractor current behavior
    // More details in https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular
    this.zone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.zone.run(() => {
          Object.keys(this.featureToggleData).map(
            (key) =>
              (this.featureToggleData[key] = !this.featureToggleData[key])
          );
        });
        // increase/decrease this number to see the
        // current feature toggle component behavior
      }, 5000);
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
