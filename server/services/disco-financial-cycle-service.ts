/**
 * DISCO Financial Cycle Service
 *
 * Comprehensive service for managing the complete DISCO settlement cycle
 * including invoicing, collections, disbursements, and reconciliation.
 *
 * Based on the June 2025 financial documents structure.
 */

import type {
  DiscoFinancialCycle,
  ComprehensiveDiscoFinancialSummary,
  DiscoInvoiceLineItem,
  DiscoInflowRecord,
  DiscoIndebtedness,
  ServiceProviderIndebtedness,
  TifPaymentRecord,
  DiscoPaymentReport,
  ZungeruPaymentReport,
  MultiPeriodTracking,
  MarketOperatorDisbursementSchedule,
  ZungeruDisbursementSchedule,
  RegulatoryChargeDisbursement,
  SupplementaryDiscoDisbursement,
  ServiceProviderPaymentReport,
  VestingContractRevenueSummary,
} from '@/types';

// ==========================================
// JUNE 2025 MOCK DATA (from Image 1)
// ==========================================

const JUNE_2025_DISCO_INVOICES: DiscoInvoiceLineItem[] = [
  {
    id: '1',
    discoId: 'ABUJA',
    discoCode: 'ABUJA',
    discoName: 'Abuja Electricity Distribution Company',
    ancillaryServices: 150345672.24,
    nbet: 51280807.58,
    nerc: 930938595.76,
    niso: 540701819.15,
    tcn: 1151942125.00,
    tif: 883448428.97,
    grossInvoice: 3708657448.70,
    netInvoice: 2675863747.48,
  },
  {
    id: '2',
    discoId: 'BENIN',
    discoCode: 'BENIN',
    discoName: 'Benin Electricity Distribution Company',
    ancillaryServices: 79574743.08,
    nbet: 27141832.73,
    nerc: 501000843.79,
    niso: 286181888.06,
    tcn: 450000000.00,
    tif: 467590325.10,
    grossInvoice: 1811489632.76,
    netInvoice: 1285489632.76,
  },
  {
    id: '3',
    discoId: 'EKO',
    discoCode: 'EKO',
    discoName: 'Eko Electricity Distribution Company',
    ancillaryServices: 125075586.51,
    nbet: 42661534.51,
    nerc: 788505468.53,
    niso: 449820710.84,
    tcn: 690197247.25,
    tif: 734958504.36,
    grossInvoice: 2831219052.00,
    netInvoice: 1971184961.13,
  },
  {
    id: '4',
    discoId: 'IBADAN',
    discoCode: 'IBADAN',
    discoName: 'Ibadan Electricity Distribution Company',
    ancillaryServices: 117998971.21,
    nbet: 40247799.93,
    nerc: 749835411.11,
    niso: 424370435.39,
    tcn: 378829796.95,
    tif: 693375500.44,
    grossInvoice: 2404657915.02,
    netInvoice: 1593283947.37,
  },
  {
    id: '5',
    discoId: 'IKEJA',
    discoCode: 'IKEJA',
    discoName: 'Ikeja Electricity Distribution Company',
    ancillaryServices: 145341483.94,
    nbet: 49573948.89,
    nerc: 908182549.95,
    niso: 522704801.50,
    tcn: 790931490.92,
    tif: 854043244.06,
    grossInvoice: 3270777519.27,
    netInvoice: 2721392791.26,
  },
];

// Calculate totals from the array
const JUNE_2025_TOTALS = JUNE_2025_DISCO_INVOICES.reduce(
  (acc, disco) => ({
    ancillaryServices: acc.ancillaryServices + disco.ancillaryServices,
    nbet: acc.nbet + disco.nbet,
    nerc: acc.nerc + disco.nerc,
    niso: acc.niso + disco.niso,
    tcn: acc.tcn + disco.tcn,
    tif: acc.tif + disco.tif,
    grossInvoice: acc.grossInvoice + disco.grossInvoice,
    netInvoice: acc.netInvoice + disco.netInvoice,
  }),
  { ancillaryServices: 0, nbet: 0, nerc: 0, niso: 0, tcn: 0, tif: 0, grossInvoice: 0, netInvoice: 0 }
);

