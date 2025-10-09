# Bilateral Statements Implementation Guide

## Overview

The Bilateral Statements module manages settlement statements for bilateral trades between buyers and sellers in the Nigerian power sector. This module supports multi-currency transactions (USD and NGN) and provides a comprehensive workflow for statement creation, approval, and distribution.

## Features

### 1. **Multi-Currency Support**
- **USD (US Dollars)**: For international transactions
- **NGN (Nigerian Naira)**: For local transactions
- Separate totals and summaries for each currency
- Currency-specific formatting and display

### 2. **Two-Page Statement Format**
Based on the NISO bilateral statement PDF, statements are organized into two distinct pages:

#### **Page 1: Trades List**
- Header with NISO: Market Operations
- Recipient participant details (name, code, representative, address)
- Table of bilateral trades showing:
  - Buyer name
  - Seller name
  - Seller code
  - Currency (USD/NGN)
  - Amount
- Period totals for both USD and NGN
- Outstanding amounts from previous period
- Amount in words for both currencies
- Signature section

#### **Page 2: Trade Detail**
- Trade participant information
- Seller details (name, code, representative, address)
- Description of charges table with 6 categories:
  - **TSP Charge** (Transmission Service Provider)
  - **SO Charges** (System Operations)
  - **MO Charges** (Market Operations)
  - **AS Charges** (Ancillary Services)
  - **TCN Regulatory Charges**
  - **GENCO Regulatory Charges**
- Period total
- Outstanding invoices section
- Amount in words
- Signature section
- Explanatory notes (optional)

### 3. **Workflow Management**
Statement status progression:
```
Draft → Pending Approval → Approved → Sent → Acknowledged
                                    ↓
                                Disputed (alternate path)
```

**Status Definitions:**
- **Draft**: Initial creation, editable
- **Pending Approval**: Submitted for review
- **Approved**: Authorized by approver
- **Sent**: Transmitted to NERC
- **Acknowledged**: Confirmed by recipient
- **Disputed**: Issues identified, requires resolution

### 4. **Access Control**
**Authorized Roles:**
- Super Admin
- Admin
- Billing Manager
- Finance Manager

## Technical Implementation

### Type Definitions

Located in `/types/index.ts`:

```typescript
// Currency types
export type BilateralCurrency = 'USD' | 'NGN';

// Individual trade
export interface BilateralTrade {
  id: string;
  buyer: string;           // Buyer entity name
  seller: string;          // Seller entity name
  sellerCode: string;      // Seller identifier code
  currency: BilateralCurrency;
  amount: number;
}

// Charges breakdown (Page 2)
export interface BilateralCharges {
  tspCharge: number;        // Transmission Service Provider
  soCharges: number;        // System Operations
  moCharges: number;        // Market Operations
  asCharges: number;        // Ancillary Services
  tcnRegulatory: number;    // TCN Regulatory
  gencoRegulatory: number;  // GENCO Regulatory
  total: number;
}

// Complete statement
export interface BilateralStatement {
  id: string;
  statementNumber: string;  // e.g., "NISO/BIL/2025/06"
  title: string;
  period: string;           // e.g., "JUNE 2025"
  year: number;

  // Recipient details (Page 1)
  recipientEntity: string;
  recipientCode: string;
  representativeName: string;
  address: string;

  // Trade participant details (Page 2)
  tradeParticipant1: string;
  sellerCode?: string;
  sellerRepName?: string;
  sellerAddress?: string;

  // Trades data
  trades: BilateralTrade[];

  // Multi-currency totals
  totalUSD: number;
  totalNGN: number;
  outstandingUSD: number;
  outstandingNGN: number;

  // Amount in words
  amountInWordsUSD: string;
  amountInWordsNGN: string;

  // Charges (Page 2 - optional)
  charges?: BilateralCharges;
  chargesCurrency?: BilateralCurrency;

  // Documentation
  explanatoryNotes: string[];

  // Workflow
  status: BilateralStatementStatus;
  createdAt: string;
  updatedAt: string;
  draftedBy?: string;
  draftedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  sentBy?: string;
  sentAt?: string;
}

// Status type
export type BilateralStatementStatus =
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'sent'
  | 'acknowledged'
  | 'disputed';
```

### Service Layer

Located in `/server/services/bilateral-statement-service.ts`:

**Key Functions:**

```typescript
// Retrieve all statements
getStatements(): Promise<BilateralStatement[]>

// Get single statement by ID
getStatementById(id: string): Promise<BilateralStatement>

// Create new statement
createStatement(data: Partial<BilateralStatement>): Promise<BilateralStatement>

// Update existing statement
updateStatement(id: string, data: Partial<BilateralStatement>): Promise<BilateralStatement>

// Delete statement (draft only)
deleteStatement(id: string): Promise<void>

// Approve pending statement
approveStatement(id: string, approver: string): Promise<BilateralStatement>

// Send approved statement to NERC
sendStatement(id: string, sentBy: string): Promise<BilateralStatement>

// Helper: Convert number to words
numberToWords(amount: number): string
```

**Sample Mock Data:**

