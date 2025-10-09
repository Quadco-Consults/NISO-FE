import type { Permission, RolePermission, UserRole } from '@/types';

// Define all available permissions
export const ALL_PERMISSIONS: Permission[] = [
  // Dashboard
  { id: 'dashboard:view', module: 'dashboard', action: 'view', name: 'View Dashboard', description: 'Access to dashboard and statistics' },

  // Customers
  { id: 'customers:view', module: 'customers', action: 'view', name: 'View Customers', description: 'View customer list and details' },
  { id: 'customers:create', module: 'customers', action: 'create', name: 'Create Customers', description: 'Create new customers' },
  { id: 'customers:edit', module: 'customers', action: 'edit', name: 'Edit Customers', description: 'Edit customer information' },
  { id: 'customers:delete', module: 'customers', action: 'delete', name: 'Delete Customers', description: 'Delete customers' },

  // Billing
  { id: 'billing:view', module: 'billing', action: 'view', name: 'View Invoices', description: 'View invoices and billing information' },
  { id: 'billing:create', module: 'billing', action: 'create', name: 'Create Invoices', description: 'Create new invoices' },
  { id: 'billing:edit', module: 'billing', action: 'edit', name: 'Edit Invoices', description: 'Edit draft invoices' },
  { id: 'billing:delete', module: 'billing', action: 'delete', name: 'Delete Invoices', description: 'Delete draft invoices' },
  { id: 'billing:approve', module: 'billing', action: 'approve', name: 'Approve Invoices', description: 'Approve invoices for sending' },
  { id: 'billing:export', module: 'billing', action: 'export', name: 'Export Invoices', description: 'Export invoice data' },

  // Payments
  { id: 'payments:view', module: 'payments', action: 'view', name: 'View Payments', description: 'View payment records' },
  { id: 'payments:create', module: 'payments', action: 'create', name: 'Record Payments', description: 'Record new payments' },
  { id: 'payments:edit', module: 'payments', action: 'edit', name: 'Edit Payments', description: 'Edit payment records' },
  { id: 'payments:delete', module: 'payments', action: 'delete', name: 'Delete Payments', description: 'Delete payment records' },
  { id: 'payments:approve', module: 'payments', action: 'approve', name: 'Approve Payments', description: 'Approve payment allocations' },
  { id: 'payments:export', module: 'payments', action: 'export', name: 'Export Payments', description: 'Export payment data' },

  // Disbursements
  { id: 'disbursements:view', module: 'disbursements', action: 'view', name: 'View Disbursements', description: 'View disbursement records' },
  { id: 'disbursements:create', module: 'disbursements', action: 'create', name: 'Create Disbursements', description: 'Create disbursement requests' },
  { id: 'disbursements:edit', module: 'disbursements', action: 'edit', name: 'Edit Disbursements', description: 'Edit disbursement records' },
  { id: 'disbursements:delete', module: 'disbursements', action: 'delete', name: 'Delete Disbursements', description: 'Delete disbursement records' },
  { id: 'disbursements:approve', module: 'disbursements', action: 'approve', name: 'Approve Disbursements', description: 'Approve disbursement requests' },
  { id: 'disbursements:export', module: 'disbursements', action: 'export', name: 'Export Disbursements', description: 'Export disbursement data' },

  // Settlements
  { id: 'settlements:view', module: 'settlements', action: 'view', name: 'View Settlements', description: 'View settlement records' },
  { id: 'settlements:create', module: 'settlements', action: 'create', name: 'Create Settlements', description: 'Create settlement runs' },
  { id: 'settlements:edit', module: 'settlements', action: 'edit', name: 'Edit Settlements', description: 'Edit settlement records' },
  { id: 'settlements:approve', module: 'settlements', action: 'approve', name: 'Approve Settlements', description: 'Approve settlement runs' },

  // Collections
  { id: 'collections:view', module: 'collections', action: 'view', name: 'View Collections', description: 'View debt and collection records' },
  { id: 'collections:create', module: 'collections', action: 'create', name: 'Create Collections', description: 'Create collection activities' },
  { id: 'collections:edit', module: 'collections', action: 'edit', name: 'Edit Collections', description: 'Edit collection records' },
  { id: 'collections:export', module: 'collections', action: 'export', name: 'Export Collections', description: 'Export collection data' },

  // Treasury
  { id: 'treasury:view', module: 'treasury', action: 'view', name: 'View Treasury', description: 'View treasury dashboard and liquidity' },
  { id: 'treasury:create', module: 'treasury', action: 'create', name: 'Create Treasury Records', description: 'Create cash forecasts' },
  { id: 'treasury:edit', module: 'treasury', action: 'edit', name: 'Edit Treasury Records', description: 'Edit treasury records' },
  { id: 'treasury:export', module: 'treasury', action: 'export', name: 'Export Treasury Data', description: 'Export treasury reports' },

  // Reconciliation
  { id: 'reconciliation:view', module: 'reconciliation', action: 'view', name: 'View Reconciliation', description: 'View reconciliation records' },
  { id: 'reconciliation:create', module: 'reconciliation', action: 'create', name: 'Create Reconciliation', description: 'Create reconciliation records' },
  { id: 'reconciliation:edit', module: 'reconciliation', action: 'edit', name: 'Edit Reconciliation', description: 'Edit reconciliation records' },
  { id: 'reconciliation:approve', module: 'reconciliation', action: 'approve', name: 'Approve Reconciliation', description: 'Approve reconciliations' },

  // Reports
  { id: 'reports:view', module: 'reports', action: 'view', name: 'View Reports', description: 'Access reports and analytics' },
  { id: 'reports:export', module: 'reports', action: 'export', name: 'Export Reports', description: 'Export report data' },

  // Audit
  { id: 'audit:view', module: 'audit', action: 'view', name: 'View Audit Trail', description: 'View system audit logs' },
  { id: 'audit:export', module: 'audit', action: 'export', name: 'Export Audit Logs', description: 'Export audit trail data' },

  // Users
  { id: 'users:view', module: 'users', action: 'view', name: 'View Users', description: 'View user accounts' },
  { id: 'users:create', module: 'users', action: 'create', name: 'Create Users', description: 'Create new user accounts' },
  { id: 'users:edit', module: 'users', action: 'edit', name: 'Edit Users', description: 'Edit user accounts' },
  { id: 'users:delete', module: 'users', action: 'delete', name: 'Delete Users', description: 'Delete user accounts' },

  // Settings
  { id: 'settings:view', module: 'settings', action: 'view', name: 'View Settings', description: 'View system settings' },
  { id: 'settings:edit', module: 'settings', action: 'edit', name: 'Edit Settings', description: 'Modify system settings' },
];

