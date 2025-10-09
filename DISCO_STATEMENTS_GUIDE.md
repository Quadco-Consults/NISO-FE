# DISCO Statements Module Documentation

## Overview

The DISCO Statements module provides comprehensive management of **Final Market Settlement Statements** sent from NISO to NERC (Nigeria Electricity Regulatory Commission) and other regulatory bodies. This system captures all the details shown in the physical DISCO statement document, including all 11 DisCo charges, regulatory references, explanatory notes, and approval workflows.

## What is a DISCO Statement?

A DISCO Statement (Distribution Company Statement) is a **monthly market settlement invoice** that:
- Details charges for all 11 Distribution Companies (DisCos) in Nigeria
- Includes transmission service provider (TSP) charges
- Contains market operator (MO) and system operator (SO) fees
- Lists NBET and regulatory charges
- Provides energy credit/debit calculations (e.g., Zungeru Energy Credit)
- References NERC orders and guidelines
- Includes comprehensive explanatory notes

### Key Components

1. **Recipient Information**: NERC or other regulatory bodies
2. **DisCo Charges**: All 11 distribution companies with individual amounts
3. **Special Items**: Energy credits/debits (Zungeru, etc.)
4. **Regulatory References**: NERC order numbers
5. **Explanatory Notes**: Detailed calculation methodologies
6. **Approval Workflow**: Draft → Approval → Send → Acknowledge

## Features Implemented

### 1. **Statement Management**
- ✅ List all DISCO statements with filtering
- ✅ View detailed statement (matching the PDF format)
- ✅ Create new statements
- ✅ Approve statements
- ✅ Send statements to NERC
- ✅ Delete draft statements
- ✅ Track statement status

### 2. **Statement Components**

#### DisCo Charges (All 11 DisCos)
- Abuja Electricity Distribution Company (ABUJA) - Column A
- Benin Electricity Distribution Company (BENIN) - Column B
- Eko Electricity Distribution Company (EKO) - Column C
- Enugu Electricity Distribution Company (ENUGU) - Column D
- Ibadan Electricity Distribution Company (IBADAN) - Column E
- Ikeja Electricity Distribution Company (IKEJA) - Column F
- Jos Electricity Distribution Company (JOS) - Column G
- Kaduna Electricity Distribution Company (KADUNA) - Column H
- Kano Electricity Distribution Company (KANO) - Column I
- Port Harcourt Electricity Distribution Company (PH) - Column J
- Yola Electricity Distribution Company (YOLA) - Column K

#### Calculation Categories
- TSP (Transmission Service Provider) charges
- MO (Market Operator) charges
- SO (System Operator) charges
- AS (Ancillary Services) charges
- NBET charges
- Regulatory charges
- Energy charges and adjustments
- Excess MYTO intake calculations
- TLF (Transmission Loss Factor) adjustments

### 3. **Workflow & Status Management**

**Status Flow:**
```
Draft → Pending Approval → Approved → Sent → Acknowledged
                                    ↓
                                Disputed
```

**Status Descriptions:**
- **Draft**: Statement being prepared
- **Pending Approval**: Awaiting approval from authorized personnel
- **Approved**: Approved and ready to send
- **Sent**: Sent to NERC or recipient
- **Acknowledged**: Received and acknowledged by recipient
- **Disputed**: Under dispute or requiring revision

### 4. **Statement Details View**

The detail view replicates the actual DISCO statement format:

**Header Section:**
- NISO: Market Operations title
- Recipient details (Name, Number, Representative, Address)
- Statement title and period

**Charges Section:**
- Table of all DisCo charges
- Zungeru Energy Credit (Naira)
- Period total
- Outstanding amount

**Footer Section:**
- Amount in words (Nigerian Naira)
- Signature blocks
- NERC footer
- Explanatory notes
- NERC order references

### 5. **Data Tracking**

Each statement tracks:
- **Metadata**: Statement number, title, period, year, month
- **Recipient**: Entity name, code, representative details
- **Financial**: Total amount, outstanding balances
- **Workflow**: Drafted by/at, approved by/at, sent to/at
- **References**: NERC orders, regulatory guidelines
- **Notes**: Detailed explanatory notes

## File Structure

