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
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatters';

// Mock data based on MAY 2025 DASHBOARD REPORT - Top 5 DISCOs with complete dummy data
const discoPaymentsData = {
  period: 'May 2025',
  discos: [
    { code: 'ABUJA', invoice: 3708657448.70, remitted: 2689359662.30, txdxNetOff: 135849357.43, atfpPenalty: 42500000.00, outstanding: 841448428.97 },
    { code: 'BENIN', invoice: 1278980018.16, remitted: 516228028.71, txdxNetOff: 295161664.35, atfpPenalty: 15000000.00, outstanding: 452590325.10 },
    { code: 'EKO', invoice: 2831219052.00, remitted: 1829903264.39, txdxNetOff: 266357283.25, atfpPenalty: 31200000.00, outstanding: 703758504.36 },
    { code: 'IBADAN', invoice: 2404657915.02, remitted: 1711282414.58, txdxNetOff: 158450000.00, atfpPenalty: 28000000.00, outstanding: 506925500.44 },
    { code: 'IKEJA', invoice: 3270777519.27, remitted: 2221590523.05, txdxNetOff: 195143752.16, atfpPenalty: 36800000.00, outstanding: 817043244.06 },
  ],
  serviceProviders: [
    { name: 'ANCILLARY SERV.', invoice: 952343843.12, disbursed: 952343843.12, pipAmount: 125000000.00, txdxDeductions: 0, atfpPenalty: 0, outstanding: 0 },
    { name: 'MO', invoice: 285500000.00, disbursed: 265800000.00, pipAmount: 0, txdxDeductions: 0, atfpPenalty: 0, outstanding: 19700000.00 },
    { name: 'NBET', invoice: 324831174.98, disbursed: 310968183.30, pipAmount: 0, txdxDeductions: 0, atfpPenalty: 0, outstanding: 13862991.68 },
    { name: 'NERC', invoice: 6007856138.74, disbursed: 5744661702.68, pipAmount: 0, txdxDeductions: 0, atfpPenalty: 0, outstanding: 263194436.06 },
    { name: 'SO', invoice: 3425000804.82, disbursed: 1367462074.05, pipAmount: 1804668161.82, txdxDeductions: 0, atfpPenalty: 106700000.00, outstanding: 146170568.96 },
    { name: 'TSP', invoice: 4633037861.86, disbursed: 556158332.81, pipAmount: 2120116191.14, txdxDeductions: 1756888840.38, atfpPenalty: 106700000.00, outstanding: 93174497.53 },
  ],
};

