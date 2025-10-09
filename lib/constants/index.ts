export const APP_NAME = 'NISO ERP';
export const APP_DESCRIPTION = 'Nigeria Independent System Operator - Enterprise Resource Planning System';

// Customer Types
export const CUSTOMER_TYPES = {
  disco: 'Distribution Company',
  genco: 'Generation Company',
  ipp: 'Independent Power Producer',
  trader: 'Energy Trader',
} as const;

// User Roles
export const USER_ROLES = {
  super_admin: 'Super Administrator',
  admin: 'Administrator',
  grid_operator: 'Grid Operator',
  market_operator: 'Market Operator',
  billing_manager: 'Billing Manager',
  finance_manager: 'Finance Manager',
  debt_collector: 'Debt Collector',
  customer_service: 'Customer Service',
  auditor: 'Auditor',
  entity_user: 'Entity User',
  viewer: 'Viewer',
} as const;

// Entity Types (Power Sector Organizations)
export const ENTITY_TYPES = {
  niso: 'NISO (System Operator)',
  disco: 'DisCo (Distribution Company)',
  genco: 'GenCo (Generation Company)',
  tcn: 'TCN (Transmission Company)',
  tif: 'TIF (Transitional Fund)',
  nerc: 'NERC (Regulatory Commission)',
  nbet: 'NBET (Bulk Trading)',
  ipp: 'IPP (Independent Power Producer)',
  trader: 'Energy Trader',
} as const;

// User Statuses
export const USER_STATUSES = {
  active: 'Active',
  inactive: 'Inactive',
  suspended: 'Suspended',
  pending: 'Pending Activation',
} as const;

// Permission Modules
export const PERMISSION_MODULES = {
  dashboard: 'Dashboard',
  customers: 'Customer Management',
  billing: 'Billing & Invoicing',
  payments: 'Payment Processing',
  disbursements: 'Disbursements',
  settlements: 'Settlements',
  collections: 'Debt Collections',
  treasury: 'Treasury Management',
  reconciliation: 'Reconciliation',
  reports: 'Reports & Analytics',
  audit: 'Audit Trail',
  users: 'User Management',
  settings: 'System Settings',
} as const;

// Permission Actions
export const PERMISSION_ACTIONS = {
  view: 'View',
  create: 'Create',
  edit: 'Edit',
  delete: 'Delete',
  approve: 'Approve',
  export: 'Export',
} as const;

// Invoice Types
export const INVOICE_TYPES = {
  energy: 'Energy Charges',
  transmission: 'Transmission Charges',
  ancillary: 'Ancillary Services',
  penalty: 'Penalties',
  other: 'Other Charges',
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  bank_transfer: 'Bank Transfer',
  card: 'Card Payment',
  direct_debit: 'Direct Debit',
  check: 'Check',
  cash: 'Cash',
} as const;

// Collection Actions
export const COLLECTION_ACTIONS = {
  reminder: 'Payment Reminder',
  warning: 'Warning Notice',
  disconnection_notice: 'Disconnection Notice',
  legal_action: 'Legal Action',
  payment_plan: 'Payment Plan',
} as const;

// Settlement Statuses
export const SETTLEMENT_STATUSES = {
  pending: 'Pending',
  initial: 'Initial Run',
  interim: 'Interim Run',
  final: 'Final Settlement',
  disputed: 'Disputed',
} as const;

// Debt Aging Periods
export const DEBT_AGING = {
  current: 'Current (0-29 days)',
  overdue_30: '30-59 days',
  overdue_60: '60-89 days',
  overdue_90: '90+ days',
} as const;

// Grid Frequency Thresholds (Hz)
export const GRID_FREQUENCY = {
  min: 49.0,
  nominal: 50.0,
  max: 51.0,
  critical_low: 48.5,
  critical_high: 51.5,
} as const;

// Voltage Levels (kV)
export const VOLTAGE_LEVELS = {
  transmission_330: 330,
  transmission_132: 132,
  distribution_33: 33,
  distribution_11: 11,
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Date Ranges
export const DATE_RANGES = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'last_7_days' },
  { label: 'Last 30 days', value: 'last_30_days' },
  { label: 'This month', value: 'this_month' },
  { label: 'Last month', value: 'last_month' },
  { label: 'This year', value: 'this_year' },
  { label: 'Custom', value: 'custom' },
];

