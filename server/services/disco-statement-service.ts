import type { DiscoStatement, DiscoCharge, DiscoStatementLineItem } from '@/types';

// Helper function to convert number to words (Nigerian Naira)
export function numberToWords(num: number): string {
  if (num === 0) return 'Zero Naira Only';

  const billion = Math.floor(num / 1000000000);
  const million = Math.floor((num % 1000000000) / 1000000);
  const thousand = Math.floor((num % 1000000) / 1000);
  const hundred = Math.floor(num % 1000);

  const parts: string[] = [];

  if (billion > 0) parts.push(`${billion} Billion`);
  if (million > 0) parts.push(`${million} Million`);
  if (thousand > 0) parts.push(`${thousand} Thousand`);
  if (hundred > 0) parts.push(`${hundred}`);

  return parts.join(', ') + ' Naira Only';
}

// Mock DISCO charges for June 2025 statement
const JUNE_2025_DISCO_CHARGES: DiscoCharge[] = [
  {
    discoId: '2',
    discoCode: 'ABUJA',
    discoName: 'Abuja Electricity Distribution Company (ABUJA)',
    columnCode: 'A',
    amount: 1055762770.57,
  },
  {
    discoId: '3',
    discoCode: 'BENIN',
    discoName: 'Benin Electricity Distribution Company (BENIN)',
    columnCode: 'B',
    amount: 544042773.24,
  },
  {
    discoId: '4',
    discoCode: 'EKO',
    discoName: 'Eko Electricity Distribution Company (EKO)',
    columnCode: 'C',
    amount: 854878304.37,
  },
  {
    discoId: '5',
    discoCode: 'ENUGU',
    discoName: 'Enugu Electricity Distribution Company (ENUGU)',
    columnCode: 'D',
    amount: 518494448.31,
  },
  {
    discoId: '6',
    discoCode: 'IBADAN',
    discoName: 'Ibadan Electricity Distribution Company (IBADAN)',
    columnCode: 'E',
    amount: 809639854.97,
  },
  {
    discoId: '7',
    discoCode: 'IKEJA',
    discoName: 'Ikeja Electricity Distribution Company (IKEJA)',
    columnCode: 'F',
    amount: 985269507.83,
  },
  {
    discoId: '8',
    discoCode: 'JOS',
    discoName: 'Jos Electricity Distribution Company (JOS)',
    columnCode: 'G',
    amount: 326344445.57,
  },
  {
    discoId: '9',
    discoCode: 'KADUNA',
    discoName: 'Kaduna Electricity Distribution Company (KADUNA)',
    columnCode: 'H',
    amount: 399344169.81,
  },
  {
    discoId: '10',
    discoCode: 'KANO',
    discoName: 'Kano Electricity Distribution Company (KANO)',
    columnCode: 'I',
    amount: 309481248.71,
  },
  {
    discoId: '11',
    discoCode: 'PH',
    discoName: 'Port Harcourt Electricity Distribution Company (PH)',
    columnCode: 'J',
    amount: 483245883.63,
  },
  {
    discoId: '12',
    discoCode: 'YOLA',
    discoName: 'Yola Electricity Distribution Company (YOLA)',
    columnCode: 'K',
    amount: 179101475.74,
  },
];

