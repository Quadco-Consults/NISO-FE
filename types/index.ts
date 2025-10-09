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
  | 'auditor'
  | 'entity_user'
  | 'viewer';

export type EntityType =
  | 'niso'
  | 'disco'
  | 'genco'
  | 'tcn'
  | 'tif'
  | 'nerc'
  | 'nbet'
  | 'ipp'
  | 'trader';

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  entityType: EntityType;
  entityId?: string; // Reference to specific entity (DisCo, GenCo, etc.)
  entityName?: string; // Name of the entity
  department?: string;
  phone?: string;
  avatar?: string;
  status: UserStatus;
  permissions: string[];
  lastLogin?: Date;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Permission Types
export type PermissionModule =
  | 'dashboard'
  | 'customers'
  | 'billing'
  | 'payments'
  | 'disbursements'
  | 'settlements'
  | 'collections'
  | 'treasury'
  | 'reconciliation'
  | 'reports'
  | 'audit'
  | 'users'
  | 'settings';

export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export';

export interface Permission {
  id: string;
  module: PermissionModule;
  action: PermissionAction;
  name: string;
  description: string;
}

export interface RolePermission {
  role: UserRole;
  permissions: Permission[];
}

// Entity/Organization Types
export interface Entity {
  id: string;
  name: string;
  code: string;
  type: EntityType;
  status: 'active' | 'inactive' | 'suspended';
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
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

// DISCO Statement Types
export type DiscoStatementStatus = 'draft' | 'pending_approval' | 'approved' | 'sent' | 'acknowledged' | 'disputed';

export interface DiscoCharge {
  discoId: string;
  discoCode: string;
  discoName: string;
  columnCode: string; // A, B, C, D, E, F, G, H, I, J, K
  amount: number;
  notes?: string;
}

export interface DiscoStatementLineItem {
  id: string;
  description: string;
  category: 'tsp' | 'mo' | 'so' | 'as' | 'nbet' | 'regulatory' | 'energy' | 'adjustment' | 'other';
  reference?: string; // NERC order reference
  baseAmount: number;
  adjustments: number;
  totalAmount: number;
  calculation?: string; // Formula or calculation method
}

export interface DiscoStatement {
  id: string;
  statementNumber: string;
  title: string;
  period: string; // e.g., "June 2025"
  month: number;
  year: number;
  recipientEntity: string; // e.g., "NIGERIA ELECTRICITY REGULATORY COMMISSION"
  recipientCode: string; // e.g., "REG.IND.001"
  representativeName: string;
  representativeTitle: string;
  address: string;

  // Charges breakdown
  discoCharges: DiscoCharge[];

  // Special items
  zungeruEnergyCreditNaira: number;

  // Totals
  totalAmount: number;
  outstandingPreviousMonth?: number;
  outstandingCurrentMonth: number;

  // Line items and calculations
  lineItems: DiscoStatementLineItem[];

  // Explanatory notes
  explanatoryNotes: string[];
  nercReferences: string[]; // NERC order references

  // Status and workflow
  status: DiscoStatementStatus;
  draftedBy?: string;
  draftedAt?: Date;
  approvedBy?: string;
  approvedAt?: Date;
  sentTo?: string;
  sentAt?: Date;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  disputeReason?: string;

  // Amounts in words
  amountInWords: string;

  // Metadata
  pdfUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DiscoStatementSummary {
  period: string;
  totalStatements: number;
  totalAmount: number;
  approvedCount: number;
  pendingCount: number;
  disputedCount: number;
  sentCount: number;
}

// DISCO Charge Categories (as per the statement structure)
export interface DiscoChargeBreakdown {
  tsp: number; // Transmission Service Provider
  mo: number; // Market Operator
  so: number; // System Operator
  as: number; // Ancillary Services
  nbet: number; // NBET charges
  regulatory: number; // Regulatory charges
  energyCharge: number;
  excessMYTO: number;
  tlf: number; // Transmission Loss Factor
  adjustments: number;
  total: number;
}

// Bilateral Statement Types
export type BilateralStatementStatus = 'draft' | 'pending_approval' | 'approved' | 'sent' | 'acknowledged' | 'disputed';
export type BilateralCurrency = 'USD' | 'NGN';

export interface BilateralTrade {
  id: string;
  buyer: string;
  seller: string;
  sellerCode: string; // e.g., IKEJA_I(PARAS), JEBBA_1
  currency: BilateralCurrency;
  amount: number;
  notes?: string;
}

export interface BilateralCharges {
  tspCharge: number; // Transmission Service Provider (A)
  soCharges: number; // System Operations (B)
  moCharges: number; // Market Operations (C)
  asCharges: number; // Ancillary Services (D)
  tcnRegulatory: number; // TCN Regulatory Charges (E)
  gencoRegulatory: number; // GENCO Regulatory Charges (F)
  total: number;
}

export interface BilateralStatement {
  id: string;
  statementNumber: string;
  title: string;
  period: string;
  month: number;
  year: number;