// Role-based permission assignments
export const ROLE_PERMISSIONS: RolePermission[] = [
  {
    role: 'super_admin',
    permissions: ALL_PERMISSIONS, // Full access
  },
  {
    role: 'admin',
    permissions: ALL_PERMISSIONS.filter(p => p.id !== 'settings:edit'), // All except settings modification
  },
  {
    role: 'finance_manager',
    permissions: ALL_PERMISSIONS.filter(p =>
      ['dashboard', 'payments', 'disbursements', 'treasury', 'reconciliation', 'reports'].includes(p.module) &&
      p.action !== 'delete'
    ),
  },
  {
    role: 'billing_manager',
    permissions: ALL_PERMISSIONS.filter(p =>
      ['dashboard', 'customers', 'billing', 'settlements', 'reports'].includes(p.module)
    ),
  },
  {
    role: 'debt_collector',
    permissions: ALL_PERMISSIONS.filter(p =>
      ['dashboard', 'customers', 'collections', 'reports'].includes(p.module) &&
      p.action !== 'delete'
    ),
  },
  {
    role: 'auditor',
    permissions: ALL_PERMISSIONS.filter(p =>
      p.action === 'view' || p.action === 'export'
    ),
  },
  {
    role: 'entity_user',
    permissions: ALL_PERMISSIONS.filter(p =>
      ['dashboard', 'billing', 'payments', 'reports'].includes(p.module) &&
      p.action === 'view'
    ),
  },
  {
    role: 'viewer',
    permissions: ALL_PERMISSIONS.filter(p => p.action === 'view'),
  },
  {
    role: 'grid_operator',
    permissions: ALL_PERMISSIONS.filter(p =>
      ['dashboard', 'reports'].includes(p.module)
    ),
  },
  {
    role: 'market_operator',
    permissions: ALL_PERMISSIONS.filter(p =>
      ['dashboard', 'customers', 'settlements', 'reports'].includes(p.module)
    ),
  },
  {
    role: 'customer_service',
    permissions: ALL_PERMISSIONS.filter(p =>
      ['dashboard', 'customers', 'reports'].includes(p.module) &&
      p.action !== 'delete'
    ),
  },
];

// Helper function to get permissions for a role
export function getPermissionsForRole(role: UserRole): Permission[] {
  const rolePermission = ROLE_PERMISSIONS.find(rp => rp.role === role);
  return rolePermission?.permissions || [];
}

// Helper function to check if a role has a specific permission
export function hasPermission(role: UserRole, permissionId: string): boolean {
  const permissions = getPermissionsForRole(role);
  return permissions.some(p => p.id === permissionId);
}

// Helper function to check if a role has permission for module and action
export function hasModulePermission(role: UserRole, module: string, action: string): boolean {
  const permissions = getPermissionsForRole(role);
  return permissions.some(p => p.module === module && p.action === action);
}
