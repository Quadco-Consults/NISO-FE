import type { BilateralStatement, BilateralTrade } from '@/types';

// Helper function to convert number to words for USD
function numberToWordsUSD(num: number): string {
  if (num === 0) return 'Zero Dollars Only';

  const billion = Math.floor(num / 1000000000);
  const million = Math.floor((num % 1000000000) / 1000000);
  const thousand = Math.floor((num % 1000000) / 1000);
  const hundred = Math.floor(num % 1000);
  const cents = Math.round((num % 1) * 100);

  const parts: string[] = [];

  if (billion > 0) parts.push(`${billion} Billion`);
  if (million > 0) parts.push(`${million} Million`);
  if (thousand > 0) parts.push(`${thousand} Thousand`);
  if (hundred > 0) parts.push(`${hundred}`);

  let result = parts.join(', ');
  if (cents > 0) {
    result += ` Dollar${hundred !== 1 ? 's' : ''} and ${cents} Cent${cents !== 1 ? 's' : ''} Only`;
  } else {
    result += ` Dollar${hundred !== 1 ? 's' : ''} Only`;
  }

  return result;
}

// Helper function to convert number to words for NGN
function numberToWordsNGN(num: number): string {
  if (num === 0) return 'Zero Naira Only';

  const billion = Math.floor(num / 1000000000);
  const million = Math.floor((num % 1000000000) / 1000000);
  const thousand = Math.floor((num % 1000000) / 1000);
  const hundred = Math.floor(num % 1000);
  const kobo = Math.round((num % 1) * 100);

  const parts: string[] = [];

  if (billion > 0) parts.push(`${billion} Billion`);
  if (million > 0) parts.push(`${million} Million`);
  if (thousand > 0) parts.push(`${thousand} Thousand`);
  if (hundred > 0) parts.push(`${hundred}`);

  let result = parts.join(', ');
  if (kobo > 0) {
    result += ` Naira and ${kobo} Kobo Only`;
  } else {
    result += ` Naira Only`;
  }

  return result;
}

// Mock bilateral trades for June 2025 statement - Reduced to 10 items
const JUNE_2025_BILATERAL_TRADES: BilateralTrade[] = [
  { id: '1', buyer: 'SBEE', seller: 'IKEJA_I(PARAS)', sellerCode: 'IKEJA_I(PARAS)', currency: 'USD', amount: 125000.00 },
  { id: '2', buyer: 'SBEE', seller: 'DELTA_1(UGHELLI)', sellerCode: 'DELTA_1(UGHELLI)', currency: 'USD', amount: 98500.50 },
  { id: '3', buyer: 'CEET', seller: 'ODUKPANI_I(CALABAR)', sellerCode: 'ODUKPANI_I(CALABAR)', currency: 'USD', amount: 75250.75 },
  { id: '4', buyer: 'SUNFLAG', seller: 'AFAM_3', sellerCode: 'AFAM_3', currency: 'USD', amount: 185000.25 },
  { id: '5', buyer: 'INNER GALAXY', seller: 'KAINJI', sellerCode: 'KAINJI', currency: 'NGN', amount: 18500000.00 },
  { id: '6', buyer: 'KAM INDUSTRIES', seller: 'IBAFO_1(TAOPEO)', sellerCode: 'IBAFO_1(TAOPEO)', currency: 'NGN', amount: 12750000.50 },
  { id: '7', buyer: 'HYDROPOLIS', seller: 'JEBBA_1', sellerCode: 'JEBBA_1', currency: 'NGN', amount: 9850000.25 },
  { id: '8', buyer: 'AFLE', seller: 'ALAOJI_1', sellerCode: 'ALAOJI_1', currency: 'NGN', amount: 8200000.75 },
  { id: '9', buyer: 'PRISM', seller: 'OMOTOSHO_2', sellerCode: 'OMOTOSHO_2', currency: 'NGN', amount: 6450000.00 },
  { id: '10', buyer: 'ZUNGERU HPP', seller: 'YONGHXING', sellerCode: 'YONGHXING', currency: 'NGN', amount: 7500000.00 },
];