export default function DiscoPaymentsReportPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('disco-payments');

  // Calculate totals
  const totalInvoice = discoPaymentsData.discos.reduce((sum, d) => sum + d.invoice, 0);
  const totalRemitted = discoPaymentsData.discos.reduce((sum, d) => sum + d.remitted, 0);
  const totalTxdxNetOff = discoPaymentsData.discos.reduce((sum, d) => sum + d.txdxNetOff, 0);
  const totalAtfpPenalty = discoPaymentsData.discos.reduce((sum, d) => sum + d.atfpPenalty, 0);
  const totalOutstanding = discoPaymentsData.discos.reduce((sum, d) => sum + d.outstanding, 0);

  const totalSpInvoice = discoPaymentsData.serviceProviders.reduce((sum, sp) => sp.invoice + sum, 0);
  const totalSpDisbursed = discoPaymentsData.serviceProviders.reduce((sum, sp) => sp.disbursed + sum, 0);
  const totalSpPipAmount = discoPaymentsData.serviceProviders.reduce((sum, sp) => sp.pipAmount + sum, 0);
  const totalSpTxdxDeductions = discoPaymentsData.serviceProviders.reduce((sum, sp) => sp.txdxDeductions + sum, 0);
  const totalSpAtfpPenalty = discoPaymentsData.serviceProviders.reduce((sum, sp) => sp.atfpPenalty + sum, 0);
  const totalSpOutstanding = discoPaymentsData.serviceProviders.reduce((sum, sp) => sp.outstanding + sum, 0);

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
              <h1 className="text-3xl font-bold tracking-tight">DISCO Payments Report</h1>
              <p className="text-muted-foreground">
                DISCOs payments and outstanding for service providers - {discoPaymentsData.period}
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
                Total Invoice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalInvoice)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">All DISCOs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Remitted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalRemitted)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Collected</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                TxDx Net Off
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalTxdxNetOff)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Tax deductions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Outstanding
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-2xl font-bold text-red-600">{formatCurrency(totalOutstanding)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Total pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="disco-payments">DISCO Payments</TabsTrigger>
            <TabsTrigger value="service-providers">Service Providers</TabsTrigger>
          </TabsList>

          {/* DISCO Payments Tab */}
          <TabsContent value="disco-payments" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>DISCOs Payments and Outstanding for Service Providers</CardTitle>
                <CardDescription>
                  Payment tracking for all Distribution Companies in {discoPaymentsData.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>DISCOS</TableHead>
                        <TableHead className="text-right">MAR 2025 INVOICE(N)</TableHead>
                        <TableHead className="text-right">AMOUNT REMITTED(N)</TableHead>
                        <TableHead className="text-right">TXDX NET OFF (N)</TableHead>
                        <TableHead className="text-right">ATFP PENALTY</TableHead>
                        <TableHead className="text-right">DISCO OUTSTANDING(N)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {discoPaymentsData.discos.map((disco) => (
                        <TableRow key={disco.code}>
                          <TableCell className="font-bold">{disco.code}</TableCell>
                          <TableCell className="text-right font-mono">{formatCurrency(disco.invoice)}</TableCell>
                          <TableCell className="text-right font-mono">{formatCurrency(disco.remitted)}</TableCell>
                          <TableCell className="text-right font-mono">
                            {disco.txdxNetOff > 0 ? formatCurrency(disco.txdxNetOff) : '-'}
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {disco.atfpPenalty > 0 ? formatCurrency(disco.atfpPenalty) : '-'}
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {disco.outstanding > 0 ? (
                              <span className="text-red-600 font-semibold">{formatCurrency(disco.outstanding)}</span>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell>TOTAL</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalInvoice)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalRemitted)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalTxdxNetOff)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalAtfpPenalty)}</TableCell>
                        <TableCell className="text-right text-red-600">{formatCurrency(totalOutstanding)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Providers Tab */}
          <TabsContent value="service-providers" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>DISCOs Payments to Service Providers</CardTitle>
                <CardDescription>
                  Payment allocations for the period {discoPaymentsData.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SERVICE PROVIDERS</TableHead>
                        <TableHead className="text-right">MAR 2025 INVOICE(N)</TableHead>
                        <TableHead className="text-right">AMOUNT DISBURSED (N)</TableHead>
                        <TableHead className="text-right">PIP AMOUNT (N)</TableHead>
                        <TableHead className="text-right bg-orange-50">TXDX DEDUCTIONS(N)</TableHead>
                        <TableHead className="text-right">ATFP PENALTY</TableHead>
                        <TableHead className="text-right">OUTSTANDING(N)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {discoPaymentsData.serviceProviders.map((sp, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-semibold">{sp.name}</TableCell>
                          <TableCell className="text-right font-mono">
                            {formatCurrency(sp.invoice)}
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {formatCurrency(sp.disbursed)}
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {sp.pipAmount > 0 ? formatCurrency(sp.pipAmount) : '-'}
                          </TableCell>
                          <TableCell className="text-right font-mono bg-orange-50">
                            {sp.txdxDeductions > 0 ? formatCurrency(sp.txdxDeductions) : '-'}
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {sp.atfpPenalty > 0 ? formatCurrency(sp.atfpPenalty) : '-'}
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {sp.outstanding > 0 ? (
                              <span className="text-red-600 font-semibold">{formatCurrency(sp.outstanding)}</span>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell>TOTAL</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalSpInvoice)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalSpDisbursed)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalSpPipAmount)}</TableCell>
                        <TableCell className="text-right bg-orange-50">{formatCurrency(totalSpTxdxDeductions)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalSpAtfpPenalty)}</TableCell>
                        <TableCell className="text-right text-red-600">{formatCurrency(totalSpOutstanding)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Payment Collection Rate Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Collection Analysis</CardTitle>
            <CardDescription>Collection efficiency by DISCO</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {discoPaymentsData.discos.map((disco) => {
                const collectionRate = ((disco.remitted / disco.invoice) * 100).toFixed(1);
                const isGood = Number(collectionRate) >= 60;

                return (
                  <div key={disco.code} className="flex items-center gap-4">
                    <div className="w-32 font-semibold">{disco.code}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${isGood ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ width: `${collectionRate}%` }}
                          />
                        </div>
                        <Badge variant={isGood ? 'default' : 'destructive'}>
                          {collectionRate}%
                        </Badge>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Remitted: {formatCurrency(disco.remitted)}</span>
                        <span>Invoice: {formatCurrency(disco.invoice)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
