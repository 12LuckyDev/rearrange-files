import { Depth, HandlerMode } from '../enums';

/**
 * TODO
 * check if src exist
 * checking if depth is needed
 * duplicat name handling
 */

export interface RearrangeSettingsBaseModel {
  depth: Depth | null;
  template: string;
  clearTarget: boolean;
  mode: HandlerMode;
  hoursModifier: number | null;
}

export interface RearrangeSettingsModel extends RearrangeSettingsBaseModel {
  srcPath: string;
  targetPath: string;
}

export interface RearrangeOptionsModel {
  srcPath: string;
  targetPath?: string;
  depth?: Depth | null;
  template?: string;
  clearTarget?: boolean;
  mode?: HandlerMode;
  hoursModifier?: number | null;
}
