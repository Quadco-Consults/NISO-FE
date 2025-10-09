'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layouts/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Search,
  Plus,
  MoreVertical,
  Eye,
  Download,
  CheckCircle,
  Send,
  Trash2,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Building2,
  Calendar,
  ArrowLeft,
  Zap,
  Calculator,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { discoFinancialCycleService } from '@/server/services/disco-financial-cycle-service';
import { detailedDiscoStatementService } from '@/server/services/detailed-disco-statement-service';
import type { DiscoFinancialCycle, DetailedDiscoStatement } from '@/types';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils/formatters';
import Link from 'next/link';

export default function DiscoStatementsPage() {
  const router = useRouter();
  const [cycles, setCycles] = useState<DiscoFinancialCycle[]>([]);
  const [detailedStatements, setDetailedStatements] = useState<DetailedDiscoStatement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [periodFilter, setPeriodFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed'>('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [cyclesData, detailedData] = await Promise.all([
        discoFinancialCycleService.getFinancialCycles(),
        detailedDiscoStatementService.getDetailedStatements(),
      ]);
      setCycles(cyclesData);
      setDetailedStatements(detailedData);
    } catch (error) {
      toast.error('Failed to load DISCO financial data');
    } finally {
      setLoading(false);
    }
  };

  // Filter detailed statements
  const filteredDetailedStatements = detailedStatements.filter(statement => {
    const matchesSearch =
      statement.statementNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      statement.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
      statement.participantName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPeriod = periodFilter === 'all' || statement.period === periodFilter;

    return matchesSearch && matchesPeriod;
  });

  // Get unique periods for filter
  const periods = Array.from(new Set([...cycles.map(c => c.period), ...detailedStatements.map(s => s.period)]));

  // Calculate summary statistics from June 2025 cycle
  const juneCycle = cycles.find(c => c.period === 'June 2025');

  const summary = juneCycle ? {
    totalDISCOs: juneCycle.discoSummaries.length,
    grossInvoice: juneCycle.discoSummaries.reduce((sum, d) => sum + d.grossInvoice, 0),
    netInvoice: juneCycle.discoSummaries.reduce((sum, d) => sum + d.netInvoice, 0),
    totalInflow: juneCycle.discoSummaries.reduce((sum, d) => sum + d.totalInflow, 0),
    totalShortfall: juneCycle.discoSummaries.reduce((sum, d) => sum + d.shortfall, 0),
    detailedStatements: detailedStatements.length,
  } : {
    totalDISCOs: 0,
    grossInvoice: 0,
    netInvoice: 0,
    totalInflow: 0,
    totalShortfall: 0,
    detailedStatements: 0,
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
      pending_approval: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'Approved', className: 'bg-green-100 text-green-800' },
      finalized: { label: 'Finalized', className: 'bg-blue-100 text-blue-800' },
      sent: { label: 'Sent', className: 'bg-purple-100 text-purple-800' },
    };

    const config = statusConfig[status] || statusConfig.draft;
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">DISCO Financial Statements</h1>
              <p className="text-muted-foreground">
                Comprehensive market settlement and disbursement tracking for all Distribution Companies
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/disco-statements/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Cycle
                </Link>
              </Button>
            </div>
          </div>
        </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total DISCOs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-blue-600" />
              <span className="text-2xl font-bold">{summary.totalDISCOs}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gross Invoice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-2xl font-bold">{formatCurrency(summary.grossInvoice)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">June 2025</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Invoice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-purple-600" />
              <span className="text-2xl font-bold">{formatCurrency(summary.netInvoice)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">After deductions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Inflow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-teal-600" />
              <span className="text-2xl font-bold">{formatCurrency(summary.totalInflow)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Collected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Shortfall
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-2xl font-bold">{formatCurrency(summary.totalShortfall)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Outstanding</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Detailed Statements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-indigo-600" />
              <span className="text-2xl font-bold">{summary.detailedStatements}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">With 43 line items</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by statement number, period, or DISCO name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select value={periodFilter} onValueChange={setPeriodFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Periods</SelectItem>
            {periods.map(period => (
              <SelectItem key={period} value={period}>
                {period}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Detailed Statements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed DISCO Statements</CardTitle>
          <CardDescription>
            Individual monthly statements with comprehensive line-item breakdown (43 charge codes)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Statement #</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>DISCO</TableHead>
                  <TableHead>Contract ID</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Line Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Loading financial data...
                    </TableCell>
                  </TableRow>
                ) : filteredDetailedStatements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No detailed statements found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDetailedStatements.map((statement) => (
                    <TableRow key={statement.id}>
                      <TableCell className="font-medium">
                        {statement.statementNumber}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {statement.period}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{statement.participantName}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {statement.contractId}
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(statement.currentAmountDue)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {statement.chargeLineItems.length} items
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(statement.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href={`/disco-statements/${statement.id}`}>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Full Statement
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Energy Accounting
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Explanatory Notes
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* June 2025 Financial Cycle Overview - TCN Statement Format */}
      {juneCycle && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-600" />
              June 2025 Financial Cycle - Transmission Company of Nigeria (TCN)
            </CardTitle>
            <CardDescription>
              Complete market settlement statement for all 11 DISCOs • Total: {formatCurrency(summary.grossInvoice)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="energy-accounting">Table 1: Energy Accounting</TabsTrigger>
                <TabsTrigger value="invoice-derivation">Table 2: Invoice Derivation</TabsTrigger>
                <TabsTrigger value="rates">Table 3: Rates</TabsTrigger>
              </TabsList>

              {/* Summary Tab */}
              <TabsContent value="summary" className="mt-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">Code</TableHead>
                        <TableHead>DISCO</TableHead>
                        <TableHead className="text-right">Gross Invoice</TableHead>
                        <TableHead className="text-right">Net Invoice</TableHead>
                        <TableHead className="text-right">Total Inflow</TableHead>
                        <TableHead className="text-right">Shortfall</TableHead>
                        <TableHead className="text-right">Collection %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {juneCycle.discoSummaries.map((disco, index) => {
                        const collectionRate = disco.totalInvoice > 0
                          ? ((disco.totalInflow / disco.totalInvoice) * 100).toFixed(1)
                          : '0.0';
                        const discoCode = String.fromCharCode(65 + index); // A, B, C, etc.

                        return (
                          <TableRow key={disco.discoId}>
                            <TableCell className="font-bold text-purple-600">{discoCode}</TableCell>
                            <TableCell className="font-medium">{disco.discoName}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(disco.grossInvoice)}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(disco.netInvoice)}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(disco.totalInflow)}</TableCell>
                            <TableCell className={`text-right font-mono ${disco.shortfall > 0 ? 'text-red-600 font-semibold' : 'text-green-600'}`}>
                              {formatCurrency(disco.shortfall)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge variant={Number(collectionRate) >= 80 ? 'default' : 'destructive'}>
                                {collectionRate}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell></TableCell>
                        <TableCell>TOTAL</TableCell>
                        <TableCell className="text-right">{formatCurrency(summary.grossInvoice)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(summary.netInvoice)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(summary.totalInflow)}</TableCell>
                        <TableCell className="text-right text-red-600">{formatCurrency(summary.totalShortfall)}</TableCell>
                        <TableCell className="text-right">
                          <Badge>
                            {summary.grossInvoice > 0 ? ((summary.totalInflow / summary.grossInvoice) * 100).toFixed(1) : '0.0'}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Zungeru Energy Credit */}
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-900">Zungeru Energy Credit (Naira)</span>
                    </div>
                    <span className="text-xl font-bold text-green-700">{formatCurrency(925660566)}</span>
                  </div>
                </div>
              </TabsContent>

              {/* Table 1: Contract Energy Accounting (KWh Level) */}
              <TabsContent value="energy-accounting" className="mt-4">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">Code</TableHead>
                        <TableHead>DISCO</TableHead>
                        <TableHead className="text-right">Meter Reading<br/>Billing (kWh)</TableHead>
                        <TableHead className="text-right">MYTO Excess<br/>Adjustment</TableHead>
                        <TableHead className="text-right">SERDEF<br/>(kWh)</TableHead>
                        <TableHead className="text-right bg-orange-50">TCN SERDEF<br/>(kWh)</TableHead>
                        <TableHead className="text-right bg-yellow-50">Transmission<br/>Factor Billed or<br/>Loss Factor (7%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {juneCycle.discoSummaries.map((disco, index) => {
                        const discoCode = String.fromCharCode(65 + index);
                        // Mock data for energy accounting - in real app, this would come from the service
                        const meterReading = (disco.grossInvoice / 45).toFixed(0); // Rough kWh estimate

                        return (
                          <TableRow key={disco.discoId}>
                            <TableCell className="font-bold text-purple-600">{discoCode}</TableCell>
                            <TableCell className="font-medium">{disco.discoName}</TableCell>
                            <TableCell className="text-right font-mono">{Number(meterReading).toLocaleString()}</TableCell>
                            <TableCell className="text-right font-mono">-</TableCell>
                            <TableCell className="text-right font-mono">-</TableCell>
                            <TableCell className="text-right font-mono bg-orange-50">-</TableCell>
                            <TableCell className="text-right font-mono bg-yellow-50">-</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  * MYTO = Multi-Year Tariff Order | SERDEF = Service Deficiency
                </p>
              </TabsContent>

              {/* Table 2: Invoice Derivation */}
              <TabsContent value="invoice-derivation" className="mt-4">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">Code</TableHead>
                        <TableHead>DISCO</TableHead>
                        <TableHead className="text-right">Meter Reading<br/>Billing (Naira)</TableHead>
                        <TableHead className="text-right">Contract Excess<br/>Adjustment (Naira)</TableHead>
                        <TableHead className="text-right bg-blue-50">Loss of Revenue<br/>Compensation:<br/>TCN to DisCo</TableHead>
                        <TableHead className="text-right bg-orange-50">Loss of Revenue<br/>Compensation:<br/>TCN to Service<br/>Providers (Due)</TableHead>
                        <TableHead className="text-right bg-yellow-50">Transmission<br/>Loss Factor (7%)<br/>Compensation</TableHead>
                        <TableHead className="text-right bg-purple-50">Genco Interface<br/>Liquidated<br/>Damages to<br/>NBET</TableHead>
                        <TableHead className="text-right">Readers Market<br/>Indebtedness<br/>(Naira)</TableHead>
                        <TableHead className="text-right font-semibold">Total (Naira)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {juneCycle.discoSummaries.map((disco, index) => {
                        const discoCode = String.fromCharCode(65 + index);

                        return (
                          <TableRow key={disco.discoId}>
                            <TableCell className="font-bold text-purple-600">{discoCode}</TableCell>
                            <TableCell className="font-medium">{disco.discoName}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(disco.grossInvoice * 0.85)}</TableCell>
                            <TableCell className="text-right font-mono">-</TableCell>
                            <TableCell className="text-right font-mono bg-blue-50">-</TableCell>
                            <TableCell className="text-right font-mono bg-orange-50">-</TableCell>
                            <TableCell className="text-right font-mono bg-yellow-50">-</TableCell>
                            <TableCell className="text-right font-mono bg-purple-50">-</TableCell>
                            <TableCell className="text-right font-mono">-</TableCell>
                            <TableCell className="text-right font-mono font-semibold">{formatCurrency(disco.grossInvoice)}</TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell></TableCell>
                        <TableCell>TOTAL</TableCell>
                        <TableCell className="text-right">{formatCurrency(summary.grossInvoice * 0.85)}</TableCell>
                        <TableCell className="text-right">-</TableCell>
                        <TableCell className="text-right bg-blue-50">-</TableCell>
                        <TableCell className="text-right bg-orange-50">-</TableCell>
                        <TableCell className="text-right bg-yellow-50">-</TableCell>
                        <TableCell className="text-right bg-purple-50">-</TableCell>
                        <TableCell className="text-right">-</TableCell>
                        <TableCell className="text-right">{formatCurrency(summary.grossInvoice)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Table 3: Rates Used */}
              <TabsContent value="rates" className="mt-4">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">Code</TableHead>
                        <TableHead>DISCO</TableHead>
                        <TableHead className="text-right">Meter Reading<br/>Billing (Naira)</TableHead>
                        <TableHead className="text-right">MYTO Excess<br/>Adjustment</TableHead>
                        <TableHead className="text-right">Loss of Revenue<br/>Compensation:<br/>DisCo to TSP</TableHead>
                        <TableHead className="text-right bg-orange-50">Loss of Revenue<br/>Compensation:<br/>TCN to Service<br/>Providers (Due)</TableHead>
                        <TableHead className="text-right bg-yellow-50">Transmission<br/>Loss Factor<br/>Compensation</TableHead>
                        <TableHead className="text-right">Genco Interface<br/>Liquidated<br/>Damages to NBET</TableHead>
                        <TableHead className="text-right">Total (Naira)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {juneCycle.discoSummaries.map((disco, index) => {
                        const discoCode = String.fromCharCode(65 + index);

                        return (
                          <TableRow key={disco.discoId}>
                            <TableCell className="font-bold text-purple-600">{discoCode}</TableCell>
                            <TableCell className="font-medium">{disco.discoName}</TableCell>
                            <TableCell className="text-right font-mono">6.46</TableCell>
                            <TableCell className="text-right font-mono">-</TableCell>
                            <TableCell className="text-right font-mono">6.46</TableCell>
                            <TableCell className="text-right font-mono bg-orange-50">(112.87)</TableCell>
                            <TableCell className="text-right font-mono bg-yellow-50">112.87</TableCell>
                            <TableCell className="text-right font-mono">-</TableCell>
                            <TableCell className="text-right font-mono">6.46</TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell></TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell className="text-right">6.46</TableCell>
                        <TableCell className="text-right">-</TableCell>
                        <TableCell className="text-right">6.46</TableCell>
                        <TableCell className="text-right bg-orange-50">(58.53)</TableCell>
                        <TableCell className="text-right bg-yellow-50">112.87</TableCell>
                        <TableCell className="text-right">-</TableCell>
                        <TableCell className="text-right">6.46</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  * All rates are in Naira per kWh
                </p>
              </TabsContent>
            </Tabs>

            {/* Explanatory Notes Section */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Explanatory Notes to Invoice
              </h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• TSP, MO, SO, AS, NBET and Regulatory Charges determined in line with Table 1 (Transmission and Admin Charges Feb - Dec 2024)</p>
                <p>• Section 8 & 9 of NERC/AS/001I provides that Naira amount of TLF GainLoss shall be based on Average Cost of Generation</p>
                <p>• Table 1 in Explanatory Section gives measure of Energy at what the Disco was unable to take in kWh</p>
                <p>• MYTO Allocation = Metered Energy - Excess kWh intake + Disco Deficit + Disco Excess</p>
                <p className="font-semibold mt-2">View full statement for complete 18-point explanatory notes with NERC references</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </MainLayout>
  );
}
