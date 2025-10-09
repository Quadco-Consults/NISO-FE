# Comprehensive DISCO Financial Settlement System

## Overview

This document describes the **complete Market Settlement and Disbursement System** for the Nigerian power sector, based on the actual financial documents and workflows used by NISO (Nigeria Independent System Operator).

## System Architecture

### **The Complete Financial Cycle**

```
┌─────────────────────────────────────────────────────────────┐
│                    MONTHLY SETTLEMENT CYCLE                  │
│                     (e.g., June 2025)                        │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   ┌────▼────┐          ┌────▼────┐          ┌────▼────┐
   │INVOICING│          │COLLECTING│         │DISBURSING│
   │ (Day 1-5│          │ (Day 1-25│         │(Day 26-30│
   └────┬────┘          └────┬────┘          └────┬────┘
        │                    │                     │
        ▼                    ▼                     ▼
   [11 DISCOs]          [Trust Fund]         [9 Service
   Receive bills        Collections          Providers]
   from 6 providers     tracked              Receive funds
```

### **Financial Flow Diagram**

```
                    ┌─────────────┐
                    │   DISCOs    │
                    │   (11)      │
                    └──────┬──────┘
                           │
                    [Collections]
                           │
                    ┌──────▼──────┐
                    │ TRUST FUND  │
                    │   (NISO)    │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐      ┌─────▼─────┐     ┌─────▼─────┐
   │  TXDX   │      │    PIP    │     │   GROSS   │
   │(Tax 5%) │      │  (10%)    │     │  PAYMENT  │
   └─────────┘      └───────────┘     └─────┬─────┘
                                             │
                    ┌────────────────────────┼────────────────────────┐
                    │                        │                        │
              ┌─────▼─────┐         ┌──────▼──────┐          ┌──────▼──────┐
              │   NBET    │         │     TCN     │          │    NERC     │
              │   NISO    │         │     TIF     │          │     SO      │
              │    AS     │         │     TSP     │          │     MO      │
              └───────────┘         └─────────────┘          └─────────────┘
                Service               Transmission            Regulatory
                Providers             & Market Ops            & Oversight
```

## Key Components

### **1. DISCO Invoice Structure (Image 1)**

Each DISCO receives monthly invoices from 6 service provider categories:

| Column | Provider | Description |
|--------|----------|-------------|
| **A** | Ancillary Services | Grid stabilization services |
| **B** | NBET | Nigerian Bulk Electricity Trading |
| **C** | NERC | Regulatory commission fees |
| **D** | NISO | System operator charges |
| **E** | TCN | Transmission company charges |
| **F** | TIF | Transitional electricity market fund |
| **G** | Gross Invoice | SUM(A-F) |
| **H** | Net Invoice | G - (Deductions) |

**June 2025 Totals (All 11 DISCOs):**
- **Ancillary Services**: ₦952,343,843.12
- **NBET**: ₦324,831,174.98
- **NERC**: ₦6,007,856,138.74
- **NISO**: ₦3,425,000,804.82
- **TCN**: ₦4,633,037,861.86
- **TIF**: ₦5,596,081,746.08
- **GROSS INVOICE**: ₦20,939,151,569.61
- **NET INVOICE**: ₦14,390,725,980.41

### **2. Trust Fund & Collections (Image 2)**

**Collection Flow:**
1. DISCOs pay into Trust Fund (managed by NISO)
2. NISO tracks inflows per DISCO
3. Deductions applied:
   - **TXDX** (Tax): ~5%
   - **TIF**: Allocated amount
   - **ATFP Penalties**:
     - SO: 55.04%
     - TSP: 46.70%

**Disbursement Calculation:**
```
Trust Fund Inflow
  - TXDX Deductions (5%)
  - TIF Amount
  - PIP Deductions (10%)
  - ATFP Penalties
  = Net Disbursement
```

### **3. Service Provider Disbursements (Image 3)**

Each DISCO's payments are allocated to service providers:

**Categories:**
- Ancillary Services
- NBET
- NERC
- NISO
- TSP
- PIP (NISO)
- PIP (TSP)
- TXDX (TSP)
- TIF
- ATFP Penalty (SO)
- ATFP Penalty (TSP)

**Example (Abuja DISCO - June 2025):**
- Ancillary Services: ₦150,345,672.24
- NBET: ₦51,280,807.58
- NERC: ₦930,938,595.76
- NISO: ₦540,701,819.15
- TSP: ₦1,151,942,125.00
- TIF: ₦883,448,428.97
- **Total**: ₦3,708,657,448.70

