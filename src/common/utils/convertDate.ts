import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(utc);
dayjs.extend(localizedFormat);

export function convertDateFromUTCtoLocal(date: string) {
  // Parse the UTC date string
  const utcDate = dayjs.utc(date);

  // Detect user's browser locale
  console.log(navigator);
  const userLocale = navigator.language || navigator.languages[0];

  // Format the local date string using the detected locale
  const localDateString = utcDate.local().locale(userLocale);

  return localDateString;
}

export function convertDateFromLocaltoUTC(date: string) {
  // Parse the local date string with the specified format
  const localDate = dayjs(date, { format: "DD/MM/YYYY" });

  // Converted the local date to UTC
  return localDate.utc().format();
}
