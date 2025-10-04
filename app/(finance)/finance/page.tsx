'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { mockAccountsReceivable } from '@/server/services/mock-data';
import { formatCurrency } from '@/lib/utils/formatters';
import { StatCard } from '@/components/features/dashboard/stat-card';

export default function FinancePage() {
  const totalInvoiced = mockAccountsReceivable.reduce(
    (sum, ar) => sum + ar.totalInvoiced,
    0
  );
  const totalPaid = mockAccountsReceivable.reduce((sum, ar) => sum + ar.totalPaid, 0);
  const totalOutstanding = mockAccountsReceivable.reduce(
    (sum, ar) => sum + ar.outstanding,
    0
  );
  const collectionRate = (totalPaid / totalInvoiced) * 100;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Management</h1>
          <p className="text-gray-500 mt-1">
            Financial overview and accounts receivable
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Total Invoiced"
            value={formatCurrency(totalInvoiced)}
            icon={DollarSign}
            iconColor="text-blue-600"
          />
          <StatCard
            title="Total Collected"
            value={formatCurrency(totalPaid)}
            icon={TrendingUp}
            iconColor="text-green-600"
          />
          <StatCard
            title="Outstanding AR"
            value={formatCurrency(totalOutstanding)}
            icon={TrendingDown}
            iconColor="text-red-600"
          />
          <StatCard
            title="Collection Rate"
            value={`${collectionRate.toFixed(1)}%`}
            icon={PieChart}
            iconColor="text-purple-600"
          />
        </div>

        {/* Accounts Receivable Aging */}
        <Card>
          <CardHeader>
            <CardTitle>Accounts Receivable Aging</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Total Invoiced</TableHead>
                  <TableHead className="text-right">Total Paid</TableHead>
                  <TableHead className="text-right">Outstanding</TableHead>
                  <TableHead className="text-right">Current</TableHead>
                  <TableHead className="text-right">30 Days</TableHead>
                  <TableHead className="text-right">60 Days</TableHead>
                  <TableHead className="text-right">90+ Days</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAccountsReceivable.map((ar) => (
                  <TableRow key={ar.id}>
                    <TableCell className="font-medium">{ar.customerName}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(ar.totalInvoiced)}
                    </TableCell>
                    <TableCell className="text-right text-green-600">
                      {formatCurrency(ar.totalPaid)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(ar.outstanding)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(ar.current)}
                    </TableCell>
                    <TableCell className="text-right text-yellow-600">
                      {formatCurrency(ar.overdue30)}
                    </TableCell>
                    <TableCell className="text-right text-orange-600">
                      {formatCurrency(ar.overdue60)}
                    </TableCell>
                    <TableCell className="text-right text-red-600 font-medium">
                      {formatCurrency(ar.overdue90)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold bg-gray-50">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(totalInvoiced)}
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    {formatCurrency(totalPaid)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(totalOutstanding)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(
                      mockAccountsReceivable.reduce((sum, ar) => sum + ar.current, 0)
                    )}
                  </TableCell>
                  <TableCell className="text-right text-yellow-600">
                    {formatCurrency(
                      mockAccountsReceivable.reduce((sum, ar) => sum + ar.overdue30, 0)
                    )}
                  </TableCell>
                  <TableCell className="text-right text-orange-600">
                    {formatCurrency(
                      mockAccountsReceivable.reduce((sum, ar) => sum + ar.overdue60, 0)
                    )}
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    {formatCurrency(
                      mockAccountsReceivable.reduce((sum, ar) => sum + ar.overdue90, 0)
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Cash Flow Summary */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Energy Charges</span>
                  <span className="font-medium">{formatCurrency(7500000000)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Transmission Charges</span>
                  <span className="font-medium">{formatCurrency(3200000000)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ancillary Services</span>
                  <span className="font-medium">{formatCurrency(1800000000)}</span>
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="font-medium">Total Revenue</span>
                  <span className="font-bold text-lg">
                    {formatCurrency(12500000000)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collection Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Collection Rate</span>
                  <span className="font-medium text-green-600">
                    {collectionRate.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">DSO (Days Sales Outstanding)</span>
                  <span className="font-medium">45 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Bad Debt Provision</span>
                  <span className="font-medium text-red-600">
                    {formatCurrency(125000000)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="font-medium">Net Collectible</span>
                  <span className="font-bold text-lg">
                    {formatCurrency(totalOutstanding - 125000000)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
