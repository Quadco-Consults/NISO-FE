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
  Zap,
  DollarSign,
  TrendingUp,
  Building2,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatters';

// Mock data based on ZUNGERU PAYMENT REPORT - Top 5 DISCOs
const zungeruPaymentsData = {
  period: 'May 2025',
  discos: [
    { code: 'ABUJA', invoice: 2322212540.70, remitted: 0, outstanding: 0 },
    { code: 'BENIN', invoice: 1593119505.77, remitted: 0, outstanding: 0 },
    { code: 'EKO', invoice: 2262059674.62, remitted: 0, outstanding: 0 },
    { code: 'IBADAN', invoice: 1897735233.86, remitted: 0, outstanding: 0 },
    { code: 'IKEJA', invoice: 2606852508.16, remitted: 0, outstanding: 0 },
  ],
  serviceProviders: [
    { name: 'ANCILLARY SERV.', invoice: 77824808.58, disbursed: 77824808.58, pipDeductions: 0, outstanding: 0 },
    { name: 'MO', invoice: 0, disbursed: 491733501.11, pipDeductions: 0, outstanding: 0 },
    { name: 'NBET', invoice: 0, disbursed: 0, pipDeductions: 0, outstanding: 0 },
    { name: 'NERC', invoice: 490307863.60, disbursed: 490307863.60, pipDeductions: 0, outstanding: 0 },
    { name: 'SO', invoice: 279888439.41, disbursed: 125837842.36, pipDeductions: 154050597.05, outstanding: 0 },
    { name: 'TSP', invoice: 723089730.32, disbursed: 385406826.26, pipDeductions: 337682904.06, outstanding: 0 },
    { name: 'MAINSTREAM ENERGY/penstock energy', invoice: 13766036328.01, disbursed: 13766036328.01, pipDeductions: 0, outstanding: 0 },
  ],
};

export default function ZungeruPaymentReportPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('disco-payments');

  // Calculate totals
  const totalDiscoInvoice = zungeruPaymentsData.discos.reduce((sum, d) => sum + d.invoice, 0);
  const totalSpDisbursed = zungeruPaymentsData.serviceProviders.reduce((sum, sp) => sum + sp.disbursed, 0);
  const totalPipDeductions = zungeruPaymentsData.serviceProviders.reduce((sum, sp) => sum + sp.pipDeductions, 0);

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
                <Zap className="h-8 w-8 text-yellow-600" />
                Zungeru Payment Report
              </h1>
              <p className="text-muted-foreground">
                Zungeru Energy Credit payments and outstanding for service providers - {zungeruPaymentsData.period}
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
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Zungeru Credit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalDiscoInvoice)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">All DISCOs allocation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Disbursed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalSpDisbursed)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">To service providers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                PIP Deductions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-purple-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalPipDeductions)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Performance incentive</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="disco-payments">DISCO Allocations</TabsTrigger>
            <TabsTrigger value="service-providers">Service Provider Payments</TabsTrigger>
          </TabsList>

          {/* DISCO Allocations Tab */}
          <TabsContent value="disco-payments" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Zungeru Payments and Outstanding for Service Providers</CardTitle>
                <CardDescription>
                  Zungeru Energy Credit allocation by DISCO for {zungeruPaymentsData.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>DISCOS</TableHead>
                        <TableHead className="text-right">MAR 2025 INVOICE(N)</TableHead>
                        <TableHead className="text-right">AMOUNT REMITTED ZUNGERU(N)</TableHead>
                        <TableHead className="text-right">DISCO OUTSTANDING(N)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {zungeruPaymentsData.discos.map((disco) => (
                        <TableRow key={disco.code}>
                          <TableCell className="font-bold">{disco.code}</TableCell>
                          <TableCell className="text-right font-mono">{formatCurrency(disco.invoice)}</TableCell>
                          <TableCell className="text-right font-mono text-muted-foreground">#REF!</TableCell>
                          <TableCell className="text-right font-mono">-</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell>TOTAL</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalDiscoInvoice)}</TableCell>
                        <TableCell className="text-right text-muted-foreground">#REF!</TableCell>
                        <TableCell className="text-right">-</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Zungeru Credit Info */}
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-1">Zungeru Energy Credit</h4>
                      <p className="text-sm text-yellow-800">
                        The Zungeru Energy Credit is distributed to DISCOs based on their energy allocation.
                        This credit helps offset energy costs and is calculated based on Zungeru Hydro Plant generation.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Providers Tab */}
          <TabsContent value="service-providers" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Zungeru Payments to Service Providers</CardTitle>
                <CardDescription>
                  Payment distribution from Zungeru credit for the period {zungeruPaymentsData.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SERVICE PROVIDERS</TableHead>
                        <TableHead className="text-right">MAR 2025 INVOICE(N)</TableHead>
                        <TableHead className="text-right">AMOUT DISBURSED</TableHead>
                        <TableHead className="text-right bg-purple-50">PIP DEDUCTIONS</TableHead>
                        <TableHead className="text-right">OUTSTANDING(N)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {zungeruPaymentsData.serviceProviders.map((sp, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-semibold">{sp.name}</TableCell>
                          <TableCell className="text-right font-mono">
                            {sp.invoice > 0 ? formatCurrency(sp.invoice) : (sp.name === 'MO' || sp.name === 'NBET' ? '#REF!' : '-')}
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {sp.disbursed > 0 ? formatCurrency(sp.disbursed) : '-'}
                          </TableCell>
                          <TableCell className="text-right font-mono bg-purple-50">
                            {sp.pipDeductions > 0 ? formatCurrency(sp.pipDeductions) : (sp.name === 'MO' ? '#REF!' : '-')}
                          </TableCell>
                          <TableCell className="text-right font-mono">-</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell>TOTAL</TableCell>
                        <TableCell className="text-right">#REF!</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalSpDisbursed)}</TableCell>
                        <TableCell className="text-right bg-purple-50">#REF!</TableCell>
                        <TableCell className="text-right">-</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Notes */}
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> #REF! indicates data reference not available. Mainstream Energy/Penstock Energy
                    receives the largest allocation as the primary energy generator.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* DISCO vs Service Provider Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Zungeru Credit Distribution Flow</CardTitle>
            <CardDescription>How Zungeru credit flows from DISCOs to service providers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  DISCO Allocation
                </h4>
                <div className="space-y-2">
                  {zungeruPaymentsData.discos.slice(0, 5).map((disco) => (
                    <div key={disco.code} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{disco.code}</span>
                      <span className="font-mono">{formatCurrency(disco.invoice)}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Total (5 DISCOs)</span>
                      <span className="font-mono">{formatCurrency(totalDiscoInvoice)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-600" />
                  Service Provider Payments
                </h4>
                <div className="space-y-2">
                  {zungeruPaymentsData.serviceProviders.filter(sp => sp.disbursed > 0).slice(0, 5).map((sp, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate max-w-[180px]">{sp.name}</span>
                      <span className="font-mono">{formatCurrency(sp.disbursed)}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Total Disbursed</span>
                      <span className="font-mono">{formatCurrency(totalSpDisbursed)}</span>
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