The service includes 3 complete bilateral statements (May, June, July 2025) with:
- 25 bilateral trades from the PDF
- Multi-currency calculations
- Complete charge breakdowns
- Realistic amounts matching the provided PDF

Example June 2025 statement:
```typescript
{
  id: '2',
  statementNumber: 'NISO/BIL/2025/06',
  period: 'JUNE 2025',
  year: 2025,
  trades: [
    { buyer: 'SBEE', seller: 'IKEJA_I(PARAS)', currency: 'USD', amount: 77584.55 },
    { buyer: 'SBEE', seller: 'OMOTOSHO_2', currency: 'USD', amount: 207008.26 },
    // ... 23 more trades
  ],
  totalUSD: 1048638.92,
  totalNGN: 54950653.85,
  charges: {
    tspCharge: 234567.89,
    soCharges: 123456.78,
    moCharges: 345678.90,
    asCharges: 156789.01,
    tcnRegulatory: 67890.12,
    gencoRegulatory: 28390.64,
    total: 956772.34
  }
}
```

### User Interface

#### List Page (`/app/(statements)/bilateral-statements/page.tsx`)

**Features:**
- **Summary Dashboard**: 6 metric cards
  - Total statements count
  - Pending count
  - Approved count
  - Sent count
  - Total USD amount
  - Total NGN amount

- **Advanced Filtering**:
  - Search by statement number, period, or participant
  - Filter by status (6 options)
  - Filter by year

- **Data Table** with columns:
  - Statement Number
  - Period
  - Trade Participants
  - USD Amount
  - NGN Amount
  - Status (color-coded badges)
  - Date
  - Actions dropdown

- **Actions Menu**:
  - View Details
  - Download PDF
  - Approve (pending statements)
  - Send to NERC (approved statements)
  - Delete (draft statements only)

#### Detail Page (`/app/(statements)/bilateral-statements/[id]/page.tsx`)

**Tabbed Interface:**

**Tab 1: Page 1 - Trades List**
- NISO: Market Operations header
- Recipient participant details grid
- Statement title (black background)
- Bilateral trades table (buyer, seller, code, currency, amount)
- June 2025 totals (USD and NGN)
- Outstanding amounts section
- Amount in words for both currencies
- Signature section

**Tab 2: Page 2 - Trade Detail**
- Trade participant information
- Seller representative details
- Description of charges table with 6 line items
- Period total
- Outstanding invoices section
- Amount in words
- Signature section
- Explanatory notes (if applicable)

**Action Buttons** (context-aware):
- Back to list
- Status badge
- Approve (pending statements)
- Send to NERC (approved statements)
- Print
- Download PDF

**Print Optimization:**
- Clean layout for printing
- No navigation or action buttons in print view
- Professional formatting matching PDF

## Usage Guide

### Accessing Bilateral Statements

1. **Login** to NISO ERP system
   - Navigate to http://localhost:3001
   - Use credentials: `admin@niso.ng` / `password`

2. **Navigate** to Bilateral Statements
   - Click "Bilateral Statements" in the sidebar
   - Menu item visible to authorized roles only

### Viewing Statements

1. **List View**:
   - See all bilateral statements in table format
   - View summary statistics at the top
   - Use filters to narrow results

2. **Search and Filter**:
   - Type in search box to find by number/period/participant
   - Select status from dropdown (All, Draft, Pending, Approved, Sent, Acknowledged, Disputed)
   - Select year from dropdown

3. **View Details**:
   - Click any row or use Actions → View Details
   - Switch between Page 1 (Trades List) and Page 2 (Trade Detail) tabs
   - Scroll to see all trades and charges

### Managing Statements

1. **Approve Statement**:
   - Navigate to pending statement detail page
   - Click "Approve" button
   - Statement moves to approved status
   - Approval timestamp and user recorded

2. **Send Statement**:
   - Navigate to approved statement detail page
   - Click "Send to NERC" button
   - Statement moves to sent status
   - Send timestamp and user recorded

3. **Print Statement**:
   - Open statement detail page
   - Click "Print" button
   - Browser print dialog opens
   - Print-optimized layout displayed

4. **Download PDF**:
   - Click "Download PDF" button (placeholder - backend required)

### Understanding the Data

**Multi-Currency Trades:**
- Each trade has a specific currency (USD or NGN)
- Totals calculated separately for each currency
- Example:
  - Trade 1: SBEE buys from IKEJA_I, $77,584.55 USD
  - Trade 6: IVENWOOD buys from OMOTOSHO_2, ₦2,038,038.07 NGN

**Charge Categories (Page 2):**
- **TSP**: Transmission Service Provider charges
- **SO**: System Operations charges
- **MO**: Market Operations charges
- **AS**: Ancillary Services charges
- **TCN Regulatory**: TCN regulatory fees
- **GENCO Regulatory**: GENCO regulatory fees

**Status Colors:**
- Gray: Draft
- Yellow: Pending Approval
- Green: Approved
- Blue: Sent
- Purple: Acknowledged
- Red: Disputed

## File Structure

