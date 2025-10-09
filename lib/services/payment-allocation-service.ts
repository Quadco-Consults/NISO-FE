/**
 * Payment Allocation Service
 *
 * Handles automated distribution of DISCO payments to service providers
 * when collection rates are less than 100%.
 *
 * Key Features:
 * - Pro-rata allocation: Distributes funds proportionally
 * - Priority waterfall: Pays high-priority providers first
 * - Hybrid allocation: Protects critical services + pro-rata for others
 * - Automatic deduction calculations (TxDx, PIP, ATFP)
 * - Shortfall tracking and reporting
 */

import { DiscoInvoiceLineItem } from '@/types';

// ============================================================================
// Types and Interfaces
// ============================================================================

export type AllocationMethod = 'pro-rata' | 'priority-waterfall' | 'hybrid';

export interface ServiceProviderPriority {
  provider: string;
  priority: number; // 1 = highest priority
  protectedPercentage?: number; // For hybrid method (0-100)
  minimumAmount?: number; // Minimum amount to allocate
}

export interface AllocationConfig {
  method: AllocationMethod;
  priorities?: ServiceProviderPriority[];

  // Deduction rates
  txdxRate: number; // Default: 0.05 (5%)
  pipNisoRate: number; // Default: 0.10 (10%)
  pipTspRate: number; // Default: 0.10 (10%)

  // ATFP Penalty splits
  atfpSoRate: number; // Default: 0.5504 (55.04%)
  atfpTspRate: number; // Default: 0.4670 (46.70%)
}

export interface DeductionBreakdown {
  txdxDeduction: number;
  pipNisoDeduction: number;
  pipTspDeduction: number;
  atfpSoPenalty: number;
  atfpTspPenalty: number;
  totalDeductions: number;
}

export interface ServiceProviderAllocation {
  provider: string;
  invoiceAmount: number;
  allocatedAmount: number;
  shortfall: number;
  allocationPercentage: number; // % of invoice amount paid
  priority?: number;
}

export interface AllocationResult {
  discoCode: string;
  period: string;

  // Input amounts
  totalInvoice: number;
  collectedAmount: number;
  collectionRate: number;

  // Deductions
  deductions: DeductionBreakdown;

  // Net amount available for distribution
  netAvailableForDistribution: number;

  // Service provider allocations
  allocations: ServiceProviderAllocation[];

  // Summary
  totalAllocated: number;
  totalShortfall: number;
  allocationMethod: AllocationMethod;

  // Validation
  isBalanced: boolean;
  validationErrors: string[];

  // Timestamps
  calculatedAt: Date;
}

export interface ShortfallAllocation {
  id: string;
  discoCode: string;
  period: string;
  serviceProvider: string;
  invoiceAmount: number;
  allocatedAmount: number;
  shortfallAmount: number;
  shortfallPercentage: number;
  status: 'outstanding' | 'partially-paid' | 'settled';
  createdAt: Date;
  settledAt?: Date;
}

// ============================================================================
// Default Configuration
// ============================================================================

export const DEFAULT_ALLOCATION_CONFIG: AllocationConfig = {
  method: 'hybrid',

  // Default priorities (lower number = higher priority)
  priorities: [
    { provider: 'ANCILLARY SERV.', priority: 1, protectedPercentage: 100 }, // Always 100%
    { provider: 'NERC', priority: 2, protectedPercentage: 90 },
    { provider: 'TSP', priority: 3, protectedPercentage: 80 },
    { provider: 'NISO', priority: 4, protectedPercentage: 80 },
    { provider: 'MO', priority: 5, protectedPercentage: 70 },
    { provider: 'SO', priority: 6, protectedPercentage: 70 },
    { provider: 'NBET', priority: 7 },
    { provider: 'TIF', priority: 8 },
  ],

  // Deduction rates
  txdxRate: 0.05, // 5%
  pipNisoRate: 0.10, // 10%
  pipTspRate: 0.10, // 10%

  // ATFP Penalty splits
  atfpSoRate: 0.5504, // 55.04%
  atfpTspRate: 0.4670, // 46.70%
};

// ============================================================================
// Payment Allocation Service
// ============================================================================

