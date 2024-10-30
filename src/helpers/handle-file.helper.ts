import dayjs from 'dayjs';
import path from 'path';
import { copy, move } from 'fs-extra';
import { readCreationTime } from './read-creation-date.helper';
import { RearrangeSettingsModel } from '../models';
import { HandlerMode } from '../enums';
import { processDate } from './process-date';

export const handleFile = async (filePath: string, settings: RearrangeSettingsModel): Promise<void> => {
  const { depth, targetPath, template, mode } = settings;

  const date: Date = await readCreationTime(filePath);
  const processed: Date = processDate(date, settings);
  const dayjsObj: dayjs.Dayjs = dayjs(processed);
  const formated: string = dayjsObj.format('YYYY-MM-DD-HH-mm-ss');
  const directoriesPath: string = depth
    ? formated
        .split('-')
        .slice(0, depth + 1)
        .join('/')
    : '';

  const newFileName = `${dayjsObj.format(template)}${path.extname(filePath)}`;

  const method = mode === HandlerMode.copy ? copy : move;
  await method(filePath, path.join(targetPath, directoriesPath, newFileName));
};
