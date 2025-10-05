'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, RefreshCw, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { formatCurrency, getStatusColor } from '@/lib/utils/formatters';
import type { Reconciliation, ReconciliationStatus } from '@/types';

const mockReconciliations: Reconciliation[] = [
  {
    id: '1',
    reconciliationNumber: 'REC-2025-001',
    accountId: '1',
    accountName: 'NISO Collections Account',
    period: 'January 2025',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-16'),
    openingBalance: 7500000000,
    closingBalance: 8200000000,
    bankBalance: 8200000000,
    variance: 0,
    totalMatched: 15600000000,
    totalUnmatched: 0,
    status: 'completed' as ReconciliationStatus,
    reconciledBy: 'Finance Manager',
    reconciledAt: new Date('2025-01-16'),
    createdAt: new Date('2025-01-16'),
    updatedAt: new Date('2025-01-16'),
  },
  {
    id: '2',
    reconciliationNumber: 'REC-2025-002',
    accountId: '2',
    accountName: 'NISO Disbursement Account',
    period: 'January 2025',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-16'),
    openingBalance: 5200000000,
    closingBalance: 4300000000,
    bankBalance: 4280000000,
    variance: 20000000,
    totalMatched: 13400000000,
    totalUnmatched: 20000000,
    status: 'in_progress' as ReconciliationStatus,
    createdAt: new Date('2025-01-16'),
    updatedAt: new Date('2025-01-17'),
  },
  {
    id: '3',
    reconciliationNumber: 'REC-2024-012',
    accountId: '1',
    accountName: 'NISO Collections Account',
    period: 'December 2024',
    startDate: new Date('2024-12-01'),
    endDate: new Date('2024-12-31'),
    openingBalance: 6800000000,
    closingBalance: 7500000000,
    bankBalance: 7500000000,
    variance: 0,
    totalMatched: 18200000000,
    totalUnmatched: 0,
    status: 'completed' as ReconciliationStatus,
    reconciledBy: 'Finance Manager',
    reconciledAt: new Date('2025-01-02'),
    createdAt: new Date('2024-12-31'),
    updatedAt: new Date('2025-01-02'),
  },
];

export default function ReconciliationPage() {
  const totalVariance = mockReconciliations.reduce((sum, r) => sum + Math.abs(r.variance), 0);
  const completedCount = mockReconciliations.filter(r => r.status === 'completed').length;
  const pendingCount = mockReconciliations.filter(r => r.status === 'pending' || r.status === 'in_progress').length;

  const getVarianceColor = (variance: number) => {
    if (variance === 0) return 'text-green-600';
    if (Math.abs(variance) < 50000000) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'disputed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'in_progress':
        return <RefreshCw className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bank Reconciliation</h1>
            <p className="text-gray-500 mt-1">
              Automated reconciliation of bank statements with system records
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Auto-Match
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Reconciliation
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Reconciliations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockReconciliations.length}</div>
              <p className="text-xs text-gray-500 mt-1">All periods</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <p className="text-xs text-gray-500 mt-1">
                {((completedCount / mockReconciliations.length) * 100).toFixed(0)}% success rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{pendingCount}</div>
              <p className="text-xs text-gray-500 mt-1">Pending completion</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Total Variance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalVariance === 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(totalVariance)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {totalVariance === 0 ? 'All matched' : 'Needs review'}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reconciliation Runs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reconciliation #</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-right">Opening Balance</TableHead>
                  <TableHead className="text-right">Closing Balance</TableHead>
                  <TableHead className="text-right">Bank Balance</TableHead>
                  <TableHead className="text-right">Variance</TableHead>
                  <TableHead className="text-right">Matched</TableHead>
                  <TableHead className="text-right">Unmatched</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reconciled By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReconciliations.map((rec) => (
                  <TableRow key={rec.id}>
                    <TableCell className="font-medium">
                      {rec.reconciliationNumber}
                    </TableCell>
                    <TableCell>{rec.accountName}</TableCell>
                    <TableCell>{rec.period}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(rec.openingBalance)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(rec.closingBalance)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(rec.bankBalance)}
                    </TableCell>
                    <TableCell className={`text-right font-bold ${getVarianceColor(rec.variance)}`}>
                      {rec.variance === 0 ? (
                        <span className="flex items-center justify-end gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Matched
                        </span>
                      ) : (
                        formatCurrency(Math.abs(rec.variance))
                      )}
                    </TableCell>
                    <TableCell className="text-right text-green-600">
                      {formatCurrency(rec.totalMatched)}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      {formatCurrency(rec.totalUnmatched)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(rec.status)}
                        <Badge className={getStatusColor(rec.status)}>
                          {rec.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {rec.reconciledBy || 'Pending'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
