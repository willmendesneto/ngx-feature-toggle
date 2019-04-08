import { Component, Input, OnInit, Output, DoCheck, OnChanges } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent implements OnInit, DoCheck, OnChanges {
  @Input() name: string;

  ngOnChanges() {
    console.error("HelloComponent - ngOnChanges() - Should not be called", this.name);
  }

  ngOnInit(): void {
    console.error("HelloComponent - ngOnInit() - Should not be called", this.name);
  }

  ngDoCheck() {
    console.error("HelloComponent - ngDoCheck() - Should not be called", this.name);
  }

}
