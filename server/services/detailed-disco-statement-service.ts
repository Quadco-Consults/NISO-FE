/**
 * Detailed DISCO Statement Service
 *
 * Service for managing individual DISCO statements with complete
 * line-item breakdown, energy accounting, and explanatory notes.
 *
 * Based on Port Harcourt Electricity Distribution PLC June 2025 statement.
 */

import type {
  DetailedDiscoStatement,
  DiscoStatementChargeLineItem,
  ContractEnergyAccounting,
  InvoiceDerivation,
  DiscoStatementExplanatoryNote,
  MytoAllocation,
  LossOfRevenueCalculation,
  TlfCalculation,
  PpaAdjustment,
  GenerationShortage,
} from '@/types';

// ==========================================
// PORT HARCOURT JUNE 2025 DETAILED STATEMENT
// ==========================================

// Charge Line Items - Reduced to 15 key items
const PH_JUNE_2025_CHARGE_LINE_ITEMS: DiscoStatementChargeLineItem[] = [
  // Section 1: Metered Energy Charges (Top 5)
  { id: '1.1', chargeCode: '1.1 MET.TSP', category: 'MET', serviceProvider: 'TSP', description: 'Transmission Company of Nigeria Energy Charge', notes: 'A', amount: 850511129.83, sequence: 1.1 },
  { id: '1.2', chargeCode: '1.2 MET.SO', category: 'MET', serviceProvider: 'SO', description: 'Nigeria Independent System Operator Energy Charge', notes: 'B', amount: 253551722.09, sequence: 1.2 },
  { id: '1.3', chargeCode: '1.3 MET.TIF', category: 'MET', serviceProvider: 'TIF', description: 'Transmission Infrastructure Energy Charge', notes: 'C', amount: 414276153.90, sequence: 1.3 },
  { id: '1.4', chargeCode: '1.4 MET.ANC', category: 'MET', serviceProvider: 'ANC', description: 'Ancillary Services Energy Charge', notes: 'D', amount: 70501712.30, sequence: 1.4 },
  { id: '1.5', chargeCode: '1.5 MET.NBET', category: 'MET', serviceProvider: 'NBET', description: 'Nigeria Bulk Electricity Trader Energy Charge', notes: 'E', amount: 22005910.38, sequence: 1.5 },

  // Section 2: Regulatory Charges (Top 3)
  { id: '1.6', chargeCode: '1.6 MET.TRC', category: 'MET', serviceProvider: 'TRC', description: 'TCN/NISO Regulatory Energy Charge', notes: 'G', amount: 322405567.82, sequence: 1.6 },
  { id: '1.7', chargeCode: '1.7 MET.DRC', category: 'MET', serviceProvider: 'DRC', description: 'Disco Regulatory Energy Charge', notes: 'H', amount: 113824094.40, sequence: 1.7 },
  { id: '1.8', chargeCode: '1.8 MET.GRC', category: 'MET', serviceProvider: 'GRC', description: 'GENCO Regulatory Energy Charge', notes: 'F', amount: 16560942.77, sequence: 1.8 },

  // Section 3: Loss of Revenue Compensation from Disco (Top 3)
  { id: '3.1', chargeCode: '3.1 DLR.TSP', category: 'DLR', serviceProvider: 'TSP', description: 'Transmission Company of Nigeria LoRRD', notes: 'A', amount: 41682695.30, sequence: 3.1 },
  { id: '3.2', chargeCode: '3.2 DLR.TIF', category: 'DLR', serviceProvider: 'TIF', description: 'Transmission Infrastructure LoRRD', notes: 'C', amount: 20303257.61, sequence: 3.2 },
  { id: '3.3', chargeCode: '3.3 DLR.TRC', category: 'DLR', serviceProvider: 'TRC', description: 'TCN/NISO Regulatory LoRRD', notes: 'G', amount: 15800772.65, sequence: 3.3 },

  // Section 4: Loss of Revenue from TSP (Top 3)
  { id: '4.1', chargeCode: '4.1 TLR.TSP', category: 'TLR', serviceProvider: 'TSP', description: 'Transmission Company of Nigeria LoRFT', notes: 'A', amount: (163761034.96), sequence: 4.1 },
  { id: '4.2', chargeCode: '4.2 TLR.TIF', category: 'TLR', serviceProvider: 'TIF', description: 'Transmission Infrastructure LoRFT', notes: 'C', amount: 7579788.30, sequence: 4.2 },
  { id: '4.3', chargeCode: '4.3 TLR.TRC', category: 'TLR', serviceProvider: 'TRC', description: 'TCN/NISO Regulatory LoRFT', notes: 'G', amount: 5898881.62, sequence: 4.3 },

  // Section 5: Transmission Loss Factor
  { id: '5.1', chargeCode: '5.1 TL.TSP', category: 'TL', serviceProvider: 'TSP', description: 'Transmission Loss Factor Compensation', notes: 'A', amount: (326956213.74), sequence: 5.1 },
];

