import { Injector } from '@angular/core';
import { TestBed, getTestBed } from '@angular/core/testing';

import { FeatureToggleModule, FeatureToggleServiceProvider } from '../index';

describe('featureToggleServiceProvider', () => {
  let injector: Injector;
  let featureToggleServiceProvider: FeatureToggleServiceProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FeatureToggleModule
      ]
    });
    injector = getTestBed();
    featureToggleServiceProvider = injector.get(FeatureToggleServiceProvider);
    featureToggleServiceProvider.setConfigurationObject({
      enableFirstText: false,
      enableSecondText: true
    })
  });

  it('should be defined defined', () => {
    expect(featureToggleServiceProvider).toBeDefined();
    expect(featureToggleServiceProvider instanceof FeatureToggleServiceProvider).toBeTruthy();
  });

  it('should return false if value is undefined or null', () => {
    expect(featureToggleServiceProvider.isOn(undefined)).toBe(false);
    expect(featureToggleServiceProvider.isOn(null)).toBe(false);
  });

  it('should return false if value was not added', () => {
    expect(featureToggleServiceProvider.isOn('nonAddedValue')).toBe(false);
  });

  it('should return false if given value is false', () => {
    expect(featureToggleServiceProvider.isOn('enableFirstText')).toBe(false);
  });

  it('should return true if given value is true', () => {
    expect(featureToggleServiceProvider.isOn('enableSecondText')).toBe(true);
  });


  it('should return true if value is undefined or null', () => {
    expect(featureToggleServiceProvider.isOff(undefined)).toBe(true);
    expect(featureToggleServiceProvider.isOff(null)).toBe(true);
  });

  it('should return true if value was not added', () => {
    expect(featureToggleServiceProvider.isOff('nonAddedValue')).toBe(true);
  });

  it('should return true if given value is true', () => {
    expect(featureToggleServiceProvider.isOff('enableFirstText')).toBe(true);
  });

  it('should return false if given value is false', () => {
    expect(featureToggleServiceProvider.isOff('enableSecondText')).toBe(false);
  });
});
