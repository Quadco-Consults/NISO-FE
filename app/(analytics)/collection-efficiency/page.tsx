'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layouts/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Target,
} from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters';

// Mock data - Collection Efficiency Report for May 2025
const collectionEfficiencyData = {
  period: 'May 2025',
  overallMetrics: {
    totalInvoiced: 15794242138.04,
    totalCollected: 12156506437.40,
    overallCollectionRate: 0.7697, // 76.97%
    totalShortfall: 3637735700.64,
  },

  // DISCO Performance (sorted by collection rate) - Top 5 DISCOs
  discoPerformance: [
    {
      discoCode: 'IKEJA',
      discoName: 'Ikeja Electric',
      invoiced: 2606852508.16,
      collected: 2264546540.00,
      collectionRate: 0.8687,
      shortfall: 342305968.16,
      trend: 'improving' as const,
      previousRate: 0.8234,
    },
    {
      discoCode: 'EKO',
      discoName: 'Eko Electricity',
      invoiced: 2262059674.62,
      collected: 1946370423.00,
      collectionRate: 0.8604,
      shortfall: 315689251.62,
      trend: 'stable' as const,
      previousRate: 0.8591,
    },
    {
      discoCode: 'ABUJA',
      discoName: 'Abuja Electricity',
      invoiced: 2322212540.70,
      collected: 1976854560.00,
      collectionRate: 0.8513,
      shortfall: 345357980.70,
      trend: 'improving' as const,
      previousRate: 0.8102,
    },
    {
      discoCode: 'IBADAN',
      discoName: 'Ibadan Electricity',
      invoiced: 1897735233.86,
      collected: 1534670892.00,
      collectionRate: 0.8087,
      shortfall: 363064341.86,
      trend: 'declining' as const,
      previousRate: 0.8456,
    },
    {
      discoCode: 'BENIN',
      discoName: 'Benin Electricity',
      invoiced: 1593119505.77,
      collected: 1254129877.00,
      collectionRate: 0.7872,
      shortfall: 338989628.77,
      trend: 'stable' as const,
      previousRate: 0.7834,
    },
  ],

  // Service Provider Impact
  serviceProviderImpact: [
    {
      provider: 'ANCILLARY SERV.',
      expectedAmount: 952343843.12,
      actualAmount: 732903676.24,
      shortfall: 219440166.88,
      shortfallPercentage: 23.03,
      priority: 1,
    },
    {
      provider: 'NERC',
      expectedAmount: 2343675432.10,
      actualAmount: 1804227397.43,
      shortfall: 539448034.67,
      shortfallPercentage: 23.01,
      priority: 2,
    },
    {
      provider: 'TSP',
      expectedAmount: 3871234567.89,
      actualAmount: 2979586734.21,
      shortfall: 891647833.68,
      shortfallPercentage: 23.03,
      priority: 3,
    },
    {
      provider: 'NISO',
      expectedAmount: 2156789432.45,
      actualAmount: 1660345678.90,
      shortfall: 496443753.55,
      shortfallPercentage: 23.01,
      priority: 4,
    },
    {
      provider: 'MO',
      expectedAmount: 1789234567.12,
      actualAmount: 1376845632.45,
      shortfall: 412388934.67,
      shortfallPercentage: 23.05,
      priority: 5,
    },
    {
      provider: 'SO',
      expectedAmount: 1456789012.34,
      actualAmount: 1121234567.89,
      shortfall: 335554444.45,
      shortfallPercentage: 23.03,
      priority: 6,
    },
    {
      provider: 'NBET',
      expectedAmount: 2089234567.89,
      actualAmount: 1608234567.12,
      shortfall: 481000000.77,
      shortfallPercentage: 23.02,
      priority: 7,
    },
    {
      provider: 'TIF',
      expectedAmount: 1134940717.13,
      actualAmount: 873128383.16,
      shortfall: 261812333.97,
      shortfallPercentage: 23.07,
      priority: 8,
    },
  ],

  // Historical Trend (Last 6 months)
  collectionTrend: [
    { period: 'Dec 2024', collectionRate: 72.34, totalCollected: 11345678900.00 },
    { period: 'Jan 2025', collectionRate: 73.67, totalCollected: 11567890123.00 },
    { period: 'Feb 2025', collectionRate: 75.12, totalCollected: 11789012345.00 },
    { period: 'Mar 2025', collectionRate: 74.89, totalCollected: 11890123456.00 },
    { period: 'Apr 2025', collectionRate: 76.23, totalCollected: 12034567890.00 },
    { period: 'May 2025', collectionRate: 76.97, totalCollected: 12156506437.40 },
  ],
};

