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
  Scale,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Building2,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatters';

// Mock data based on NERC Regulatory Charge Disbursements
const regulatoryData = {
  period: 'May 2025',
  discos: [
    { code: 'ABUJA', nercCharge: 490307863.60, disbursed: 490307863.60, outstanding: 0, status: 'paid' },
    { code: 'BENIN', nercCharge: 210691878.37, disbursed: 210691878.37, outstanding: 0, status: 'paid' },
    { code: 'EKO', nercCharge: 299313770.14, disbursed: 299313770.14, outstanding: 0, status: 'paid' },
    { code: 'ENUGU', nercCharge: 167384918.25, disbursed: 167384918.25, outstanding: 0, status: 'paid' },
    { code: 'IBADAN', nercCharge: 251013363.36, disbursed: 251013363.36, outstanding: 0, status: 'paid' },
    { code: 'IKEJA', nercCharge: 344905797.82, disbursed: 344905797.82, outstanding: 0, status: 'paid' },
    { code: 'JOS', nercCharge: 95737913.75, disbursed: 95737913.75, outstanding: 0, status: 'paid' },
    { code: 'KADUNA', nercCharge: 93086416.69, disbursed: 93086416.69, outstanding: 0, status: 'paid' },
    { code: 'KANO', nercCharge: 113583036.00, disbursed: 113583036.00, outstanding: 0, status: 'paid' },
    { code: 'P/H', nercCharge: 141282923.19, disbursed: 141282923.19, outstanding: 0, status: 'paid' },
    { code: 'YOLA', nercCharge: 65199982.43, disbursed: 65199982.43, outstanding: 0, status: 'paid' },
  ],
  nercAllocations: [
    { category: 'Regulatory Operations', amount: 850000000.00, percentage: 31.2 },
    { category: 'Market Monitoring & Enforcement', amount: 520000000.00, percentage: 19.1 },
    { category: 'Consumer Protection', amount: 380000000.00, percentage: 14.0 },
    { category: 'Standards & Compliance', amount: 310000000.00, percentage: 11.4 },
    { category: 'Technical Services', amount: 285000000.00, percentage: 10.5 },
    { category: 'Research & Development', amount: 210000000.00, percentage: 7.7 },
    { category: 'Administrative Costs', amount: 167507863.60, percentage: 6.1 },
  ],
  gencoCharges: [
    { genco: 'AFAM VI', charge: 125000000.00, status: 'paid' },
    { genco: 'ALAOJI NIPP', charge: 98000000.00, status: 'paid' },
    { genco: 'CALABAR NIPP', charge: 87000000.00, status: 'paid' },
    { genco: 'EGBIN', charge: 145000000.00, status: 'paid' },
    { genco: 'GEREGU', charge: 112000000.00, status: 'paid' },
    { genco: 'IBOM POWER', charge: 76000000.00, status: 'paid' },
    { genco: 'IHOVBOR NIPP', charge: 68000000.00, status: 'paid' },
    { genco: 'OKPAI', charge: 95000000.00, status: 'paid' },
    { genco: 'OMOTOSHO NIPP', charge: 82000000.00, status: 'paid' },
    { genco: 'PARAS', charge: 89000000.00, status: 'paid' },
  ],
};

