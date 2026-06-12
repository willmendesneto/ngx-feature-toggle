import { Component, NgZone } from '@angular/core';
import { FeatureTogglePredicate } from 'ngx-feature-toggle';

@Component({
  selector: 'ngx-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  featureToggleData: {
    enableFirstText: boolean;
    enableSecondText: boolean;
  } = {
    enableFirstText: false,
    enableSecondText: true,
  };

  myFn: FeatureTogglePredicate<{ enableFirstText: boolean; enableSecondText: boolean }> = ({ isOn }) =>
    isOn('enableFirstText') || isOn('enableSecondText');

  constructor(private zone: NgZone) {
    // Required because Protractor current behavior
    // More details in https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this.zone.run(() => {
          (Object.keys(this.featureToggleData) as Array<keyof typeof this.featureToggleData>).forEach(
            key => (this.featureToggleData[key] = !this.featureToggleData[key]),
          );
        });
        // increase/decrease this number to see the
        // current feature toggle component behavior
      }, 5000);
    });
  }
}