### Type Definitions (`types/index.ts`)
```typescript
export interface DiscoStatement {
  id: string;
  statementNumber: string;
  title: string;
  period: string;
  month: number;
  year: number;
  recipientEntity: string;
  recipientCode: string;
  representativeName: string;
  representativeTitle: string;
  address: string;
  discoCharges: DiscoCharge[];
  zungeruEnergyCreditNaira: number;
  totalAmount: number;
  outstandingCurrentMonth: number;
  lineItems: DiscoStatementLineItem[];
  explanatoryNotes: string[];
  nercReferences: string[];
  status: DiscoStatementStatus;
  amountInWords: string;
  // ... workflow fields
}

export interface DiscoCharge {
  discoId: string;
  discoCode: string;
  discoName: string;
  columnCode: string; // A, B, C, D, E, F, G, H, I, J, K
  amount: number;
}

export interface DiscoStatementLineItem {
  id: string;
  description: string;
  category: 'tsp' | 'mo' | 'so' | 'as' | 'nbet' | 'regulatory' | 'energy' | 'adjustment' | 'other';
  reference?: string;
  baseAmount: number;
  adjustments: number;
  totalAmount: number;
  calculation?: string;
}
```

### Service Layer (`server/services/disco-statement-service.ts`)

**Mock Data:**
- 3 sample DISCO statements (May, June, July 2025)
- All 11 DisCo charges with realistic amounts
- Complete explanatory notes
- NERC references

**Functions:**
```typescript
discoStatementService.getStatements(): Promise<DiscoStatement[]>
discoStatementService.getStatementById(id: string): Promise<DiscoStatement | null>
discoStatementService.getStatementsByPeriod(year: number, month?: number): Promise<DiscoStatement[]>
discoStatementService.getStatementsByStatus(status: string): Promise<DiscoStatement[]>
discoStatementService.createStatement(data: Partial<DiscoStatement>): Promise<DiscoStatement>
discoStatementService.updateStatement(id: string, data: Partial<DiscoStatement>): Promise<DiscoStatement | null>
discoStatementService.approveStatement(id: string, approvedBy: string): Promise<DiscoStatement | null>
discoStatementService.sendStatement(id: string, sentTo: string): Promise<DiscoStatement | null>
discoStatementService.deleteStatement(id: string): Promise<boolean>
discoStatementService.getSummary(): Promise<DiscoStatementSummary>
```

### UI Components

**List Page** (`app/(statements)/disco-statements/page.tsx`)
- Statement listing with filters (search, status, year)
- Summary statistics (total, pending, approved, sent, total value)
- Action menu (view, download PDF, approve, send, delete)
- Status badges with color coding

**Detail Page** (`app/(statements)/disco-statements/[id]/page.tsx`)
- Full statement view matching PDF format
- Header with recipient details
- DisCo charges table
- Zungeru credit/debit
- Totals and outstanding amounts
- Amount in words
- Signature section
- Explanatory notes
- NERC references
- Workflow information panel
- Action buttons (approve, send, print, download PDF)

## How to Use

### Accessing DISCO Statements

1. **Login** to the system
2. Navigate to **"DISCO Statements"** in the sidebar
3. View list of all statements

### Creating a Statement

1. Click **"New Statement"** button
2. Fill in statement details:
   - Period (month/year)
   - Recipient information
   - DisCo charges for all 11 companies
   - Special items (energy credits/debits)
   - Explanatory notes
   - NERC references
3. Save as **Draft**

### Approving a Statement

1. Open statement in **Pending Approval** status
2. Review all details
3. Click **"Approve"** button
4. Statement moves to **Approved** status

### Sending a Statement

1. Open **Approved** statement
2. Click **"Send to NERC"** button
3. Statement moves to **Sent** status
4. Awaits acknowledgment from recipient

### Viewing Statement Details

1. Click on any statement in the list
2. View complete statement matching PDF format
3. See all DisCo charges, totals, notes
4. Check workflow history

### Filtering & Search

**Filters:**
- **Search**: Statement number or period
- **Status**: All, Draft, Pending Approval, Approved, Sent, Acknowledged, Disputed
- **Year**: Filter by specific year

### Actions Available

**Per Statement:**
- **View Details**: See full statement
- **Download PDF**: Export as PDF (placeholder)
- **Approve**: Approve pending statement
- **Send to NERC**: Send approved statement
- **Delete**: Remove draft statement

## Sample Data

### June 2025 Statement (Statement ID: 1)

**Basic Info:**
- Number: NISO/MS/2025/06
- Title: FINAL MARKET SETTLEMENT STATEMENT - JUNE 2025 Total
- Period: June 2025
- Recipient: NIGERIA ELECTRICITY REGULATORY COMMISSION
- Status: Approved