export default function RegulatoryDisbursementPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('disco-charges');

  // Calculate totals
  const totalDiscoCharge = regulatoryData.discos.reduce((sum, d) => sum + d.nercCharge, 0);
  const totalDisbursed = regulatoryData.discos.reduce((sum, d) => sum + d.disbursed, 0);
  const totalAllocation = regulatoryData.nercAllocations.reduce((sum, a) => sum + a.amount, 0);
  const totalGencoCharge = regulatoryData.gencoCharges.reduce((sum, g) => sum + g.charge, 0);

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
                <Scale className="h-8 w-8 text-purple-600" />
                Regulatory Charge Disbursements
              </h1>
              <p className="text-muted-foreground">
                NERC regulatory charges and allocations - {regulatoryData.period}
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
                Total DISCO Charges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-purple-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalDiscoCharge)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">From 11 DISCOs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                GENCO Charges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalGencoCharge)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">From generators</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalDiscoCharge + totalGencoCharge)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Combined sources</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                NERC Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-purple-600" />
                <span className="text-2xl font-bold">{formatCurrency(totalAllocation)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Regulatory operations</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="disco-charges">DISCO Charges</TabsTrigger>
            <TabsTrigger value="genco-charges">GENCO Charges</TabsTrigger>
            <TabsTrigger value="nerc-allocation">NERC Allocation</TabsTrigger>
          </TabsList>

          {/* DISCO Charges Tab */}
          <TabsContent value="disco-charges" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>NERC Regulatory Charge by DISCO</CardTitle>
                <CardDescription>
                  Regulatory charges collected from DISCOs for {regulatoryData.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>DISCO</TableHead>
                        <TableHead className="text-right">NERC CHARGE (N)</TableHead>
                        <TableHead className="text-right">AMOUNT DISBURSED (N)</TableHead>
                        <TableHead className="text-right">OUTSTANDING (N)</TableHead>
                        <TableHead>STATUS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {regulatoryData.discos.map((disco) => (
                        <TableRow key={disco.code}>
                          <TableCell className="font-bold">{disco.code}</TableCell>
                          <TableCell className="text-right font-mono">{formatCurrency(disco.nercCharge)}</TableCell>
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
                        <TableCell className="text-right">{formatCurrency(totalDiscoCharge)}</TableCell>
                        <TableCell className="text-right text-green-600">{formatCurrency(totalDisbursed)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(0)}</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* NERC Charge Info */}
                <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Scale className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-1">NERC Regulatory Charge</h4>
                      <p className="text-sm text-purple-800">
                        The NERC charge funds the Nigerian Electricity Regulatory Commission's operations,
                        including market monitoring, consumer protection, standards enforcement, and regulatory oversight.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* GENCO Charges Tab */}
          <TabsContent value="genco-charges" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>GENCO Regulatory Charges</CardTitle>
                <CardDescription>
                  Regulatory charges from Generation Companies - {regulatoryData.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>GENCO</TableHead>
                        <TableHead className="text-right">REGULATORY CHARGE (N)</TableHead>
                        <TableHead>STATUS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {regulatoryData.gencoCharges.map((genco, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-semibold">{genco.genco}</TableCell>
                          <TableCell className="text-right font-mono">{formatCurrency(genco.charge)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              {genco.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell>TOTAL</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalGencoCharge)}</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* GENCO Charge Distribution */}
                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold">GENCO Charge Distribution</h4>
                  {regulatoryData.gencoCharges.map((genco, index) => {
                    const percentage = (genco.charge / totalGencoCharge) * 100;
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{genco.genco}</span>
                          <span className="font-mono">{formatCurrency(genco.charge)} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-600 transition-all"
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

          {/* NERC Allocation Tab */}
          <TabsContent value="nerc-allocation" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>NERC Fund Allocation</CardTitle>
                <CardDescription>
                  How regulatory charges are allocated across NERC operations - {regulatoryData.period}
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
                      {regulatoryData.nercAllocations.map((item, index) => (
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
                        <TableCell className="text-right">{formatCurrency(totalAllocation)}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-purple-100 text-purple-800">
                            100.0%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Allocation Breakdown Chart */}
                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold">Allocation Breakdown</h4>
                  {regulatoryData.nercAllocations.map((item, index) => (
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
                    <strong>Note:</strong> NERC regulatory charges support critical functions including market oversight,
                    consumer protection, technical standards enforcement, and the development of regulations for the electricity sector.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Revenue vs Allocation Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Collection vs Fund Allocation</CardTitle>
            <CardDescription>Comparison of regulatory charge collection and utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Revenue Collection
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-sm text-muted-foreground">DISCO Charges</div>
                    <div className="text-xl font-bold mt-1">{formatCurrency(totalDiscoCharge)}</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-muted-foreground">GENCO Charges</div>
                    <div className="text-xl font-bold mt-1">{formatCurrency(totalGencoCharge)}</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border-2 border-blue-300">
                    <div className="text-sm text-muted-foreground">Total Revenue</div>
                    <div className="text-2xl font-bold mt-1">{formatCurrency(totalDiscoCharge + totalGencoCharge)}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Scale className="h-4 w-4 text-purple-600" />
                  Top Allocations
                </h4>
                <div className="space-y-2">
                  {regulatoryData.nercAllocations.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate max-w-[180px]">{item.category}</span>
                      <span className="font-mono">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Total Allocation</span>
                      <span className="font-mono">{formatCurrency(totalAllocation)}</span>
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