  // Recipient (usually NERC)
  recipientEntity: string;
  recipientCode: string;
  representativeName: string;
  representativeTitle: string;
  address: string;

  // Trade participants
  tradeParticipant1: string; // e.g., "IKEJA_I(PARAS) AND SBEE"
  tradeParticipant2?: string;

  // Seller information (for detail page)
  sellerName?: string;
  sellerCode?: string;
  sellerRepName?: string;
  sellerRepTitle?: string;
  sellerAddress?: string;

  // Bilateral trades list
  trades: BilateralTrade[];

  // Totals by currency
  totalUSD: number;
  totalNGN: number;
  outstandingUSD: number;
  outstandingNGN: number;

  // For individual trade detail (Page 2)
  charges?: BilateralCharges;
  chargesCurrency?: BilateralCurrency;

  // Amount in words
  amountInWordsUSD: string;
  amountInWordsNGN: string;

  // Explanatory notes
  explanatoryNotes: string[];
  nercReferences: string[];

  // Workflow
  status: BilateralStatementStatus;
  draftedBy?: string;
  draftedAt?: Date;
  approvedBy?: string;
  approvedAt?: Date;
  sentTo?: string;
  sentAt?: Date;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;

  // Metadata
  pdfUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BilateralStatementSummary {
  period: string;
  totalStatements: number;
  totalAmountUSD: number;
  totalAmountNGN: number;
  approvedCount: number;
  pendingCount: number;
  disputedCount: number;
  sentCount: number;
}

// ==========================================
// COMPREHENSIVE MARKET SETTLEMENT SYSTEM
// ==========================================

// Service Provider Categories (based on Images 1-3)
export type ServiceProviderCategory =
  | 'ancillary_services' // AS
  | 'nbet' // NBET
  | 'nerc' // NERC
  | 'niso' // NISO
  | 'tcn' // TCN (Transmission Company of Nigeria)
  | 'tsp' // TSP (Transmission Service Provider)
  | 'tif' // TIF (Transitional Electricity Market)
  | 'so' // SO (System Operator)
  | 'mo'; // MO (Market Operator)

// DISCO Invoice Line Item (Image 1 structure)
export interface DiscoInvoiceLineItem {
  id: string;
  discoId: string;
  discoCode: string;
  discoName: string;

  // Service Provider Charges (Column headers from Image 1)
  ancillaryServices: number; // Column A
  nbet: number; // Column B
  nerc: number; // Column C
  niso: number; // Column D
  tcn: number; // Column E
  tif: number; // Column F

  // Calculated fields
  grossInvoice: number; // G = SUM(A-F)
  netInvoice: number; // H = G - A (Net after Ancillary Services & TIF deductions)
}

// Trust Fund & DISCO Inflow (Image 2 structure)
export interface DiscoInflowRecord {
  id: string;
  discoId: string;
  discoCode: string;
  discoName: string;
  period: string;

  // Inflow sources
  trustFund: number; // Collections received
  txdxDeductions: number; // Tax deductions
  tifAmount: number; // TIF allocation

  // Calculated
  grossInflow: number; // Total inflow

  // Deductions
  ancillaryServicesDeduction: number; // 100% of AS charges
  servTifDeduction: number; // Service & TIF deductions

  // Disbursements to service providers
  tifDisbursement: number;
  nbetDisbursement: number;
  nercDisbursement: number;
  nisoDisbursement: number;
  tspDisbursement: number;

  // Performance Improvement Programs
  pipNiso: number; // PIP for NISO
  pipTsp: number; // PIP for TSP