### **4. Indebtedness Tracking (Images 4-6)**

**DISCO Indebtedness (Image 4):**
- Total Invoice vs Total Inflow
- Shortfall calculation
- Shortfall percentage
- Aging buckets: Current, 30+, 60+, 90+ days

**TIF Indebtedness (Image 5):**
- Specific TIF tracking
- Shortfall: ₦221,147,814.81

**Service Provider Matrix (Image 6):**
- Detailed breakdown per DISCO per provider
- Columns: Invoice, Payment, Outstanding
- Rows: Each DISCO (11 total)
- Sub-sections: AS, NBET, NERC, NISO, TSP, TIF

### **5. Market Operator Disbursement (Image 7)**

**Schedule Structure:**
- Beneficiary details (name, bank, account)
- Invoice amounts
- Total inflow
- Gross payments
- TXDX deductions
- PIP deductions
- ATFP penalties
- **Net payment**

**Summary Totals:**
- Ancillary Service
- MO (Market Operator)
- SO (System Operator)
- NBET
- TSP
- NERC TCN
- NERC GENCO
- NERC DISCO
- **Grand Total**

### **6. Zungeru Energy Credit (Image 8)**

Special energy credit handling:
- Separate disbursement schedule
- PIP deductions (55.04% & 46.70%)
- Credit distributed to service providers
- Total June 2025: ₦15,794,454,679.03

### **7. Regulatory & Supplementary (Image 9)**

**Regulatory Charges:**
- NERC DISCO
- KOGI SERC
- EKITI SERC
- ENUGU SERC
- ONDO SERC

**Supplementary Disbursements:**
- TCN PIP Implementation Project
- AFAM Power PLC (UBA)
- Additional service provider allocations

### **8. Dashboard Reports (Image 10)**

**DISCO Payment Report:**
- May 2025 Invoice
- Amount Remitted
- TXDX Net-Off
- ATFP Penalty
- Outstanding Balance

**Zungeru Payment Report:**
- May 2025 Invoice
- Amount Remitted (Zungeru)
- Outstanding

**Service Provider Report:**
- Invoice, Disbursed, PIP, TXDX, ATFP, Outstanding
- For each: AS, MO, NBET, NERC, SO, TSP

### **9. Multi-Period Tracking (Image 12)**

**DISCO Column Tracking:**
- NISO June 2024
- NISO Sept 2024
- NISO June 2025
- TIF Payment June 2025
- TXDX Net-Off July 2025
- Zungeru June 2025
- Zungeru TIF Net-Off June 2025
- **Total**

**Vesting Contract Revenue Summary:**
| Entity | Amount (₦) |
|--------|-----------|
| TCN | 4,633,037,861.86 |
| NISO | 3,425,000,804.82 |
| TIF | 5,596,081,746.08 |
| AS | 952,343,843.12 |
| NBET | 324,831,174.98 |
| TCN/NISO NERC | 223,706,792.35 |
| GENCO NERC | 4,355,085,116.07 |
| DISCO NERC (without Zungeru) | 1,429,064,230.33 |
| NERC Total | 6,007,856,138.74 |
| **TOTAL INVOICE** | **20,939,151,569.61** |

## Type Definitions

### **Core Types** (`types/index.ts`)