// API Endpoints
export const API_ROUTES = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    session: '/api/auth/session',
  },
  customers: '/api/customers',
  invoices: '/api/invoices',
  payments: '/api/payments',
  settlements: '/api/settlements',
  debts: '/api/debts',
  grid: '/api/grid',
  market: '/api/market',
  reports: '/api/reports',
} as const;

// Navigation Menu Items
export const NAVIGATION = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
    roles: ['all'],
  },
  // Financial Settlement & Statement Management
  {
    title: 'Disco',
    href: '/disco-statements',
    icon: 'FileText',
    roles: ['super_admin', 'admin', 'billing_manager', 'finance_manager'],
  },
  {
    title: 'Bilateral',
    href: '/bilateral-statements',
    icon: 'FileText',
    roles: ['super_admin', 'admin', 'billing_manager', 'finance_manager'],
  },
  // Payment & Disbursement Management
  {
    title: 'Payments',
    href: '/payments',
    icon: 'CreditCard',
    roles: ['super_admin', 'admin', 'finance_manager'],
  },
  {
    title: 'Service Providers',
    href: '/service-providers',
    icon: 'Building2',
    roles: ['super_admin', 'admin', 'finance_manager'],
  },
  {
    title: 'Disbursements',
    href: '/disbursements',
    icon: 'Send',
    roles: ['super_admin', 'admin', 'finance_manager'],
  },
  // Treasury & Banking
  {
    title: 'Treasury',
    href: '/treasury',
    icon: 'Wallet',
    roles: ['super_admin', 'admin', 'finance_manager'],
  },
  {
    title: 'Bank Accounts',
    href: '/bank-accounts',
    icon: 'Building',
    roles: ['super_admin', 'admin', 'finance_manager'],
  },
  {
    title: 'Reconciliation',
    href: '/reconciliation',
    icon: 'CheckCircle2',
    roles: ['super_admin', 'admin', 'finance_manager'],
  },
  // Reports & System Management
  {
    title: 'Reports',
    href: '/reports',
    icon: 'BarChart',
    roles: ['all'],
  },
  {
    title: 'User Management',
    href: '/users',
    icon: 'Users',
    roles: ['super_admin', 'admin'],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: 'Settings',
    roles: ['super_admin', 'admin'],
  },

  // ========================================
  // HIDDEN MODULES (Temporarily Disabled)
  // ========================================
  // Uncomment when needed for future development

  // {
  //   title: 'Grid Operations',
  //   href: '/dashboard/grid',
  //   icon: 'Zap',
  //   roles: ['super_admin', 'admin', 'grid_operator'],
  // },
  // {
  //   title: 'Market Operations',
  //   href: '/market',
  //   icon: 'TrendingUp',
  //   roles: ['super_admin', 'admin', 'market_operator'],
  // },
  // {
  //   title: 'Customers',
  //   href: '/customers',
  //   icon: 'Users',
  //   roles: ['super_admin', 'admin', 'customer_service', 'billing_manager'],
  // },
  // {
  //   title: 'Billing',
  //   href: '/billing',
  //   icon: 'FileText',
  //   roles: ['super_admin', 'admin', 'billing_manager'],
  // },
  // {
  //   title: 'Settlements',
  //   href: '/settlement',
  //   icon: 'Calculator',
  //   roles: ['super_admin', 'admin', 'billing_manager', 'finance_manager'],
  // },
  // {
  //   title: 'Payment Mapping',
  //   href: '/payment-mapping',
  //   icon: 'Link2',
  //   roles: ['super_admin', 'admin', 'finance_manager'],
  // },
  // {
  //   title: 'Collections',
  //   href: '/collections',
  //   icon: 'AlertCircle',
  //   roles: ['super_admin', 'admin', 'debt_collector', 'finance_manager'],
  // },
  // {
  //   title: 'Risk Management',
  //   href: '/risk-management',
  //   icon: 'Shield',
  //   roles: ['super_admin', 'admin', 'finance_manager'],
  // },
  // {
  //   title: 'Finance',
  //   href: '/finance',
  //   icon: 'DollarSign',
  //   roles: ['super_admin', 'admin', 'finance_manager'],
  // },
  // {
  //   title: 'Audit Trail',
  //   href: '/audit-trail',
  //   icon: 'FileSearch',
  //   roles: ['super_admin', 'admin', 'auditor'],
  // },
];
