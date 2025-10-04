'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Search, Phone, Mail, FileText, AlertTriangle } from 'lucide-react';
import { mockDebts } from '@/server/services/mock-data';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils/formatters';

export default function CollectionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDebts = mockDebts.filter((debt) =>
    debt.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDebt = filteredDebts.reduce((sum, d) => sum + d.totalDebt, 0);
  const criticalCount = filteredDebts.filter((d) =>
    d.status === 'overdue_90' || d.status === 'legal'
  ).length;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Debt Management & Collections</h1>
            <p className="text-gray-500 mt-1">
              Track overdue accounts and manage collection activities
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Debt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(totalDebt)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {filteredDebts.length} accounts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                30-59 Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {formatCurrency(filteredDebts.reduce((sum, d) => sum + d.overdue30, 0))}
              </div>
              <p className="text-xs text-gray-500 mt-1">Early stage</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                60-89 Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {formatCurrency(filteredDebts.reduce((sum, d) => sum + d.overdue60, 0))}
              </div>
              <p className="text-xs text-gray-500 mt-1">Moderate risk</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                90+ Days (Critical)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(filteredDebts.reduce((sum, d) => sum + d.overdue90, 0))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {criticalCount} critical accounts
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Debts</TabsTrigger>
            <TabsTrigger value="critical">Critical (90+ days)</TabsTrigger>
            <TabsTrigger value="moderate">Moderate (60-89 days)</TabsTrigger>
            <TabsTrigger value="early">Early (30-59 days)</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search customers..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="text-right">Total Debt</TableHead>
                      <TableHead className="text-right">Current</TableHead>
                      <TableHead className="text-right">30-59 Days</TableHead>
                      <TableHead className="text-right">60-89 Days</TableHead>
                      <TableHead className="text-right">90+ Days</TableHead>
                      <TableHead>Last Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDebts.map((debt) => (
                      <TableRow key={debt.id}>
                        <TableCell className="font-medium">
                          {debt.customerName}
                        </TableCell>
                        <TableCell className="text-right font-bold text-red-600">
                          {formatCurrency(debt.totalDebt)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(debt.currentAmount)}
                        </TableCell>
                        <TableCell className="text-right text-yellow-600">
                          {formatCurrency(debt.overdue30)}
                        </TableCell>
                        <TableCell className="text-right text-orange-600">
                          {formatCurrency(debt.overdue60)}
                        </TableCell>
                        <TableCell className="text-right text-red-600 font-medium">
                          {formatCurrency(debt.overdue90)}
                        </TableCell>
                        <TableCell>
                          {debt.lastPaymentDate
                            ? formatDate(debt.lastPaymentDate)
                            : 'No payments'}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(debt.status)}>
                            {debt.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button variant="ghost" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="critical">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">
                  Showing only accounts with 90+ days overdue
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moderate">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">
                  Showing only accounts with 60-89 days overdue
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="early">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">
                  Showing only accounts with 30-59 days overdue
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