```typescript
// Service Provider Categories
export type ServiceProviderCategory =
  | 'ancillary_services'
  | 'nbet'
  | 'nerc'
  | 'niso'
  | 'tcn'
  | 'tsp'
  | 'tif'
  | 'so'
  | 'mo';

// DISCO Invoice Line Item
export interface DiscoInvoiceLineItem {
  id: string;
  discoId: string;
  discoCode: string;
  discoName: string;
  ancillaryServices: number;
  nbet: number;
  nerc: number;
  niso: number;
  tcn: number;
  tif: number;
  grossInvoice: number;
  netInvoice: number;
}

// Trust Fund & Inflow
export interface DiscoInflowRecord {
  id: string;
  discoId: string;
  discoCode: string;
  discoName: string;
  period: string;
  trustFund: number;
  txdxDeductions: number;
  tifAmount: number;
  grossInflow: number;
  ancillaryServicesDeduction: number;
  servTifDeduction: number;
  tifDisbursement: number;
  nbetDisbursement: number;
  nercDisbursement: number;
  nisoDisbursement: number;
  tspDisbursement: number;
  pipNiso: number;
  pipTsp: number;
  totalPip: number;
  tspAllocation: number;
  nisoAllocation: number;
  txdxFinal: number;
  atfpPenaltySo: number;
  atfpPenaltyTsp: number;
  netDisbursement: number;
}

// Indebtedness
export interface DiscoIndebtedness {
  id: string;
  discoId: string;
  discoCode: string;
  discoName: string;
  period: string;
  totalInvoice: number;
  totalInflow: number;
  shortfall: number;
  shortfallPercentage: number;
  current: number;
  overdue30: number;
  overdue60: number;
  overdue90: number;
  overdue120Plus: number;
  lastPaymentDate?: Date;
  lastPaymentAmount?: number;
}

// Complete Financial Cycle
export interface DiscoFinancialCycle {
  id: string;
  cycleNumber: string;
  period: string;
  month: number;
  year: number;
  status: 'draft' | 'invoiced' | 'collecting' | 'disbursing' | 'reconciling' | 'closed';
  discoSummaries: ComprehensiveDiscoFinancialSummary[];
  marketOperatorSchedule: MarketOperatorDisbursementSchedule;
  zungeruSchedule: ZungeruDisbursementSchedule;
  regulatoryDisbursements: RegulatoryChargeDisbursement[];
  supplementaryDisbursements: SupplementaryDiscoDisbursement[];
  serviceProviderReport: ServiceProviderPaymentReport;
  vestingContractSummary: VestingContractRevenueSummary;
  startDate: Date;
  endDate: Date;
  invoicedAt?: Date;
  closedAt?: Date;
  closedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Service Layer

### **Financial Cycle Service** (`disco-financial-cycle-service.ts`)

**Functions:**
```typescript
// Get all cycles
getFinancialCycles(): Promise<DiscoFinancialCycle[]>

// Get single cycle
getFinancialCycleById(id: string): Promise<DiscoFinancialCycle | null>
getFinancialCycleByPeriod(period: string): Promise<DiscoFinancialCycle | null>

// Get components
getDiscoInvoiceLineItems(period: string): Promise<DiscoInvoiceLineItem[]>
getDiscoInflowRecords(period: string): Promise<DiscoInflowRecord[]>
getDiscoIndebtedness(period: string): Promise<DiscoIndebtedness[]>
getMarketOperatorSchedule(period: string): Promise<MarketOperatorDisbursementSchedule | null>
getZungeruSchedule(period: string): Promise<ZungeruDisbursementSchedule | null>
getVestingContractSummary(period: string): Promise<VestingContractRevenueSummary | null>
getServiceProviderReport(period: string): Promise<ServiceProviderPaymentReport | null>

// Calculations
getPeriodTotals(period: string): Promise<PeriodTotals | null>
```

**Mock Data:**
- Complete June 2025 cycle
- All 11 DISCOs
- Realistic amounts from actual documents
- Full calculation chain

## Calculations & Formulas

### **1. Gross Invoice**
```
Gross Invoice = Ancillary Services + NBET + NERC + NISO + TCN + TIF
```

### **2. Net Invoice**
```
Net Invoice = Gross Invoice - Ancillary Services - TIF
```

### **3. Net Disbursement**
```
Net Disbursement = Trust Fund Inflow
                 - TXDX Deductions (5%)
                 - PIP Deductions (10%)
                 - ATFP Penalties
                 - TIF Amount
```

### **4. PIP Allocations**
```
PIP NISO = NISO Invoice × 10%
PIP TSP = TSP Invoice × 10%
Total PIP = PIP NISO + PIP TSP
```

### **5. ATFP Penalties**
```
ATFP SO = Gross Invoice × 0.5504% (55.04% of total)
ATFP TSP = Gross Invoice × 0.4670% (46.70% of total)
```

### **6. Shortfall**
```
Shortfall = Total Invoice - Total Inflow
Shortfall % = (Shortfall / Total Invoice) × 100
```

## Data Relationships

```
DiscoFinancialCycle
  ├── discoSummaries[] (11 DISCOs)
  │   ├── invoiceLineItem (6 service providers)
  │   ├── inflowRecord (collections & deductions)
  │   ├── indebtedness (outstanding tracking)
  │   ├── serviceProviderIndebtedness (matrix)
  │   ├── tifPayment (TIF specific)
  │   ├── paymentReport (monthly report)
  │   ├── zungeruReport (Zungeru credit)
  │   └── multiPeriod (historical tracking)
  ├── marketOperatorSchedule
  │   ├── beneficiaries[] (with bank details)
  │   └── summary (totals by category)
  ├── zungeruSchedule
  │   └── beneficiaries[] (Zungeru distribution)
  ├── regulatoryDisbursements[] (NERC, SERCs)
  ├── supplementaryDisbursements[] (special projects)
  ├── serviceProviderReport (all providers summary)
  └── vestingContractSummary (revenue breakdown)