// DISCO Inflow Records (Image 2 structure)
const JUNE_2025_DISCO_INFLOWS: DiscoInflowRecord[] = JUNE_2025_DISCO_INVOICES.map((invoice) => ({
  id: invoice.id,
  discoId: invoice.discoId,
  discoCode: invoice.discoCode,
  discoName: invoice.discoName,
  period: 'June 2025',

  // Mock inflow data - would come from actual collections
  trustFund: invoice.grossInvoice * 0.75, // Assuming 75% collection rate
  txdxDeductions: invoice.grossInvoice * 0.05, // 5% tax
  tifAmount: invoice.tif,
  grossInflow: invoice.grossInvoice * 0.80,

  // Deductions
  ancillaryServicesDeduction: invoice.ancillaryServices,
  servTifDeduction: invoice.tif,

  // Disbursements (calculated proportionally)
  tifDisbursement: invoice.tif,
  nbetDisbursement: invoice.nbet,
  nercDisbursement: invoice.nerc,
  nisoDisbursement: invoice.niso,
  tspDisbursement: invoice.tcn,

  // PIP allocations
  pipNiso: invoice.niso * 0.10,
  pipTsp: invoice.tcn * 0.10,
  totalPip: (invoice.niso + invoice.tcn) * 0.10,
  tspAllocation: invoice.tcn * 0.90,
  nisoAllocation: invoice.niso * 0.90,
  txdxFinal: invoice.grossInvoice * 0.05,

  // ATFP Penalties (from Image 2)
  atfpPenaltySo: invoice.grossInvoice * 0.0055, // 55.04% split
  atfpPenaltyTsp: invoice.grossInvoice * 0.0047, // 46.70% split

  // Net disbursement
  netDisbursement: invoice.grossInvoice * 0.65,
}));

// DISCO Indebtedness (Image 4 structure) - A, C, E have 100% collection
const JUNE_2025_DISCO_INDEBTEDNESS: DiscoIndebtedness[] = [
  {
    id: '1',
    discoId: 'ABUJA',
    discoCode: 'ABUJA',
    discoName: 'Abuja Electricity Distribution Company',
    period: 'June 2025',
    totalInvoice: 3708657448.70,
    totalInflow: 3708657448.70,
    shortfall: 0.00,
    shortfallPercentage: 0.00,
    current: 3708657448.70,
    overdue30: 0,
    overdue60: 0,
    overdue90: 0,
    overdue120Plus: 0,
  },
  {
    id: '2',
    discoId: 'BENIN',
    discoCode: 'BENIN',
    discoName: 'Benin Electricity Distribution Company',
    period: 'June 2025',
    totalInvoice: 1811489632.76,
    totalInflow: 1630340669.48, // 90% collection
    shortfall: 181148963.28,
    shortfallPercentage: 10.00,
    current: 1630340669.48,
    overdue30: 90574481.64,
    overdue60: 54344688.98,
    overdue90: 36229792.66,
    overdue120Plus: 0,
  },
  {
    id: '3',
    discoId: 'EKO',
    discoCode: 'EKO',
    discoName: 'Eko Electricity Distribution Company',
    period: 'June 2025',
    totalInvoice: 2831219052.00,
    totalInflow: 2831219052.00,
    shortfall: 0.00,
    shortfallPercentage: 0.00,
    current: 2831219052.00,
    overdue30: 0,
    overdue60: 0,
    overdue90: 0,
    overdue120Plus: 0,
  },
  {
    id: '4',
    discoId: 'IBADAN',
    discoCode: 'IBADAN',
    discoName: 'Ibadan Electricity Distribution Company',
    period: 'June 2025',
    totalInvoice: 2404657915.02,
    totalInflow: 2164192123.52, // 90% collection
    shortfall: 240465791.50,
    shortfallPercentage: 10.00,
    current: 2164192123.52,
    overdue30: 120232895.75,
    overdue60: 72139737.45,
    overdue90: 48093158.30,
    overdue120Plus: 0,
  },
  {
    id: '5',
    discoId: 'IKEJA',
    discoCode: 'IKEJA',
    discoName: 'Ikeja Electricity Distribution Company',
    period: 'June 2025',
    totalInvoice: 3270777519.27,
    totalInflow: 3270777519.27,
    shortfall: 0.00,
    shortfallPercentage: 0.00,
    current: 3270777519.27,
    overdue30: 0,
    overdue60: 0,
    overdue90: 0,
    overdue120Plus: 0,
  },
];

