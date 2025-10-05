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

// Service Provider Types
export type ServiceProviderType = 'market_operator' | 'system_operator' | 'transmission_service_provider' | 'nerc' | 'nbet';
export type ServiceProviderStatus = 'active' | 'inactive' | 'suspended';

export interface ServiceProvider {
  id: string;
  name: string;
  code: string;
  type: ServiceProviderType;
  status: ServiceProviderStatus;
  bankName: string;
  accountNumber: string;
  accountName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  allocationPercentage?: number;
  currentBalance: number;
  totalDisbursed: number;
  createdAt: Date;
  updatedAt: Date;
}

// Disbursement Types
export type DisbursementStatus = 'draft' | 'pending_approval' | 'approved' | 'processing' | 'completed' | 'failed' | 'rejected';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface Disbursement {
  id: string;
  disbursementNumber: string;
  serviceProviderId: string;
  serviceProviderName: string;
  amount: number;
  purpose: string;
  period: string;
  status: DisbursementStatus;
  paymentMethod: 'bank_transfer' | 'direct_credit' | 'remita';
  bankName?: string;
  accountNumber?: string;
  referenceNumber?: string;
  approvalLevel: number;
  currentApprover?: string;
  requestedBy: string;
  requestedAt: Date;
  approvedAt?: Date;
  disbursedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DisbursementApproval {
  id: string;
  disbursementId: string;
  approverName: string;
  approverRole: string;
  level: number;
  status: ApprovalStatus;
  comments?: string;
  approvedAt?: Date;
  createdAt: Date;
}

export interface PaymentAdvice {
  id: string;
  disbursementId: string;
  adviceNumber: string;
  serviceProviderId: string;
  serviceProviderName: string;
  amount: number;
  period: string;
  issuedDate: Date;
  pdfUrl?: string;
  status: 'draft' | 'issued' | 'sent';
  createdAt: Date;
}

// Bank Account Types
export type BankAccountType = 'collection' | 'disbursement' | 'operational' | 'reserve';
export type BankAccountStatus = 'active' | 'inactive' | 'frozen';

export interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankCode: string;
  type: BankAccountType;
  currency: string;
  currentBalance: number;
  availableBalance: number;
  status: BankAccountStatus;
  isDefault: boolean;
  lastReconciled?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BankTransaction {
  id: string;
  accountId: string;
  transactionDate: Date;
  valueDate: Date;
  description: string;
  reference: string;
  debit: number;
  credit: number;
  balance: number;
  reconciled: boolean;
  reconciledBy?: string;
  reconciledAt?: Date;
  createdAt: Date;
}

// Reconciliation Types
export type ReconciliationStatus = 'pending' | 'in_progress' | 'completed' | 'disputed';
export type MatchStatus = 'matched' | 'unmatched' | 'partially_matched' | 'disputed';

export interface Reconciliation {
  id: string;
  reconciliationNumber: string;
  accountId: string;
  accountName: string;
  period: string;
  startDate: Date;
  endDate: Date;
  openingBalance: number;
  closingBalance: number;
  bankBalance: number;
  variance: number;
  totalMatched: number;
  totalUnmatched: number;
  status: ReconciliationStatus;
  reconciledBy?: string;
  reconciledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReconciliationItem {
  id: string;
  reconciliationId: string;
  bankTransactionId?: string;
  systemTransactionId?: string;
  transactionDate: Date;
  description: string;
  reference: string;
  amount: number;
  matchStatus: MatchStatus;
  variance?: number;
  comments?: string;
  matchedBy?: string;
  matchedAt?: Date;
  createdAt: Date;
}

// Treasury Dashboard Types
export interface LiquidityPosition {
  id: string;
  date: Date;
  totalCash: number;
  availableCash: number;
  committedCash: number;
  expectedInflows: number;
  expectedOutflows: number;
  projectedBalance: number;
  createdAt: Date;
}

export interface CashForecast {
  id: string;
  period: string;
  forecastDate: Date;
  expectedCollections: number;
  expectedDisbursements: number;
  expectedOperationalExpenses: number;
  projectedBalance: number;
  confidenceLevel: 'high' | 'medium' | 'low';
  notes?: string;
  createdAt: Date;
}

// Risk Management Types
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type AlertType = 'liquidity' | 'credit' | 'operational' | 'compliance' | 'payment_delay';
export type AlertPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface RiskAlert {
  id: string;
  alertType: AlertType;
  priority: AlertPriority;
  riskLevel: RiskLevel;
  title: string;
  description: string;
  affectedEntity?: string;
  amount?: number;
  threshold?: number;
  status: 'open' | 'acknowledged' | 'resolved' | 'escalated';
  assignedTo?: string;
  acknowledgedAt?: Date;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RiskMetric {
  id: string;
  metricType: 'liquidity_ratio' | 'collection_rate' | 'debt_ratio' | 'payment_delay';
  value: number;
  threshold: number;
  status: 'normal' | 'warning' | 'critical';
  date: Date;
  createdAt: Date;
}

// Invoice-Payment Mapping Types
export interface InvoicePaymentMapping {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  paymentId: string;
  paymentNumber: string;
  customerId: string;
  customerName: string;
  invoiceAmount: number;
  allocatedAmount: number;
  remainingAmount: number;
  allocationDate: Date;
  allocatedBy: string;
  status: 'partial' | 'full' | 'overpaid';
  createdAt: Date;
}

// Audit Trail Types
export type AuditAction = 'create' | 'update' | 'delete' | 'approve' | 'reject' | 'disburse' | 'reconcile' | 'export';
export type AuditModule = 'invoice' | 'payment' | 'disbursement' | 'reconciliation' | 'customer' | 'service_provider' | 'user';

export interface AuditLog {
  id: string;
  module: AuditModule;
  action: AuditAction;
  entityId: string;
  entityType: string;
  userId: string;
  userName: string;
  userRole: string;
  description: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
  createdAt: Date;
}

// Regulatory Report Types
export type ReportType = 'monthly_settlement' | 'quarterly_financial' | 'annual_compliance' | 'debt_aging' | 'disbursement_summary' | 'collection_report';
export type ReportStatus = 'draft' | 'generating' | 'completed' | 'submitted' | 'failed';

export interface RegulatoryReport {
  id: string;
  reportNumber: string;
  reportType: ReportType;
  title: string;
  period: string;
  startDate: Date;
  endDate: Date;
  status: ReportStatus;
  generatedBy: string;
  generatedAt?: Date;
  submittedTo?: string;
  submittedAt?: Date;
  fileUrl?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
