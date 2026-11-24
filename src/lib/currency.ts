/**
 * Currency utilities for Routic Admin Portal.
 * All monetary amounts in the backend are stored as integers in kobo (1 NGN = 100 kobo).
 */

export const formatKoboToNgn = (kobo: number | null | undefined): string => {
  if (kobo === null || kobo === undefined || isNaN(kobo)) {
    return '₦0.00';
  }
  const ngn = kobo / 100;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(ngn);
};

export const parseNgnToKobo = (ngn: number | string): number => {
  const numeric = typeof ngn === 'string' ? parseFloat(ngn.replace(/[^0-9.-]+/g, '')) : ngn;
  if (isNaN(numeric)) return 0;
  return Math.round(numeric * 100);
};