// Calculate category totals
const calculateCategoryTotals = (items: DiscoStatementChargeLineItem[]) => {
  return {
    meteredEnergyChargesTotal: items.filter(i => i.category === 'MET').reduce((sum, i) => sum + i.amount, 0),
    contractExcessAdjustmentTotal: items.filter(i => i.category === 'CEA').reduce((sum, i) => sum + i.amount, 0),
    discoLossOfRevenueTotal: items.filter(i => i.category === 'DLR').reduce((sum, i) => sum + i.amount, 0),
    tspLossOfRevenueTotal: items.filter(i => i.category === 'TLR').reduce((sum, i) => sum + i.amount, 0),
    transmissionLossFactorTotal: items.filter(i => i.category === 'TL').reduce((sum, i) => sum + i.amount, 0),
    ppAdjustmentsTotal: items.filter(i => i.category === 'LQD').reduce((sum, i) => sum + i.amount, 0),
  };
};

const totals = calculateCategoryTotals(PH_JUNE_2025_CHARGE_LINE_ITEMS);

// Energy Accounting (Table 1 from Image 2)
const PH_JUNE_2025_ENERGY_ACCOUNTING: ContractEnergyAccounting = {
  discoId: 'PH',
  discoCode: 'P/H',
  discoName: 'Port Harcourt Electricity Distribution Company',
  period: 'June 2025',

  meterReadingKwh: 190910670,
  mytoExcessAdjustmentKwh: 0,
  discoEnergyDeficitKwh: 9356340,
  tcnDeficitKwh: 3492990,
  transmissionLossFactorKwh: 2904080,
  totalKwh: 203760000,

  mytoRequirementKwh: 203760000,
  generationShortageKwh: 0,
  adjustedMytoKwh: 203760000,
};