  // Summary
  totalPip: number;
  tspAllocation: number;
  nisoAllocation: number;
  txdxFinal: number; // Final tax amount

  // ATFP Penalties
  atfpPenaltySo: number; // SO penalty - 55.04%
  atfpPenaltyTsp: number; // TSP penalty - 46.70%

  // Net disbursement
  netDisbursement: number;
}

// Disbursement to Service Providers (Image 3 structure)
export interface ServiceProviderDisbursement {
  id: string;
  discoId: string;
  discoCode: string;
  discoName: string;
  period: string;

  // Individual service provider amounts
  ancillaryServices: number;
  nbet: number;
  nerc: number;
  niso: number;
  tsp: number;
  pipNiso: number;
  pipTsp: number;
  txdxTsp: number;
  tif: number;

  // ATFP Penalties
  atfpPenaltySo: number;
  atfpPenaltyTsp: number;

  // Total disbursement to this provider
  totalDisbursement: number;
}

// DISCO Indebtedness (Image 4 structure)
export interface DiscoIndebtedness {
  id: string;
  discoId: string;
  discoCode: string;
  discoName: string;
  period: string;

  // Financial tracking
  totalInvoice: number; // Total amount invoiced
  totalInflow: number; // Total payments received
  shortfall: number; // Difference (Invoice - Inflow)
  shortfallPercentage: number; // (Shortfall / Invoice) * 100

  // Aging
  current: number;
  overdue30: number;
  overdue60: number;
  overdue90: number;
  overdue120Plus: number;

  lastPaymentDate?: Date;
  lastPaymentAmount?: number;
}

// Service Provider Indebtedness Matrix (Image 6 structure)
export interface ServiceProviderIndebtedness {
  id: string;
  period: string;
  discoId: string;
  discoCode: string;
  discoName: string;

  // Breakdown by service provider
  ancillaryServices: {
    invoice: number;
    payment: number;
    outstanding: number;
  };
  nbet: {
    invoice: number;
    payment: number;
    outstanding: number;
  };
  nerc: {
    invoice: number;
    payment: number;
    outstanding: number;
  };
  niso: {
    invoice: number;
    payment: number;
    outstanding: number;
  };
  tsp: {
    invoice: number;
    payment: number;
    outstanding: number;
  };
  tif: {
    invoice: number;
    payment: number;
    outstanding: number;
  };

  // Totals
  totalInvoice: number;
  totalPayment: number;
  totalOutstanding: number;
}

// TIF Payment Tracking (Image 5 structure)
export interface TifPaymentRecord {
  id: string;
  discoId: string;
  discoCode: string;
  discoName: string;
  period: string;

  totalInvoice: number;
  totalInflow: number;
  shortfall: number;
  shortfallPercentage: number;
}

// Market Operator Disbursement Schedule (Image 7 structure)
export interface MarketOperatorDisbursementSchedule {
  id: string;
  scheduleNumber: string;
  period: string;
  createdAt: Date;

  // Beneficiaries with bank details
  beneficiaries: {
    name: string;
    category: ServiceProviderCategory;
    bankName: string;
    accountNumber: string;
    accountDetails: string;
    invoice: number;
    totalInflow: number;
    grossPayments: number;
    txdxDeductions: number;
    pipDeductions: number;
    atfpPenalty: number;
    netPayment: number;
    comments?: string;
  }[];

  // Summary totals
  summary: {
    ancillaryService: { invoice: number; totalInflow: number; grossPayments: number; txdxDeductions: number; pipDeductions: number; atfpPenalty: number; netPayment: number };
    mo: { invoice: number; totalInflow: number; grossPayments: number; txdxDeductions: number; pipDeductions: number; atfpPenalty: number; netPayment: number };
    so: { invoice: number; totalInflow: number; grossPayments: number; txdxDeductions: number; pipDeductions: number; atfpPenalty: number; netPayment: number };
    nbet: { invoice: number; totalInflow: number; grossPayments: number; txdxDeductions: number; pipDeductions: number; atfpPenalty: number; netPayment: number };
    tsp: { invoice: number; totalInflow: number; grossPayments: number; txdxDeductions: number; pipDeductions: number; atfpPenalty: number; netPayment: number };
    nercTcn: { invoice: number; totalInflow: number; grossPayments: number; txdxDeductions: number; pipDeductions: number; atfpPenalty: number; netPayment: number };
    nercGenco: { invoice: number; totalInflow: number; grossPayments: number; txdxDeductions: number; pipDeductions: number; atfpPenalty: number; netPayment: number };
    nercDisco: { invoice: number; totalInflow: number; grossPayments: number; txdxDeductions: number; pipDeductions: number; atfpPenalty: number; netPayment: number };
    total: { invoice: number; totalInflow: number; grossPayments: number; txdxDeductions: number; pipDeductions: number; atfpPenalty: number; netPayment: number };
  };

