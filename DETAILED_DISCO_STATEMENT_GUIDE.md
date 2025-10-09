# Detailed DISCO Statement Implementation Guide

## Overview

This guide documents the **complete individual DISCO statement structure** with detailed line-item charges, energy accounting tables, and comprehensive explanatory notes. Based on the Port Harcourt Electricity Distribution PLC June 2025 statement.

---

## 📋 Statement Structure

### **Individual DISCO Statement** (vs. Summary)

Unlike the previous DISCO summary documents (showing all 11 DISCOs), these are **detailed statements for a single DISCO** with complete line-item breakdown.

**Example: Port Harcourt Electricity Distribution PLC**
- **Participant Name**: PORT HARCOURT ELECTRICITY DISTRIBUTION PLC
- **Contract ID**: NBET/035
- **Representative**: The Managing Director
- **Address**: NO 42 OBWBALIRI, RUMUIGBO, PH, RIVERS STATE

---

## 🔢 **Six Charge Categories**

### **1. Metered Energy Charges** (Purple Header - Section 1)

Base charges for actual energy consumed:

| CC# | Charge Code | Description | Notes | Amount (₦) |
|-----|-------------|-------------|-------|------------|
| 1.1 | MET.TSP | Transmission Company of Nigeria Energy Charge | A | 850,511,129.83 |
| 1.2 | MET.SO | Nigeria Independent System Operator Energy Charge | B | 253,551,722.09 |
| 1.3 | MET.TIF | Transmission Infrastructure Energy Charge | C | 414,276,153.90 |
| 1.4 | MET.ANC | Ancillary Services Energy Charge | D | 70,501,712.30 |
| 1.5 | MET.NBET | Nigeria Bulk Electricity Trader Energy Charge | E | 22,005,910.38 |
| 1.6 | MET.GRC | GENCO Regulatory Energy Charge | F | 16,560,942.77 |
| 1.7 | MET.TRC | TCN/NISO Regulatory Energy Charge | G | 322,405,567.82 |
| 1.8 | MET.DRC | Disco Regulatory Energy Charge | H | 113,824,094.40 |

**Formula**: `Meter Reading (KWh) × Rate (₦/KWh) = Billing Amount`

### **2. Contract Excess Adjustment** (Orange Header - Section 2)

Adjustments for energy consumption beyond MYTO allocation (AECC):

| CC# | Charge Code | Description | Notes | Amount (₦) |
|-----|-------------|-------------|-------|------------|
| 2.1 | CEA.TSP | Transmission Company of Nigeria AECC | A | 0 |
| 2.2 | CEA.SO | Nigeria Independent System Operator AECC | B | 0 |
| 2.3-2.8 | CEA.* | (All other AECC charges) | C-H | 0 |

**Note**: Zero amounts in June 2025 indicate no excess consumption.

### **3. Loss of Revenue: DisCo to Service Providers** (Orange Header - Section 3)

Compensation when DisCo fails to offtake allocated energy (LoRRD):

| CC# | Charge Code | Description | Notes | Amount (₦) |
|-----|-------------|-------------|-------|------------|
| 3.1 | DLR.TSP | Transmission Company of Nigeria LoRRD | A | 41,682,695.30 |
| 3.2 | DLR.SO | Nigeria Independent System Operator LoRRD | B | 12,426,314.76 |
| 3.3 | DLR.TIF | Transmission Infrastructure LoRRD | C | 20,303,257.61 |
| 3.4 | DLR.ANC | Ancillary Services LoRRD | D | 3,455,218.07 |
| 3.5 | DLR.NBET | Nigeria Bulk Electricity Trader LoRRD | E | 1,178,526.86 |
| 3.6 | DLR.GRC | GENCO Regulatory LoRRD | F | 811,635.16 |
| 3.7 | DLR.TRC | TCN/NISO Regulatory LoRRD | G | 15,800,772.65 |
| 3.8 | DLR.DRC | Disco Regulatory LoRRD | H | 5,578,404.43 |

**Formula**: `DisCo Energy Deficit (KWh) × Service Provider Rate (₦/KWh) = LoRRD`

### **4. Loss of Revenue: TSP to Service Providers & DisCos** (Orange Header - Section 4)

Compensation when TCN cannot deliver allocated energy (LoRFT):

| CC# | Charge Code | Description | Notes | Amount (₦) |
|-----|-------------|-------------|-------|------------|
| 4.1 | TLR.TSP | Transmission Company of Nigeria LoRFT | A | **(163,761,034.96)** |
| 4.2 | TLR.SO | Nigeria Independent System Operator LoRFT | B | 4,639,099.65 |
| 4.3 | TLR.TIF | Transmission Infrastructure LoRFT | C | 7,579,788.30 |
| 4.4 | TLR.ANC | Ancillary Services LoRFT | D | 1,289,931.96 |
| 4.5 | TLR.NBET | Nigeria Bulk Electricity Trader LoRFT | E | 439,977.77 |
| 4.6 | TLR.GRC | GENCO Regulatory LoRFT | F | 303,007.48 |
| 4.7 | TLR.TRC | TCN/NISO Regulatory LoRFT | G | 5,898,881.62 |
| 4.8 | TLR.DRC | Disco Regulatory LoRFT | H | 2,082,578.33 |