// Invoice Derivations (Table 2) - Reduced to match charge items
const PH_JUNE_2025_INVOICE_DERIVATIONS: InvoiceDerivation[] = [
  {
    discoId: 'PH',
    discoCode: 'P/H',
    discoName: 'Port Harcourt Electricity Distribution Company',
    period: 'June 2025',
    notes: 'A',
    entity: 'TCN',
    ratePerKwh: 4.4550,
    meterReadingBilling: 850511130,
    mytoExcessAdjustment: 0,
    lossOfRevenueDiscoToSp: 41682695,
    lossOfRevenueTcnToSpOrDisco: (163761035),
    tlf: (326956214),
    total: 401476577,
  },
  {
    discoId: 'PH',
    discoCode: 'P/H',
    discoName: 'Port Harcourt Electricity Distribution Company',
    period: 'June 2025',
    notes: 'B',
    entity: 'NISO',
    ratePerKwh: 1.3281,
    meterReadingBilling: 253551722,
    mytoExcessAdjustment: 0,
    lossOfRevenueDiscoToSp: 12426315,
    lossOfRevenueTcnToSpOrDisco: 4639100,
    tlf: 0,
    total: 270617136,
  },
  {
    discoId: 'PH',
    discoCode: 'P/H',
    discoName: 'Port Harcourt Electricity Distribution Company',
    period: 'June 2025',
    notes: 'C',
    entity: 'TIF',
    ratePerKwh: 2.1700,
    meterReadingBilling: 414276154,
    mytoExcessAdjustment: 0,
    lossOfRevenueDiscoToSp: 20303258,
    lossOfRevenueTcnToSpOrDisco: 7579788,
    tlf: 0,
    total: 442159200,
  },
  {
    discoId: 'PH',
    discoCode: 'P/H',
    discoName: 'Port Harcourt Electricity Distribution Company',
    period: 'June 2025',
    notes: 'D',
    entity: 'AS',
    ratePerKwh: 0.3693,
    meterReadingBilling: 70501712,
    mytoExcessAdjustment: 0,
    lossOfRevenueDiscoToSp: 3455218,
    lossOfRevenueTcnToSpOrDisco: 1289932,
    tlf: 0,
    total: 75246862,
  },
  {
    discoId: 'PH',
    discoCode: 'P/H',
    discoName: 'Port Harcourt Electricity Distribution Company',
    period: 'June 2025',
    notes: 'E',
    entity: 'NBET',
    ratePerKwh: 0.1260,
    meterReadingBilling: 22005910,
    mytoExcessAdjustment: 0,
    lossOfRevenueDiscoToSp: 1178527,
    lossOfRevenueTcnToSpOrDisco: 439978,
    tlf: 0,
    total: 23624414,
  },
];

