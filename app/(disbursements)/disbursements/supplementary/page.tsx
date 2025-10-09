'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layouts/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Download,
  FileText,
  PiggyBank,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Building2,
  Zap,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatters';

// Mock data based on Supplementary Disbursements
const supplementaryData = {
  period: 'May 2025',
  specialFunds: [
    {
      name: 'TxDx Net-Off Fund',
      invoice: 135849357.43,
      disbursed: 135849357.43,
      purpose: 'Transmission/Distribution network maintenance',
      status: 'disbursed'
    },
    {
      name: 'ATFP Penalty Fund',
      invoice: 0,
      disbursed: 0,
      purpose: 'Available Transfer Capability Penalty',
      status: 'no-invoice'
    },
    {
      name: 'Trust Fund',
      invoice: 245000000.00,
      disbursed: 245000000.00,
      purpose: 'Market stability and liquidity support',
      status: 'disbursed'
    },
    {
      name: 'Performance Incentive (PIP)',
      invoice: 491733501.11,
      disbursed: 491733501.11,
      purpose: 'Service provider performance incentives',
      status: 'disbursed'
    },
  ],
  gencoLiquidatedDamages: [
    { genco: 'AFAM VI', amount: 45000000.00, reason: 'Capacity shortfall', status: 'collected' },
    { genco: 'EGBIN', amount: 38000000.00, reason: 'Forced outage penalty', status: 'collected' },
    { genco: 'GEREGU', amount: 29000000.00, reason: 'Availability penalty', status: 'collected' },
    { genco: 'OKPAI', amount: 22000000.00, reason: 'Performance below threshold', status: 'collected' },
    { genco: 'PARAS', amount: 31000000.00, reason: 'Capacity underdelivery', status: 'collected' },
  ],
  ancillaryServices: [
    { service: 'Frequency Regulation', provider: 'TCN', amount: 77824808.58, status: 'paid' },
    { service: 'Voltage Support', provider: 'TCN', amount: 42000000.00, status: 'paid' },
    { service: 'Black Start Capability', provider: 'Multiple GENCOs', amount: 35000000.00, status: 'paid' },
    { service: 'Reactive Power Support', provider: 'GENCOs', amount: 28000000.00, status: 'paid' },
  ],
  trustFundAllocations: [
    { disco: 'ABUJA', allocation: 35000000.00, utilized: 35000000.00, balance: 0 },
    { disco: 'BENIN', allocation: 18000000.00, utilized: 18000000.00, balance: 0 },
    { disco: 'EKO', allocation: 28000000.00, utilized: 28000000.00, balance: 0 },
    { disco: 'ENUGU', allocation: 15000000.00, utilized: 15000000.00, balance: 0 },
    { disco: 'IBADAN', allocation: 22000000.00, utilized: 22000000.00, balance: 0 },
    { disco: 'IKEJA', allocation: 32000000.00, utilized: 32000000.00, balance: 0 },
    { disco: 'JOS', allocation: 12000000.00, utilized: 12000000.00, balance: 0 },
    { disco: 'KADUNA', allocation: 11000000.00, utilized: 11000000.00, balance: 0 },
    { disco: 'KANO', allocation: 14000000.00, utilized: 14000000.00, balance: 0 },
    { disco: 'P/H', allocation: 16000000.00, utilized: 16000000.00, balance: 0 },
    { disco: 'YOLA', allocation: 10000000.00, utilized: 10000000.00, balance: 0 },
  ],
};

