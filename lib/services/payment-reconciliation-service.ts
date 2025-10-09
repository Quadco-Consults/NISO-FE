/**
 * Payment Reconciliation Service
 *
 * Validates payment allocations and ensures data integrity across
 * the financial settlement system.
 *
 * Key Features:
 * - Validates allocation calculations
 * - Reconciles invoice vs payment vs disbursement
 * - Tracks allocation history
 * - Identifies discrepancies and variances
 * - Generates reconciliation reports
 */

import type {
  AllocationResult,
  DiscoInvoiceLineItem,
  ServiceProviderAllocation,
  ShortfallAllocation,
} from '@/types';

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface ReconciliationReport {
  id: string;
  period: string;
  discoCode: string;
  createdAt: Date;

  // Invoice totals
  invoiceTotal: number;

  // Collection data
  collectedAmount: number;
  collectionRate: number;

  // Allocation data
  totalAllocated: number;
  totalDeductions: number;
  totalShortfall: number;

  // Validation
  isBalanced: boolean;
  variance: number; // Should be close to zero
  variances: ReconciliationVariance[];

  // Status
  status: 'pass' | 'warning' | 'fail';
  issues: ReconciliationIssue[];
}

export interface ReconciliationVariance {
  category: 'invoice' | 'deduction' | 'allocation' | 'shortfall';
  description: string;
  expected: number;
  actual: number;
  variance: number;
  variancePercentage: number;
  severity: 'info' | 'warning' | 'error';
}

export interface ReconciliationIssue {
  severity: 'info' | 'warning' | 'error';
  category: string;
  description: string;
  affectedEntity?: string;
  recommendedAction?: string;
}

export interface AllocationHistory {
  id: string;
  period: string;
  discoCode: string;
  allocationResult: AllocationResult;
  createdAt: Date;
  createdBy?: string;
}

export interface ServiceProviderReconciliation {
  serviceProvider: string;
  period: string;

  // Invoice data
  totalInvoiced: number;
  invoiceCount: number;

  // Allocation data
  totalAllocated: number;
  allocationCount: number;

  // Disbursement data (if available)
  totalDisbursed?: number;
  disbursementCount?: number;

  // Variances
  allocationVariance: number; // Invoiced - Allocated
  disbursementVariance?: number; // Allocated - Disbursed

  // Status
  status: 'balanced' | 'minor_variance' | 'major_variance';
}

// ============================================================================
// Payment Reconciliation Service
// ============================================================================

