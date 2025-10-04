'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, RefreshCw, Download } from 'lucide-react';
import { mockSettlements } from '@/server/services/mock-data';
import { formatCurrency, formatDate, formatEnergy, getStatusColor } from '@/lib/utils/formatters';

export default function SettlementPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Settlement & Reconciliation
            </h1>
            <p className="text-gray-500 mt-1">
              Manage energy settlements and reconciliation runs
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Run Settlement
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Settlement
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Settlements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockSettlements.length}</div>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Settlement Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(
                  mockSettlements.reduce((sum, s) => sum + s.totalAmount, 0)
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">All periods</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Imbalance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatEnergy(
                  Math.abs(
                    mockSettlements.reduce((sum, s) => sum + s.imbalanceVolume, 0)
                  )
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Energy variance</p>
            </CardContent>
          </Card>
        </div>

        {/* Settlement Runs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Settlement Runs</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Settlement #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-right">Scheduled Energy</TableHead>
                  <TableHead className="text-right">Actual Energy</TableHead>
                  <TableHead className="text-right">Imbalance</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Run Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSettlements.map((settlement) => (
                  <TableRow key={settlement.id}>
                    <TableCell className="font-medium">
                      {settlement.settlementNumber}
                    </TableCell>
                    <TableCell>{settlement.customerName}</TableCell>
                    <TableCell>{settlement.period}</TableCell>
                    <TableCell className="text-right">
                      {formatEnergy(settlement.scheduledEnergy)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatEnergy(settlement.actualEnergy)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          settlement.imbalanceVolume < 0
                            ? 'text-red-600'
                            : 'text-green-600'
                        }
                      >
                        {settlement.imbalanceVolume > 0 ? '+' : ''}
                        {formatEnergy(settlement.imbalanceVolume)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(settlement.totalAmount)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(settlement.status)}>
                        {settlement.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(settlement.runDate)}</TableCell>
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
