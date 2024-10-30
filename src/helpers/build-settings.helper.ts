import { Depth, HandlerMode } from '../enums';
import { RearrangeSettingsBaseModel, RearrangeOptionsModel, RearrangeSettingsModel } from '../models';

const DEFAULT_OPTIONS: RearrangeSettingsBaseModel = {
  depth: Depth.month,
  template: 'YYYYMMDD_HHmmss',
  clearTarget: false,
  mode: HandlerMode.copy,
  hoursModifier: null,
};

export const buildSettings = (options: string | RearrangeOptionsModel): RearrangeSettingsModel => {
  if (typeof options === 'string') {
    return {
      ...DEFAULT_OPTIONS,
      srcPath: options,
      targetPath: options,
    };
  }

  const { srcPath, targetPath, ...restOptions } = options;

  const filledSettings: RearrangeSettingsModel = {
    ...DEFAULT_OPTIONS,
    srcPath,
    targetPath: targetPath ?? srcPath,
  };

  Object.keys(restOptions).forEach((k) => {
    const key = k as keyof typeof restOptions;
    const value = restOptions[key];
    if (value !== undefined) {
      (filledSettings as unknown as Record<string, unknown>)[key] = value;
    }
  });

  return filledSettings;
};