export class PaymentAllocationService {
  /**
   * Main allocation function - calculates how to distribute collected amount
   * across all service providers based on invoice line items and configuration
   */
  static calculateAllocation(
    discoCode: string,
    period: string,
    invoiceLineItem: DiscoInvoiceLineItem,
    collectedAmount: number,
    config: AllocationConfig = DEFAULT_ALLOCATION_CONFIG
  ): AllocationResult {
    // Step 1: Calculate total invoice
    const totalInvoice = this.calculateTotalInvoice(invoiceLineItem);

    // Step 2: Calculate collection rate
    const collectionRate = totalInvoice > 0 ? collectedAmount / totalInvoice : 0;

    // Step 3: Calculate deductions
    const deductions = this.calculateDeductions(invoiceLineItem, collectedAmount, config);

    // Step 4: Calculate net amount available for distribution
    const netAvailableForDistribution = collectedAmount - deductions.totalDeductions;

    // Step 5: Allocate to service providers based on method
    let allocations: ServiceProviderAllocation[];

    switch (config.method) {
      case 'pro-rata':
        allocations = this.allocateProRata(
          invoiceLineItem,
          netAvailableForDistribution,
          collectionRate
        );
        break;

      case 'priority-waterfall':
        allocations = this.allocatePriorityWaterfall(
          invoiceLineItem,
          netAvailableForDistribution,
          config.priorities || []
        );
        break;

      case 'hybrid':
        allocations = this.allocateHybrid(
          invoiceLineItem,
          netAvailableForDistribution,
          collectionRate,
          config.priorities || []
        );
        break;

      default:
        allocations = this.allocateProRata(
          invoiceLineItem,
          netAvailableForDistribution,
          collectionRate
        );
    }

    // Step 6: Calculate totals
    const totalAllocated = allocations.reduce((sum, a) => sum + a.allocatedAmount, 0);
    const totalShortfall = allocations.reduce((sum, a) => sum + a.shortfall, 0);

    // Step 7: Validate allocation
    const validationErrors: string[] = [];
    const tolerance = 0.01; // ₦0.01 tolerance for floating point

    const expectedTotal = deductions.totalDeductions + totalAllocated;
    const isBalanced = Math.abs(expectedTotal - collectedAmount) < tolerance;

    if (!isBalanced) {
      validationErrors.push(
        `Allocation imbalance: Collected ₦${collectedAmount.toFixed(2)} but ` +
        `distributed ₦${expectedTotal.toFixed(2)} (difference: ₦${Math.abs(expectedTotal - collectedAmount).toFixed(2)})`
      );
    }

    if (netAvailableForDistribution < 0) {
      validationErrors.push(
        `Negative distribution amount: Deductions (₦${deductions.totalDeductions.toFixed(2)}) ` +
        `exceed collected amount (₦${collectedAmount.toFixed(2)})`
      );
    }

    // Step 8: Return result
    return {
      discoCode,
      period,
      totalInvoice,
      collectedAmount,
      collectionRate,
      deductions,
      netAvailableForDistribution,
      allocations,
      totalAllocated,
      totalShortfall,
      allocationMethod: config.method,
      isBalanced,
      validationErrors,
      calculatedAt: new Date(),
    };
  }

  /**
   * Calculate total invoice amount from line items
   */
  private static calculateTotalInvoice(lineItem: DiscoInvoiceLineItem): number {
    return (
      lineItem.ancillaryServices +
      lineItem.nbet +
      lineItem.niso +
      lineItem.nerc +
      lineItem.tcn +
      lineItem.tif
    );
  }

  /**
   * Calculate all deductions from collected amount
   */
  private static calculateDeductions(
    lineItem: DiscoInvoiceLineItem,
    collectedAmount: number,
    config: AllocationConfig
  ): DeductionBreakdown {
    // TxDx deduction (5% of gross invoice)
    const grossInvoice = this.calculateTotalInvoice(lineItem);
    const txdxDeduction = grossInvoice * config.txdxRate;

    // PIP deductions (10% of NISO and TSP invoices)
    const pipNisoDeduction = lineItem.niso * config.pipNisoRate;
    const pipTspDeduction = lineItem.tcn * config.pipTspRate;

    // ATFP penalties (if applicable) - split between SO and TSP
    // Note: ATFP penalties are typically applied when there are capacity shortfalls
    // For now, we'll calculate potential penalties but they may be zero
    const atfpTotalPenalty = 0; // This would come from a separate ATFP calculation service
    const atfpSoPenalty = atfpTotalPenalty * config.atfpSoRate;
    const atfpTspPenalty = atfpTotalPenalty * config.atfpTspRate;

    const totalDeductions =
      txdxDeduction +
      pipNisoDeduction +
      pipTspDeduction +
      atfpSoPenalty +
      atfpTspPenalty;

    return {
      txdxDeduction,
      pipNisoDeduction,
      pipTspDeduction,
      atfpSoPenalty,
      atfpTspPenalty,
      totalDeductions,
    };
  }

