import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FeatureTogglePredicate } from 'ngx-feature-toggle';

@Component({
  selector: 'ngx-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit, OnDestroy {
  featureToggleData: {
    enableFirstText: boolean;
    enableSecondText: boolean;
  } = {
    enableFirstText: false,
    enableSecondText: true,
  };

  myFn: FeatureTogglePredicate = ({ isOn }) => isOn('enableFirstText') || isOn('enableSecondText');

  intervalId: number | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.intervalId = window.setInterval(() => {
      (Object.keys(this.featureToggleData) as Array<keyof typeof this.featureToggleData>).forEach(
        key => (this.featureToggleData[key] = !this.featureToggleData[key]),
      );
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