// Mock Bilateral Statements
export const MOCK_BILATERAL_STATEMENTS: BilateralStatement[] = [
  {
    id: '1',
    statementNumber: 'NISO/BMS/2025/06',
    title: 'FINAL BILATERAL MARKET SETTLEMENT STATEMENT - JUNE 2025 Total',
    period: 'June 2025',
    month: 6,
    year: 2025,

    recipientEntity: 'NIGERIA ELECTRICITY REGULATORY COMMISSION',
    recipientCode: 'REG.IND.001',
    representativeName: 'Chairman/CEO',
    representativeTitle: 'Chairman/CEO',
    address: 'PLOT 1387, CADASTRAL ZONE A00, CENTRAL BUSINESS DISTRICT',

    tradeParticipant1: 'IKEJA_I(PARAS) AND SBEE',

    // Seller information for Page 2
    sellerName: 'PARAS/JDT',
    sellerCode: 'PARAS/JDT',
    sellerRepName: 'The Managing Director',
    sellerRepTitle: 'Managing Director',
    sellerAddress: 'KM 44 ABEOKUTA SHAGAMU EXPRESS WAY, ODUO, OGUN STATE, NIGERIA',

    trades: JUNE_2025_BILATERAL_TRADES,

    totalUSD: 483751.50,
    totalNGN: 63250001.50,
    outstandingUSD: 483751.50,
    outstandingNGN: 63250001.50,

    // Page 2 charges (for IKEJA_I(PARAS) AND SBEE trade)
    charges: {
      tspCharge: 850000.00,
      soCharges: 15000.00,
      moCharges: 7500.00,
      asCharges: 12000.00,
      tcnRegulatory: 20000.00,
      gencoRegulatory: 45000.00,
      total: 949500.00,
    },
    chargesCurrency: 'USD',

    amountInWordsUSD: numberToWordsUSD(483751.50),
    amountInWordsNGN: numberToWordsNGN(63250001.50),

    explanatoryNotes: [
      'Charges for TSP, MO, SO, AS, and Regulatory Charges were determined in line with negotiated bilateral agreements and Section 3 of Energy Swap and Supplementary Order on the commencement of the Transitional Electricity Market (Order No. NERC/15/2011)',
      'Section 8.a.i of NERC/15/2011 says the MO shall apportion the positive or negative difference between the actual TLF and 9.65% to all buyers',
      'Section 8.a.ii & iv of NERC/15/2011 says that the positive or negative difference between the actual TLF and 9.65% will be subtracted or added as the case may be to Buyer TSP Wheeling Charges',
      'Section 8.k.v of NERC/15/2011 says Naira amount of the TLF Gain/Loss shall be based on the Average Cost of Generation multiplied by TLF Energy Gain/Loss',
      'Column TLF of Table I gives the Transmission Loss Factor Gain/Loss Energy Level',
    ],

    nercReferences: [
      'NERC/15/2011',
      'Section 3',
      'Section 8.a.i',
      'Section 8.a.ii',
      'Section 8.k.v',
    ],

    status: 'approved',
    draftedBy: 'Chidinma Okonkwo',
    draftedAt: new Date('2025-07-01'),
    approvedBy: 'System Administrator',
    approvedAt: new Date('2025-07-02'),
    sentTo: 'NERC',
    sentAt: new Date('2025-07-02'),

    createdAt: new Date('2025-07-01'),
    updatedAt: new Date('2025-07-02'),
  },
  {
    id: '2',
    statementNumber: 'NISO/BMS/2025/05',
    title: 'FINAL BILATERAL MARKET SETTLEMENT STATEMENT - MAY 2025 Total',
    period: 'May 2025',
    month: 5,
    year: 2025,

    recipientEntity: 'NIGERIA ELECTRICITY REGULATORY COMMISSION',
    recipientCode: 'REG.IND.001',
    representativeName: 'Chairman/CEO',
    representativeTitle: 'Chairman/CEO',
    address: 'PLOT 1387, CADASTRAL ZONE A00, CENTRAL BUSINESS DISTRICT',

    tradeParticipant1: 'Various Bilateral Trades',

    trades: JUNE_2025_BILATERAL_TRADES.map(t => ({ ...t, amount: t.amount * 0.92 })),

    totalUSD: 445051.38,
    totalNGN: 58190001.38,
    outstandingUSD: 445051.38,
    outstandingNGN: 58190001.38,

    amountInWordsUSD: numberToWordsUSD(445051.38),
    amountInWordsNGN: numberToWordsNGN(58190001.38),

    explanatoryNotes: [],
    nercReferences: ['NERC/15/2011'],

    status: 'sent',
    draftedBy: 'Chidinma Okonkwo',
    draftedAt: new Date('2025-06-01'),
    approvedBy: 'System Administrator',
    approvedAt: new Date('2025-06-02'),
    sentTo: 'NERC',
    sentAt: new Date('2025-06-02'),
    acknowledgedBy: 'NERC Finance',
    acknowledgedAt: new Date('2025-06-05'),

    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2025-06-05'),
  },
  {
    id: '3',
    statementNumber: 'NISO/BMS/2025/07',
    title: 'DRAFT BILATERAL MARKET SETTLEMENT STATEMENT - JULY 2025 Total',
    period: 'July 2025',
    month: 7,
    year: 2025,

    recipientEntity: 'NIGERIA ELECTRICITY REGULATORY COMMISSION',
    recipientCode: 'REG.IND.001',
    representativeName: 'Chairman/CEO',
    representativeTitle: 'Chairman/CEO',
    address: 'PLOT 1387, CADASTRAL ZONE A00, CENTRAL BUSINESS DISTRICT',

    tradeParticipant1: 'Various Bilateral Trades',

    trades: JUNE_2025_BILATERAL_TRADES.map(t => ({ ...t, amount: t.amount * 1.05 })),

    totalUSD: 507939.08,
    totalNGN: 66412501.58,
    outstandingUSD: 507939.08,
    outstandingNGN: 66412501.58,

    amountInWordsUSD: numberToWordsUSD(507939.08),
    amountInWordsNGN: numberToWordsNGN(66412501.58),

    explanatoryNotes: [],
    nercReferences: ['NERC/15/2011'],

    status: 'pending_approval',
    draftedBy: 'Chidinma Okonkwo',
    draftedAt: new Date('2025-08-01'),

    createdAt: new Date('2025-08-01'),
    updatedAt: new Date('2025-08-01'),
  },
];