export class PaymentReconciliationService {
  /**
   * Validate an allocation result for accuracy and consistency
   */
  static validateAllocation(
    allocationResult: AllocationResult,
    tolerance: number = 0.01 // ₦0.01 tolerance for floating point
  ): ReconciliationReport {
    const variances: ReconciliationVariance[] = [];
    const issues: ReconciliationIssue[] = [];

    // 1. Validate total collected = deductions + allocations
    const totalDistributed = allocationResult.deductions.totalDeductions + allocationResult.totalAllocated;
    const collectionVariance = allocationResult.collectedAmount - totalDistributed;

    if (Math.abs(collectionVariance) > tolerance) {
      variances.push({
        category: 'allocation',
        description: 'Collection amount vs total distributed mismatch',
        expected: allocationResult.collectedAmount,
        actual: totalDistributed,
        variance: collectionVariance,
        variancePercentage: (collectionVariance / allocationResult.collectedAmount) * 100,
        severity: Math.abs(collectionVariance) > 100 ? 'error' : 'warning',
      });

      issues.push({
        severity: Math.abs(collectionVariance) > 100 ? 'error' : 'warning',
        category: 'Allocation Balance',
        description: `Collected amount (₦${allocationResult.collectedAmount.toFixed(2)}) does not match total distributed (₦${totalDistributed.toFixed(2)}). Variance: ₦${collectionVariance.toFixed(2)}`,
        recommendedAction: 'Review allocation calculation logic and rounding methods',
      });
    }

    // 2. Validate invoice total matches sum of line items
    const calculatedInvoiceTotal = allocationResult.allocations.reduce(
      (sum, a) => sum + a.invoiceAmount,
      0
    );
    const invoiceVariance = allocationResult.totalInvoice - calculatedInvoiceTotal;

    if (Math.abs(invoiceVariance) > tolerance) {
      variances.push({
        category: 'invoice',
        description: 'Total invoice vs sum of line items mismatch',
        expected: allocationResult.totalInvoice,
        actual: calculatedInvoiceTotal,
        variance: invoiceVariance,
        variancePercentage: (invoiceVariance / allocationResult.totalInvoice) * 100,
        severity: 'error',
      });

      issues.push({
        severity: 'error',
        category: 'Invoice Total',
        description: `Invoice total (₦${allocationResult.totalInvoice.toFixed(2)}) does not match sum of line items (₦${calculatedInvoiceTotal.toFixed(2)})`,
        recommendedAction: 'Verify invoice line item amounts',
      });
    }

    // 3. Validate shortfalls
    const calculatedShortfall = allocationResult.allocations.reduce(
      (sum, a) => sum + a.shortfall,
      0
    );
    const shortfallVariance = allocationResult.totalShortfall - calculatedShortfall;

    if (Math.abs(shortfallVariance) > tolerance) {
      variances.push({
        category: 'shortfall',
        description: 'Total shortfall vs sum of individual shortfalls mismatch',
        expected: allocationResult.totalShortfall,
        actual: calculatedShortfall,
        variance: shortfallVariance,
        variancePercentage: (shortfallVariance / allocationResult.totalShortfall) * 100,
        severity: 'warning',
      });

      issues.push({
        severity: 'warning',
        category: 'Shortfall Calculation',
        description: `Total shortfall (₦${allocationResult.totalShortfall.toFixed(2)}) does not match sum of individual shortfalls (₦${calculatedShortfall.toFixed(2)})`,
        recommendedAction: 'Recalculate shortfall amounts',
      });
    }

    // 4. Validate each service provider allocation
    for (const allocation of allocationResult.allocations) {
      const expectedShortfall = allocation.invoiceAmount - allocation.allocatedAmount;
      const shortfallDiff = Math.abs(allocation.shortfall - expectedShortfall);

      if (shortfallDiff > tolerance) {
        issues.push({
          severity: 'warning',
          category: 'Provider Shortfall',
          description: `Shortfall mismatch for ${allocation.provider}: Expected ₦${expectedShortfall.toFixed(2)}, Got ₦${allocation.shortfall.toFixed(2)}`,
          affectedEntity: allocation.provider,
          recommendedAction: 'Recalculate provider shortfall',
        });
      }

      // Check for negative allocations
      if (allocation.allocatedAmount < 0) {
        issues.push({
          severity: 'error',
          category: 'Negative Allocation',
          description: `Negative allocation for ${allocation.provider}: ₦${allocation.allocatedAmount.toFixed(2)}`,
          affectedEntity: allocation.provider,
          recommendedAction: 'Fix allocation logic to prevent negative values',
        });
      }

      // Check for over-allocation
      if (allocation.allocatedAmount > allocation.invoiceAmount) {
        issues.push({
          severity: 'error',
          category: 'Over-Allocation',
          description: `Allocated amount (₦${allocation.allocatedAmount.toFixed(2)}) exceeds invoice (₦${allocation.invoiceAmount.toFixed(2)}) for ${allocation.provider}`,
          affectedEntity: allocation.provider,
          recommendedAction: 'Review allocation calculation',
        });
      }
    }

    // 5. Validate deductions
    const deductionTotal =
      allocationResult.deductions.txdxDeduction +
      allocationResult.deductions.pipNisoDeduction +
      allocationResult.deductions.pipTspDeduction +
      allocationResult.deductions.atfpSoPenalty +
      allocationResult.deductions.atfpTspPenalty;

    const deductionVariance = allocationResult.deductions.totalDeductions - deductionTotal;

    if (Math.abs(deductionVariance) > tolerance) {
      variances.push({
        category: 'deduction',
        description: 'Total deductions vs sum of individual deductions mismatch',
        expected: allocationResult.deductions.totalDeductions,
        actual: deductionTotal,
        variance: deductionVariance,
        variancePercentage: (deductionVariance / allocationResult.deductions.totalDeductions) * 100,
        severity: 'error',
      });

      issues.push({
        severity: 'error',
        category: 'Deduction Total',
        description: `Total deductions (₦${allocationResult.deductions.totalDeductions.toFixed(2)}) does not match sum of individual deductions (₦${deductionTotal.toFixed(2)})`,
        recommendedAction: 'Recalculate deduction totals',
      });
    }

    // Determine overall status
    let status: 'pass' | 'warning' | 'fail';
    const hasErrors = issues.some(i => i.severity === 'error');
    const hasWarnings = issues.some(i => i.severity === 'warning');

    if (hasErrors) {
      status = 'fail';
    } else if (hasWarnings) {
      status = 'warning';
    } else {
      status = 'pass';
    }

    // Create reconciliation report
    return {
      id: `recon-${allocationResult.discoCode}-${allocationResult.period}`.toLowerCase().replace(/\s+/g, '-'),
      period: allocationResult.period,
      discoCode: allocationResult.discoCode,
      createdAt: new Date(),
      invoiceTotal: allocationResult.totalInvoice,
      collectedAmount: allocationResult.collectedAmount,
      collectionRate: allocationResult.collectionRate,
      totalAllocated: allocationResult.totalAllocated,
      totalDeductions: allocationResult.deductions.totalDeductions,
      totalShortfall: allocationResult.totalShortfall,
      isBalanced: allocationResult.isBalanced && Math.abs(collectionVariance) <= tolerance,
      variance: collectionVariance,
      variances,
      status,
      issues,
    };
  }