  /**
   * Pro-Rata Allocation Method
   * Distributes funds proportionally based on invoice amounts
   */
  private static allocateProRata(
    lineItem: DiscoInvoiceLineItem,
    availableAmount: number,
    collectionRate: number
  ): ServiceProviderAllocation[] {
    const allocations: ServiceProviderAllocation[] = [];

    // Map line items to service providers
    const providers = [
      { provider: 'ANCILLARY SERV.', invoiceAmount: lineItem.ancillaryServices },
      { provider: 'NBET', invoiceAmount: lineItem.nbet },
      { provider: 'NISO', invoiceAmount: lineItem.niso },
      { provider: 'NERC', invoiceAmount: lineItem.nerc },
      { provider: 'TSP', invoiceAmount: lineItem.tcn },
      { provider: 'TIF', invoiceAmount: lineItem.tif },
    ];

    // Apply collection rate to each provider
    for (const sp of providers) {
      const allocatedAmount = sp.invoiceAmount * collectionRate;
      const shortfall = sp.invoiceAmount - allocatedAmount;

      allocations.push({
        provider: sp.provider,
        invoiceAmount: sp.invoiceAmount,
        allocatedAmount,
        shortfall,
        allocationPercentage: collectionRate * 100,
      });
    }

    return allocations;
  }

  /**
   * Priority Waterfall Allocation Method
   * Pays highest priority providers first until funds are exhausted
   */
  private static allocatePriorityWaterfall(
    lineItem: DiscoInvoiceLineItem,
    availableAmount: number,
    priorities: ServiceProviderPriority[]
  ): ServiceProviderAllocation[] {
    const allocations: ServiceProviderAllocation[] = [];
    let remainingAmount = availableAmount;

    // Map line items to service providers
    const providers = [
      { provider: 'ANCILLARY SERV.', invoiceAmount: lineItem.ancillaryServices },
      { provider: 'NBET', invoiceAmount: lineItem.nbet },
      { provider: 'NISO', invoiceAmount: lineItem.niso },
      { provider: 'NERC', invoiceAmount: lineItem.nerc },
      { provider: 'TSP', invoiceAmount: lineItem.tcn },
      { provider: 'TIF', invoiceAmount: lineItem.tif },
    ];

    // Sort by priority
    const sortedProviders = providers
      .map(sp => {
        const priorityConfig = priorities.find(p => p.provider === sp.provider);
        return {
          ...sp,
          priority: priorityConfig?.priority || 999,
        };
      })
      .sort((a, b) => a.priority - b.priority);

    // Allocate in priority order
    for (const sp of sortedProviders) {
      const allocatedAmount = Math.min(sp.invoiceAmount, remainingAmount);
      const shortfall = sp.invoiceAmount - allocatedAmount;

      allocations.push({
        provider: sp.provider,
        invoiceAmount: sp.invoiceAmount,
        allocatedAmount,
        shortfall,
        allocationPercentage: sp.invoiceAmount > 0 ? (allocatedAmount / sp.invoiceAmount) * 100 : 0,
        priority: sp.priority,
      });

      remainingAmount -= allocatedAmount;

      if (remainingAmount <= 0) break;
    }

    // Add remaining providers with zero allocation
    for (const sp of sortedProviders) {
      if (!allocations.find(a => a.provider === sp.provider)) {
        allocations.push({
          provider: sp.provider,
          invoiceAmount: sp.invoiceAmount,
          allocatedAmount: 0,
          shortfall: sp.invoiceAmount,
          allocationPercentage: 0,
          priority: sp.priority,
        });
      }
    }

    return allocations;
  }