// Service functions
export const bilateralStatementService = {
  // Get all statements
  getStatements: async (): Promise<BilateralStatement[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_BILATERAL_STATEMENTS;
  },

  // Get statement by ID
  getStatementById: async (id: string): Promise<BilateralStatement | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_BILATERAL_STATEMENTS.find(stmt => stmt.id === id) || null;
  },

  // Get statements by period
  getStatementsByPeriod: async (year: number, month?: number): Promise<BilateralStatement[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_BILATERAL_STATEMENTS.filter(stmt => {
      if (month) {
        return stmt.year === year && stmt.month === month;
      }
      return stmt.year === year;
    });
  },

  // Get statements by status
  getStatementsByStatus: async (status: string): Promise<BilateralStatement[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_BILATERAL_STATEMENTS.filter(stmt => stmt.status === status);
  },

  // Create statement
  createStatement: async (data: Partial<BilateralStatement>): Promise<BilateralStatement> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newStatement: BilateralStatement = {
      id: (MOCK_BILATERAL_STATEMENTS.length + 1).toString(),
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
      tradeParticipant1: data.tradeParticipant1 || '',
      trades: data.trades || [],
      totalUSD: data.totalUSD || 0,
      totalNGN: data.totalNGN || 0,
      outstandingUSD: data.outstandingUSD || 0,
      outstandingNGN: data.outstandingNGN || 0,
      amountInWordsUSD: data.amountInWordsUSD || '',
      amountInWordsNGN: data.amountInWordsNGN || '',
      explanatoryNotes: data.explanatoryNotes || [],
      nercReferences: data.nercReferences || [],
      status: data.status || 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MOCK_BILATERAL_STATEMENTS.push(newStatement);
    return newStatement;
  },

  // Update statement
  updateStatement: async (id: string, data: Partial<BilateralStatement>): Promise<BilateralStatement | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_BILATERAL_STATEMENTS.findIndex(stmt => stmt.id === id);
    if (index === -1) return null;

    MOCK_BILATERAL_STATEMENTS[index] = {
      ...MOCK_BILATERAL_STATEMENTS[index],
      ...data,
      updatedAt: new Date(),
    };
    return MOCK_BILATERAL_STATEMENTS[index];
  },

  // Approve statement
  approveStatement: async (id: string, approvedBy: string): Promise<BilateralStatement | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_BILATERAL_STATEMENTS.findIndex(stmt => stmt.id === id);
    if (index === -1) return null;

    MOCK_BILATERAL_STATEMENTS[index] = {
      ...MOCK_BILATERAL_STATEMENTS[index],
      status: 'approved',
      approvedBy,
      approvedAt: new Date(),
      updatedAt: new Date(),
    };
    return MOCK_BILATERAL_STATEMENTS[index];
  },

  // Send statement
  sendStatement: async (id: string, sentTo: string): Promise<BilateralStatement | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_BILATERAL_STATEMENTS.findIndex(stmt => stmt.id === id);
    if (index === -1) return null;

    MOCK_BILATERAL_STATEMENTS[index] = {
      ...MOCK_BILATERAL_STATEMENTS[index],
      status: 'sent',
      sentTo,
      sentAt: new Date(),
      updatedAt: new Date(),
    };
    return MOCK_BILATERAL_STATEMENTS[index];
  },

  // Delete statement
  deleteStatement: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_BILATERAL_STATEMENTS.findIndex(stmt => stmt.id === id);
    if (index === -1) return false;

    MOCK_BILATERAL_STATEMENTS.splice(index, 1);
    return true;
  },

  // Get summary
  getSummary: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
      totalStatements: MOCK_BILATERAL_STATEMENTS.length,
      totalAmountUSD: MOCK_BILATERAL_STATEMENTS.reduce((sum, stmt) => sum + stmt.totalUSD, 0),
      totalAmountNGN: MOCK_BILATERAL_STATEMENTS.reduce((sum, stmt) => sum + stmt.totalNGN, 0),
      approvedCount: MOCK_BILATERAL_STATEMENTS.filter(s => s.status === 'approved').length,
      pendingCount: MOCK_BILATERAL_STATEMENTS.filter(s => s.status === 'pending_approval').length,
      disputedCount: MOCK_BILATERAL_STATEMENTS.filter(s => s.status === 'disputed').length,
      sentCount: MOCK_BILATERAL_STATEMENTS.filter(s => s.status === 'sent').length,
    };
  },
};