```

## Use Cases

### **1. Monthly Settlement**
1. Create new financial cycle for month
2. Generate invoices for all 11 DISCOs
3. Track collections into Trust Fund
4. Calculate deductions (TXDX, PIP, ATFP)
5. Disburse to 9 service providers
6. Generate Zungeru credit schedule
7. Track outstanding balances
8. Close cycle and reconcile

### **2. Indebtedness Management**
1. View DISCO indebtedness report
2. Filter by shortfall percentage
3. Drill down to service provider matrix
4. Identify which providers are owed
5. Initiate collection activities
6. Track aging of debts

### **3. Service Provider Tracking**
1. View disbursement schedule
2. Check payment status per provider
3. Verify bank details
4. Calculate net payments
5. Generate payment advice
6. Track PIP and ATFP allocations

### **4. Regulatory Reporting**
1. Export vesting contract summary
2. Generate NERC compliance reports
3. Track regulatory disbursements
4. Monitor TIF allocations
5. Report on collection rates
6. Audit trail for all transactions

## Next Steps

### **Phase 1: UI Development** (Recommended)
1. Create Financial Cycle Dashboard
   - Monthly cycle selector
   - Status indicators
   - Quick stats (totals, collection rate, etc.)
2. DISCO Invoice View
   - Table of all 11 DISCOs
   - Service provider breakdown
   - Gross/Net calculations
3. Indebtedness Dashboard
   - Shortfall tracking
   - Aging analysis
   - Service provider matrix

### **Phase 2: Workflow Management**
1. Cycle Creation Wizard
   - Auto-generate invoices
   - Import collection data
   - Calculate deductions
2. Disbursement Processing
   - Batch payment creation
   - Bank file generation
   - Payment advice PDFs
3. Reconciliation Tools
   - Match payments to invoices
   - Identify discrepancies
   - Approve cycle closure

### **Phase 3: Reporting & Analytics**
1. Executive Dashboard
   - Collection trends
   - Disbursement history
   - Outstanding analysis
2. Service Provider Portal
   - View invoices
   - Track payments
   - Download reports
3. Regulatory Reports
   - NERC submissions
   - Vesting contract reports
   - Audit logs

### **Phase 4: Integration**
1. Bank Integration
   - Auto-import statements
   - Real-time balance checking
   - Payment status updates
2. DISCO Integration
   - Invoice delivery
   - Payment tracking
   - Dispute management
3. Service Provider Integration
   - Payment notifications
   - Receipt generation
   - Query management

## Technical Notes

### **Performance Considerations**
- Financial cycles are large objects (~500KB each)
- Use pagination for DISCO lists
- Cache period totals
- Lazy-load detailed breakdowns

### **Data Integrity**
- All calculations should be verified
- Maintain audit trail for all changes
- Lock closed cycles from editing
- Validate bank account formats

### **Security**
- Role-based access control
- Sensitive financial data encryption
- Audit logging for all financial operations
- Multi-level approval for disbursements

## Glossary

| Term | Description |
|------|-------------|
| **AS** | Ancillary Services - Grid stabilization |
| **ATFP** | Aggregate Technical, Commercial & Collection Loss Penalty |
| **DISCO** | Distribution Company (11 total) |
| **GENCO** | Generation Company |
| **MO** | Market Operator |
| **NBET** | Nigerian Bulk Electricity Trading |
| **NERC** | Nigerian Electricity Regulatory Commission |
| **NISO** | Nigeria Independent System Operator |
| **PIP** | Performance Improvement Program |
| **SERC** | State Electricity Regulatory Commission |
| **SO** | System Operator |
| **TCN** | Transmission Company of Nigeria |
| **TIF** | Transitional Electricity Market |
| **TSP** | Transmission Service Provider |
| **TXDX** | Tax Deductions |

---

**Document Version**: 1.0
**Last Updated**: 2025-10-09
**Author**: NISO Development Team
**Status**: ✅ Types and Service Layer Complete