**Note**: 4.1 TLR.TSP is negative (credit to DisCo) - TCN refunding for undelivered energy.

### **5. Transmission Loss Factor Compensation** (Purple Header - Section 5)

Adjustment for transmission losses:

| CC# | Charge Code | Description | Notes | Amount (₦) |
|-----|-------------|-------------|-------|------------|
| 5.1 | TL.TSP | Transmission Service Provider TLF Compensation | A | **(326,956,213.74)** |

**Formula**: `TLF Energy Gain/Loss (KWh) × Average Cost of Generation (₦/KWh) = TLF Amount`

**TLF Calculation**:
- Actual TLF vs. Benchmark (7.00%)
- Difference apportioned to DisCos (8.k.ii NERC/15/0011)
- Applied to TSP wheeling charges (8.k.iii & iv NERC/15/0011)

### **6. GENCO/NBET PPA Adjustments** (Purple Header - Section 6)

Power Purchase Agreement adjustments:

| CC# | Charge Code | Description | Notes | Amount (₦) |
|-----|-------------|-------------|-------|------------|
| 6.1 | LQD.DTD | TCN Capacity Use Refund to Disco | J | 0 |
| 6.2 | LQD.GSD | Grid Use Balancing (Credit or Debit) | K | 0 |
| 6.3 | LQD.GDT | TCN Portion of Shared Liquidated Damages | L | 0 |

---

## 📊 **Energy Accounting Tables**

### **Table 1: Contract Energy Accounting** (KWh Level)

| Disco | Column I<br>Meter Reading | Column II<br>MYTO Excess | Column III<br>DisCo Deficit | Column IV<br>TCN Deficit | Column TLF<br>TLF Gain/Loss | Column V<br>Total |
|-------|--------------------------|--------------------------|-----------------------------|--------------------------|-----------------------------|-------------------|
| **P/H** | **190,910,670** | **0** | **9,356,340** | **3,492,990** | **2,904,080** | **203,760,000** |

**Formula**:
```
Total (Column V) = Meter Reading (I) + MYTO Excess (II) + DisCo Deficit (III) + TCN Deficit (IV) + TLF (TLF)
```

**Generation Shortage Tracking**:
- MYTO Requirement: 203,760,000 KWh
- Generation Shortage: 0 KWh
- Adjusted MYTO: 203,760,000 KWh

### **Table 2: Invoice Derivation** (Naira Level)

Converts KWh to Naira using service provider rates:

| Notes | Entity | Rate<br>(₦/KWh) | Column I<br>Meter Billing | Column III<br>LoRRD | Column IV<br>LoRFT | Column TLF<br>TLF | Total (₦) |
|-------|--------|-----------------|---------------------------|---------------------|-------------------|-------------------|-----------|
| **A** | TCN | 4.4550 | 850,511,130 | 41,682,695 | (163,761,035) | (326,956,214) | **401,476,577** |
| **B** | NISO | 1.3281 | 253,551,722 | 12,426,315 | 4,639,100 | 0 | **270,617,136** |
| **C** | TIF | 2.1700 | 414,276,154 | 20,303,258 | 7,579,788 | 0 | **442,159,200** |
| **D** | AS | 0.3693 | 70,501,712 | 3,455,218 | 1,289,932 | 0 | **75,246,862** |
| **E** | NBET | 0.1260 | 22,005,910 | 1,178,527 | 439,978 | 0 | **23,624,414** |
| **F** | TCN/NISO NERC | 0.0867 | 16,560,943 | 811,635 | 303,007 | 0 | **17,675,585** |
| **G** | GENCO NERC | 1.6888 | 322,405,568 | 15,800,773 | 5,898,882 | 0 | **344,105,222** |
| **H** | DISCO NERC | 0.5962 | 113,824,094 | 5,578,404 | 2,082,578 | 0 | **121,485,077** |

---

## 📝 **Explanatory Notes** (18 Detailed Notes)

### **Regulatory Notes (1-3, 7-9)**

**Note 1**: Charges determined per NERC/15/0011 and Table 1 (Transmission and Admin Charges Feb-Dec 2024)

**Note 2**: Section 17 of NERC/2023/034 - TCN compensation for undelivered energy
- Column IV shows TCN deficit in KWh
- Data from "Feeder Utilization Data" (TEM Desk, Osogbo)

