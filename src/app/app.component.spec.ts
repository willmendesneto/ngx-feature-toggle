import { TestBed, async, tick, fakeAsync, discardPeriodicTasks } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  it('should change the feature toggle data every 5 seconds', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    discardPeriodicTasks();

    expect(app.featureToggleData).toEqual({
      enableFirstText: false,
      enableSecondText: true,
    });

    tick(5000);

    expect(app.featureToggleData).toEqual({
      enableFirstText: true,
      enableSecondText: false,
    });
  }));

  it('should render title in a h1 tag', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    discardPeriodicTasks();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('ngx-feature-toggle');
  }));
});
