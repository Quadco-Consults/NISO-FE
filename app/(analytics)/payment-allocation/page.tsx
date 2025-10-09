'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layouts/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  Calculator,
  CheckCircle,
  AlertCircle,
  DollarSign,
  TrendingDown,
  Settings,
  Info,
} from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters';
import { PaymentAllocationService, DEFAULT_ALLOCATION_CONFIG } from '@/lib/services/payment-allocation-service';
import type { AllocationResult, AllocationMethod, DiscoInvoiceLineItem } from '@/types';

// Sample DISCO invoice data (Abuja DISCO - May 2025)
const sampleInvoice: DiscoInvoiceLineItem = {
  id: 'abuja-may-2025',
  discoId: 'disco-001',
  discoCode: 'ABUJA',
  discoName: 'Abuja Electricity Distribution Company',
  ancillaryServices: 185328724.35,
  nbet: 540234567.89,
  nerc: 930456789.12,
  niso: 540123456.78,
  tcn: 1151234567.89,
  tif: 234567890.12,
  grossInvoice: 3708657448.70,
  netInvoice: 3523328724.35,
};

export default function PaymentAllocationPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('calculator');
  const [allocationMethod, setAllocationMethod] = useState<AllocationMethod>('hybrid');
  const [collectedAmount, setCollectedAmount] = useState(2689359662.30); // 72.5% collection
  const [allocationResult, setAllocationResult] = useState<AllocationResult | null>(null);

  // Calculate allocation when inputs change
  useEffect(() => {
    const result = PaymentAllocationService.calculateAllocation(
      'ABUJA',
      'May 2025',
      sampleInvoice,
      collectedAmount,
      {
        ...DEFAULT_ALLOCATION_CONFIG,
        method: allocationMethod,
      }
    );
    setAllocationResult(result);
  }, [allocationMethod, collectedAmount]);

  const getMethodBadge = (method: AllocationMethod) => {
    const badges = {
      'pro-rata': { color: 'bg-blue-50 text-blue-700 border-blue-200', label: 'Pro-Rata' },
      'priority-waterfall': { color: 'bg-purple-50 text-purple-700 border-purple-200', label: 'Priority Waterfall' },
      'hybrid': { color: 'bg-green-50 text-green-700 border-green-200', label: 'Hybrid' },
    };
    return badges[method];
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/analytics')}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Calculator className="h-8 w-8 text-purple-600" />
              Payment Allocation Calculator
            </h1>
            <p className="text-muted-foreground">
              Calculate automated payment distribution to service providers based on collection rates
            </p>
          </div>
        </div>

        {/* Configuration Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Allocation Configuration
            </CardTitle>
            <CardDescription>
              Configure allocation method and collection amount
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="method">Allocation Method</Label>
                <Select value={allocationMethod} onValueChange={(v) => setAllocationMethod(v as AllocationMethod)}>
                  <SelectTrigger id="method">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pro-rata">Pro-Rata (Equal %)</SelectItem>
                    <SelectItem value="priority-waterfall">Priority Waterfall</SelectItem>
                    <SelectItem value="hybrid">Hybrid (Recommended)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="collected">Collected Amount (₦)</Label>
                <Input
                  id="collected"
                  type="number"
                  value={collectedAmount}
                  onChange={(e) => setCollectedAmount(Number(e.target.value))}
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label>Collection Rate</Label>
                <div className="h-10 px-3 py-2 bg-muted rounded-md flex items-center font-mono font-bold text-lg">
                  {allocationResult ? formatPercentage(allocationResult.collectionRate) : '0%'}
                </div>
              </div>
            </div>

            {/* Method Explanations */}
            <div className="grid gap-2 md:grid-cols-3 text-xs">
              <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                <strong className="text-blue-900">Pro-Rata:</strong>
                <p className="text-blue-800">All providers receive same % of their invoice</p>
              </div>
              <div className="p-2 bg-purple-50 border border-purple-200 rounded">
                <strong className="text-purple-900">Priority Waterfall:</strong>
                <p className="text-purple-800">High priority providers paid first, others get remainder</p>
              </div>
              <div className="p-2 bg-green-50 border border-green-200 rounded">
                <strong className="text-green-900">Hybrid:</strong>
                <p className="text-green-800">Protected % for critical providers, pro-rata for others</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {allocationResult && (
          <>
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Invoice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    <span className="text-2xl font-bold">
                      {formatCurrency(allocationResult.totalInvoice)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Collected Amount
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-2xl font-bold">
                      {formatCurrency(allocationResult.collectedAmount)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Deductions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-purple-600" />
                    <span className="text-2xl font-bold">
                      {formatCurrency(allocationResult.deductions.totalDeductions)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Net for Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-orange-600" />
                    <span className="text-2xl font-bold">
                      {formatCurrency(allocationResult.netAvailableForDistribution)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Validation Status */}
            {allocationResult.validationErrors.length > 0 ? (
              <Card className="border-red-300 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-900 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Validation Errors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-sm text-red-800">
                    {allocationResult.validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-green-300 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-900 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Allocation Validated Successfully
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-800">
                    All allocations balanced. Total distributed (
                    {formatCurrency(allocationResult.totalAllocated + allocationResult.deductions.totalDeductions)}
                    ) equals collected amount ({formatCurrency(allocationResult.collectedAmount)}).
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Detailed Results */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="calculator">Service Provider Allocation</TabsTrigger>
                <TabsTrigger value="deductions">Deduction Breakdown</TabsTrigger>
                <TabsTrigger value="summary">Summary & Shortfalls</TabsTrigger>
              </TabsList>

              {/* Service Provider Allocation Tab */}
              <TabsContent value="calculator" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Service Provider Allocation Results</CardTitle>
                    <CardDescription>
                      Using <Badge variant="outline" className={getMethodBadge(allocationMethod).color}>
                        {getMethodBadge(allocationMethod).label}
                      </Badge> method
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service Provider</TableHead>
                            {allocationMethod !== 'pro-rata' && <TableHead className="text-center">Priority</TableHead>}
                            <TableHead className="text-right">Invoice Amount</TableHead>
                            <TableHead className="text-right">Allocated</TableHead>
                            <TableHead className="text-right">Allocation %</TableHead>
                            <TableHead className="text-right">Shortfall</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {allocationResult.allocations.map((allocation) => (
                            <TableRow key={allocation.provider}>
                              <TableCell className="font-semibold">{allocation.provider}</TableCell>
                              {allocationMethod !== 'pro-rata' && (
                                <TableCell className="text-center">
                                  {allocation.priority ? (
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                      P{allocation.priority}
                                    </Badge>
                                  ) : (
                                    <span className="text-muted-foreground">-</span>
                                  )}
                                </TableCell>
                              )}
                              <TableCell className="text-right font-mono">
                                {formatCurrency(allocation.invoiceAmount)}
                              </TableCell>
                              <TableCell className="text-right font-mono text-green-700">
                                {formatCurrency(allocation.allocatedAmount)}
                              </TableCell>
                              <TableCell className="text-right">
                                <Badge variant="outline" className={
                                  allocation.allocationPercentage >= 90
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : allocation.allocationPercentage >= 75
                                    ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                    : 'bg-red-50 text-red-700 border-red-200'
                                }>
                                  {allocation.allocationPercentage.toFixed(2)}%
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right font-mono text-red-700">
                                {formatCurrency(allocation.shortfall)}
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="bg-muted/50 font-bold">
                            <TableCell colSpan={allocationMethod !== 'pro-rata' ? 2 : 1}>TOTAL</TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(allocationResult.allocations.reduce((sum, a) => sum + a.invoiceAmount, 0))}
                            </TableCell>
                            <TableCell className="text-right text-green-700">
                              {formatCurrency(allocationResult.totalAllocated)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                {((allocationResult.totalAllocated / allocationResult.allocations.reduce((sum, a) => sum + a.invoiceAmount, 0)) * 100).toFixed(2)}%
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right text-red-700">
                              {formatCurrency(allocationResult.totalShortfall)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    {/* Method-specific notes */}
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-1">
                            {allocationMethod === 'pro-rata' && 'Pro-Rata Allocation Method'}
                            {allocationMethod === 'priority-waterfall' && 'Priority Waterfall Method'}
                            {allocationMethod === 'hybrid' && 'Hybrid Allocation Method (Recommended)'}
                          </h4>
                          <p className="text-sm text-blue-800">
                            {allocationMethod === 'pro-rata' &&
                              'All service providers receive the same percentage of their invoice amounts based on the overall collection rate. Fair distribution but does not prioritize critical services.'
                            }
                            {allocationMethod === 'priority-waterfall' &&
                              'Service providers are paid in strict priority order. High-priority providers (Ancillary Services, NERC) receive full payment before any funds go to lower-priority providers.'
                            }
                            {allocationMethod === 'hybrid' &&
                              'Critical service providers (Ancillary Services, NERC, TSP, NISO) receive protected percentages (100%, 90%, 80%, 80% respectively), then remaining funds are distributed pro-rata to other providers. Balances fairness with critical service protection.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Deductions Tab */}
              <TabsContent value="deductions" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Deduction Breakdown</CardTitle>
                    <CardDescription>
                      Statutory and regulatory deductions from collected amount
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Deduction Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Rate</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-semibold">TxDx Deduction</TableCell>
                            <TableCell className="text-sm text-muted-foreground">Tax deductions (5% of gross invoice)</TableCell>
                            <TableCell className="text-right">5.00%</TableCell>
                            <TableCell className="text-right font-mono">
                              {formatCurrency(allocationResult.deductions.txdxDeduction)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">PIP NISO</TableCell>
                            <TableCell className="text-sm text-muted-foreground">Performance Incentive Program - NISO (10%)</TableCell>
                            <TableCell className="text-right">10.00%</TableCell>
                            <TableCell className="text-right font-mono">
                              {formatCurrency(allocationResult.deductions.pipNisoDeduction)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">PIP TSP</TableCell>
                            <TableCell className="text-sm text-muted-foreground">Performance Incentive Program - TSP (10%)</TableCell>
                            <TableCell className="text-right">10.00%</TableCell>
                            <TableCell className="text-right font-mono">
                              {formatCurrency(allocationResult.deductions.pipTspDeduction)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">ATFP Penalty (SO)</TableCell>
                            <TableCell className="text-sm text-muted-foreground">Available Transfer Capacity Penalty - System Operator (55.04%)</TableCell>
                            <TableCell className="text-right">55.04%</TableCell>
                            <TableCell className="text-right font-mono">
                              {formatCurrency(allocationResult.deductions.atfpSoPenalty)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">ATFP Penalty (TSP)</TableCell>
                            <TableCell className="text-sm text-muted-foreground">Available Transfer Capacity Penalty - TSP (46.70%)</TableCell>
                            <TableCell className="text-right">46.70%</TableCell>
                            <TableCell className="text-right font-mono">
                              {formatCurrency(allocationResult.deductions.atfpTspPenalty)}
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-muted/50 font-bold">
                            <TableCell>TOTAL DEDUCTIONS</TableCell>
                            <TableCell></TableCell>
                            <TableCell className="text-right">
                              {((allocationResult.deductions.totalDeductions / allocationResult.collectedAmount) * 100).toFixed(2)}%
                            </TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(allocationResult.deductions.totalDeductions)}
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-green-50 font-bold">
                            <TableCell className="text-green-900">NET AVAILABLE FOR DISTRIBUTION</TableCell>
                            <TableCell></TableCell>
                            <TableCell className="text-right text-green-900">
                              {((allocationResult.netAvailableForDistribution / allocationResult.collectedAmount) * 100).toFixed(2)}%
                            </TableCell>
                            <TableCell className="text-right text-green-900">
                              {formatCurrency(allocationResult.netAvailableForDistribution)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Summary Tab */}
              <TabsContent value="summary" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Allocation Summary</CardTitle>
                    <CardDescription>
                      Complete breakdown of allocation and shortfalls
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Flow Diagram */}
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="text-sm text-blue-800 font-semibold mb-1">Invoice Amount</div>
                        <div className="text-2xl font-bold text-blue-900">
                          {formatCurrency(allocationResult.totalInvoice)}
                        </div>
                        <div className="text-xs text-blue-700 mt-1">100% of charges</div>
                      </div>

                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-sm text-green-800 font-semibold mb-1">Collected Amount</div>
                        <div className="text-2xl font-bold text-green-900">
                          {formatCurrency(allocationResult.collectedAmount)}
                        </div>
                        <div className="text-xs text-green-700 mt-1">
                          {formatPercentage(allocationResult.collectionRate)} collection rate
                        </div>
                      </div>

                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="text-sm text-red-800 font-semibold mb-1">Total Shortfall</div>
                        <div className="text-2xl font-bold text-red-900">
                          {formatCurrency(allocationResult.totalInvoice - allocationResult.collectedAmount)}
                        </div>
                        <div className="text-xs text-red-700 mt-1">
                          {formatPercentage(1 - allocationResult.collectionRate)} uncollected
                        </div>
                      </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div className="space-y-2 p-4 bg-muted/50 rounded-lg font-mono text-sm">
                      <div className="flex justify-between">
                        <span>Collected Amount:</span>
                        <span className="font-bold">{formatCurrency(allocationResult.collectedAmount)}</span>
                      </div>
                      <div className="flex justify-between text-red-700">
                        <span className="pl-4">Less: Total Deductions</span>
                        <span className="font-bold">({formatCurrency(allocationResult.deductions.totalDeductions)})</span>
                      </div>
                      <div className="border-t border-border pt-2 flex justify-between text-green-700 font-bold">
                        <span>Net Available for Distribution:</span>
                        <span>{formatCurrency(allocationResult.netAvailableForDistribution)}</span>
                      </div>
                      <div className="border-t border-border pt-2 flex justify-between">
                        <span>Total Allocated to Providers:</span>
                        <span className="font-bold">{formatCurrency(allocationResult.totalAllocated)}</span>
                      </div>
                      <div className="flex justify-between text-purple-700">
                        <span>Service Provider Shortfall:</span>
                        <span className="font-bold">{formatCurrency(allocationResult.totalShortfall)}</span>
                      </div>
                    </div>

                    {/* Calculation Details */}
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-2">Calculation Details</h4>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• <strong>Invoice Total:</strong> Sum of all service provider charges</li>
                        <li>• <strong>Collection Rate:</strong> Collected Amount ÷ Invoice Total = {formatPercentage(allocationResult.collectionRate)}</li>
                        <li>• <strong>Deductions:</strong> TxDx (5%), PIP NISO (10%), PIP TSP (10%), ATFP penalties</li>
                        <li>• <strong>Net Distribution:</strong> Collected - Deductions = {formatCurrency(allocationResult.netAvailableForDistribution)}</li>
                        <li>• <strong>Allocation Method:</strong> {getMethodBadge(allocationMethod).label} determines how net amount is distributed</li>
                        <li>• <strong>Provider Shortfall:</strong> Invoice Amount - Allocated Amount for each provider</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </MainLayout>
  );
}
