import { isValid, parse } from 'date-fns';

export default function parseDate(dateString: string, dateFormat: string): Date | null {
  if (!dateString || dateString.trim() === '') {
    return null;
  }
  const parsed = parse(dateString, dateFormat, new Date());
  return isValid(parsed) ? parsed : null;
}