// Mock DISCO Statements
export const MOCK_DISCO_STATEMENTS: DiscoStatement[] = [
  {
    id: '1',
    statementNumber: 'NISO/MS/2025/06',
    title: 'FINAL MARKET SETTLEMENT STATEMENT - JUNE 2025 Total',
    period: 'June 2025',
    month: 6,
    year: 2025,
    recipientEntity: 'NIGERIA ELECTRICITY REGULATORY COMMISSION',
    recipientCode: 'REG.IND.001',
    representativeName: 'Chairman/CEO',
    representativeTitle: 'Chairman/CEO',
    address: 'PLOT 1387, CADASTRAL ZONE A00, CENTRAL BUSINESS DISTRICT',

    discoCharges: JUNE_2025_DISCO_CHARGES,
    zungeruEnergyCreditNaira: -487968046,

    totalAmount: 6007856138.74,
    outstandingPreviousMonth: 5523888092.74,
    outstandingCurrentMonth: 6007856138.74,

    lineItems: [
      {
        id: '1',
        description: 'TSP, MO, SO, AS, NBET and Regulatory Charges',
        category: 'regulatory',
        reference: 'Table I (Transmission and Admin Charges Feb - Dec 2024) Supplementary Order',
        baseAmount: 5200000000,
        adjustments: 0,
        totalAmount: 5200000000,
        calculation: 'Determined in line with Table I',
      },
      {
        id: '2',
        description: 'TCN Network Constraint Compensation',
        category: 'adjustment',
        reference: 'Section 4.62/103/2014',
        baseAmount: 450000000,
        adjustments: 0,
        totalAmount: 450000000,
        calculation: 'TCN unable to deliver load allocation',
      },
      {
        id: '3',
        description: 'DisCo Load Offtake Failure Compensation',
        category: 'adjustment',
        reference: 'Section 6.h of NERC/5/2023/021',
        baseAmount: 280000000,
        adjustments: 0,
        totalAmount: 280000000,
        calculation: 'DisCo failed to offtake load allocation',
      },
      {
        id: '4',
        description: 'Excess MYD Intake',
        category: 'energy',
        baseAmount: 165000000,
        adjustments: 0,
        totalAmount: 165000000,
        calculation: 'Excess Energy above DisCo MYTO Allocation',
      },
      {
        id: '5',
        description: 'Transmission Loss Factor Adjustment',
        category: 'adjustment',
        reference: 'Section 8.(a),(b) of NERC/5/2011',
        baseAmount: -87143861.26,
        adjustments: 0,
        totalAmount: -87143861.26,
        calculation: 'TLF Gain/Loss based on Average Cost of Generation',
      },
    ],

    explanatoryNotes: [
      'TSP, MO, SO, AS, NBET and Regulatory Charges were determined in line with Table I (Transmission and Admin Charges Feb - Dec 2024) Transmission Service and Market Operation Charges as Supplementary Order on the commencement of the Transitional Electricity Market (Order No. NERC/5/2011)',
      'Section 4.62/103/2014 requires that when TCN is unable to deliver the load allocation to a DisCo due to constraint in TCN\'s network, the company is obligated to compensate the DisCo for the associated loss',
      'Section 6.h of NERC/5/2023/021 requires that when a DisCo fails to offtake its load allocation due to constraints in its own network, the company is obligated to compensate TCN for loss of revenue arising from the stranded capacity',
      'Column II of Table I below, gives the measure of Energy that TCN was unable to deliver in kWh',
      'The Data was derived from "Feeder Trader Data" from the TEM Desk at National Control Centre Osogbo',
      'Column III of Table I below, gives the measure of Energy of what the DisCo was unable to take in kWh',
      'Column IV of Table I gives the Actual Energy Consumed by the DisCo from the Grid',
      'Column V of Table I gives the Excess Energy above the DisCo\'s MYTO Allocation',
      'Column VI of Table I is the MYTO Energy Allocation for the DisCo for the Settlement Month',
      'Section 8.(a),(b) of NERC/5/2011 states that the MO shall apportion the positive or negative difference between the actual TLF and 7.00% to DisCos',
      'Section 8.a,h & iv of NERC/5/2011 provides that the positive or negative difference between the actual TLF and 7.00% will be subtracted or added as the case may be to DisCo MYTO Wheeling Charges',
      'Section 8.k.v of NERC/5/2011 provides that Naira amount of the TLF Gain/Loss shall be based on the Average Cost of Generation multiplied by TLF Gain/Loss Energy/Loss',
      'Column TLF of Table I gives the Transmission Loss Factor Gain/Loss Energy Level',
      'Table II gives a tabulated calculation of how the final invoice was arrived at',
      'The Total Billing = Meter Reading Billing + Adjustment for Excess MYTO Intake + Loss of Revenue Compensation: DisCo to TCN + Loss of Revenue Compensation: DisCo to TCN - Transmission Loss Factor Gain - DisCo Deficit',
      'DisCo Loss of Revenue Compensation to the TCN is calculated in line with Section 4.a of the NERC\'s "Guidelines for Implementation of Market Dispatch and Other Related Matters" It is a positive number in the bill',
      'TCN Loss of Revenue Compensation to the DisCo is calculated in line with Section 6.h of the NERC\'s "Guidelines for Implementation of Market Dispatch and Other Related Matters" It is a negative number in the bill',
    ],

    nercReferences: [
      'NERC/5/2011',
      'NERC/5/2023/021',
      'Section 4.62/103/2014',
      'Section 6.h',
      'Section 8.(a),(b)',
      'Section 8.k.v',
    ],

    status: 'approved',
    draftedBy: 'Oluwaseun Adeyemi',
    draftedAt: new Date('2025-07-01'),
    approvedBy: 'System Administrator',
    approvedAt: new Date('2025-07-02'),
    sentTo: 'NERC',
    sentAt: new Date('2025-07-02'),

    amountInWords: 'Six Billion, Seven Million, Eight Hundred and Fifty - Six Thousand, One Hundred and Thirty - Eight Naira and Seventy - Four Kobo Only',

    createdAt: new Date('2025-07-01'),
    updatedAt: new Date('2025-07-02'),
  },
  {
    id: '2',
    statementNumber: 'NISO/MS/2025/05',
    title: 'FINAL MARKET SETTLEMENT STATEMENT - MAY 2025 Total',
    period: 'May 2025',
    month: 5,
    year: 2025,
    recipientEntity: 'NIGERIA ELECTRICITY REGULATORY COMMISSION',
    recipientCode: 'REG.IND.001',
    representativeName: 'Chairman/CEO',
    representativeTitle: 'Chairman/CEO',
    address: 'PLOT 1387, CADASTRAL ZONE A00, CENTRAL BUSINESS DISTRICT',

    discoCharges: JUNE_2025_DISCO_CHARGES.map(charge => ({
      ...charge,
      amount: charge.amount * 0.95, // 5% less than June
    })),
    zungeruEnergyCreditNaira: -450000000,

    totalAmount: 5523888092.74,
    outstandingCurrentMonth: 5523888092.74,

    lineItems: [],
    explanatoryNotes: [],
    nercReferences: ['NERC/5/2011', 'NERC/5/2023/021'],

    status: 'sent',
    draftedBy: 'Oluwaseun Adeyemi',
    draftedAt: new Date('2025-06-01'),
    approvedBy: 'System Administrator',
    approvedAt: new Date('2025-06-02'),
    sentTo: 'NERC',
    sentAt: new Date('2025-06-02'),
    acknowledgedBy: 'NERC Finance',
    acknowledgedAt: new Date('2025-06-05'),

    amountInWords: numberToWords(5523888092.74),

    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2025-06-05'),
  },
  {
    id: '3',
    statementNumber: 'NISO/MS/2025/07',
    title: 'DRAFT MARKET SETTLEMENT STATEMENT - JULY 2025 Total',
    period: 'July 2025',
    month: 7,
    year: 2025,
    recipientEntity: 'NIGERIA ELECTRICITY REGULATORY COMMISSION',
    recipientCode: 'REG.IND.001',
    representativeName: 'Chairman/CEO',
    representativeTitle: 'Chairman/CEO',
    address: 'PLOT 1387, CADASTRAL ZONE A00, CENTRAL BUSINESS DISTRICT',

    discoCharges: JUNE_2025_DISCO_CHARGES.map(charge => ({
      ...charge,
      amount: charge.amount * 1.03, // 3% more than June
    })),
    zungeruEnergyCreditNaira: -500000000,

    totalAmount: 6188071622.90,
    outstandingPreviousMonth: 6007856138.74,
    outstandingCurrentMonth: 6188071622.90,

    lineItems: [],
    explanatoryNotes: [],
    nercReferences: ['NERC/5/2011', 'NERC/5/2023/021'],

    status: 'pending_approval',
    draftedBy: 'Oluwaseun Adeyemi',
    draftedAt: new Date('2025-08-01'),

    amountInWords: numberToWords(6188071622.90),

    createdAt: new Date('2025-08-01'),
    updatedAt: new Date('2025-08-01'),
  },
];

