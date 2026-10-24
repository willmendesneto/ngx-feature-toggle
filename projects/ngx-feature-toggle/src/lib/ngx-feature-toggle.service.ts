import {
  DestroyRef,
  EnvironmentProviders,
  inject,
  Injectable,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
  signal,
} from '@angular/core';
import { createFeatureToggleService } from 'feature-toggle-service';
import {
  evaluateFeatureToggle,
  FeatureToggleConfig,
  FeatureToggleServiceConfig,
  globalFeatureToggles,
} from './ngx-feature-toggle.util';

/**
 * Keeps the feature toggles of the application. Each application (e.g. each server-side
 * rendering request) has its own toggles, so they don't leak between them.
 */
@Injectable({ providedIn: 'root' })
export class FeatureToggleService {
  readonly #service = createFeatureToggleService(globalFeatureToggles.getAll());
  readonly #toggles = signal(this.#service.getAll());

  /** Current feature toggles, as a signal */
  readonly toggles = this.#toggles.asReadonly();

  constructor() {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(this.#service.subscribe(() => this.#toggles.set(this.#service.getAll())));
    // Keeps following the deprecated `setFeatureToggles()`
    destroyRef.onDestroy(globalFeatureToggles.subscribe(() => this.set(globalFeatureToggles.getAll())));
  }

  /** Sets the feature toggles, merged with the current ones */
  set(config: FeatureToggleServiceConfig): void {
    this.#service.set(config);
  }

  /**
   * Checks a feature toggle configuration: a toggle name (`!` prefix negates it), a list of
   * names that must all be on, or a callback. Reading it in a reactive context (e.g. a
   * template or `computed()`) tracks the toggles.
   */
  isOn(config: FeatureToggleConfig): boolean {
    this.#toggles();

    return evaluateFeatureToggle(config, this.#service.isOn);
  }
}

/**
 * Sets the feature toggles of the application, e.g. in `bootstrapApplication()` providers.
 */
export function provideFeatureToggles(config: FeatureToggleServiceConfig): EnvironmentProviders {
  return makeEnvironmentProviders([provideEnvironmentInitializer(() => inject(FeatureToggleService).set(config))]);
}