  /**
   * Hybrid Allocation Method
   * Protects critical services with guaranteed percentages, then pro-rata for others
   */
  private static allocateHybrid(
    lineItem: DiscoInvoiceLineItem,
    availableAmount: number,
    collectionRate: number,
    priorities: ServiceProviderPriority[]
  ): ServiceProviderAllocation[] {
    const allocations: ServiceProviderAllocation[] = [];
    let remainingAmount = availableAmount;

    // Map line items to service providers
    const providers = [
      { provider: 'ANCILLARY SERV.', invoiceAmount: lineItem.ancillaryServices },
      { provider: 'NBET', invoiceAmount: lineItem.nbet },
      { provider: 'NISO', invoiceAmount: lineItem.niso },
      { provider: 'NERC', invoiceAmount: lineItem.nerc },
      { provider: 'TSP', invoiceAmount: lineItem.tcn },
      { provider: 'TIF', invoiceAmount: lineItem.tif },
    ];

    // Sort by priority
    const sortedProviders = providers
      .map(sp => {
        const priorityConfig = priorities.find(p => p.provider === sp.provider);
        return {
          ...sp,
          priority: priorityConfig?.priority || 999,
          protectedPercentage: priorityConfig?.protectedPercentage || 0,
        };
      })
      .sort((a, b) => a.priority - b.priority);

    // Phase 1: Allocate protected amounts to high-priority providers
    const protectedProviders: typeof sortedProviders = [];
    const unprotectedProviders: typeof sortedProviders = [];

    for (const sp of sortedProviders) {
      if (sp.protectedPercentage > 0) {
        protectedProviders.push(sp);
      } else {
        unprotectedProviders.push(sp);
      }
    }

    // Allocate to protected providers
    for (const sp of protectedProviders) {
      const protectedAmount = sp.invoiceAmount * (sp.protectedPercentage / 100);
      const allocatedAmount = Math.min(protectedAmount, remainingAmount);
      const shortfall = sp.invoiceAmount - allocatedAmount;

      allocations.push({
        provider: sp.provider,
        invoiceAmount: sp.invoiceAmount,
        allocatedAmount,
        shortfall,
        allocationPercentage: sp.invoiceAmount > 0 ? (allocatedAmount / sp.invoiceAmount) * 100 : 0,
        priority: sp.priority,
      });

      remainingAmount -= allocatedAmount;
    }

    // Phase 2: Distribute remaining amount pro-rata to unprotected providers
    const totalUnprotectedInvoice = unprotectedProviders.reduce(
      (sum, sp) => sum + sp.invoiceAmount,
      0
    );

    if (totalUnprotectedInvoice > 0 && remainingAmount > 0) {
      for (const sp of unprotectedProviders) {
        const proRataShare = (sp.invoiceAmount / totalUnprotectedInvoice) * remainingAmount;
        const allocatedAmount = Math.min(proRataShare, sp.invoiceAmount);
        const shortfall = sp.invoiceAmount - allocatedAmount;

        allocations.push({
          provider: sp.provider,
          invoiceAmount: sp.invoiceAmount,
          allocatedAmount,
          shortfall,
          allocationPercentage: sp.invoiceAmount > 0 ? (allocatedAmount / sp.invoiceAmount) * 100 : 0,
          priority: sp.priority,
        });
      }
    } else {
      // No remaining amount - allocate zero to unprotected providers
      for (const sp of unprotectedProviders) {
        allocations.push({
          provider: sp.provider,
          invoiceAmount: sp.invoiceAmount,
          allocatedAmount: 0,
          shortfall: sp.invoiceAmount,
          allocationPercentage: 0,
          priority: sp.priority,
        });
      }
    }

    return allocations;
  }

  /**
   * Generate shortfall allocation records for tracking unpaid amounts
   */
  static generateShortfallRecords(
    allocationResult: AllocationResult
  ): ShortfallAllocation[] {
    const shortfallRecords: ShortfallAllocation[] = [];

    for (const allocation of allocationResult.allocations) {
      if (allocation.shortfall > 0) {
        shortfallRecords.push({
          id: `${allocationResult.discoCode}-${allocationResult.period}-${allocation.provider}`.toLowerCase(),
          discoCode: allocationResult.discoCode,
          period: allocationResult.period,
          serviceProvider: allocation.provider,
          invoiceAmount: allocation.invoiceAmount,
          allocatedAmount: allocation.allocatedAmount,
          shortfallAmount: allocation.shortfall,
          shortfallPercentage: allocation.invoiceAmount > 0
            ? (allocation.shortfall / allocation.invoiceAmount) * 100
            : 0,
          status: allocation.allocatedAmount > 0 ? 'partially-paid' : 'outstanding',
          createdAt: allocationResult.calculatedAt,
        });
      }
    }

    return shortfallRecords;
  }

  /**
   * Calculate collection efficiency metrics for a DISCO
   */
  static calculateCollectionEfficiency(
    discoCode: string,
    allocations: AllocationResult[]
  ): {
    averageCollectionRate: number;
    totalInvoiced: number;
    totalCollected: number;
    totalShortfall: number;
    periodCount: number;
  } {
    if (allocations.length === 0) {
      return {
        averageCollectionRate: 0,
        totalInvoiced: 0,
        totalCollected: 0,
        totalShortfall: 0,
        periodCount: 0,
      };
    }

    const totalInvoiced = allocations.reduce((sum, a) => sum + a.totalInvoice, 0);
    const totalCollected = allocations.reduce((sum, a) => sum + a.collectedAmount, 0);
    const totalShortfall = allocations.reduce((sum, a) => sum + a.totalShortfall, 0);
    const averageCollectionRate = totalInvoiced > 0 ? totalCollected / totalInvoiced : 0;

    return {
      averageCollectionRate,
      totalInvoiced,
      totalCollected,
      totalShortfall,
      periodCount: allocations.length,
    };
  }
}
