import { RearrangeSettingsModel } from '../models';

export const processDate = (date: Date, { hoursModifier }: RearrangeSettingsModel): Date => {
  if (hoursModifier !== null) {
    const dateToProcess = new Date(date);
    dateToProcess.setHours(dateToProcess.getHours() + hoursModifier);
    return dateToProcess;
  }
  return date;
};
