import ExifReader from 'exifreader';
import { readFileType } from './read-file-type.helper';
import fs from 'fs';

export const readCreationTime = async (filepath: string): Promise<Date> => {
  const filetype = readFileType(filepath);
  if (filetype === 'image') {
    try {
      const tags: ExifReader.Tags = await ExifReader.load(filepath);
      const dateTimeOriginal = tags['DateTimeOriginal']?.description;
      if (dateTimeOriginal) {
        return new Date(dateTimeOriginal.replace(':', '-').replace(':', '-'));
      }
    } catch (e) {
      console.error(filepath, e);
    }
  }

  const { birthtimeMs, atimeMs, ctimeMs, mtimeMs }: fs.Stats = await fs.promises.stat(filepath);

  return new Date(Math.min(birthtimeMs, atimeMs, ctimeMs, mtimeMs));
};