// Explanatory Notes (18 notes from Image 2)
const PH_JUNE_2025_EXPLANATORY_NOTES: DiscoStatementExplanatoryNote[] = [
  {
    id: 'note-1',
    noteNumber: 1,
    category: 'regulation',
    content: 'TSP, MO, SO, AS, NBET and Regulatory Charges were determined in line with Table 1 (Transmission and Admin Charges Feb - Dec 2024) Communication of the Transmission Service and Market Administrative Charges for February to December 2024 and Section 8(k) of the Supplementary Order on the commencement of the Transitional Electricity Market (Order No: NERC/15/0011)',
    nercReference: 'NERC/15/0011',
  },
  {
    id: 'note-2',
    noteNumber: 2,
    category: 'regulation',
    content: 'Section 17 of NERC/2023/034 requires that when TCN is unable to deliver the load allocation to a Disco due to constraint in TCN\'s network, TCN shall be liable to compensate the Disco for the associated loss of Revenue.',
    subNotes: [
      { letter: 'a', content: 'Column IV of Table 1 below, gives the measure of Energy that TCN was unable to deliver in KWh' },
      { letter: 'b', content: 'The data was derived from "Feeder Utilization Data" from the TEM Desk at National Control Centre Osogbo' },
    ],
    nercReference: 'NERC/2023/034',
    tableReference: 'Table 1, Column IV',
  },
  {
    id: 'note-3',
    noteNumber: 3,
    category: 'regulation',
    content: 'Section 17 of NERC/2023/034 requires that when a Disco fails to offtake its load allocation due to constraints in its own network, the company is obligated to compensate TCN for loss of revenue arising from the stranded capacity',
    subNotes: [
      { letter: 'a', content: 'Column III of Table 1 in the Explanatory Section to this Invoice gives the measure of Energy of what the Disco was unable to take in KWh' },
      { letter: 'b', content: 'The information and values were derived from "Feeder Utilization Data" from the TEM Desk at National Control Centre Osogbo' },
    ],
    nercReference: 'NERC/2023/034',
    tableReference: 'Table 1, Column III',
  },
  {
    id: 'note-4',
    noteNumber: 4,
    category: 'reference',
    content: 'Column I of Table 1 gives the Actual Energy Consumed by the Disco from the Grid',
    tableReference: 'Table 1, Column I',
  },
  {
    id: 'note-5',
    noteNumber: 5,
    category: 'reference',
    content: 'Column II of Table 1 gives the Excess Energy above the Disco\'s MYTO Allocation.',
    tableReference: 'Table 1, Column II',
  },
  {
    id: 'note-6',
    noteNumber: 6,
    category: 'formula',
    content: 'Column V of Table 1 is the MYTO Energy Allocation for the Disco for the Settlement Month',
    subNotes: [
      { letter: 'a', content: 'Column V = Column I + Column II + Column III + Column IV' },
      { letter: 'b', content: 'MYTO Allocation = Metered Energy - Excess MYTO Intake + TCN Deficit + Disco Deficit' },
    ],
    tableReference: 'Table 1, Column V',
  },
  {
    id: 'note-7',
    noteNumber: 7,
    category: 'regulation',
    content: 'Section 8.(k).(ii) of NERC/15/0011 states that the MO shall apportion the positive or negative difference between the actual TLF and 7.00% to Discos',
    nercReference: 'NERC/15/0011',
  },
  {
    id: 'note-8',
    noteNumber: 8,
    category: 'regulation',
    content: 'Section 8.k.iii & iv of NERC/15/0011 provides that the positive or negative difference between the actual TLF and 7.00% will be subtracted or added from the TSP Wheeling Charges',
    nercReference: 'NERC/15/0011',
  },
  {
    id: 'note-9',
    noteNumber: 9,
    category: 'calculation',
    content: 'Section 8.k.v of NERC/15/0011 provides that Naira amount of the TLF Gain/Loss shall be based on the Average Cost of Generation multiplied by the TLF Energy Gain/Loss',
    nercReference: 'NERC/15/0011',
  },
  {
    id: 'note-10',
    noteNumber: 10,
    category: 'reference',
    content: 'Column TLF of Table 1 gives the Transmission Loss Factor Gain/Loss Energy Level',
    tableReference: 'Table 1, Column TLF',
  },
  {
    id: 'note-11',
    noteNumber: 11,
    category: 'reference',
    content: 'Table II gives a tabulated calculation of how the final invoice was arrived at.',
    tableReference: 'Table 2',
  },
  {
    id: 'note-12',
    noteNumber: 12,
    category: 'formula',
    title: 'The Total Billing for a component; for instance TSP is:',
    content: '',
    subNotes: [
      { letter: 'a', content: 'Total Billing = Meter Reading Billing + Adjustment for Excess MYTO Intake + Loss of Revenue Compensation: Disco to TCN + Loss of Revenue Compensation: TCN to Disco + Transmission Loss Factor Gain/Loss (+/-)' },
      { letter: 'b', content: 'Disco Loss of Revenue Compensation to the TCN is calculated in line with Section 6.e of the NERC\'s "Guidelines for Implementation of Merit Order Dispatch and Other Related Matters" It is a positive number in the bill' },
      { letter: 'c', content: 'TCN Loss of Revenue Compensation to the Disco is calculated in line with Section 6.h of the NERC\'s "Guidelines for Implementation of Merit Order Dispatch and Other Related Matters" It is a negative number in the bill' },
    ],
  },
];

