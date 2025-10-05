'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import type { LiquidityPosition, CashForecast } from '@/types';

// Mock data
const mockLiquidityPositions: LiquidityPosition[] = [
  {
    id: '1',
    date: new Date('2025-01-17'),
    totalCash: 12500000000,
    availableCash: 8200000000,
    committedCash: 4300000000,
    expectedInflows: 15600000000,
    expectedOutflows: 13800000000,
    projectedBalance: 14300000000,
    createdAt: new Date('2025-01-17'),
  },
];

const mockCashForecasts: CashForecast[] = [
  {
    id: '1',
    period: 'Week 1 - Feb 2025',
    forecastDate: new Date('2025-02-01'),
    expectedCollections: 18500000000,
    expectedDisbursements: 16200000000,
    expectedOperationalExpenses: 350000000,
    projectedBalance: 16250000000,
    confidenceLevel: 'high',
    notes: 'Based on historical trends and confirmed schedules',
    createdAt: new Date('2025-01-17'),
  },
  {
    id: '2',
    period: 'Week 2 - Feb 2025',
    forecastDate: new Date('2025-02-08'),
    expectedCollections: 17200000000,
    expectedDisbursements: 15800000000,
    expectedOperationalExpenses: 320000000,
    projectedBalance: 17330000000,
    confidenceLevel: 'high',
    notes: 'Steady collection pattern expected',
    createdAt: new Date('2025-01-17'),
  },
  {
    id: '3',
    period: 'Week 3 - Feb 2025',
    forecastDate: new Date('2025-02-15'),
    expectedCollections: 16800000000,
    expectedDisbursements: 16500000000,
    expectedOperationalExpenses: 340000000,
    projectedBalance: 17290000000,
    confidenceLevel: 'medium',
    notes: 'Some uncertainty in GenCo collections',
    createdAt: new Date('2025-01-17'),
  },
  {
    id: '4',
    period: 'Week 4 - Feb 2025',
    forecastDate: new Date('2025-02-22'),
    expectedCollections: 19100000000,
    expectedDisbursements: 17200000000,
    expectedOperationalExpenses: 380000000,
    projectedBalance: 18810000000,
    confidenceLevel: 'medium',
    notes: 'Month-end collections boost expected',
    createdAt: new Date('2025-01-17'),
  },
];

const recentTransactions = [
  { id: '1', date: new Date('2025-01-17'), description: 'Collection from Eko DisCo', type: 'inflow', amount: 4500000000 },
  { id: '2', date: new Date('2025-01-17'), description: 'Disbursement to NBET', type: 'outflow', amount: 2800000000 },
  { id: '3', date: new Date('2025-01-16'), description: 'Collection from Ikeja DisCo', type: 'inflow', amount: 3200000000 },
  { id: '4', date: new Date('2025-01-16'), description: 'Disbursement to TSP', type: 'outflow', amount: 1950000000 },
  { id: '5', date: new Date('2025-01-15'), description: 'Disbursement to Market Operator', type: 'outflow', amount: 450000000 },
];

export default function TreasuryPage() {
  const currentPosition = mockLiquidityPositions[0];
  const liquidityRatio = ((currentPosition.availableCash / currentPosition.totalCash) * 100).toFixed(1);
  const netCashFlow = currentPosition.expectedInflows - currentPosition.expectedOutflows;
  const totalInflows = recentTransactions.filter(t => t.type === 'inflow').reduce((sum, t) => sum + t.amount, 0);
  const totalOutflows = recentTransactions.filter(t => t.type === 'outflow').reduce((sum, t) => sum + t.amount, 0);

  const getConfidenceBadge = (level: string) => {
    const colors: Record<string, string> = {
      high: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[level] || colors.medium;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Treasury Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Real-time cash position and liquidity management
          </p>
        </div>

        {/* Current Position */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Total Cash
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(currentPosition.totalCash)}
              </div>
              <p className="text-xs text-gray-500 mt-1">All accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Available Cash
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(currentPosition.availableCash)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {liquidityRatio}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Committed Cash
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {formatCurrency(currentPosition.committedCash)}
              </div>
              <p className="text-xs text-gray-500 mt-1">Pending disbursements</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                {netCashFlow >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                Net Cash Flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(Math.abs(netCashFlow))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {netCashFlow >= 0 ? 'Surplus' : 'Deficit'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Expected Cash Flows */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ArrowUpRight className="h-5 w-5 text-green-600" />
                Expected Inflows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(currentPosition.expectedInflows)}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Collections from Market Participants
              </p>
              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-gray-600">Today&apos;s Inflows</div>
                <div className="text-xl font-bold text-green-600 mt-1">
                  {formatCurrency(totalInflows)}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ArrowDownRight className="h-5 w-5 text-red-600" />
                Expected Outflows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {formatCurrency(currentPosition.expectedOutflows)}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Disbursements to Service Providers
              </p>
              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-gray-600">Today&apos;s Outflows</div>
                <div className="text-xl font-bold text-red-600 mt-1">
                  {formatCurrency(totalOutflows)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="forecast">
          <TabsList>
            <TabsTrigger value="forecast">Cash Forecast</TabsTrigger>
            <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
            <TabsTrigger value="position">Position History</TabsTrigger>
          </TabsList>

          <TabsContent value="forecast" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>4-Week Cash Flow Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead className="text-right">Expected Collections</TableHead>
                      <TableHead className="text-right">Expected Disbursements</TableHead>
                      <TableHead className="text-right">Operational Expenses</TableHead>
                      <TableHead className="text-right">Net Flow</TableHead>
                      <TableHead className="text-right">Projected Balance</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCashForecasts.map((forecast) => {
                      const netFlow = forecast.expectedCollections - forecast.expectedDisbursements - forecast.expectedOperationalExpenses;
                      return (
                        <TableRow key={forecast.id}>
                          <TableCell className="font-medium">
                            {forecast.period}
                          </TableCell>
                          <TableCell className="text-right text-green-600 font-medium">
                            {formatCurrency(forecast.expectedCollections)}
                          </TableCell>
                          <TableCell className="text-right text-red-600 font-medium">
                            {formatCurrency(forecast.expectedDisbursements)}
                          </TableCell>
                          <TableCell className="text-right text-orange-600">
                            {formatCurrency(forecast.expectedOperationalExpenses)}
                          </TableCell>
                          <TableCell className={`text-right font-bold ${netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {netFlow >= 0 ? '+' : ''}{formatCurrency(netFlow)}
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            {formatCurrency(forecast.projectedBalance)}
                          </TableCell>
                          <TableCell>
                            <Badge className={getConfidenceBadge(forecast.confidenceLevel)}>
                              {forecast.confidenceLevel}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-xs text-sm text-gray-600">
                            {forecast.notes}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Cash Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell className="font-medium">
                          {transaction.description}
                        </TableCell>
                        <TableCell>
                          <Badge variant={transaction.type === 'inflow' ? 'default' : 'destructive'}>
                            {transaction.type === 'inflow' ? (
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                            )}
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell className={`text-right font-bold ${transaction.type === 'inflow' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'inflow' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="position" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Liquidity Position History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-8">
                  Historical liquidity position data will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