// Service functions
export const discoStatementService = {
  // Get all statements
  getStatements: async (): Promise<DiscoStatement[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_DISCO_STATEMENTS;
  },

  // Get statement by ID
  getStatementById: async (id: string): Promise<DiscoStatement | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_DISCO_STATEMENTS.find(stmt => stmt.id === id) || null;
  },

  // Get statements by period
  getStatementsByPeriod: async (year: number, month?: number): Promise<DiscoStatement[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_DISCO_STATEMENTS.filter(stmt => {
      if (month) {
        return stmt.year === year && stmt.month === month;
      }
      return stmt.year === year;
    });
  },

  // Get statements by status
  getStatementsByStatus: async (status: string): Promise<DiscoStatement[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_DISCO_STATEMENTS.filter(stmt => stmt.status === status);
  },

  // Create statement
  createStatement: async (data: Partial<DiscoStatement>): Promise<DiscoStatement> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newStatement: DiscoStatement = {
      id: (MOCK_DISCO_STATEMENTS.length + 1).toString(),
      statementNumber: data.statementNumber || '',
      title: data.title || '',
      period: data.period || '',
      month: data.month || new Date().getMonth() + 1,
      year: data.year || new Date().getFullYear(),
      recipientEntity: data.recipientEntity || 'NIGERIA ELECTRICITY REGULATORY COMMISSION',
      recipientCode: data.recipientCode || 'REG.IND.001',
      representativeName: data.representativeName || 'Chairman/CEO',
      representativeTitle: data.representativeTitle || 'Chairman/CEO',
      address: data.address || '',
      discoCharges: data.discoCharges || [],
      zungeruEnergyCreditNaira: data.zungeruEnergyCreditNaira || 0,
      totalAmount: data.totalAmount || 0,
      outstandingCurrentMonth: data.outstandingCurrentMonth || 0,
      lineItems: data.lineItems || [],
      explanatoryNotes: data.explanatoryNotes || [],
      nercReferences: data.nercReferences || [],
      status: data.status || 'draft',
      amountInWords: data.amountInWords || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MOCK_DISCO_STATEMENTS.push(newStatement);
    return newStatement;
  },

  // Update statement
  updateStatement: async (id: string, data: Partial<DiscoStatement>): Promise<DiscoStatement | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_DISCO_STATEMENTS.findIndex(stmt => stmt.id === id);
    if (index === -1) return null;

    MOCK_DISCO_STATEMENTS[index] = {
      ...MOCK_DISCO_STATEMENTS[index],
      ...data,
      updatedAt: new Date(),
    };
    return MOCK_DISCO_STATEMENTS[index];
  },

  // Approve statement
  approveStatement: async (id: string, approvedBy: string): Promise<DiscoStatement | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_DISCO_STATEMENTS.findIndex(stmt => stmt.id === id);
    if (index === -1) return null;

    MOCK_DISCO_STATEMENTS[index] = {
      ...MOCK_DISCO_STATEMENTS[index],
      status: 'approved',
      approvedBy,
      approvedAt: new Date(),
      updatedAt: new Date(),
    };
    return MOCK_DISCO_STATEMENTS[index];
  },

  // Send statement
  sendStatement: async (id: string, sentTo: string): Promise<DiscoStatement | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_DISCO_STATEMENTS.findIndex(stmt => stmt.id === id);
    if (index === -1) return null;

    MOCK_DISCO_STATEMENTS[index] = {
      ...MOCK_DISCO_STATEMENTS[index],
      status: 'sent',
      sentTo,
      sentAt: new Date(),
      updatedAt: new Date(),
    };
    return MOCK_DISCO_STATEMENTS[index];
  },

  // Delete statement
  deleteStatement: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_DISCO_STATEMENTS.findIndex(stmt => stmt.id === id);
    if (index === -1) return false;

    MOCK_DISCO_STATEMENTS.splice(index, 1);
    return true;
  },

  // Get summary
  getSummary: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
      totalStatements: MOCK_DISCO_STATEMENTS.length,
      totalAmount: MOCK_DISCO_STATEMENTS.reduce((sum, stmt) => sum + stmt.totalAmount, 0),
      approvedCount: MOCK_DISCO_STATEMENTS.filter(s => s.status === 'approved').length,
      pendingCount: MOCK_DISCO_STATEMENTS.filter(s => s.status === 'pending_approval').length,
      disputedCount: MOCK_DISCO_STATEMENTS.filter(s => s.status === 'disputed').length,
      sentCount: MOCK_DISCO_STATEMENTS.filter(s => s.status === 'sent').length,
    };
  },
};