**Note 3**: Section 17 of NERC/2023/034 - DisCo compensation for stranded capacity
- Column III shows DisCo deficit in KWh
- Positive number in bill (charge to DisCo)

**Note 7**: Section 8.k.ii NERC/15/0011 - MO apportions TLF difference to DisCos

**Note 8**: Section 8.k.iii & iv NERC/15/0011 - TLF difference applied to TSP charges

**Note 9**: Section 8.k.v NERC/15/0011 - TLF amount = Average Cost of Generation × TLF Energy Gain/Loss

### **Reference Notes (4-6, 10-11)**

**Note 4**: Column I = Actual Energy Consumed
**Note 5**: Column II = Excess above MYTO
**Note 6**: Column V = MYTO Allocation
- Formula: V = I + II + III + IV
- MYTO = Metered - Excess + TCN Deficit + DisCo Deficit

**Note 10**: Column TLF = Transmission Loss Factor Gain/Loss Energy
**Note 11**: Table 2 shows final invoice calculation

### **Formula Note (12)**

**Note 12**: Total Billing calculation:
```
Total = Meter Reading Billing
      + MYTO Excess Adjustment
      + Loss of Revenue (DisCo to SP)
      + Loss of Revenue (TCN to DisCo/SP)
      + TLF Gain/Loss
```

**Sub-notes**:
- a. Full formula with all components
- b. DisCo LoRR to TCN (Section 6.e - positive)
- c. TCN LoRR to DisCo (Section 6.h - negative)

---

## 💰 **Financial Summary**

### **Port Harcourt June 2025**

| Item | Amount (₦) |
|------|------------|
| **Metered Energy Charges Total** | 2,063,637,233.49 |
| **Contract Excess Adjustment** | 0.00 |
| **DisCo Loss of Revenue** | 101,236,824.91 |
| **TSP Loss of Revenue** | (141,527,769.85) |
| **TLF Compensation** | (326,956,213.74) |
| **PPA Adjustments** | 0.00 |
| **Zungeru Energy Credit** | (73,303,577.36) |
| **JUNE 2025 TOTAL** | **₦1,523,086,495.85** |
|  |  |
| **Outstanding (May 2025)** | ₦8,546,703,577.00 |
| **Current Amount Due** | **₦10,069,790,412.84** |

**Amount in Words**: Ten Billion, Sixty - Nine Million, Seven Hundred and Ninety Thousand, Four Hundred and Twelve Naira and Eighty - Four Kobo Only

---

## 🔧 **Type Definitions**

### **Core Types** (in `/types/index.ts`)

```typescript
// Charge categories
export type DiscoChargeCodeCategory =
  | 'MET'  // Metered Energy Charges
  | 'CEA'  // Contract Excess Adjustment (AECC)
  | 'DLR'  // Disco Loss of Revenue (LoRRD)
  | 'TLR'  // TSP Loss of Revenue (LoRFT)
  | 'TL'   // Transmission Loss Factor
  | 'LQD'; // Liquidated Damages / PPA Adjustments

// Service provider codes
export type ServiceProviderCode =
  | 'TSP' | 'SO' | 'TIF' | 'ANC' | 'NBET'
  | 'GRC' | 'TRC' | 'DRC' | 'DTD' | 'GSD' | 'GDT';

// Individual charge line item
export interface DiscoStatementChargeLineItem {
  id: string;
  chargeCode: string;
  category: DiscoChargeCodeCategory;
  serviceProvider: ServiceProviderCode;
  description: string;
  notes: string;
  amount: number;
  sequence: number;
}

// Energy accounting (Table 1)
export interface ContractEnergyAccounting {
  discoId: string;
  discoCode: string;
  discoName: string;
  period: string;
  meterReadingKwh: number;
  mytoExcessAdjustmentKwh: number;
  discoEnergyDeficitKwh: number;
  tcnDeficitKwh: number;
  transmissionLossFactorKwh: number;
  bilateralMeterReadingKwh?: number;
  totalKwh: number;
  mytoRequirementKwh: number;
  generationShortageKwh: number;
  adjustedMytoKwh: number;
}

// Invoice derivation (Table 2)
export interface InvoiceDerivation {
  discoId: string;
  discoCode: string;
  discoName: string;
  period: string;
  notes: string;
  entity: string;
  ratePerKwh: number;
  meterReadingBilling: number;
  mytoExcessAdjustment: number;
  lossOfRevenueDiscoToSp: number;
  lossOfRevenueTcnToSpOrDisco: number;
  tlf: number;
  bilateralMeterReading?: number;
  total: number;
}

// Complete detailed statement
export interface DetailedDiscoStatement {
  id: string;
  statementNumber: string;
  period: string;
  month: number;
  year: number;
  participantName: string;
  contractId: string;
  participantRepName: string;
  participantRepAddress: string;
  title: string;
  chargeLineItems: DiscoStatementChargeLineItem[];
  meteredEnergyChargesTotal: number;
  contractExcessAdjustmentTotal: number;
  discoLossOfRevenueTotal: number;
  tspLossOfRevenueTotal: number;
  transmissionLossFactorTotal: number;
  ppAdjustmentsTotal: number;
  zungeruEnergyCreditNaira: number;
  june2025Total: number;
  outstandingInvoices: number;
  currentAmountDue: number;
  amountInWords: string;
  energyAccounting: ContractEnergyAccounting;
  invoiceDerivations: InvoiceDerivation[];
  explanatoryNotes: DiscoStatementExplanatoryNote[];
  status: DiscoStatementStatus;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 📂 **Service Layer**

**File**: `/server/services/detailed-disco-statement-service.ts`

**Functions**:
```typescript
// Retrieval
getDetailedStatements(): Promise<DetailedDiscoStatement[]>
getDetailedStatementById(id: string): Promise<DetailedDiscoStatement | null>
getDetailedStatementByDiscoPeriod(discoId: string, period: string): Promise<DetailedDiscoStatement | null>