export default function SupplementaryDisbursementPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('special-funds');

  // Calculate totals
  const totalSpecialFunds = supplementaryData.specialFunds.reduce((sum, f) => sum + f.disbursed, 0);
  const totalLiquidatedDamages = supplementaryData.gencoLiquidatedDamages.reduce((sum, g) => sum + g.amount, 0);
  const totalAncillary = supplementaryData.ancillaryServices.reduce((sum, a) => sum + a.amount, 0);
  const totalTrustFund = supplementaryData.trustFundAllocations.reduce((sum, t) => sum + t.allocation, 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/disbursements')}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <PiggyBank className="h-8 w-8 text-orange-600" />
                Supplementary Disbursements
              </h1>
              <p className="text-muted-foreground">
                Special funds, penalties, and ancillary service payments - {supplementaryData.period}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Print Report
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Special Funds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <PiggyBank className="h-4 w-4 text-orange-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalSpecialFunds)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">TxDx, Trust, PIP funds</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Liquidated Damages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalLiquidatedDamages)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">GENCO penalties</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ancillary Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalAncillary)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Grid support services</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Trust Fund Pool
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalTrustFund)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Market liquidity</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="special-funds">Special Funds</TabsTrigger>
            <TabsTrigger value="trust-fund">Trust Fund</TabsTrigger>
            <TabsTrigger value="penalties">Penalties & LD</TabsTrigger>
            <TabsTrigger value="ancillary">Ancillary Services</TabsTrigger>
          </TabsList>

          {/* Special Funds Tab */}
          <TabsContent value="special-funds" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Special Fund Disbursements</CardTitle>
                <CardDescription>
                  Supplementary fund collections and disbursements for {supplementaryData.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>FUND NAME</TableHead>
                        <TableHead>PURPOSE</TableHead>
                        <TableHead className="text-right">INVOICE (N)</TableHead>
                        <TableHead className="text-right">DISBURSED (N)</TableHead>
                        <TableHead>STATUS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {supplementaryData.specialFunds.map((fund, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-bold">{fund.name}</TableCell>
                          <TableCell className="max-w-[250px]">{fund.purpose}</TableCell>
                          <TableCell className="text-right font-mono">
                            {fund.invoice > 0 ? formatCurrency(fund.invoice) : '-'}
                          </TableCell>
                          <TableCell className="text-right font-mono text-green-600">
                            {fund.disbursed > 0 ? formatCurrency(fund.disbursed) : '-'}
                          </TableCell>
                          <TableCell>
                            {fund.status === 'disbursed' ? (
                              <Badge variant="outline" className="bg-green-100 text-green-800">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                DISBURSED
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-gray-100 text-gray-800">
                                NO INVOICE
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell colSpan={2}>TOTAL</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(supplementaryData.specialFunds.reduce((sum, f) => sum + f.invoice, 0))}
                        </TableCell>
                        <TableCell className="text-right text-green-600">{formatCurrency(totalSpecialFunds)}</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Special Funds Info */}
                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <PiggyBank className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-1">Special Fund Categories</h4>
                      <p className="text-sm text-orange-800">
                        These supplementary funds support critical market functions including network maintenance (TxDx),
                        market liquidity (Trust Fund), and performance incentives (PIP) for service providers.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trust Fund Tab */}
          <TabsContent value="trust-fund" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Trust Fund Allocations by DISCO</CardTitle>
                <CardDescription>
                  Market liquidity support fund distribution - {supplementaryData.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>DISCO</TableHead>
                        <TableHead className="text-right">ALLOCATION (N)</TableHead>
                        <TableHead className="text-right">UTILIZED (N)</TableHead>
                        <TableHead className="text-right">BALANCE (N)</TableHead>
                        <TableHead className="text-right">UTILIZATION %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {supplementaryData.trustFundAllocations.map((trust) => {
                        const utilizationRate = trust.allocation > 0 ? (trust.utilized / trust.allocation) * 100 : 0;
                        return (
                          <TableRow key={trust.disco}>
                            <TableCell className="font-bold">{trust.disco}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(trust.allocation)}</TableCell>
                            <TableCell className="text-right font-mono text-green-600">{formatCurrency(trust.utilized)}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(trust.balance)}</TableCell>
                            <TableCell className="text-right">
                              <Badge variant="outline" className="bg-green-100 text-green-800">
                                {utilizationRate.toFixed(0)}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell>TOTAL</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalTrustFund)}</TableCell>
                        <TableCell className="text-right text-green-600">
                          {formatCurrency(supplementaryData.trustFundAllocations.reduce((sum, t) => sum + t.utilized, 0))}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(supplementaryData.trustFundAllocations.reduce((sum, t) => sum + t.balance, 0))}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            100%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Trust Fund Usage Chart */}
                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold">Trust Fund Utilization by DISCO</h4>
                  {supplementaryData.trustFundAllocations.map((trust) => {
                    const percentage = (trust.allocation / totalTrustFund) * 100;
                    return (
                      <div key={trust.disco} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{trust.disco}</span>
                          <span className="font-mono">{formatCurrency(trust.allocation)} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Penalties & LD Tab */}
          <TabsContent value="penalties" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>GENCO Liquidated Damages</CardTitle>
                <CardDescription>
                  Penalties collected from generators for performance issues - {supplementaryData.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>GENCO</TableHead>
                        <TableHead>REASON</TableHead>
                        <TableHead className="text-right">AMOUNT (N)</TableHead>
                        <TableHead>STATUS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {supplementaryData.gencoLiquidatedDamages.map((genco, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-bold">{genco.genco}</TableCell>
                          <TableCell>{genco.reason}</TableCell>
                          <TableCell className="text-right font-mono">{formatCurrency(genco.amount)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              {genco.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell colSpan={2}>TOTAL</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalLiquidatedDamages)}</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Penalty Distribution */}
                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold">Penalty Distribution</h4>
                  {supplementaryData.gencoLiquidatedDamages.map((genco, index) => {
                    const percentage = (genco.amount / totalLiquidatedDamages) * 100;
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{genco.genco} - {genco.reason}</span>
                          <span className="font-mono">{formatCurrency(genco.amount)}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-600 transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* LD Info */}
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-900 mb-1">Liquidated Damages</h4>
                      <p className="text-sm text-red-800">
                        Penalties are imposed on GENCOs for failure to meet contracted capacity, forced outages,
                        and performance below agreed thresholds. These funds are redistributed to affected market participants.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ancillary Services Tab */}
          <TabsContent value="ancillary" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Ancillary Services Payments</CardTitle>
                <CardDescription>
                  Grid support and stability service payments - {supplementaryData.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SERVICE</TableHead>
                        <TableHead>PROVIDER</TableHead>
                        <TableHead className="text-right">AMOUNT (N)</TableHead>
                        <TableHead>STATUS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {supplementaryData.ancillaryServices.map((service, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-semibold">{service.service}</TableCell>
                          <TableCell>{service.provider}</TableCell>
                          <TableCell className="text-right font-mono">{formatCurrency(service.amount)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              {service.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell colSpan={2}>TOTAL</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalAncillary)}</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Ancillary Service Breakdown */}
                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold">Service Payment Breakdown</h4>
                  {supplementaryData.ancillaryServices.map((service, index) => {
                    const percentage = (service.amount / totalAncillary) * 100;
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{service.service}</span>
                          <span className="font-mono">{formatCurrency(service.amount)} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-600 transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Ancillary Services Info */}
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-1">Ancillary Services</h4>
                      <p className="text-sm text-yellow-800">
                        Critical grid support services including frequency regulation, voltage support, black start capability,
                        and reactive power support to maintain system stability and reliability.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Summary Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Supplementary Disbursement Overview</CardTitle>
            <CardDescription>Total supplementary payments across all categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <PiggyBank className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-900">Special Funds</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(totalSpecialFunds)}</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Trust Fund</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(totalTrustFund)}</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-red-900">Penalties</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(totalLiquidatedDamages)}</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-900">Ancillary</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(totalAncillary)}</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-purple-50 rounded-lg border-2 border-orange-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Total Supplementary Disbursements</div>
                  <div className="text-3xl font-bold mt-1">
                    {formatCurrency(totalSpecialFunds + totalTrustFund + totalLiquidatedDamages + totalAncillary)}
                  </div>
                </div>
                <TrendingUp className="h-12 w-12 text-orange-600 opacity-50" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
