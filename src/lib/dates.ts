import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatDateTime = (date: string | Date | null | undefined): string => {
  if (!date) return '—';
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

export const formatDateOnly = (date: string | Date | null | undefined): string => {
  if (!date) return '—';
  return dayjs(date).format('YYYY-MM-DD');
};

export const formatTimeAgo = (date: string | Date | null | undefined): string => {
  if (!date) return '—';
  return dayjs(date).fromNow();
};
