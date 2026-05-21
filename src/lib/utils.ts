import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'EUR', locale = 'cs-CZ') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string, locale = 'cs-CZ') {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatRelativeTime(date: Date | string) {
  const rtf = new Intl.RelativeTimeFormat('cs', { numeric: 'auto' });
  const diff = (new Date(date).getTime() - Date.now()) / 1000;
  if (Math.abs(diff) < 60) return rtf.format(Math.round(diff), 'seconds');
  if (Math.abs(diff) < 3600) return rtf.format(Math.round(diff / 60), 'minutes');
  if (Math.abs(diff) < 86400) return rtf.format(Math.round(diff / 3600), 'hours');
  return rtf.format(Math.round(diff / 86400), 'days');
}

export function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

export function truncate(str: string, length: number) {
  return str.length > length ? str.slice(0, length) + '…' : str;
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
