import { createFeatureToggleService, FeatureToggleServiceConfig } from 'feature-toggle-service';

export type { FeatureToggleServiceConfig };

export interface FeatureToggleCheckContext<T extends FeatureToggleServiceConfig = FeatureToggleServiceConfig> {
  isOn: (key: Extract<keyof T, string>) => boolean;
  isToggleOn: (toggle: string) => boolean;
}

export type FeatureTogglePredicate<T extends FeatureToggleServiceConfig = FeatureToggleServiceConfig> = (
  context: FeatureToggleCheckContext<T>,
) => boolean;

export type FeatureToggleConfig = string | string[] | FeatureTogglePredicate;

type IsOn = (key: string) => boolean;

// Toggles set via `setFeatureToggles()`, shared by every application. Each application
// keeps its own toggles in `FeatureToggleService`, which starts from and follows these ones.
export const globalFeatureToggles = createFeatureToggleService();

/**
 * Sets the feature toggles of every application.
 *
 * @deprecated Use `provideFeatureToggles()` or `FeatureToggleService.set()`, which keep the
 * toggles per application (e.g. per server-side rendering request).
 */
export function setFeatureToggles(config: FeatureToggleServiceConfig): void {
  globalFeatureToggles.set(config);
}

export function isOn(key: string): boolean {
  return globalFeatureToggles.isOn(key);
}

export function isFeatureToggleOn(toggle: string, isOnFn: IsOn = isOn): boolean {
  return toggle[0] === '!' ? !isOnFn(toggle.slice(1)) : isOnFn(toggle);
}

export function createFeatureToggleContext<T extends FeatureToggleServiceConfig = FeatureToggleServiceConfig>(
  isOnFn: IsOn = isOn,
): FeatureToggleCheckContext<T> {
  return {
    isOn: (key: Extract<keyof T, string>) => isOnFn(key),
    isToggleOn: (toggle: string) => isFeatureToggleOn(toggle, isOnFn),
  };
}

export function isValidFeatureToggleConfig(config: unknown): config is FeatureToggleConfig {
  return typeof config === 'string' || Array.isArray(config) || typeof config === 'function';
}

export function evaluateFeatureToggle(
  config: FeatureToggleConfig | undefined | null,
  isOnFn: IsOn = isOn,
): boolean {
  if (typeof config === 'string') {
    return isFeatureToggleOn(config, isOnFn);
  }

  if (Array.isArray(config)) {
    return config.every(toggle => isFeatureToggleOn(toggle, isOnFn));
  }

  if (typeof config === 'function') {
    return config(createFeatureToggleContext(isOnFn));
  }

  return false;
}
