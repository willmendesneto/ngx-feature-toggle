import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  featureToggleData: any = {
    enableFirstText: false,
    enableSecondText: true
  };

  constructor() {
    setInterval(() => {
      Object.keys(this.featureToggleData).map(key => (
        this.featureToggleData[key] = !this.featureToggleData[key]
      ));
      // increase/decrease this number to see the
      // current feature toggle component behavior
    }, 5000);
  }
}
