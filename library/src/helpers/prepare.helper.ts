import { RearrangeSettingsModel } from '../models';
import { emptyDir } from 'fs-extra';

export const prepare = async ({ clearTarget, targetPath }: RearrangeSettingsModel): Promise<void> => {
  if (clearTarget) {
    await emptyDir(targetPath);
  }
};