**DisCo Charges Total:** ₦6,495,604,681.74

**Breakdown:**
- Abuja (ABUJA): ₦1,055,762,770.57
- Benin (BENIN): ₦544,042,773.24
- Eko (EKO): ₦854,878,304.37
- Enugu (ENUGU): ₦518,494,448.31
- Ibadan (IBADAN): ₦809,639,854.97
- Ikeja (IKEJA): ₦985,269,507.83
- Jos (JOS): ₦326,344,445.57
- Kaduna (KADUNA): ₦399,344,169.81
- Kano (KANO): ₦309,481,248.71
- Port Harcourt (PH): ₦483,245,883.63
- Yola (YOLA): ₦179,101,475.74

**Zungeru Energy Credit:** (₦487,968,046.00)

**Total Amount:** ₦6,007,856,138.74

**Explanatory Notes:** 18 detailed notes explaining calculations

**NERC References:**
- NERC/5/2011
- NERC/5/2023/021
- Section 4.62/103/2014
- Section 6.h
- Section 8.(a),(b)
- Section 8.k.v

## Integration Points

### Backend Integration (Future)

When connecting to real backend:

1. **Replace mock service** with API calls
2. **Implement PDF generation** server-side
3. **Add email notifications** for workflow steps
4. **Integrate with accounting system** for financial records
5. **Connect to NERC portal** for electronic submission
6. **Add document attachments** (meter readings, feeder data, etc.)

### Suggested API Endpoints

```
GET    /api/disco-statements              - List statements
GET    /api/disco-statements/:id          - Get statement details
POST   /api/disco-statements              - Create statement
PUT    /api/disco-statements/:id          - Update statement
DELETE /api/disco-statements/:id          - Delete statement
POST   /api/disco-statements/:id/approve  - Approve statement
POST   /api/disco-statements/:id/send     - Send statement
GET    /api/disco-statements/:id/pdf      - Download PDF
GET    /api/disco-statements/summary      - Get summary stats
```

## Regulatory Compliance

### NERC Orders Referenced

The system tracks and displays references to:
- **NERC/5/2011**: Transitional Electricity Market Order
- **NERC/5/2023/021**: Market Dispatch Guidelines
- **Section 4.62/103/2014**: TCN Compensation Guidelines
- **Section 6.h**: DisCo Load Offtake Failure Compensation
- **Section 8**: TLF (Transmission Loss Factor) Calculations

### Calculation Methodologies

Statements include explanations for:
1. TSP, MO, SO, AS, NBET charges determination
2. TCN network constraint compensation
3. DisCo load offtake failure compensation
4. Excess MYTO intake calculations
5. Transmission Loss Factor adjustments
6. Energy consumed vs allocated calculations

## Best Practices

1. **Always review** DisCo charges before approval
2. **Verify NERC references** are current and accurate
3. **Include detailed explanatory notes** for transparency
4. **Track workflow** at each stage
5. **Maintain audit trail** of all approvals and sends
6. **Archive statements** for regulatory compliance (minimum 7 years)
7. **Reconcile** with individual DisCo invoices monthly

## Troubleshooting

### Common Issues

**Statement not appearing:**
- Check status filter
- Verify year filter
- Ensure statement was saved

**Cannot approve:**
- Check user permissions
- Verify statement is in "Pending Approval" status
- Ensure all required fields are filled

**PDF not generating:**
- This is a placeholder feature
- Will be implemented with backend integration

## Future Enhancements

1. **Automated Statement Generation**
   - Auto-populate DisCo charges from invoicing system
   - Calculate energy credits/debits automatically
   - Generate explanatory notes from templates

2. **PDF Export**
   - Server-side PDF generation
   - Custom templates
   - Digital signatures

3. **Email Integration**
   - Auto-send on approval
   - Acknowledgment requests
   - Dispute notifications

4. **Analytics & Reporting**
   - Trend analysis by DisCo
   - Monthly comparison reports
   - Outstanding tracking

5. **Document Management**
   - Attach supporting documents
   - Meter reading uploads
   - Feeder data imports

6. **Integration**
   - Connect to NERC portal
   - Link with accounting system
   - Sync with billing module

---

**Module Status**: ✅ **Fully Implemented**
**Access**: Navigate to `/disco-statements` or click "DISCO Statements" in sidebar
**Sample Data**: 3 statements available (May, June, July 2025)
**Version**: 1.0.0
**Last Updated**: October 2025
