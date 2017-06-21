import {
  Component,
  Input,
  OnInit,
  ElementRef
} from '@angular/core';

import { isOn } from 'feature-toggle-service';

@Component({
  selector: 'feature-toggle',
  template: '<ng-content></ng-content>'
})

export class FeatureToggleComponent implements OnInit {

  @Input() featureName: string;

  private isEnabled = false;

  constructor(
    private el: ElementRef
  ) {}

  ngOnInit() {
    if (!this.featureName) {
      throw new Error('Attribute `featureName` should not be null or empty');
    }

    const showWhenDisabled = this.el.nativeElement.getAttribute('showWhenDisabled') !== null;

    const toggleState = isOn(this.featureName);
    this.isEnabled = toggleState === !showWhenDisabled;
    if (!this.isEnabled) {
      this.el.nativeElement.remove();
    }
  }
}
