import { Component, Input, OnInit, NgZone, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hello',
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
  @Input() name: string;

  anotherFeatureToggleData = {
    enableAnother: true,
  };

  intervalId;

  ngOnInit() {
    console.error(
      'HelloComponent - ngDoCheck() - Should not be called',
      this.name
    );
  }

  constructor(private zone: NgZone) {
    // Required because Protractor current behavior
    // More details in https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular
    this.zone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.zone.run(() => {
          Object.keys(this.anotherFeatureToggleData).forEach(
            (key) =>
              (this.anotherFeatureToggleData[key] = !this
                .anotherFeatureToggleData[key])
          );
        });
        // increase/decrease this number to see the
        // current feature toggle component behavior
      }, 2000);
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
