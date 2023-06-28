import format from 'date-fns/format/index';
import { formatDistanceToNowStrict } from 'date-fns';

export const formatDate = (date: string) => {
  return format(new Date(date), 'MMM d, yyyy');
};

export const formatRelativeDate = (date: string) => {
  return formatDistanceToNowStrict(new Date(date), { addSuffix: true });
};

export const generateSlug = (input: string) => {
  const randomId = (Math.floor(Math.random() * 900000) + 100000).toString();
  return (
    input
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .trim()
      .replace(/ +/g, ' ') // merge multiple spaces in a row
      .replace(/\s/g, '-')
      .toLowerCase() +
    '-' +
    randomId
  );
};
