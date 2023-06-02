import format from 'date-fns/format/index';

export const formatDate = (date: string) => {
  return format(new Date(date), 'MMM d, yyyy');
};

export const generateSlug = (input: string) => {
  return input
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .replace(/ +/g, ' ') // merge multiple spaces in a row
    .replace(/\s/g, '-')
    .toLowerCase();
};