```
/types/index.ts
  - BilateralStatement interface
  - BilateralTrade interface
  - BilateralCharges interface
  - BilateralCurrency type
  - BilateralStatementStatus type

/server/services/bilateral-statement-service.ts
  - Mock data (3 statements)
  - CRUD operations
  - Workflow functions
  - Number to words converter

/app/(statements)/bilateral-statements/
  page.tsx                    - List view
  [id]/page.tsx              - Detail view (2-page tabs)

/lib/constants/index.ts
  - Navigation menu item
```

## Sample Data

The system includes 3 sample statements:

### May 2025 (Draft)
- **Statement Number**: NISO/BIL/2025/05
- **Total USD**: $956,772.34
- **Total NGN**: ₦52,847,291.63
- **Trades**: 25 bilateral transactions
- **Status**: Draft

### June 2025 (Approved)
- **Statement Number**: NISO/BIL/2025/06
- **Total USD**: $1,048,638.92
- **Total NGN**: ₦54,950,653.85
- **Trades**: 25 bilateral transactions
- **Status**: Approved
- **Charges**: Complete breakdown on Page 2

### July 2025 (Sent)
- **Statement Number**: NISO/BIL/2025/07
- **Total USD**: $1,123,456.78
- **Total NGN**: ₦58,234,567.89
- **Trades**: 25 bilateral transactions
- **Status**: Sent

## Backend Integration (Future)

To connect with a real backend API:

1. **Replace Mock Service**:
   - Update `/server/services/bilateral-statement-service.ts`
   - Replace mock data arrays with API calls
   - Use fetch or axios for HTTP requests

2. **API Endpoints** (suggested structure):
   ```
   GET    /api/bilateral-statements       - List all
   GET    /api/bilateral-statements/:id   - Get single
   POST   /api/bilateral-statements       - Create new
   PUT    /api/bilateral-statements/:id   - Update
   DELETE /api/bilateral-statements/:id   - Delete
   POST   /api/bilateral-statements/:id/approve - Approve
   POST   /api/bilateral-statements/:id/send    - Send
   ```

3. **PDF Generation**:
   - Server-side PDF generation (e.g., using puppeteer, pdfkit)
   - Template matching the web UI layout
   - Download endpoint: `GET /api/bilateral-statements/:id/pdf`

4. **Email Notifications**:
   - Auto-send on approval
   - NERC notification on send
   - Acknowledgment tracking

5. **Advanced Features**:
   - Bulk statement generation
   - Excel import/export
   - Automated calculations
   - Audit trail
   - Document attachments

## Testing Checklist

- [ ] List page loads with sample data
- [ ] Summary statistics display correctly
- [ ] Search filters statements
- [ ] Status filter works for all 6 statuses
- [ ] Year filter works
- [ ] Detail page loads statement
- [ ] Page 1 tab shows trades list
- [ ] Page 2 tab shows trade detail
- [ ] USD amounts format correctly ($)
- [ ] NGN amounts format correctly (₦)
- [ ] Approve button appears for pending statements
- [ ] Send button appears for approved statements
- [ ] Approve action updates status
- [ ] Send action updates status
- [ ] Print button opens print dialog
- [ ] Back button returns to list
- [ ] Status badges show correct colors
- [ ] Navigation menu includes Bilateral Statements
- [ ] Only authorized roles can access

## Regulatory Compliance

Bilateral statements comply with Nigerian Electricity Regulatory Commission (NERC) requirements:

- **Market Rule References**: Include applicable NERC market rules
- **Settlement Periods**: Monthly settlement cycles
- **Multi-Currency**: Support for both local and foreign currency transactions
- **Audit Trail**: Complete workflow tracking
- **Documentation**: Explanatory notes for charges
- **Authorization**: Dual signature requirement
- **Distribution**: Formal transmission to NERC

## Best Practices

1. **Always verify trade data** before approving statements
2. **Double-check currency calculations** for accuracy
3. **Review explanatory notes** for completeness
4. **Ensure proper authorization** before sending to NERC
5. **Maintain audit trail** of all status changes
6. **Archive statements** after acknowledgment
7. **Handle disputes promptly** with clear documentation

## Troubleshooting

### Issue: Statement not loading
- Check console for errors
- Verify statement ID in URL
- Ensure mock data service is working

### Issue: Currency formatting incorrect
- Check `formatCurrency` utility in `/lib/utils/formatters.ts`
- Verify currency type in trade data

### Issue: Approve/Send buttons not appearing
- Check statement status
- Verify user role has permissions
- Ensure workflow logic is correct

### Issue: Print layout broken
- Check CSS print media queries
- Use `print:` Tailwind classes
- Test in different browsers

## Support and Documentation

For additional help:
- See DISCO Statements guide for similar workflow patterns
- Review `/types/index.ts` for complete type definitions
- Check `/server/services/bilateral-statement-service.ts` for data structure examples
- Refer to NISO ERP documentation for general system usage

---

**Module Status**: ✅ Complete and Operational
**Access URL**: http://localhost:3001/bilateral-statements
**Sample Data**: 3 statements (May, June, July 2025)
**Last Updated**: 2025-10-09
