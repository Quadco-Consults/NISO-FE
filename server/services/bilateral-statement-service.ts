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

// Mock bilateral trades for June 2025 statement
const JUNE_2025_BILATERAL_TRADES: BilateralTrade[] = [
  { id: '1', buyer: 'SBEE', seller: 'IKEJA_I(PARAS)', sellerCode: 'IKEJA_I(PARAS)', currency: 'USD', amount: 77584.55 },
  { id: '2', buyer: 'SBEE', seller: 'DELTA_1(UGHELLI)', sellerCode: 'DELTA_1(UGHELLI)', currency: 'USD', amount: 74622.71 },
  { id: '3', buyer: 'SBEE', seller: 'AFAM_3', sellerCode: 'AFAM_3', currency: 'USD', amount: 7057.79 },
  { id: '4', buyer: 'CEET', seller: 'ODUKPANI_I(CALABAR)', sellerCode: 'ODUKPANI_I(CALABAR)', currency: 'USD', amount: 40019.04 },
  { id: '5', buyer: 'SUNFLAG', seller: 'ODUKPANI_I(CALABAR)', sellerCode: 'ODUKPANI_I(CALABAR)', currency: 'USD', amount: 255451.10 },
  { id: '6', buyer: 'IVENWOOD', seller: 'OMOTOSHO_2', sellerCode: 'OMOTOSHO_2', currency: 'NGN', amount: 2038038.07 },
  { id: '7', buyer: 'INNER GALAXY', seller: 'KAINJI', sellerCode: 'KAINJI', currency: 'NGN', amount: 15078357.08 },
  { id: '8', buyer: 'KAM INDUSTRIES', seller: 'KAINJI', sellerCode: 'KAINJI', currency: 'NGN', amount: 414349.88 },
  { id: '9', buyer: 'UNILEVER', seller: 'KAINJI', sellerCode: 'KAINJI', currency: 'NGN', amount: 44043.27 },
  { id: '10', buyer: 'KAM INTEGRATED', seller: 'IBAFO_1(TAOPEO)', sellerCode: 'IBAFO_1(TAOPEO)', currency: 'NGN', amount: 2443398.40 },
  { id: '11', buyer: 'STARFENCED', seller: 'JEBBA_1', sellerCode: 'JEBBA_1', currency: 'NGN', amount: 539828.54 },
  { id: '12', buyer: 'KAM SHAGAMU', seller: 'IBAFO_1(TAOPEO)', sellerCode: 'IBAFO_1(TAOPEO)', currency: 'NGN', amount: 835434.44 },
  { id: '13', buyer: 'STAR PIPE', seller: 'JEBBA_1', sellerCode: 'JEBBA_1', currency: 'NGN', amount: 587719.23 },
  { id: '14', buyer: 'FMPI', seller: 'TRANS-AMADI_1', sellerCode: 'TRANS-AMADI_1', currency: 'NGN', amount: 150205.85 },
  { id: '15', buyer: 'DALI', seller: 'TRANS-AMADI_1', sellerCode: 'TRANS-AMADI_1', currency: 'NGN', amount: 83156.41 },
  { id: '16', buyer: 'ADEFOFLORUKNSHO', seller: 'JEBBA_1', sellerCode: 'JEBBA_1', currency: 'NGN', amount: 2208054.40 },
  { id: '17', buyer: 'PRISM', seller: 'JEBBA_1', sellerCode: 'JEBBA_1', currency: 'NGN', amount: 3891422.11 },
  { id: '18', buyer: 'PULKIT', seller: 'OMOTOSHO_2', sellerCode: 'OMOTOSHO_2', currency: 'NGN', amount: 431078.74 },
  { id: '19', buyer: 'HYDROPOLIS', seller: 'JEBBA_1', sellerCode: 'JEBBA_1', currency: 'NGN', amount: 5972549.10 },
  { id: '20', buyer: 'AFLE', seller: 'ALAOJI_1', sellerCode: 'ALAOJI_1', currency: 'NGN', amount: 6766197.54 },
  { id: '21', buyer: 'QUANTUM STEEL', seller: 'JEBBA_1', sellerCode: 'JEBBA_1', currency: 'NGN', amount: 882597.02 },
  { id: '22', buyer: 'PHOENIX', seller: 'JEBBA_1, 2', sellerCode: 'JEBBA_1_2', currency: 'NGN', amount: 676310.71 },
  { id: '23', buyer: 'CEET', seller: 'IKEJA_I(PARAS)', sellerCode: 'IKEJA_I(PARAS)', currency: 'USD', amount: 53972.00 },
  { id: '24', buyer: 'ZUNGERU', seller: 'YONGHXING', sellerCode: 'YONGHXING', currency: 'NGN', amount: 7269100.74 },
  { id: '25', buyer: 'FUTURE BUYER 2', seller: 'FUTURE SELLER 2', sellerCode: 'FUTURE_SELLER_2', currency: 'NGN', amount: 0 },
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

    totalUSD: 368894.36,
    totalNGN: 49995299.78,
    outstandingUSD: 368894.36,
    outstandingNGN: 49995299.78,

    // Page 2 charges (for IKEJA_I(PARAS) AND SBEE trade)
    charges: {
      tspCharge: 748170.75,
      soCharges: 13988.61,
      moCharges: 6199.81,
      asCharges: 10210.21,
      tcnRegulatory: 17312.55,
      gencoRegulatory: 40272.29,
      total: 956772.34,
    },
    chargesCurrency: 'USD',

    amountInWordsUSD: 'Three Hundred and Sixty - Eight Thousand, Eight Hundred and Ninety - Four Dollar and Thirty - Six Cent Only',
    amountInWordsNGN: 'Forty - Nine Million, Nine Hundred and Ninety - Five Thousand, Two Hundred and Ninety - Nine Naira and Seventy - Eight Kobo Only',

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

    totalUSD: 339382.41,
    totalNGN: 45995675.79,
    outstandingUSD: 339382.41,
    outstandingNGN: 45995675.79,

    amountInWordsUSD: numberToWordsUSD(339382.41),
    amountInWordsNGN: numberToWordsNGN(45995675.79),

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

    totalUSD: 387339.08,
    totalNGN: 52495064.77,
    outstandingUSD: 387339.08,
    outstandingNGN: 52495064.77,

    amountInWordsUSD: numberToWordsUSD(387339.08),
    amountInWordsNGN: numberToWordsNGN(52495064.77),

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