// Complete June 2025 Financial Cycle
const JUNE_2025_FINANCIAL_CYCLE: DiscoFinancialCycle = {
  id: 'cycle-202506',
  cycleNumber: 'NISO/FC/2025/06',
  period: 'June 2025',
  month: 6,
  year: 2025,
  status: 'closed',

  discoSummaries: JUNE_2025_DISCO_INVOICES.map((invoice, index) => {
    const indebt = JUNE_2025_DISCO_INDEBTEDNESS[index];
    return {
      period: 'June 2025',
      discoId: invoice.discoId,
      discoCode: invoice.discoCode,
      discoName: invoice.discoName,

      // Summary totals - use indebtedness data for accurate collection
      grossInvoice: invoice.grossInvoice,
      netInvoice: invoice.netInvoice,
      totalInvoice: invoice.grossInvoice,
      totalInflow: indebt.totalInflow,
      shortfall: indebt.shortfall,

      invoiceLineItem: invoice,
      inflowRecord: JUNE_2025_DISCO_INFLOWS[index],
      indebtedness: indebt,
      serviceProviderIndebtedness: {
        id: `sp-${invoice.id}`,
        period: 'June 2025',
        discoId: invoice.discoId,
        discoCode: invoice.discoCode,
        discoName: invoice.discoName,
        ancillaryServices: { invoice: invoice.ancillaryServices, payment: invoice.ancillaryServices, outstanding: 0 },
        nbet: { invoice: invoice.nbet, payment: invoice.nbet, outstanding: 0 },
        nerc: { invoice: invoice.nerc, payment: invoice.nerc, outstanding: 0 },
        niso: { invoice: invoice.niso, payment: invoice.niso, outstanding: 0 },
        tsp: { invoice: invoice.tcn, payment: invoice.tcn, outstanding: 0 },
        tif: { invoice: invoice.tif, payment: invoice.tif, outstanding: 0 },
        totalInvoice: invoice.grossInvoice,
        totalPayment: invoice.grossInvoice,
        totalOutstanding: 0,
      },
      tifPayment: {
        id: `tif-${invoice.id}`,
        discoId: invoice.discoId,
        discoCode: invoice.discoCode,
        discoName: invoice.discoName,
        period: 'June 2025',
        totalInvoice: invoice.tif,
        totalInflow: invoice.tif,
        shortfall: 0,
        shortfallPercentage: 0,
      },
      paymentReport: {
        period: 'June 2025',
        discoId: invoice.discoId,
        discoCode: invoice.discoCode,
        discoName: invoice.discoName,
        mayInvoice: invoice.grossInvoice * 0.95, // Previous month
        amountRemitted: invoice.grossInvoice * 0.80,
        txdxNetOff: invoice.grossInvoice * 0.05,
        atfpPenalty: invoice.grossInvoice * 0.01,
        discoOutstanding: invoice.grossInvoice * 0.15,
        createdAt: new Date('2025-06-30'),
      },
      zungeruReport: {
        period: 'June 2025',
        discoId: invoice.discoId,
        discoCode: invoice.discoCode,
        discoName: invoice.discoName,
        mayInvoice: invoice.grossInvoice * 0.03, // Zungeru portion
        amountRemittedZungeru: invoice.grossInvoice * 0.03,
        discoOutstanding: 0,
        createdAt: new Date('2025-06-30'),
      },
      multiPeriod: {
        discoId: invoice.discoId,
        discoCode: invoice.discoCode,
        discoName: invoice.discoName,
        nisoJune2024: invoice.niso * 0.5,
        nisoSept2024: invoice.niso * 0.3,
        nisoJune2025: invoice.niso,
        tifPaymentJune2025: invoice.tif,
        txdxNetOffJuly2025: invoice.grossInvoice * 0.05,
        zungeruJune2025: invoice.grossInvoice * 0.03,
        zungeruTifNetOffJune2025: invoice.tif * 0.03,
        total: invoice.grossInvoice * 2.5,
      },
      createdAt: new Date('2025-06-01'),
      updatedAt: new Date('2025-06-30'),
    };
  }),

  marketOperatorSchedule: {
    id: 'mo-schedule-202506',
    scheduleNumber: 'NISO/MO/2025/06',
    period: 'June 2025',
    createdAt: new Date('2025-06-30'),
    beneficiaries: [
      {
        name: 'Ancillary Services',
        category: 'ancillary_services',
        bankName: 'CBN',
        accountNumber: '0020499261242',
        accountDetails: '0020499261242',
        invoice: JUNE_2025_TOTALS.ancillaryServices,
        totalInflow: JUNE_2025_TOTALS.ancillaryServices,
        grossPayments: JUNE_2025_TOTALS.ancillaryServices,
        txdxDeductions: 0,
        pipDeductions: 0,
        atfpPenalty: 0,
        netPayment: JUNE_2025_TOTALS.ancillaryServices,
      },
      {
        name: 'Market Operator (MO)',
        category: 'mo',
        bankName: 'ZENITH',
        accountNumber: '1310100985',
        accountDetails: '1310100985',
        invoice: 85508466.52,
        totalInflow: 85508466.52,
        grossPayments: 54050661.97,
        txdxDeductions: 8639.92,
        pipDeductions: 492941.49,
        atfpPenalty: 0,
        netPayment: 53657666.48,
      },
      // Add more beneficiaries...
    ],
    summary: {
      ancillaryService: { invoice: JUNE_2025_TOTALS.ancillaryServices, totalInflow: JUNE_2025_TOTALS.ancillaryServices, grossPayments: JUNE_2025_TOTALS.ancillaryServices, txdxDeductions: 0, pipDeductions: 0, atfpPenalty: 0, netPayment: JUNE_2025_TOTALS.ancillaryServices },
      mo: { invoice: 85508466.52, totalInflow: 85508466.52, grossPayments: 54050661.97, txdxDeductions: 8639.92, pipDeductions: 492941.49, atfpPenalty: 0, netPayment: 53657666.48 },
      so: { invoice: 3425000804.82, totalInflow: 3425000804.82, grossPayments: 3278830235.87, txdxDeductions: 1804668161.82, pipDeductions: 2120116191.14, atfpPenalty: 106700000.00, netPayment: 1367462074.05 },
      nbet: { invoice: JUNE_2025_TOTALS.nbet, totalInflow: JUNE_2025_TOTALS.nbet, grossPayments: JUNE_2025_TOTALS.nbet, txdxDeductions: 0, pipDeductions: 0, atfpPenalty: 0, netPayment: JUNE_2025_TOTALS.nbet },
      tsp: { invoice: JUNE_2025_TOTALS.tcn, totalInflow: JUNE_2025_TOTALS.tcn, grossPayments: JUNE_2025_TOTALS.tcn, txdxDeductions: JUNE_2025_TOTALS.tcn * 0.05, pipDeductions: JUNE_2025_TOTALS.tcn * 0.10, atfpPenalty: 106700000.00, netPayment: JUNE_2025_TOTALS.tcn * 0.80 },
      nercTcn: { invoice: 0, totalInflow: 0, grossPayments: 0, txdxDeductions: 0, pipDeductions: 0, atfpPenalty: 0, netPayment: 0 },
      nercGenco: { invoice: 0, totalInflow: 0, grossPayments: 0, txdxDeductions: 0, pipDeductions: 0, atfpPenalty: 0, netPayment: 0 },
      nercDisco: { invoice: 0, totalInflow: 0, grossPayments: 0, txdxDeductions: 0, pipDeductions: 0, atfpPenalty: 0, netPayment: 0 },
      total: { invoice: JUNE_2025_TOTALS.grossInvoice, totalInflow: JUNE_2025_TOTALS.grossInvoice, grossPayments: JUNE_2025_TOTALS.grossInvoice, txdxDeductions: JUNE_2025_TOTALS.grossInvoice * 0.05, pipDeductions: JUNE_2025_TOTALS.grossInvoice * 0.10, atfpPenalty: 106700000.00, netPayment: JUNE_2025_TOTALS.grossInvoice * 0.80 },
    },
    status: 'disbursed',
    approvedBy: 'Ali Bukar Ahmad',
    approvedAt: new Date('2025-06-28'),
    disbursedAt: new Date('2025-06-30'),
  },

  zungeruSchedule: {
    id: 'zungeru-schedule-202506',
    scheduleNumber: 'NISO/ZUNG/2025/06',
    period: 'June 2025',
    createdAt: new Date('2025-06-30'),
    beneficiaries: [
      {
        name: 'Ancillary Services',
        category: 'ancillary_services',
        bankName: 'CBN',
        accountNumber: '0020499261242',
        grossInvoice: 77824808.58,
        totalInflow: 77824808.58,
        grossAmountPaid: 77824808.58,
        pipDeduction: 0,
        netPayment: 77824808.58,
      },
      // Add more Zungeru beneficiaries...
    ],
    totalGrossInvoice: 15794454679.03,
    totalInflow: 15794454679.03,
    totalGrossPayment: 15794454679.03,
    totalPipDeduction: 0,
    totalNetPayment: 15794454679.03,
    status: 'disbursed',
    approvedBy: 'Ali Bukar Ahmad',
    approvedAt: new Date('2025-06-28'),
  },

  regulatoryDisbursements: [
    {
      id: 'reg-1',
      period: 'June 2025',
      serviceProviderId: 'nerc-disco',
      serviceProviderName: 'NERC DISCO',
      category: 'nerc_disco',
      accountDetails: '0020276560018',
      bankName: 'CBN',
      invoice: 1425721519.02,
      totalInflow: 1432762251.93,
      netPayment: 1332706981.43,
      createdAt: new Date('2025-06-30'),
    },
    // Add more regulatory disbursements...
  ],

  supplementaryDisbursements: [
    {
      id: 'supp-1',
      period: 'June 2025',
      beneficiaries: [
        {
          name: 'Ancillary Service',
          category: 'ancillary_services',
          accountDetails: '0020499261242',
          invoice: 1250066770.15,
          totalInflow: 1250066770.15,
          grossPayments: 20500165.47,
          pipDeductions: 0,
          netPayment: 20500165.47,
        },
        // Add more supplementary beneficiaries...
      ],
      tcnPipImplementationProject: {
        accountName: 'TCN PIP IMPLEMENTATION ACCOUNT',
        accountNumber: '0020499260551',
        amount: 1250066770.15,
      },
      afamPowerPlc: {
        accountName: 'AFAM POWER PLC (UBA)',
        accountNumber: '1023711186',
        amount: 1250066770.15,
      },
      totalInvoice: 0,
      totalInflow: 0,
      totalGrossPayments: 459490899.92,
      totalPipDeductions: 116003948.40,
      totalNetPayment: 343486951.12,
    },
  ],

  serviceProviderReport: {
    period: 'June 2025',
    ancillaryServices: {
      mayInvoice: JUNE_2025_TOTALS.ancillaryServices,
      amountDisbursed: JUNE_2025_TOTALS.ancillaryServices,
      pipAmount: 0,
      outstanding: 0,
    },
    mo: {
      mayInvoice: 85508466.52,
      amountDisbursed: 53657666.48,
      pipAmount: 492941.49,
      outstanding: 13862991.68,
    },
    nbet: {
      mayInvoice: JUNE_2025_TOTALS.nbet,
      amountDisbursed: JUNE_2025_TOTALS.nbet,
      pipAmount: 0,
      outstanding: 0,
    },
    nerc: {
      mayInvoice: JUNE_2025_TOTALS.nerc,
      amountDisbursed: JUNE_2025_TOTALS.nerc * 0.95,
      pipAmount: 0,
      outstanding: JUNE_2025_TOTALS.nerc * 0.05,
    },
    so: {
      mayInvoice: 3425000804.82,
      amountDisbursed: 1367462074.05,
      pipAmount: 2120116191.14,
      txdxDeductions: 1804668161.82,
      atfpPenalty: 106700000.00,
      outstanding: 146170568.86,
    },
    tsp: {
      mayInvoice: JUNE_2025_TOTALS.tcn,
      amountDisbursed: JUNE_2025_TOTALS.tcn * 0.80,
      pipAmount: JUNE_2025_TOTALS.tcn * 0.10,
      txdxDeductions: JUNE_2025_TOTALS.tcn * 0.05,
      atfpPenalty: 106700000.00,
      outstanding: JUNE_2025_TOTALS.tcn * 0.02,
    },
    totalInvoice: JUNE_2025_TOTALS.grossInvoice,
    totalDisbursed: JUNE_2025_TOTALS.grossInvoice * 0.85,
    totalPip: JUNE_2025_TOTALS.grossInvoice * 0.10,
    totalTxdx: JUNE_2025_TOTALS.grossInvoice * 0.05,
    totalAtfp: 213400000.00,
    totalOutstanding: JUNE_2025_TOTALS.grossInvoice * 0.05,
  },

  vestingContractSummary: {
    id: 'vesting-202506',
    period: 'June 2025',
    tcn: 4633037861.86,
    niso: 3425000804.82,
    tif: 5596081746.08,
    as: JUNE_2025_TOTALS.ancillaryServices,
    nbet: JUNE_2025_TOTALS.nbet,
    tcnNisoNerc: 223706792.35,
    gencoNerc: 4355085116.07,
    discoNerc: 1429064230.33,
    discoNercWithoutZungeru: 1429064230.33,
    nercTotal: 6007856138.74,
    totalInvoiceAmount: JUNE_2025_TOTALS.grossInvoice,
    createdAt: new Date('2025-06-30'),
    updatedAt: new Date('2025-06-30'),
  },

  startDate: new Date('2025-06-01'),
  endDate: new Date('2025-06-30'),
  invoicedAt: new Date('2025-06-05'),
  closedAt: new Date('2025-06-30'),
  closedBy: 'Samirah Mohmoni',

  createdAt: new Date('2025-06-01'),
  updatedAt: new Date('2025-06-30'),
};

