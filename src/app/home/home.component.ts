import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  featureToggleData: any = {
    enableFirstText: false,
    enableSecondText: true,
  };

  constructor(private zone: NgZone) {
    // Required because Protractor current behavior
    // More details in https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
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