// Complete Port Harcourt June 2025 Statement
const PORT_HARCOURT_JUNE_2025_STATEMENT: DetailedDiscoStatement = {
  id: 'ph-statement-202506',
  statementNumber: 'NISO/PH/2025/06',
  period: 'June 2025',
  month: 6,
  year: 2025,

  participantName: 'PORT HARCOURT ELECTRICITY DISTRIBUTION PLC',
  contractId: 'NBET/035',
  participantRepName: 'The Managing Director',
  participantRepAddress: 'NO 42 OBWBALIRI, RUMUIGBO, PH, RIVERS STATE',

  title: 'FINAL MARKET SETTLEMENT STATEMENT: JUNE 2025 Total',

  chargeLineItems: PH_JUNE_2025_CHARGE_LINE_ITEMS,

  ...totals,

  zungeruEnergyCreditNaira: (73303577.36),

  june2025Total: 1523086495.85,

  outstandingInvoices: 8546703577.00,
  currentAmountDue: 10069790412.84,

  amountInWords: 'Ten Billion, Sixty - Nine Million, Seven Hundred and Ninety Thousand, Four Hundred and Twelve Naira and Eighty - Four Kobo Only',

  energyAccounting: PH_JUNE_2025_ENERGY_ACCOUNTING,
  invoiceDerivations: PH_JUNE_2025_INVOICE_DERIVATIONS,

  explanatoryNotes: PH_JUNE_2025_EXPLANATORY_NOTES,

  status: 'sent',
  draftedBy: 'Ibrahim Musa',
  draftedAt: new Date('2025-06-05T09:30:00'),
  approvedBy: 'Ali Bukar Ahmad',
  approvedAt: new Date('2025-06-28T14:15:00'),
  sentTo: 'NERC - Port Harcourt Office',
  sentAt: new Date('2025-06-28T16:45:00'),

  createdAt: new Date('2025-06-01'),
  updatedAt: new Date('2025-06-30'),
};

// Helper function to generate charge line items with scaled amounts
const generateChargeLineItems = (multiplier: number): DiscoStatementChargeLineItem[] => {
  return PH_JUNE_2025_CHARGE_LINE_ITEMS.map(item => ({
    ...item,
    amount: item.amount * multiplier,
  }));
};

// ==========================================
// ABUJA JUNE 2025 STATEMENT
// ==========================================
const ABUJA_CHARGE_ITEMS = generateChargeLineItems(1.95);
const ABUJA_TOTALS = calculateCategoryTotals(ABUJA_CHARGE_ITEMS);

const ABUJA_JUNE_2025_STATEMENT: DetailedDiscoStatement = {
  id: 'abuja-statement-202506',
  statementNumber: 'NISO/ABUJA/2025/06',
  period: 'June 2025',
  month: 6,
  year: 2025,
  participantName: 'ABUJA ELECTRICITY DISTRIBUTION COMPANY',
  contractId: 'NBET/001',
  participantRepName: 'The Managing Director',
  participantRepAddress: 'NO 1 ADETOKUNBO ADEMOLA CRESCENT, WUSE II, ABUJA',
  title: 'FINAL MARKET SETTLEMENT STATEMENT: JUNE 2025 Total',
  chargeLineItems: ABUJA_CHARGE_ITEMS,
  ...ABUJA_TOTALS,
  zungeruEnergyCreditNaira: (142941676.10),
  june2025Total: 2970018667.15,
  outstandingInvoices: 16665471874.10,
  currentAmountDue: 19635490541.25,
  amountInWords: 'Nineteen Billion, Six Hundred and Thirty-Five Million, Four Hundred and Ninety Thousand, Five Hundred and Forty-One Naira and Twenty-Five Kobo Only',
  energyAccounting: {
    discoId: 'ABUJA',
    discoCode: 'ABUJA',
    discoName: 'Abuja Electricity Distribution Company',
    period: 'June 2025',
    meterReadingKwh: 372275307,
    mytoExcessAdjustmentKwh: 0,
    discoEnergyDeficitKwh: 18244863,
    tcnDeficitKwh: 6811331,
    transmissionLossFactorKwh: 5662956,
    totalKwh: 397332001,
    mytoRequirementKwh: 397332001,
    generationShortageKwh: 0,
    adjustedMytoKwh: 397332001,
  },
  invoiceDerivations: [],
  explanatoryNotes: PH_JUNE_2025_EXPLANATORY_NOTES,
  status: 'approved',
  draftedBy: 'Fatima Abubakar',
  draftedAt: new Date('2025-06-04T11:20:00'),
  approvedBy: 'Ali Bukar Ahmad',
  approvedAt: new Date('2025-06-27T10:30:00'),
  sentTo: 'NERC - Abuja Office',
  sentAt: new Date('2025-06-27T15:00:00'),
  createdAt: new Date('2025-06-01'),
  updatedAt: new Date('2025-06-30'),
};

