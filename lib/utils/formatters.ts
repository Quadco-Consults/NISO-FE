import { format, formatDistance, formatRelative } from 'date-fns';

// Currency formatting
export function formatCurrency(amount: number, currency = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

// Number formatting
export function formatNumber(num: number, decimals = 2): string {
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

// Energy formatting (MWh)
export function formatEnergy(mwh: number): string {
  if (mwh >= 1000) {
    return `${formatNumber(mwh / 1000, 2)} GWh`;
  }
  return `${formatNumber(mwh, 2)} MWh`;
}

// Power formatting (MW)
export function formatPower(mw: number): string {
  if (mw >= 1000) {
    return `${formatNumber(mw / 1000, 2)} GW`;
  }
  return `${formatNumber(mw, 2)} MW`;
}

// Date formatting
export function formatDate(date: Date | string, formatStr = 'PP'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr);
}

export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'PPp');
}

export function formatDateShort(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'dd/MM/yyyy');
}

export function formatTimeAgo(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistance(dateObj, new Date(), { addSuffix: true });
}

export function formatRelativeDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatRelative(dateObj, new Date());
}

// Percentage formatting
export function formatPercentage(value: number, decimals = 2): string {
  return `${formatNumber(value, decimals)}%`;
}

// Status badge colors
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    // Invoice statuses
    draft: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    sent: 'bg-blue-100 text-blue-800',
    paid: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800',

    // Payment statuses
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-orange-100 text-orange-800',

    // Customer statuses
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-orange-100 text-orange-800',
    disconnected: 'bg-red-100 text-red-800',

    // Debt statuses
    current: 'bg-green-100 text-green-800',
    overdue_30: 'bg-yellow-100 text-yellow-800',
    overdue_60: 'bg-orange-100 text-orange-800',
    overdue_90: 'bg-red-100 text-red-800',
    legal: 'bg-purple-100 text-purple-800',
    written_off: 'bg-gray-100 text-gray-800',

    // Grid statuses
    online: 'bg-green-100 text-green-800',
    offline: 'bg-red-100 text-red-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
  };

  return statusColors[status] || 'bg-gray-100 text-gray-800';
}

// Invoice number generation
export function generateInvoiceNumber(prefix = 'INV'): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${year}${month}-${random}`;
}

// Truncate text
export function truncate(text: string, length = 50): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Calculate aging days
export function calculateAgingDays(date: Date | string): number {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const diffTime = today.getTime() - dateObj.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