// ==========================================
// SERVICE FUNCTIONS
// ==========================================

/**
 * Get all financial cycles
 */
export const discoFinancialCycleService = {
  async getFinancialCycles(): Promise<DiscoFinancialCycle[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [JUNE_2025_FINANCIAL_CYCLE];
  },

  async getFinancialCycleById(id: string): Promise<DiscoFinancialCycle | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (id === JUNE_2025_FINANCIAL_CYCLE.id) {
      return JUNE_2025_FINANCIAL_CYCLE;
    }
    return null;
  },

  async getFinancialCycleByPeriod(period: string): Promise<DiscoFinancialCycle | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (period === 'June 2025') {
      return JUNE_2025_FINANCIAL_CYCLE;
    }
    return null;
  },

  async getDiscoInvoiceLineItems(period: string): Promise<DiscoInvoiceLineItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (period === 'June 2025') {
      return JUNE_2025_DISCO_INVOICES;
    }
    return [];
  },

  async getDiscoInflowRecords(period: string): Promise<DiscoInflowRecord[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (period === 'June 2025') {
      return JUNE_2025_DISCO_INFLOWS;
    }
    return [];
  },

  async getDiscoIndebtedness(period: string): Promise<DiscoIndebtedness[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (period === 'June 2025') {
      return JUNE_2025_DISCO_INDEBTEDNESS;
    }
    return [];
  },

  async getMarketOperatorSchedule(period: string): Promise<MarketOperatorDisbursementSchedule | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (period === 'June 2025') {
      return JUNE_2025_FINANCIAL_CYCLE.marketOperatorSchedule;
    }
    return null;
  },

  async getZungeruSchedule(period: string): Promise<ZungeruDisbursementSchedule | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (period === 'June 2025') {
      return JUNE_2025_FINANCIAL_CYCLE.zungeruSchedule;
    }
    return null;
  },

  async getVestingContractSummary(period: string): Promise<VestingContractRevenueSummary | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (period === 'June 2025') {
      return JUNE_2025_FINANCIAL_CYCLE.vestingContractSummary;
    }
    return null;
  },

  async getServiceProviderReport(period: string): Promise<ServiceProviderPaymentReport | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (period === 'June 2025') {
      return JUNE_2025_FINANCIAL_CYCLE.serviceProviderReport;
    }
    return null;
  },

  // Calculate totals for a period
  async getPeriodTotals(period: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (period === 'June 2025') {
      return {
        totalGrossInvoice: JUNE_2025_TOTALS.grossInvoice,
        totalNetInvoice: JUNE_2025_TOTALS.netInvoice,
        totalAncillaryServices: JUNE_2025_TOTALS.ancillaryServices,
        totalNbet: JUNE_2025_TOTALS.nbet,
        totalNerc: JUNE_2025_TOTALS.nerc,
        totalNiso: JUNE_2025_TOTALS.niso,
        totalTcn: JUNE_2025_TOTALS.tcn,
        totalTif: JUNE_2025_TOTALS.tif,
      };
    }
    return null;
  },
};
