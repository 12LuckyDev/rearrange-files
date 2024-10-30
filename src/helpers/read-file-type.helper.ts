import mime from 'mime-types';

export const readFileType = (filepath: string): string => {
  const mimeType = mime.lookup(filepath);
  return mimeType ? mimeType.split('/')[0] : 'unknown';
};
