import {
  createFeatureToggleContext,
  evaluateFeatureToggle,
  isFeatureToggleOn,
  setFeatureToggles,
} from './ngx-feature-toggle.util';

describe('Utility: ngx-feature-toggle.util', () => {
  beforeEach(() => {
    setFeatureToggles({});
  });

  afterEach(() => {
    setFeatureToggles({});
  });

  describe('#setFeatureToggles()', () => {
    it('should set feature toggles from the config', () => {
      setFeatureToggles({ isFirstFeatureEnabled: true, isSecondFeatureEnabled: false });

      const context = createFeatureToggleContext();
      expect(context.isOn('isFirstFeatureEnabled')).toBeTruthy();
      expect(context.isOn('isSecondFeatureEnabled')).toBeFalsy();
    });

    it('should merge feature toggles across calls', () => {
      setFeatureToggles({ isFirstFeatureEnabled: true });
      setFeatureToggles({ isSecondFeatureEnabled: false });

      const context = createFeatureToggleContext();
      expect(context.isOn('isFirstFeatureEnabled')).toBeTruthy();
      expect(context.isOn('isSecondFeatureEnabled')).toBeFalsy();
    });
  });

  describe('#isFeatureToggleOn()', () => {
    beforeEach(() => {
      setFeatureToggles({ isFirstFeatureEnabled: true, isSecondFeatureEnabled: false });
    });

    it('should return true when toggle is enabled', () => {
      expect(isFeatureToggleOn('isFirstFeatureEnabled')).toBeTruthy();
    });

    it('should return false when toggle is disabled', () => {
      expect(isFeatureToggleOn('isSecondFeatureEnabled')).toBeFalsy();
    });

    it('should return true when toggle is disabled and starts with `!`', () => {
      expect(isFeatureToggleOn('!isSecondFeatureEnabled')).toBeTruthy();
    });

    it('should return false when key is not configured', () => {
      expect(isFeatureToggleOn('unknownFeature')).toBeFalsy();
    });
  });

  describe('#evaluateFeatureToggle()', () => {
    beforeEach(() => {
      setFeatureToggles({ isFirstFeatureEnabled: true, isSecondFeatureEnabled: false });
    });

    it('should return false for undefined input', () => {
      expect(evaluateFeatureToggle(undefined)).toBeFalsy();
    });

    it('should return false for null input', () => {
      expect(evaluateFeatureToggle(null)).toBeFalsy();
    });

    it('should return false for invalid input', () => {
      expect(evaluateFeatureToggle({} as any)).toBeFalsy();
    });

    it('should evaluate a single string toggle', () => {
      expect(evaluateFeatureToggle('isFirstFeatureEnabled')).toBeTruthy();
      expect(evaluateFeatureToggle('isSecondFeatureEnabled')).toBeFalsy();
    });

    it('should evaluate an array with AND semantics', () => {
      expect(evaluateFeatureToggle(['isFirstFeatureEnabled', '!isSecondFeatureEnabled'])).toBeTruthy();
      expect(evaluateFeatureToggle(['isFirstFeatureEnabled', 'isSecondFeatureEnabled'])).toBeFalsy();
    });

    it('should evaluate a callback with OR semantics', () => {
      const result = evaluateFeatureToggle(({ isOn }) => isOn('isFirstFeatureEnabled') || isOn('isSecondFeatureEnabled'));

      expect(result).toBeTruthy();
    });

    it('should evaluate a callback with mixed AND/OR semantics', () => {
      const passing = evaluateFeatureToggle(
        ({ isOn }) => isOn('isFirstFeatureEnabled') && (isOn('isSecondFeatureEnabled') || isOn('isFirstFeatureEnabled')),
      );
      const failing = evaluateFeatureToggle(
        ({ isOn }) => isOn('isFirstFeatureEnabled') && isOn('isSecondFeatureEnabled'),
      );

      expect(passing).toBeTruthy();
      expect(failing).toBeFalsy();
    });
  });

  describe('#createFeatureToggleContext()', () => {
    beforeEach(() => {
      setFeatureToggles({ isFirstFeatureEnabled: true, isSecondFeatureEnabled: false });
    });

    it('should return true for key that is on', () => {
      expect(createFeatureToggleContext().isOn('isFirstFeatureEnabled')).toBeTruthy();
    });

    it('should return false for key that is off', () => {
      expect(createFeatureToggleContext().isOn('isSecondFeatureEnabled')).toBeFalsy();
    });

    it('should return false for unknown key', () => {
      expect(createFeatureToggleContext().isOn('unknownFeature' as any)).toBeFalsy();
    });
  });
});