  /**
   * Reconcile service provider amounts across multiple periods
   */
  static reconcileServiceProvider(
    serviceProvider: string,
    allocations: AllocationResult[]
  ): ServiceProviderReconciliation {
    // Filter allocations for this service provider
    const providerAllocations = allocations.map(result => {
      const allocation = result.allocations.find(a => a.provider === serviceProvider);
      return {
        period: result.period,
        invoiceAmount: allocation?.invoiceAmount || 0,
        allocatedAmount: allocation?.allocatedAmount || 0,
      };
    });

    const totalInvoiced = providerAllocations.reduce((sum, a) => sum + a.invoiceAmount, 0);
    const totalAllocated = providerAllocations.reduce((sum, a) => sum + a.allocatedAmount, 0);
    const allocationVariance = totalInvoiced - totalAllocated;

    // Determine status based on variance percentage
    const variancePercentage = totalInvoiced > 0 ? Math.abs(allocationVariance / totalInvoiced) : 0;
    let status: 'balanced' | 'minor_variance' | 'major_variance';

    if (variancePercentage < 0.01) {
      status = 'balanced';
    } else if (variancePercentage < 0.25) {
      status = 'minor_variance';
    } else {
      status = 'major_variance';
    }

    return {
      serviceProvider,
      period: allocations.length > 0 ? `${allocations[0].period} - ${allocations[allocations.length - 1].period}` : 'N/A',
      totalInvoiced,
      invoiceCount: providerAllocations.length,
      totalAllocated,
      allocationCount: providerAllocations.length,
      allocationVariance,
      status,
    };
  }