  // BEDCO/PHEDC/BEDC specific data (if applicable)
  bedcData?: {
    invoice: number;
    totalInflow: number;
    grossPayments: number;
    txdxDeductions: number;
    pipDeductions: number;
    atfpPenalty: number;
    netPayment: number;
  };

  status: 'draft' | 'approved' | 'disbursed';
  approvedBy?: string;
  approvedAt?: Date;
  disbursedAt?: Date;
}

// Zungeru Energy Disbursement (Image 8 structure)
export interface ZungeruDisbursementSchedule {
  id: string;
  scheduleNumber: string;
  period: string;
  createdAt: Date;

  // Beneficiaries
  beneficiaries: {
    name: string;
    category: ServiceProviderCategory;
    bankName: string;
    accountNumber: string;
    grossInvoice: number; // MAR value
    totalInflow: number; // #REF! initially
    grossAmountPaid: number;
    pipDeduction: number; // 55.04% & 46.70% for gross invoice
    netPayment: number;
    comments?: string;
  }[];

  // Totals
  totalGrossInvoice: number;
  totalInflow: number;
  totalGrossPayment: number;
  totalPipDeduction: number;
  totalNetPayment: number;

  status: 'draft' | 'approved' | 'disbursed';
  approvedBy?: string;
  approvedAt?: Date;
}

// Regulatory Charge Disbursement (Image 9 - top section)
export interface RegulatoryChargeDisbursement {
  id: string;
  period: string;
  serviceProviderId: string;
  serviceProviderName: string;
  category: 'nerc_disco' | 'kogi_serc' | 'ekiti_serc' | 'enugu_serc' | 'ondo_serc';

  accountDetails: string;
  bankName: string;
  invoice: number;
  totalInflow: number;
  netPayment: number;

  createdAt: Date;
}

// Supplementary DISCO Disbursement (Image 9 - bottom section)
export interface SupplementaryDiscoDisbursement {
  id: string;
  period: string;
  beneficiaries: {
    name: string;
    category: ServiceProviderCategory;
    accountDetails: string;
    invoice: number;
    totalInflow: number;
    grossPayments: number;
    pipDeductions: number;
    netPayment: number;
  }[];

  // Implementation project tracking
  tcnPipImplementationProject?: {
    accountName: string;
    accountNumber: string;
    amount: number;
  };
  afamPowerPlc?: {
    accountName: string;
    accountNumber: string;
    amount: number;
  };

  totalInvoice: number;
  totalInflow: number;
  totalGrossPayments: number;
  totalPipDeductions: number;
  totalNetPayment: number;
}

// Dashboard Reports (Image 10 structure)
export interface DiscoPaymentReport {
  period: string;
  discoId: string;
  discoCode: string;
  discoName: string;

  // May 2025 Invoice
  mayInvoice: number;
  amountRemitted: number; // Payment received
  txdxNetOff: number; // Tax offset
  atfpPenalty: number;
  discoOutstanding: number; // Outstanding balance

  createdAt: Date;
}

export interface ZungeruPaymentReport {
  period: string;
  discoId: string;
  discoCode: string;
  discoName: string;

  // Zungeru specific
  mayInvoice: number;
  amountRemittedZungeru: number;
  discoOutstanding: number;

  createdAt: Date;
}

// Service Provider Payment Report (Image 10 - bottom section)
export interface ServiceProviderPaymentReport {
  period: string;

