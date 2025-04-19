import { formatDistanceToNowStrict, format } from 'date-fns';

export const formatDistanceToNow = (date: Date): string => {
  return formatDistanceToNowStrict(date, { addSuffix: true });
};

export const formatDate = (date: Date): string => {
  return format(date, 'MMM d, yyyy');
};