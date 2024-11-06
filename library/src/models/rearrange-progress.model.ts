import { HandlerStage } from '../enums';

export interface RearrangeProgressModel {
  current: number;
  total: number;
  stage: HandlerStage;
}