  ancillaryServices: {
    mayInvoice: number;
    amountDisbursed: number;
    pipAmount: number;
    outstanding: number;
  };
  mo: {
    mayInvoice: number;
    amountDisbursed: number;
    pipAmount: number;
    outstanding: number;
  };
  nbet: {
    mayInvoice: number;
    amountDisbursed: number;
    pipAmount: number;
    outstanding: number;
  };
  nerc: {
    mayInvoice: number;
    amountDisbursed: number;
    pipAmount: number;
    outstanding: number;
  };
  so: {
    mayInvoice: number;
    amountDisbursed: number;
    pipAmount: number;
    txdxDeductions: number;
    atfpPenalty: number;
    outstanding: number;
  };
  tsp: {
    mayInvoice: number;
    amountDisbursed: number;
    pipAmount: number;
    txdxDeductions: number;
    atfpPenalty: number;
    outstanding: number;
  };

  // Totals
  totalInvoice: number;
  totalDisbursed: number;
  totalPip: number;
  totalTxdx: number;
  totalAtfp: number;
  totalOutstanding: number;
}

// Multi-Period Tracking (Image 12 structure)
export interface MultiPeriodTracking {
  discoId: string;
  discoCode: string;
  discoName: string;

  // NISO columns for different periods
  nisoJune2024: number;
  nisoSept2024: number;
  nisoJune2025: number;

  // TIF Payment
  tifPaymentJune2025: number;

  // TXDX Net-Off
  txdxNetOffJuly2025: number;

  // Zungeru tracking
  zungeruJune2025: number;
  zungeruTifNetOffJune2025: number;

  // Totals
  total: number;
}

// Vesting Contract Revenue Summary (Image 12 - bottom table)
export interface VestingContractRevenueSummary {
  id: string;
  period: string;

  // All entities totals
  tcn: number;
  niso: number;
  tif: number;
  as: number; // Ancillary Services
  nbet: number;
  tcnNisoNerc: number;
  gencoNerc: number;
  discoNerc: number;

  // With Zungeru
  discoNercWithoutZungeru?: number;
  nercTotal: number;

  totalInvoiceAmount: number;

  createdAt: Date;
  updatedAt: Date;
}

// Comprehensive DISCO Financial Summary
export interface ComprehensiveDiscoFinancialSummary {
  period: string;
  discoId: string;
  discoCode: string;
  discoName: string;

  // Direct summary fields (for convenience)
  grossInvoice: number;
  netInvoice: number;
  totalInvoice: number;
  totalInflow: number;
  shortfall: number;

  // Invoice breakdown
  invoiceLineItem: DiscoInvoiceLineItem;

  // Inflow and disbursement
  inflowRecord: DiscoInflowRecord;

  // Indebtedness
  indebtedness: DiscoIndebtedness;
  serviceProviderIndebtedness: ServiceProviderIndebtedness;

  // TIF payments
  tifPayment: TifPaymentRecord;

  // Payment reports
  paymentReport: DiscoPaymentReport;
  zungeruReport: ZungeruPaymentReport;

  // Multi-period tracking
  multiPeriod: MultiPeriodTracking;

  createdAt: Date;
  updatedAt: Date;
}

// DISCO Financial Cycle (complete settlement cycle)
export interface DiscoFinancialCycle {
  id: string;
  cycleNumber: string;
  period: string;
  month: number;
  year: number;
  status: 'draft' | 'invoiced' | 'collecting' | 'disbursing' | 'reconciling' | 'closed';

  // All DISCOs summary
  discoSummaries: ComprehensiveDiscoFinancialSummary[];

  // Market operator schedules
  marketOperatorSchedule: MarketOperatorDisbursementSchedule;
  zungeruSchedule: ZungeruDisbursementSchedule;

  // Regulatory and supplementary
  regulatoryDisbursements: RegulatoryChargeDisbursement[];
  supplementaryDisbursements: SupplementaryDiscoDisbursement[];

  // Service provider reports
  serviceProviderReport: ServiceProviderPaymentReport;

  // Vesting contract
  vestingContractSummary: VestingContractRevenueSummary;

  // Cycle metadata
  startDate: Date;
  endDate: Date;
  invoicedAt?: Date;
  closedAt?: Date;
  closedBy?: string;

