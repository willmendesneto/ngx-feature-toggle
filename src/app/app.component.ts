import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'ngx-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  featureToggleData: {
    [k: string]: boolean;
  } = {
    enableFirstText: false,
    enableSecondText: true,
  };

  intervalId: number | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.intervalId = window.setInterval(() => {
      Object.keys(this.featureToggleData).forEach(
        key => (this.featureToggleData[key] = !this.featureToggleData[key]),
      );
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
