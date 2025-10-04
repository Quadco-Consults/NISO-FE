// User & Authentication Types
export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'grid_operator'
  | 'market_operator'
  | 'billing_manager'
  | 'finance_manager'
  | 'debt_collector'
  | 'customer_service'
  | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Customer Types
export type CustomerType = 'disco' | 'genco' | 'ipp' | 'trader';
export type CustomerStatus = 'active' | 'inactive' | 'suspended' | 'disconnected';

export interface Customer {
  id: string;
  name: string;
  type: CustomerType;
  status: CustomerStatus;
  email: string;
  phone: string;
  address: string;
  registrationNumber: string;
  creditLimit: number;
  currentBalance: number;
  outstandingDebt: number;
  contactPerson: string;
  contractStartDate: Date;
  contractEndDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Grid Operations Types
export interface GridMetrics {
  frequency: number;
  voltage: number;
  activePower: number;
  reactivePower: number;
  timestamp: Date;
}

export interface GenerationUnit {
  id: string;
  name: string;
  gencoId: string;
  capacity: number;
  currentOutput: number;
  status: 'online' | 'offline' | 'maintenance';
  fuel: string;
  location: string;
}

export interface DispatchSchedule {
  id: string;
  gencoId: string;
  unitId: string;
  scheduledOutput: number;
  actualOutput?: number;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
}

// Billing Types
export type InvoiceStatus = 'draft' | 'pending' | 'sent' | 'paid' | 'overdue' | 'cancelled';
export type InvoiceType = 'energy' | 'transmission' | 'ancillary' | 'penalty' | 'other';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  type: InvoiceType;
  amount: number;
  tax: number;
  totalAmount: number;
  status: InvoiceStatus;
  issueDate: Date;
  dueDate: Date;
  paidDate?: Date;
  paidAmount?: number;
  billingPeriodStart: Date;
  billingPeriodEnd: Date;
  energyConsumed?: number;
  rate?: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceLineItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  tax: number;
}

// Settlement Types
export type SettlementStatus = 'pending' | 'initial' | 'interim' | 'final' | 'disputed';

export interface Settlement {
  id: string;
  settlementNumber: string;
  customerId: string;
  customerName: string;
  period: string;
  status: SettlementStatus;
  scheduledEnergy: number;
  actualEnergy: number;
  imbalanceVolume: number;
  imbalanceAmount: number;
  totalAmount: number;
  runDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reconciliation {
  id: string;
  settlementId: string;
  runNumber: number;
  runDate: Date;
  previousAmount: number;
  adjustedAmount: number;
  variance: number;
  varianceReason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: Date;
}

// Payment Types
export type PaymentMethod = 'bank_transfer' | 'card' | 'direct_debit' | 'check' | 'cash';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  paymentNumber: string;
  customerId: string;
  customerName: string;
  invoiceId?: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  referenceNumber: string;
  bankName?: string;
  transactionDate: Date;
  valueDate?: Date;
  receiptUrl?: string;
  notes?: string;
  processedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentAllocation {
  id: string;
  paymentId: string;
  invoiceId: string;
  allocatedAmount: number;
  createdAt: Date;
}

// Debt Management Types
export type DebtStatus = 'current' | 'overdue_30' | 'overdue_60' | 'overdue_90' | 'legal' | 'written_off';
export type CollectionAction = 'reminder' | 'warning' | 'disconnection_notice' | 'legal_action' | 'payment_plan';

export interface Debt {
  id: string;
  customerId: string;
  customerName: string;
  totalDebt: number;
  currentAmount: number;
  overdue30: number;
  overdue60: number;
  overdue90: number;
  overdueAbove90: number;
  status: DebtStatus;
  lastPaymentDate?: Date;
  lastContactDate?: Date;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionActivity {
  id: string;
  debtId: string;
  customerId: string;
  action: CollectionAction;
  description: string;
  dueDate?: Date;
  completedDate?: Date;
  outcome?: string;
  createdBy: string;
  createdAt: Date;
}

export interface PaymentPlan {
  id: string;
  customerId: string;
  debtId: string;
  totalAmount: number;
  installmentAmount: number;
  numberOfInstallments: number;
  paidInstallments: number;
  frequency: 'weekly' | 'monthly' | 'quarterly';
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'defaulted' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Market Operations Types
export interface MarketParticipant {
  id: string;
  name: string;
  type: CustomerType;
  licenseNumber: string;
  capacity: number;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
}

export interface BilateralContract {
  id: string;
  contractNumber: string;
  sellerId: string;
  buyerId: string;
  contractedCapacity: number;
  rate: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'terminated';
  createdAt: Date;
}

// Financial Types
export interface AccountsReceivable {
  id: string;
  customerId: string;
  customerName: string;
  totalInvoiced: number;
  totalPaid: number;
  outstanding: number;
  current: number;
  overdue30: number;
  overdue60: number;
  overdue90: number;
  lastUpdated: Date;
}

export interface CashFlow {
  id: string;
  date: Date;
  description: string;
  category: 'operational' | 'investment' | 'financing';
  type: 'inflow' | 'outflow';
  amount: number;
  balance: number;
  createdAt: Date;
}

// Dashboard & Analytics Types
export interface DashboardStats {
  totalRevenue: number;
  outstandingReceivables: number;
  totalDebt: number;
  collectionRate: number;
  activeCustomers: number;
  pendingInvoices: number;
  overdueInvoices: number;
  todayPayments: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter & Search Types
export interface TableFilters {
  search?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  customerId?: string;
  [key: string]: string | Date | undefined;
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}