  createdAt: Date;
  updatedAt: Date;
}

// ==========================================
// DETAILED DISCO STATEMENT (Individual)
// Based on Port Harcourt statement structure
// ==========================================

// Charge Code Categories
export type DiscoChargeCodeCategory =
  | 'MET' // Metered Energy Charges
  | 'CEA' // Contract Excess Adjustment (AECC)
  | 'DLR' // Disco Loss of Revenue (LoRRD)
  | 'TLR' // TSP Loss of Revenue (LoRFT)
  | 'TL' // Transmission Loss Factor
  | 'LQD'; // Liquidated Damages / PPA Adjustments

// Service Provider Codes
export type ServiceProviderCode =
  | 'TSP' // Transmission Service Provider
  | 'SO' // System Operator
  | 'TIF' // Transmission Infrastructure Fund
  | 'ANC' // Ancillary Services
  | 'NBET' // Nigerian Bulk Electricity Trader
  | 'GRC' // GENCO Regulatory Charge
  | 'TRC' // TCN/NISO Regulatory Charge
  | 'DRC' // DISCO Regulatory Charge
  | 'DTD' // TCN Capacity Use Refund
  | 'GSD' // Grid Use Balancing
  | 'GDT'; // TCN Portion of Shared Liquidated Damages

// Individual Charge Line Item
export interface DiscoStatementChargeLineItem {
  id: string;
  chargeCode: string; // e.g., "1.1 MET.TSP", "2.1 CEA.TSP"
  category: DiscoChargeCodeCategory;
  serviceProvider: ServiceProviderCode;
  description: string;
  notes: string; // A, B, C, D, etc.
  amount: number;
  sequence: number; // For ordering (1.1, 1.2, 2.1, etc.)
}

// Energy Accounting (Table 1 - KWh level)
export interface ContractEnergyAccounting {
  discoId: string;
  discoCode: string;
  discoName: string;
  period: string;

  // Column I - Metered Reading
  meterReadingKwh: number;

  // Column II - MYTO Excess Adjustment
  mytoExcessAdjustmentKwh: number;

  // Column III - DISCO Energy Deficit
  discoEnergyDeficitKwh: number;

  // Column IV - TCN Deficit
  tcnDeficitKwh: number;

  // Column TLF - Transmission Loss Factor
  transmissionLossFactorKwh: number;

  // Column V - Bilateral Meter Reading (if applicable)
  bilateralMeterReadingKwh?: number;

  // Total
  totalKwh: number;

  // Generation shortage tracking
  mytoRequirementKwh: number;
  generationShortageKwh: number;
  adjustedMytoKwh: number;
}

// Invoice Derivation (Table 2 - Naira level)
export interface InvoiceDerivation {
  discoId: string;
  discoCode: string;
  discoName: string;
  period: string;
  notes: string; // A, B, C, etc.

  // Service provider details
  entity: string; // TCN, NISO, TIF, AS, NBET, etc.
  ratePerKwh: number;

  // Column I - Meter Reading Billing
  meterReadingBilling: number;

  // Column II - MYTO Excess Adjustment
  mytoExcessAdjustment: number;

  // Column III - Loss of Revenue: Disco to Service Providers
  lossOfRevenueDiscoToSp: number;

  // Column IV - Loss of Revenue: TCN to Service Providers/Disco
  lossOfRevenueTcnToSpOrDisco: number;

  // Column TLF - Transmission Loss Factor Gain/Loss
  tlf: number;

  // Column V (optional) - Bilateral Meter Reading
  bilateralMeterReading?: number;

  // Total
  total: number;
}

// Detailed Individual DISCO Statement
export interface DetailedDiscoStatement {
  id: string;
  statementNumber: string;
  period: string;
  month: number;
  year: number;

  // Participant details
  participantName: string; // e.g., "PORT HARCOURT ELECTRICITY DISTRIBUTION PLC"
  contractId: string; // e.g., "NBET/035"
  participantRepName: string;
  participantRepAddress: string;

  // Title
  title: string; // "FINAL MARKET SETTLEMENT STATEMENT: JUNE 2025 Total"

  // All charge line items (grouped by category)
  chargeLineItems: DiscoStatementChargeLineItem[];

  // Subtotals by category
  meteredEnergyChargesTotal: number; // Section 1
  contractExcessAdjustmentTotal: number; // Section 2
  discoLossOfRevenueTotal: number; // Section 3
  tspLossOfRevenueTotal: number; // Section 4
  transmissionLossFactorTotal: number; // Section 5
  ppAdjustmentsTotal: number; // Section 6

