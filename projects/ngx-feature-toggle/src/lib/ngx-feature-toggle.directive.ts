import {
  computed,
  Directive,
  effect,
  inject,
  input,
  isDevMode,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { FeatureToggleService } from './ngx-feature-toggle.service';
import { FeatureToggleConfig, isValidFeatureToggleConfig } from './ngx-feature-toggle.util';

@Directive({
  selector: '[featureToggle]',
})
export class FeatureToggleDirective implements OnInit {
  readonly featureToggle = input<FeatureToggleConfig | undefined>();

  readonly #service = inject(FeatureToggleService);
  readonly #templateRef = inject(TemplateRef);
  readonly #viewContainer = inject(ViewContainerRef);
  // Recomputed when the input or the feature toggles change, so it works with `OnPush` and zoneless
  readonly #isOn = computed(() => this.isOnCheck(this.featureToggle()));

  constructor() {
    effect(() => {
      this.#viewContainer.clear();
      if (this.#isOn()) {
        this.#viewContainer.createEmbeddedView(this.#templateRef);
      }
    });
  }

  ngOnInit() {
    if (!this.featureToggle()) {
      throw new Error('Attribute `featureToggle` should not be null or empty');
    }
  }

  isOnCheck(featureToggle: FeatureToggleConfig | undefined) {
    if (!isValidFeatureToggleConfig(featureToggle)) {
      if (isDevMode()) {
        console.error(
          '`NgxFeatureToggle`: `featureToggle` should receive a string, an array, or a function as a value.',
        );
      }
      return false;
    }

    return this.#service.isOn(featureToggle);
  }
}