// ==========================================
// EKO JUNE 2025 STATEMENT
// ==========================================
const EKO_CHARGE_ITEMS = generateChargeLineItems(1.46);
const EKO_TOTALS = calculateCategoryTotals(EKO_CHARGE_ITEMS);

const EKO_JUNE_2025_STATEMENT: DetailedDiscoStatement = {
  id: 'eko-statement-202506',
  statementNumber: 'NISO/EKO/2025/06',
  period: 'June 2025',
  month: 6,
  year: 2025,
  participantName: 'EKO ELECTRICITY DISTRIBUTION COMPANY',
  contractId: 'NBET/012',
  participantRepName: 'The Managing Director',
  participantRepAddress: 'NO 24/25 MARINA, LAGOS ISLAND, LAGOS',
  title: 'FINAL MARKET SETTLEMENT STATEMENT: JUNE 2025 Total',
  chargeLineItems: EKO_CHARGE_ITEMS,
  ...EKO_TOTALS,
  zungeruEnergyCreditNaira: (107023622.41),
  june2025Total: 2223706283.74,
  outstandingInvoices: 12481237371.08,
  currentAmountDue: 14704943654.82,
  amountInWords: 'Fourteen Billion, Seven Hundred and Four Million, Nine Hundred and Forty-Three Thousand, Six Hundred and Fifty-Four Naira and Eighty-Two Kobo Only',
  energyAccounting: {
    discoId: 'EKO',
    discoCode: 'EKO',
    discoName: 'Eko Electricity Distribution Company',
    period: 'June 2025',
    meterReadingKwh: 278729578,
    mytoExcessAdjustmentKwh: 0,
    discoEnergyDeficitKwh: 13660256,
    tcnDeficitKwh: 5099566,
    transmissionLossFactorKwh: 4239957,
    totalKwh: 297490400,
    mytoRequirementKwh: 297490400,
    generationShortageKwh: 0,
    adjustedMytoKwh: 297490400,
  },
  invoiceDerivations: [],
  explanatoryNotes: PH_JUNE_2025_EXPLANATORY_NOTES,
  status: 'finalized',
  draftedBy: 'Chioma Okafor',
  draftedAt: new Date('2025-06-03T14:45:00'),
  approvedBy: 'Ali Bukar Ahmad',
  approvedAt: new Date('2025-06-26T16:20:00'),
  sentTo: 'NERC - Lagos Office',
  sentAt: new Date('2025-06-29T09:15:00'),
  createdAt: new Date('2025-06-01'),
  updatedAt: new Date('2025-06-30'),
};

// ==========================================
// IKEJA JUNE 2025 STATEMENT
// ==========================================
const IKEJA_CHARGE_ITEMS = generateChargeLineItems(2.15);
const IKEJA_TOTALS = calculateCategoryTotals(IKEJA_CHARGE_ITEMS);

