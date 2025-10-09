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
  Building2,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatters';

// Mock data based on Market Operator Disbursement Schedule - Top 5 DISCOs
const marketOperatorData = {
  period: 'May 2025',
  discos: [
    { code: 'ABUJA', invoice: 185328724.35, disbursed: 185328724.35, outstanding: 0, status: 'paid' },
    { code: 'BENIN', invoice: 79609895.90, disbursed: 79609895.90, outstanding: 0, status: 'paid' },
    { code: 'EKO', invoice: 113103164.81, disbursed: 113103164.81, outstanding: 0, status: 'paid' },
    { code: 'IBADAN', invoice: 94886767.69, disbursed: 94886767.69, outstanding: 0, status: 'paid' },
    { code: 'IKEJA', invoice: 130342554.08, disbursed: 130342554.08, outstanding: 0, status: 'paid' },
  ],
  receivables: [
    { source: 'NBET Receivables', amount: 491733501.11, collected: 491733501.11, collectionRate: 100 },
    { source: 'DISCO Payments', amount: 858894876.62, collected: 858894876.62, collectionRate: 100 },
    { source: 'Zungeru Credit', amount: 491733501.11, collected: 491733501.11, collectionRate: 100 },
  ],
  disbursements: [
    { category: 'MO Operations', amount: 450000000.00, percentage: 52.4 },
    { category: 'IT Infrastructure', amount: 120000000.00, percentage: 14.0 },
    { category: 'Administrative Costs', amount: 80000000.00, percentage: 9.3 },
    { category: 'Regulatory Compliance', amount: 65000000.00, percentage: 7.6 },
    { category: 'Market Development', amount: 55000000.00, percentage: 6.4 },
    { category: 'Reserve Fund', amount: 88894876.62, percentage: 10.3 },
  ],
};

export default function MarketOperatorDisbursementPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('disco-contributions');

  // Calculate totals
  const totalDiscoInvoice = marketOperatorData.discos.reduce((sum, d) => sum + d.invoice, 0);
  const totalDisbursed = marketOperatorData.discos.reduce((sum, d) => sum + d.disbursed, 0);
  const totalReceivables = marketOperatorData.receivables.reduce((sum, r) => sum + r.amount, 0);
  const totalDisbursementAmount = marketOperatorData.disbursements.reduce((sum, d) => sum + d.amount, 0);

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
                <Building2 className="h-8 w-8 text-green-600" />
                Market Operator Disbursement
              </h1>
              <p className="text-muted-foreground">
                MO charge collection and disbursement schedule - {marketOperatorData.period}
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
                Total MO Invoice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-green-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalDiscoInvoice)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">From all DISCOs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Collected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalDisbursed)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">100% collection rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Receivables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalReceivables)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">All sources</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Disbursements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-purple-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalDisbursementAmount)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Operational expenses</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="disco-contributions">DISCO Contributions</TabsTrigger>
            <TabsTrigger value="receivables">Receivables Breakdown</TabsTrigger>
            <TabsTrigger value="disbursements">Disbursement Schedule</TabsTrigger>
          </TabsList>

          {/* DISCO Contributions Tab */}
          <TabsContent value="disco-contributions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Operator Charge by DISCO</CardTitle>
                <CardDescription>
                  MO charge collection from all DISCOs for {marketOperatorData.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>DISCO</TableHead>
                        <TableHead className="text-right">MO INVOICE (N)</TableHead>
                        <TableHead className="text-right">AMOUNT DISBURSED (N)</TableHead>
                        <TableHead className="text-right">OUTSTANDING (N)</TableHead>
                        <TableHead>STATUS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {marketOperatorData.discos.map((disco) => (
                        <TableRow key={disco.code}>
                          <TableCell className="font-bold">{disco.code}</TableCell>
                          <TableCell className="text-right font-mono">{formatCurrency(disco.invoice)}</TableCell>
                          <TableCell className="text-right font-mono text-green-600">{formatCurrency(disco.disbursed)}</TableCell>
                          <TableCell className="text-right font-mono">{formatCurrency(disco.outstanding)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              {disco.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell>TOTAL</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalDiscoInvoice)}</TableCell>
                        <TableCell className="text-right text-green-600">{formatCurrency(totalDisbursed)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(0)}</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* MO Charge Info */}
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900 mb-1">Market Operator Charge</h4>
                      <p className="text-sm text-green-800">
                        The MO charge is collected from all DISCOs to fund the operations of the Market Operator.
                        This includes system operations, market settlement, IT infrastructure, and regulatory compliance.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Receivables Tab */}
          <TabsContent value="receivables" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Operator Receivables</CardTitle>
                <CardDescription>
                  Revenue sources for Market Operator funding - {marketOperatorData.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>REVENUE SOURCE</TableHead>
                        <TableHead className="text-right">EXPECTED (N)</TableHead>
                        <TableHead className="text-right">COLLECTED (N)</TableHead>
                        <TableHead className="text-right">COLLECTION RATE</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {marketOperatorData.receivables.map((receivable, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-semibold">{receivable.source}</TableCell>
                          <TableCell className="text-right font-mono">{formatCurrency(receivable.amount)}</TableCell>
                          <TableCell className="text-right font-mono text-green-600">{formatCurrency(receivable.collected)}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              {receivable.collectionRate}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell>TOTAL</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalReceivables)}</TableCell>
                        <TableCell className="text-right text-green-600">{formatCurrency(totalReceivables)}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            100%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Collection Performance Chart */}
                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold">Collection Performance</h4>
                  {marketOperatorData.receivables.map((receivable, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{receivable.source}</span>
                        <span className="font-mono">{formatCurrency(receivable.collected)}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-600 transition-all"
                          style={{ width: `${receivable.collectionRate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disbursement Schedule Tab */}
          <TabsContent value="disbursements" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Disbursement Schedule</CardTitle>
                <CardDescription>
                  Allocation of MO funds to operational categories - {marketOperatorData.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>CATEGORY</TableHead>
                        <TableHead className="text-right">AMOUNT (N)</TableHead>
                        <TableHead className="text-right">PERCENTAGE</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {marketOperatorData.disbursements.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-semibold">{item.category}</TableCell>
                          <TableCell className="text-right font-mono">{formatCurrency(item.amount)}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className="bg-purple-100 text-purple-800">
                              {item.percentage.toFixed(1)}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell>TOTAL</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalDisbursementAmount)}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-purple-100 text-purple-800">
                            100.0%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Disbursement Breakdown Chart */}
                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold">Disbursement Breakdown</h4>
                  {marketOperatorData.disbursements.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.category}</span>
                        <span className="font-medium">{item.percentage.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-600 transition-all"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> The Market Operator charge is essential for maintaining efficient market operations,
                    including real-time settlement systems, market monitoring, and regulatory compliance activities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Fund Utilization Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Fund Utilization Summary</CardTitle>
            <CardDescription>How MO funds are allocated across operational areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Revenue Collection
                </h4>
                <div className="space-y-2">
                  {marketOperatorData.receivables.map((receivable, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{receivable.source}</span>
                      <span className="font-mono">{formatCurrency(receivable.collected)}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Total Revenue</span>
                      <span className="font-mono">{formatCurrency(totalReceivables)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                  Fund Allocation
                </h4>
                <div className="space-y-2">
                  {marketOperatorData.disbursements.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate max-w-[180px]">{item.category}</span>
                      <span className="font-mono">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Total Allocation</span>
                      <span className="font-mono">{formatCurrency(totalDisbursementAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
