import { isOn as serviceIsOn, set, FeatureToggleServiceConfig } from 'feature-toggle-service';

export { FeatureToggleServiceConfig };

export interface FeatureToggleCheckContext<T extends FeatureToggleServiceConfig = FeatureToggleServiceConfig> {
  isOn: (key: Extract<keyof T, string>) => boolean;
  isToggleOn: (toggle: string) => boolean;
}

export type FeatureTogglePredicate<T extends FeatureToggleServiceConfig = FeatureToggleServiceConfig> = (
  context: FeatureToggleCheckContext<T>,
) => boolean;

export type FeatureToggleConfig = string | string[] | FeatureTogglePredicate;

export function setFeatureToggles(config: FeatureToggleServiceConfig): void {
  set(config);
}

export function isOn(key: string): boolean {
  return serviceIsOn(key);
}

export function isFeatureToggleOn(toggle: string): boolean {
  const key = toggle[0] === '!' ? toggle.slice(1) : toggle;

  return toggle[0] === '!' ? !serviceIsOn(key) : serviceIsOn(key);
}

export function createFeatureToggleContext<
  T extends FeatureToggleServiceConfig = FeatureToggleServiceConfig,
>(): FeatureToggleCheckContext<T> {
  return {
    isOn: (key: Extract<keyof T, string>) => serviceIsOn(key),
    isToggleOn: isFeatureToggleOn,
  };
}

export function isValidFeatureToggleConfig(config: unknown): config is FeatureToggleConfig {
  return (
    typeof config === 'string' ||
    Array.isArray(config) ||
    typeof config === 'function'
  );
}

export function evaluateFeatureToggle(config: FeatureToggleConfig | undefined | null): boolean {
  if (config === undefined || config === null) {
    return false;
  }

  if (typeof config === 'string') {
    return isFeatureToggleOn(config);
  }

  if (Array.isArray(config)) {
    return (config as string[]).every(isFeatureToggleOn);
  }

  if (typeof config === 'function') {
    return config(createFeatureToggleContext());
  }

  return false;
}
