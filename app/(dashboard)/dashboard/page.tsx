'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { StatCard } from '@/components/features/dashboard/stat-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  DollarSign,
  FileText,
  AlertCircle,
  TrendingUp,
  Users,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Zap,
  Activity,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Calendar,
} from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters';
import { mockDashboardStats, mockInvoices, mockDebts } from '@/server/services/mock-data';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getStatusColor } from '@/lib/utils/formatters';

export default function DashboardPage() {
  const stats = mockDashboardStats;
  const recentInvoices = mockInvoices.slice(0, 5);
  const criticalDebts = mockDebts.filter(debt => debt.status === 'overdue_90');

  // Calculate additional metrics
  const collectionEfficiency = stats.collectionRate;
  const paymentVelocity = 85.2; // Mock metric
  const disbursementProgress = 78.5; // Mock metric

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Real-time operations and financial metrics
              <span className="text-green-600 font-medium ml-2">• Live</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <Activity className="h-4 w-4 mr-2" />
              System Healthy
            </Badge>
          </div>
        </div>

        {/* Primary Stats Grid - Enhanced */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +12.5% vs last month
                  </Badge>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Outstanding Receivables</CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.outstandingReceivables)}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-blue-700 border-blue-200">
                    Pending collection
                  </Badge>
                </div>
                <Progress value={62} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Total Debt</CardTitle>
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalDebt)}</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    -5.2% reduction
                  </Badge>
                </div>
                <Progress value={35} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Collection Rate</CardTitle>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gray-900">{formatPercentage(stats.collectionRate)}</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +2.8% improvement
                  </Badge>
                </div>
                <Progress value={stats.collectionRate * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics - New Section */}
        <Card className="shadow-lg border-t-4 border-t-blue-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>Key operational indicators</CardDescription>
              </div>
              <Badge className="bg-blue-50 text-blue-700 px-4 py-2">
                <Clock className="h-4 w-4 mr-2" />
                Last updated: Just now
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Collection Efficiency</span>
                  <span className="text-2xl font-bold text-green-600">{collectionEfficiency.toFixed(1)}%</span>
                </div>
                <Progress value={collectionEfficiency * 100} className="h-3" />
                <p className="text-xs text-gray-500">Target: 85% • Current performance exceeds target</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Payment Velocity</span>
                  <span className="text-2xl font-bold text-blue-600">{paymentVelocity}%</span>
                </div>
                <Progress value={paymentVelocity} className="h-3" />
                <p className="text-xs text-gray-500">Average time from invoice to payment: 18 days</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Disbursement Progress</span>
                  <span className="text-2xl font-bold text-purple-600">{disbursementProgress}%</span>
                </div>
                <Progress value={disbursementProgress} className="h-3" />
                <p className="text-xs text-gray-500">May 2025 cycle: ₦12.16B / ₦15.79B disbursed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Secondary Stats - Enhanced Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Active Customers</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeCustomers}</p>
                  <p className="text-xs text-gray-500">11 DISCOs</p>
                </div>
                <div className="p-4 bg-purple-100 rounded-xl">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-yellow-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Pending Invoices</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.pendingInvoices}</p>
                  <p className="text-xs text-gray-500">Awaiting approval</p>
                </div>
                <div className="p-4 bg-yellow-100 rounded-xl">
                  <FileText className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-red-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Overdue Invoices</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.overdueInvoices}</p>
                  <p className="text-xs text-gray-500">Requires attention</p>
                </div>
                <div className="p-4 bg-red-100 rounded-xl">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Today&apos;s Payments</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.todayPayments}</p>
                  <p className="text-xs text-gray-500">Last 24 hours</p>
                </div>
                <div className="p-4 bg-green-100 rounded-xl">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity - Enhanced */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Invoices */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Recent Invoices
                </CardTitle>
                <Badge variant="outline" className="bg-white">
                  {recentInvoices.length} items
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {recentInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900">{invoice.invoiceNumber}</p>
                      <p className="text-xs text-gray-600 mt-1">{invoice.customerName}</p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="font-bold text-sm text-gray-900">
                        {formatCurrency(invoice.totalAmount)}
                      </p>
                      <p className="text-xs text-gray-500 capitalize mt-1">{invoice.type}</p>
                    </div>
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Critical Debts */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Critical Debts (90+ Days)
                </CardTitle>
                <Badge variant="outline" className="bg-white">
                  {criticalDebts.length} urgent
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {criticalDebts.length > 0 ? (
                  criticalDebts.map((debt) => (
                    <div
                      key={debt.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-red-100 bg-red-50/50 hover:border-red-300 transition-all cursor-pointer"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900">{debt.customerName}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Last payment: {debt.lastPaymentDate?.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-red-700">
                          {formatCurrency(debt.totalDebt)}
                        </p>
                        <p className="text-xs text-red-600 mt-1">
                          {formatCurrency(debt.overdue90)} overdue
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <div className="p-4 bg-green-100 rounded-full mb-4">
                      <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    <p className="font-medium text-gray-700">No critical debts</p>
                    <p className="text-sm text-gray-500 mt-1">All accounts are in good standing</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grid Operations Status - Enhanced */}
        <Card className="shadow-lg border-t-4 border-t-yellow-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-yellow-600" />
                  Grid Operations Status
                </CardTitle>
                <CardDescription>Real-time power grid monitoring</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">Live Data</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="relative overflow-hidden rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-700">Grid Frequency</span>
                    <Badge className="bg-green-200 text-green-800 hover:bg-green-200">
                      <Activity className="h-3 w-3 mr-1" />
                      Normal
                    </Badge>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-2">50.02 Hz</p>
                  <div className="space-y-2">
                    <Progress value={100} className="h-2 bg-green-200" />
                    <p className="text-xs text-gray-600">Target: 50.00 Hz ± 0.05 Hz</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-700">Active Power</span>
                    <Badge className="bg-blue-200 text-blue-800 hover:bg-blue-200">
                      <Zap className="h-3 w-3 mr-1" />
                      Online
                    </Badge>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-2">3,850 MW</p>
                  <div className="space-y-2">
                    <Progress value={74} className="h-2 bg-blue-200" />
                    <p className="text-xs text-gray-600">Capacity: 5,200 MW (74% utilized)</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50 p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-700">Load Factor</span>
                    <Badge className="bg-yellow-200 text-yellow-800 hover:bg-yellow-200">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Moderate
                    </Badge>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-2">74%</p>
                  <div className="space-y-2">
                    <Progress value={74} className="h-2 bg-yellow-200" />
                    <p className="text-xs text-gray-600">Peak demand: 4,500 MW expected</p>
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
