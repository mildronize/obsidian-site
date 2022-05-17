import { parseISO, format as dateFormat, isValid } from 'date-fns';

interface IDateFormatter {
  dateString: string;
  format?: string;
}

export default function DateFormatter({ dateString, format = 'MMM	d, yyyy' }: IDateFormatter) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{isValid(date) ? dateFormat(date, format) : ``}</time>;
}