  // Zungeru Energy Credit
  zungeruEnergyCreditNaira: number;

  // Period total
  june2025Total: number;

  // Outstanding
  outstandingInvoices: number;
  currentAmountDue: number;

  // Amount in words
  amountInWords: string;

  // Energy accounting tables
  energyAccounting: ContractEnergyAccounting;
  invoiceDerivations: InvoiceDerivation[];

  // Explanatory notes (18 detailed notes)
  explanatoryNotes: DiscoStatementExplanatoryNote[];

  // Workflow
  status: DiscoStatementStatus;
  draftedBy?: string;
  draftedAt?: Date;
  approvedBy?: string;
  approvedAt?: Date;
  sentTo?: string;
  sentAt?: Date;

  // Metadata
  pdfUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Explanatory Note Structure
export interface DiscoStatementExplanatoryNote {
  id: string;
  noteNumber: number;
  category: 'regulation' | 'calculation' | 'reference' | 'formula' | 'shortage' | 'other';
  title?: string;
  content: string;
  subNotes?: {
    letter: string; // a, b, c
    content: string;
  }[];
  nercReference?: string; // e.g., "NERC/2023/034", "NERC/15/0011"
  tableReference?: string; // e.g., "Table 1", "Column IV"
}

// MYTO (Multi-Year Tariff Order) Allocation
export interface MytoAllocation {
  discoId: string;
  discoCode: string;
  discoName: string;
  period: string;

  // MYTO requirement
  mytoRequirementKwh: number;

  // Actual allocation
  actualAllocationKwh: number;

  // Excess (if any)
  excessKwh: number;

  // Deficit (if any)
  deficitKwh: number;

  // Generation shortage
  generationShortageKwh: number;

  // Adjusted MYTO
  adjustedMytoKwh: number;
}

// Loss of Revenue Calculation
export interface LossOfRevenueCalculation {
  id: string;
  discoId: string;
  discoCode: string;
  discoName: string;
  period: string;

  // Disco to Service Providers (Section 3)
  discoToSpEnergyKwh: number;
  discoToSpRatePerKwh: number;
  discoToSpTotal: number;

  // TCN to Disco/Service Providers (Section 4)
  tcnToDiscoEnergyKwh: number;
  tcnToDiscoRatePerKwh: number;
  tcnToDiscoTotal: number;

  // Net compensation
  netCompensation: number;
}

// Transmission Loss Factor (TLF) Calculation
export interface TlfCalculation {
  id: string;
  discoId: string;
  discoCode: string;
  discoName: string;
  period: string;

  // TLF values
  actualTlf: number; // Actual percentage
  benchmarkTlf: number; // 7.00%
  tlfDifference: number;

  // Energy impact
  tlfEnergyGainLossKwh: number;

  // Financial impact
  averageCostOfGeneration: number; // N/KWh
  tlfAmountNaira: number;

  // Applied to
  appliedToDiscos: boolean;
  appliedToTsp: boolean;
}

// PPA (Power Purchase Agreement) Adjustments
export interface PpaAdjustment {
  id: string;
  type: 'capacity_refund' | 'grid_balancing' | 'liquidated_damages';
  discoId: string;
  discoCode: string;
  period: string;

  // Capacity refund
  tcnCapacityRefundKwh?: number;
  tcnCapacityRefundNaira?: number;

  // Grid use balancing
  gridUseBalancingCreditOrDebit?: number;

  // Liquidated damages
  totalGencoLiquidatedDamageKwh?: number;
  totalGencoLiquidatedDamageNaira?: number;
  discoPortionPercentage?: number;
  discoPortionKwh?: number;
  discoPortionNaira?: number;

  // Refund to TSP
  refundToTsp?: number;
}

// Generation Shortage Tracking
export interface GenerationShortage {
  id: string;
  period: string;

  // Shortage details
  mytoRequirementKwh: number;
  generationShortageKwh: number;
  adjustedMytoKwh: number;

  // Impact on DISCOs
  affectedDiscos: {
    discoId: string;
    discoCode: string;
    allocationReductionKwh: number;
    financialImpact: number;
  }[];

  // Total impact
  totalShortageKwh: number;
  totalFinancialImpact: number;

  notes: string;
}