const IKEJA_JUNE_2025_STATEMENT: DetailedDiscoStatement = {
  id: 'ikeja-statement-202506',
  statementNumber: 'NISO/IKEJA/2025/06',
  period: 'June 2025',
  month: 6,
  year: 2025,
  participantName: 'IKEJA ELECTRICITY DISTRIBUTION COMPANY',
  contractId: 'NBET/018',
  participantRepName: 'The Managing Director',
  participantRepAddress: 'NO 27 OBAFEMI AWOLOWO WAY, IKEJA, LAGOS',
  title: 'FINAL MARKET SETTLEMENT STATEMENT: JUNE 2025 Total',
  chargeLineItems: IKEJA_CHARGE_ITEMS,
  ...IKEJA_TOTALS,
  zungeruEnergyCreditNaira: (157602691.30),
  june2025Total: 3274635966.08,
  outstandingInvoices: 18380918189.70,
  currentAmountDue: 21655554155.78,
  amountInWords: 'Twenty-One Billion, Six Hundred and Fifty-Five Million, Five Hundred and Fifty-Four Thousand, One Hundred and Fifty-Five Naira and Seventy-Eight Kobo Only',
  energyAccounting: {
    discoId: 'IKEJA',
    discoCode: 'IKEJA',
    discoName: 'Ikeja Electricity Distribution Company',
    period: 'June 2025',
    meterReadingKwh: 410457941,
    mytoExcessAdjustmentKwh: 0,
    discoEnergyDeficitKwh: 20116131,
    tcnDeficitKwh: 7509928,
    transmissionLossFactorKwh: 6246772,
    totalKwh: 437984120,
    mytoRequirementKwh: 437984120,
    generationShortageKwh: 0,
    adjustedMytoKwh: 437984120,
  },
  invoiceDerivations: [],
  explanatoryNotes: PH_JUNE_2025_EXPLANATORY_NOTES,
  status: 'sent',
  draftedBy: 'Ahmed Yusuf',
  draftedAt: new Date('2025-06-06T08:15:00'),
  approvedBy: 'Ali Bukar Ahmad',
  approvedAt: new Date('2025-06-29T11:45:00'),
  sentTo: 'NERC - Ikeja Office',
  sentAt: new Date('2025-06-29T14:30:00'),
  createdAt: new Date('2025-06-01'),
  updatedAt: new Date('2025-06-30'),
};

// All statements array
const ALL_STATEMENTS = [
  PORT_HARCOURT_JUNE_2025_STATEMENT,
  ABUJA_JUNE_2025_STATEMENT,
  EKO_JUNE_2025_STATEMENT,
  IKEJA_JUNE_2025_STATEMENT,
];

// ==========================================
// SERVICE FUNCTIONS
// ==========================================

export const detailedDiscoStatementService = {
  /**
   * Get all detailed statements
   */
  async getDetailedStatements(): Promise<DetailedDiscoStatement[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return ALL_STATEMENTS;
  },

  /**
   * Get single detailed statement by ID
   */
  async getDetailedStatementById(id: string): Promise<DetailedDiscoStatement | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const statement = ALL_STATEMENTS.find(s => s.id === id);
    return statement || null;
  },

  /**
   * Get detailed statement by DISCO and period
   */
  async getDetailedStatementByDiscoPeriod(discoId: string, period: string): Promise<DetailedDiscoStatement | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const statement = ALL_STATEMENTS.find(
      s => s.energyAccounting.discoId === discoId && s.period === period
    );
    return statement || null;
  },

  /**
   * Get charge line items by category
   */
  async getChargeLineItemsByCategory(statementId: string, category: string) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const statement = ALL_STATEMENTS.find(s => s.id === statementId);
    if (statement) {
      return statement.chargeLineItems.filter((item) => item.category === category);
    }
    return [];
  },

  /**
   * Get energy accounting
   */
  async getEnergyAccounting(statementId: string): Promise<ContractEnergyAccounting | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const statement = ALL_STATEMENTS.find(s => s.id === statementId);
    return statement?.energyAccounting || null;
  },

  /**
   * Get invoice derivations
   */
  async getInvoiceDerivations(statementId: string): Promise<InvoiceDerivation[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const statement = ALL_STATEMENTS.find(s => s.id === statementId);
    return statement?.invoiceDerivations || [];
  },

  /**
   * Get explanatory notes
   */
  async getExplanatoryNotes(statementId: string): Promise<DiscoStatementExplanatoryNote[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const statement = ALL_STATEMENTS.find(s => s.id === statementId);
    return statement?.explanatoryNotes || [];
  },

  /**
   * Calculate category totals
   */
  async getCategoryTotals(statementId: string) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const statement = ALL_STATEMENTS.find(s => s.id === statementId);
    if (statement) {
      return calculateCategoryTotals(statement.chargeLineItems);
    }
    return null;
  },
};