// Components
getChargeLineItemsByCategory(statementId: string, category: string)
getEnergyAccounting(statementId: string): Promise<ContractEnergyAccounting | null>
getInvoiceDerivations(statementId: string): Promise<InvoiceDerivation[]>
getExplanatoryNotes(statementId: string): Promise<DiscoStatementExplanatoryNote[]>

// Calculations
getCategoryTotals(statementId: string)
```

---

## 🎯 **Key Calculations**

### **1. Meter Reading Billing**
```
Billing = Meter Reading (KWh) × Rate (₦/KWh)
```

### **2. Loss of Revenue (DisCo to SP)**
```
LoRRD = DisCo Energy Deficit (KWh) × SP Rate (₦/KWh)
```

### **3. Loss of Revenue (TCN to DisCo/SP)**
```
LoRFT = TCN Deficit (KWh) × DisCo Rate (₦/KWh)
```

For TCN (negative):
```
LoRFT = -TCN Deficit (KWh) × 40.5177 (₦/KWh)
```

### **4. Transmission Loss Factor**
```
TLF Amount = TLF Energy Gain/Loss (KWh) × Average Cost of Generation (₦/KWh)
```

For Port Harcourt:
```
TLF = 2,904,080 KWh × 112.5851 ₦/KWh = 326,956,214 ₦ (negative - credit)
```

### **5. Total Invoice**
```
Total = Σ(All charge line items) - Zungeru Credit
```

### **6. Current Amount Due**
```
Current Amount Due = Outstanding (Previous) + June 2025 Total
```

---

## 🚀 **Next Steps for UI Implementation**

### **Phase 1: Detailed Statement View**

1. **Statement Header**
   - Participant details
   - Contract ID
   - Period

2. **Charge Line Items Table** (6 sections)
   - Color-coded section headers
   - Line items with charge codes
   - Notes column
   - Amount column
   - Subtotals per section

3. **Zungeru Credit** (highlighted)

4. **Totals Section**
   - June 2025 Total
   - Outstanding
   - Current Amount Due
   - Amount in words

5. **Energy Accounting Tab**
   - Table 1 (KWh level)
   - Generation shortage notes

6. **Invoice Derivation Tab**
   - Table 2 (Naira level)
   - Rate per KWh
   - All calculation columns

7. **Explanatory Notes Tab**
   - 18 detailed notes
   - Sub-notes (a, b, c)
   - NERC references
   - Table references

### **Phase 2: Comparison & Analytics**

1. **Period-over-Period**
   - Compare multiple months
   - Trend analysis

2. **Category Breakdown**
   - Chart showing 6 categories
   - Percentage distribution

3. **Service Provider Analysis**
   - Breakdown by SP
   - LoRR tracking

---

## 📊 **System Integration**

### **Relationship to Other Modules**

```
Detailed DISCO Statement (Individual)
    ├── Links to Financial Cycle Summary
    ├── Feeds into Indebtedness Tracking
    ├── Connects to Service Provider Disbursements
    └── Supports Regulatory Reporting
```

---

## ✅ **Implementation Status**

| Component | Status |
|-----------|--------|
| **Type Definitions** | ✅ Complete |
| **Service Layer** | ✅ Complete |
| **Mock Data (Port Harcourt June 2025)** | ✅ Complete |
| **All 43 Charge Line Items** | ✅ Complete |
| **Energy Accounting Tables** | ✅ Complete |
| **18 Explanatory Notes** | ✅ Complete |
| **UI Components** | ⏳ Pending |

---

**Module Status**: ✅ **Data Model & Service Layer Complete**
**Ready for**: UI Development
**Documentation**: Complete
**Sample Data**: Port Harcourt June 2025