export default function CollectionEfficiencyPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const topPerformers = collectionEfficiencyData.discoPerformance
    .filter(d => d.collectionRate >= 0.85)
    .map(d => d.discoCode);

  const underperformers = collectionEfficiencyData.discoPerformance
    .filter(d => d.collectionRate < 0.75)
    .map(d => d.discoCode);

  const getTrendIcon = (trend: 'improving' | 'declining' | 'stable') => {
    if (trend === 'improving') return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === 'declining') return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Clock className="h-4 w-4 text-yellow-600" />;
  };

  const getTrendBadge = (trend: 'improving' | 'declining' | 'stable') => {
    if (trend === 'improving') return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Improving</Badge>;
    if (trend === 'declining') return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Declining</Badge>;
    return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Stable</Badge>;
  };

  const getPerformanceColor = (rate: number) => {
    if (rate >= 0.85) return 'text-green-600';
    if (rate >= 0.75) return 'text-yellow-600';
    return 'text-red-600';
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
          <div className="flex-1 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                Collection Efficiency Dashboard
              </h1>
              <p className="text-muted-foreground">
                DISCO payment performance and service provider impact analysis - {collectionEfficiencyData.period}
              </p>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overall Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Invoiced
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <span className="text-2xl font-bold">
                  {formatCurrency(collectionEfficiencyData.overallMetrics.totalInvoiced)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">All DISCOs combined</p>
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
                <span className="text-2xl font-bold">
                  {formatCurrency(collectionEfficiencyData.overallMetrics.totalCollected)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Actual payments received</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Collection Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-600" />
                <span className="text-2xl font-bold">
                  {formatPercentage(collectionEfficiencyData.overallMetrics.overallCollectionRate)}
                </span>
              </div>
              <Progress
                value={collectionEfficiencyData.overallMetrics.overallCollectionRate * 100}
                className="mt-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Shortfall
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-2xl font-bold">
                  {formatCurrency(collectionEfficiencyData.overallMetrics.totalShortfall)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Unpaid amounts</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Top Performers (&ge; 85%)
              </CardTitle>
              <CardDescription>DISCOs with excellent collection rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {collectionEfficiencyData.discoPerformance
                  .filter(d => d.collectionRate >= 0.85)
                  .map((disco) => (
                    <div key={disco.discoCode} className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                          {disco.discoCode}
                        </Badge>
                        <span className="text-sm font-medium">{disco.discoName}</span>
                      </div>
                      <span className="text-sm font-bold text-green-700">
                        {formatPercentage(disco.collectionRate)}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Underperformers (&lt; 75%)
              </CardTitle>
              <CardDescription>DISCOs requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {collectionEfficiencyData.discoPerformance
                  .filter(d => d.collectionRate < 0.75)
                  .map((disco) => (
                    <div key={disco.discoCode} className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                          {disco.discoCode}
                        </Badge>
                        <span className="text-sm font-medium">{disco.discoName}</span>
                      </div>
                      <span className="text-sm font-bold text-red-700">
                        {formatPercentage(disco.collectionRate)}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">DISCO Performance</TabsTrigger>
            <TabsTrigger value="service-providers">Service Provider Impact</TabsTrigger>
            <TabsTrigger value="trends">Historical Trends</TabsTrigger>
          </TabsList>

          {/* DISCO Performance Tab */}
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>DISCO Collection Performance</CardTitle>
                <CardDescription>
                  Detailed breakdown of collection rates by DISCO for {collectionEfficiencyData.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>DISCO</TableHead>
                        <TableHead className="text-right">Invoiced</TableHead>
                        <TableHead className="text-right">Collected</TableHead>
                        <TableHead className="text-right">Collection Rate</TableHead>
                        <TableHead className="text-right">Shortfall</TableHead>
                        <TableHead>Trend</TableHead>
                        <TableHead className="text-right">Previous Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {collectionEfficiencyData.discoPerformance.map((disco) => (
                        <TableRow key={disco.discoCode}>
                          <TableCell>
                            <div>
                              <div className="font-bold">{disco.discoCode}</div>
                              <div className="text-xs text-muted-foreground">{disco.discoName}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {formatCurrency(disco.invoiced)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-green-700">
                            {formatCurrency(disco.collected)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="space-y-1">
                              <div className={`font-bold ${getPerformanceColor(disco.collectionRate)}`}>
                                {formatPercentage(disco.collectionRate)}
                              </div>
                              <Progress value={disco.collectionRate * 100} className="h-1" />
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-mono text-red-700">
                            {formatCurrency(disco.shortfall)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTrendIcon(disco.trend)}
                              {getTrendBadge(disco.trend)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {formatPercentage(disco.previousRate)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell>TOTAL</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(collectionEfficiencyData.overallMetrics.totalInvoiced)}
                        </TableCell>
                        <TableCell className="text-right text-green-700">
                          {formatCurrency(collectionEfficiencyData.overallMetrics.totalCollected)}
                        </TableCell>
                        <TableCell className="text-right text-purple-700">
                          {formatPercentage(collectionEfficiencyData.overallMetrics.overallCollectionRate)}
                        </TableCell>
                        <TableCell className="text-right text-red-700">
                          {formatCurrency(collectionEfficiencyData.overallMetrics.totalShortfall)}
                        </TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Performance Notes */}
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Performance Insights</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <strong>Top 3 performers:</strong> IKEJA (86.87%), EKO (86.04%), ABUJA (85.13%)</li>
                    <li>• <strong>Lowest performer:</strong> BENIN (78.72%)</li>
                    <li>• <strong>Improving DISCOs:</strong> {collectionEfficiencyData.discoPerformance.filter(d => d.trend === 'improving').length} DISCOs showing upward trend</li>
                    <li>• <strong>Declining DISCOs:</strong> {collectionEfficiencyData.discoPerformance.filter(d => d.trend === 'declining').length} DISCO requires intervention</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Provider Impact Tab */}
          <TabsContent value="service-providers" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Provider Shortfall Impact</CardTitle>
                <CardDescription>
                  How collection shortfalls affect service provider payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service Provider</TableHead>
                        <TableHead className="text-right">Priority</TableHead>
                        <TableHead className="text-right">Expected Amount</TableHead>
                        <TableHead className="text-right">Actual Received</TableHead>
                        <TableHead className="text-right">Shortfall</TableHead>
                        <TableHead className="text-right">Shortfall %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {collectionEfficiencyData.serviceProviderImpact.map((sp) => (
                        <TableRow key={sp.provider}>
                          <TableCell className="font-semibold">{sp.provider}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                              P{sp.priority}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {formatCurrency(sp.expectedAmount)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-green-700">
                            {formatCurrency(sp.actualAmount)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-red-700">
                            {formatCurrency(sp.shortfall)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              {sp.shortfallPercentage.toFixed(2)}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Impact Notes */}
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Pro-Rata Distribution Impact</h4>
                  <p className="text-sm text-yellow-800">
                    With a 76.97% overall collection rate, all service providers are receiving approximately
                    77% of their expected amounts. The shortfall is distributed pro-rata across all providers,
                    maintaining fair allocation. Consider implementing priority waterfall or hybrid allocation
                    to protect critical service providers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Historical Trends Tab */}
          <TabsContent value="trends" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Collection Rate Trends</CardTitle>
                <CardDescription>6-month historical performance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Period</TableHead>
                        <TableHead className="text-right">Collection Rate</TableHead>
                        <TableHead className="text-right">Total Collected</TableHead>
                        <TableHead className="text-right">Change from Previous</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {collectionEfficiencyData.collectionTrend.map((trend, index) => {
                        const previousRate = index > 0
                          ? collectionEfficiencyData.collectionTrend[index - 1].collectionRate
                          : trend.collectionRate;
                        const change = trend.collectionRate - previousRate;
                        const isPositive = change > 0;

                        return (
                          <TableRow key={trend.period}>
                            <TableCell className="font-semibold">{trend.period}</TableCell>
                            <TableCell className="text-right">
                              <div className="space-y-1">
                                <div className="font-bold">{trend.collectionRate.toFixed(2)}%</div>
                                <Progress value={trend.collectionRate} className="h-1" />
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-mono">
                              {formatCurrency(trend.totalCollected)}
                            </TableCell>
                            <TableCell className="text-right">
                              {index > 0 ? (
                                <div className="flex items-center justify-end gap-1">
                                  {isPositive ? (
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                  ) : change < 0 ? (
                                    <TrendingDown className="h-4 w-4 text-red-600" />
                                  ) : (
                                    <Clock className="h-4 w-4 text-gray-600" />
                                  )}
                                  <span className={isPositive ? 'text-green-700' : change < 0 ? 'text-red-700' : 'text-gray-700'}>
                                    {change > 0 ? '+' : ''}{change.toFixed(2)}%
                                  </span>
                                </div>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* Trend Analysis */}
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Positive Trend
                    </h4>
                    <p className="text-sm text-green-800">
                      Collection rate has improved by <strong>4.63 percentage points</strong> over the last 6 months
                      (from 72.34% in Dec 2024 to 76.97% in May 2025). This represents a <strong>6.4% improvement</strong>
                      in collection efficiency.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Target Analysis
                    </h4>
                    <p className="text-sm text-blue-800">
                      To reach <strong>85% collection rate target</strong>, need to improve by <strong>8.03 percentage points</strong>.
                      At current improvement rate (+0.77% per month), target could be achieved in approximately
                      <strong> 10-11 months</strong>.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recommendations Card */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Actions</CardTitle>
            <CardDescription>Strategic recommendations to improve collection efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-yellow-900">Monitor Performance</h5>
                  <p className="text-sm text-yellow-800">
                    BENIN (78.72%) is the lowest performer among the selected DISCOs. Continue monitoring
                    collection efforts and consider targeted interventions to improve performance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Target className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-yellow-900">Implement Hybrid Allocation Method</h5>
                  <p className="text-sm text-yellow-800">
                    Protect critical service providers (ANCILLARY SERV., NERC) with 100% and 90% allocation priorities
                    to ensure grid stability and regulatory compliance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-green-900">Learn from Top Performers</h5>
                  <p className="text-sm text-green-800">
                    Study collection practices from IKEJA, EKO, and ABUJA (85%+ rates). Replicate successful
                    strategies across underperforming DISCOs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-blue-900">Monitor Declining Trends</h5>
                  <p className="text-sm text-blue-800">
                    IBADAN shows a declining trend despite strong performance. Conduct root cause analysis
                    and implement corrective measures to maintain collection efficiency.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
