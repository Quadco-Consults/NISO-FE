'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { StatCard } from '@/components/features/dashboard/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DollarSign,
  FileText,
  AlertCircle,
  TrendingUp,
  Users,
  CreditCard,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters';
import { mockDashboardStats, mockInvoices, mockDebts } from '@/server/services/mock-data';
import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/lib/utils/formatters';

export default function DashboardPage() {
  const stats = mockDashboardStats;
  const recentInvoices = mockInvoices.slice(0, 5);
  const criticalDebts = mockDebts.filter(debt => debt.status === 'overdue_90');

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Overview of your operations and financial metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={DollarSign}
            iconColor="text-green-600"
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Outstanding Receivables"
            value={formatCurrency(stats.outstandingReceivables)}
            icon={FileText}
            iconColor="text-blue-600"
            description="Pending collection"
          />
          <StatCard
            title="Total Debt"
            value={formatCurrency(stats.totalDebt)}
            icon={AlertCircle}
            iconColor="text-red-600"
            trend={{ value: 5.2, isPositive: false }}
          />
          <StatCard
            title="Collection Rate"
            value={formatPercentage(stats.collectionRate)}
            icon={TrendingUp}
            iconColor="text-green-600"
            trend={{ value: 2.8, isPositive: true }}
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Customers"
            value={stats.activeCustomers}
            icon={Users}
            iconColor="text-purple-600"
          />
          <StatCard
            title="Pending Invoices"
            value={stats.pendingInvoices}
            icon={FileText}
            iconColor="text-yellow-600"
          />
          <StatCard
            title="Overdue Invoices"
            value={stats.overdueInvoices}
            icon={AlertTriangle}
            iconColor="text-red-600"
          />
          <StatCard
            title="Today's Payments"
            value={stats.todayPayments}
            icon={CreditCard}
            iconColor="text-green-600"
          />
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Invoices */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{invoice.invoiceNumber}</p>
                      <p className="text-xs text-gray-500">{invoice.customerName}</p>
                    </div>
                    <div className="text-right mr-3">
                      <p className="font-medium text-sm">
                        {formatCurrency(invoice.totalAmount)}
                      </p>
                      <p className="text-xs text-gray-500">{invoice.type}</p>
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Critical Debts (90+ Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalDebts.length > 0 ? (
                  criticalDebts.map((debt) => (
                    <div
                      key={debt.id}
                      className="flex items-center justify-between border-b pb-3 last:border-0"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{debt.customerName}</p>
                        <p className="text-xs text-gray-500">
                          Last payment: {debt.lastPaymentDate?.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm text-red-600">
                          {formatCurrency(debt.totalDebt)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatCurrency(debt.overdue90)} overdue
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <CheckCircle className="h-12 w-12 mb-2 text-green-500" />
                    <p>No critical debts</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grid Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Grid Operations Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Frequency</span>
                  <Badge className="bg-green-100 text-green-800">Normal</Badge>
                </div>
                <p className="text-2xl font-bold mt-2">50.02 Hz</p>
                <p className="text-xs text-gray-500 mt-1">Target: 50.00 Hz</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Power</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <p className="text-2xl font-bold mt-2">3,850 MW</p>
                <p className="text-xs text-gray-500 mt-1">Capacity: 5,200 MW</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Load Factor</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Moderate</Badge>
                </div>
                <p className="text-2xl font-bold mt-2">74%</p>
                <p className="text-xs text-gray-500 mt-1">Peak: 4,500 MW</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