  /**
   * Compare two allocation results to identify changes
   */
  static compareAllocations(
    previous: AllocationResult,
    current: AllocationResult
  ): {
    collectionRateChange: number;
    totalShortfallChange: number;
    providerChanges: {
      provider: string;
      allocationChange: number;
      allocationChangePercentage: number;
      shortfallChange: number;
    }[];
  } {
    const collectionRateChange = current.collectionRate - previous.collectionRate;
    const totalShortfallChange = current.totalShortfall - previous.totalShortfall;

    const providerChanges = current.allocations.map(currentAlloc => {
      const previousAlloc = previous.allocations.find(a => a.provider === currentAlloc.provider);

      if (!previousAlloc) {
        return {
          provider: currentAlloc.provider,
          allocationChange: currentAlloc.allocatedAmount,
          allocationChangePercentage: 100,
          shortfallChange: currentAlloc.shortfall,
        };
      }

      const allocationChange = currentAlloc.allocatedAmount - previousAlloc.allocatedAmount;
      const allocationChangePercentage = previousAlloc.allocatedAmount > 0
        ? (allocationChange / previousAlloc.allocatedAmount) * 100
        : 0;
      const shortfallChange = currentAlloc.shortfall - previousAlloc.shortfall;

      return {
        provider: currentAlloc.provider,
        allocationChange,
        allocationChangePercentage,
        shortfallChange,
      };
    });

    return {
      collectionRateChange,
      totalShortfallChange,
      providerChanges,
    };
  }

  /**
   * Generate shortfall tracking records from allocation result
   */
  static generateShortfallRecords(
    allocationResult: AllocationResult
  ): ShortfallAllocation[] {
    return allocationResult.allocations
      .filter(allocation => allocation.shortfall > 0)
      .map(allocation => ({
        id: `${allocationResult.discoCode}-${allocationResult.period}-${allocation.provider}`
          .toLowerCase()
          .replace(/\s+/g, '-'),
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
      }));
  }

  /**
   * Validate collection rate is within acceptable range
   */
  static validateCollectionRate(
    collectionRate: number,
    minAcceptable: number = 0.70, // 70% minimum
    target: number = 0.85 // 85% target
  ): {
    isAcceptable: boolean;
    meetsTarget: boolean;
    status: 'excellent' | 'good' | 'acceptable' | 'poor';
    message: string;
  } {
    const isAcceptable = collectionRate >= minAcceptable;
    const meetsTarget = collectionRate >= target;

    let status: 'excellent' | 'good' | 'acceptable' | 'poor';
    let message: string;

    if (collectionRate >= 0.90) {
      status = 'excellent';
      message = `Excellent collection rate of ${(collectionRate * 100).toFixed(2)}%`;
    } else if (collectionRate >= target) {
      status = 'good';
      message = `Good collection rate of ${(collectionRate * 100).toFixed(2)}% meets target`;
    } else if (collectionRate >= minAcceptable) {
      status = 'acceptable';
      message = `Acceptable collection rate of ${(collectionRate * 100).toFixed(2)}% but below target`;
    } else {
      status = 'poor';
      message = `Poor collection rate of ${(collectionRate * 100).toFixed(2)}% below minimum acceptable level`;
    }

    return {
      isAcceptable,
      meetsTarget,
      status,
      message,
    };
  }

  /**
   * Calculate aging breakdown for shortfalls
   */
  static calculateShortfallAging(
    shortfalls: ShortfallAllocation[],
    currentDate: Date = new Date()
  ): {
    current: number; // 0-30 days
    overdue30: number; // 31-60 days
    overdue60: number; // 61-90 days
    overdue90: number; // 91-120 days
    overdue120Plus: number; // 120+ days
    total: number;
  } {
    let current = 0;
    let overdue30 = 0;
    let overdue60 = 0;
    let overdue90 = 0;
    let overdue120Plus = 0;

    for (const shortfall of shortfalls) {
      if (shortfall.status === 'settled') continue;

      const daysPastDue = Math.floor(
        (currentDate.getTime() - shortfall.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysPastDue <= 30) {
        current += shortfall.shortfallAmount;
      } else if (daysPastDue <= 60) {
        overdue30 += shortfall.shortfallAmount;
      } else if (daysPastDue <= 90) {
        overdue60 += shortfall.shortfallAmount;
      } else if (daysPastDue <= 120) {
        overdue90 += shortfall.shortfallAmount;
      } else {
        overdue120Plus += shortfall.shortfallAmount;
      }
    }

    const total = current + overdue30 + overdue60 + overdue90 + overdue120Plus;

    return {
      current,
      overdue30,
      overdue60,
      overdue90,
      overdue120Plus,
      total,
    };
  }
}
