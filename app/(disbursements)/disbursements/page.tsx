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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Download, CheckCircle, XCircle, Clock, Send } from 'lucide-react';
import { formatCurrency, formatDateTime, getStatusColor } from '@/lib/utils/formatters';
import type { Disbursement } from '@/types';

// Mock data
const mockDisbursements: Disbursement[] = [
  {
    id: '1',
    disbursementNumber: 'DSB-2025-001',
    serviceProviderId: 'sp1',
    serviceProviderName: 'Market Operator (MO)',
    amount: 450000000,
    purpose: 'Monthly allocation for market operations',
    period: 'January 2025',
    status: 'pending_approval',
    paymentMethod: 'bank_transfer',
    bankName: 'First Bank Nigeria',
    accountNumber: '3012345678',
    approvalLevel: 1,
    currentApprover: 'Finance Manager',
    requestedBy: 'Treasury Officer',
    requestedAt: new Date('2025-01-15'),
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
  },
  {
    id: '2',
    disbursementNumber: 'DSB-2025-002',
    serviceProviderId: 'sp2',
    serviceProviderName: 'System Operator (SO)',
    amount: 380000000,
    purpose: 'Monthly allocation for system operations',
    period: 'January 2025',
    status: 'approved',
    paymentMethod: 'remita',
    approvalLevel: 3,
    requestedBy: 'Treasury Officer',
    requestedAt: new Date('2025-01-15'),
    approvedAt: new Date('2025-01-16'),
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-16'),
  },
  {
    id: '3',
    disbursementNumber: 'DSB-2025-003',
    serviceProviderId: 'sp3',
    serviceProviderName: 'NBET',
    amount: 850000000,
    purpose: 'Monthly allocation for energy purchase',
    period: 'January 2025',
    status: 'completed',
    paymentMethod: 'bank_transfer',
    bankName: 'Access Bank',
    accountNumber: '0123456789',
    referenceNumber: 'REF-2025-003',
    approvalLevel: 3,
    requestedBy: 'Treasury Officer',
    requestedAt: new Date('2025-01-14'),
    approvedAt: new Date('2025-01-15'),
    disbursedAt: new Date('2025-01-16'),
    createdAt: new Date('2025-01-14'),
    updatedAt: new Date('2025-01-16'),
  },
  {
    id: '4',
    disbursementNumber: 'DSB-2025-004',
    serviceProviderId: 'sp4',
    serviceProviderName: 'NERC',
    amount: 125000000,
    purpose: 'Regulatory fees Q1 2025',
    period: 'Q1 2025',
    status: 'processing',
    paymentMethod: 'remita',
    referenceNumber: 'REM-2025-004',
    approvalLevel: 3,
    requestedBy: 'Treasury Officer',
    requestedAt: new Date('2025-01-14'),
    approvedAt: new Date('2025-01-15'),
    createdAt: new Date('2025-01-14'),
    updatedAt: new Date('2025-01-16'),
  },
  {
    id: '5',
    disbursementNumber: 'DSB-2025-005',
    serviceProviderId: 'sp5',
    serviceProviderName: 'Transmission Service Provider (TSP)',
    amount: 620000000,
    purpose: 'Monthly transmission charges',
    period: 'January 2025',
    status: 'rejected',
    paymentMethod: 'bank_transfer',
    approvalLevel: 2,
    requestedBy: 'Treasury Officer',
    requestedAt: new Date('2025-01-15'),
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
  },
];

export default function DisbursementsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredDisbursements = mockDisbursements.filter((disbursement) => {
    const matchesSearch =
      disbursement.disbursementNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disbursement.serviceProviderName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || disbursement.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalDisbursed = mockDisbursements
    .filter((d) => d.status === 'completed')
    .reduce((sum, d) => sum + d.amount, 0);
  const pendingApproval = mockDisbursements
    .filter((d) => d.status === 'pending_approval')
    .reduce((sum, d) => sum + d.amount, 0);
  const processingAmount = mockDisbursements
    .filter((d) => d.status === 'processing' || d.status === 'approved')
    .reduce((sum, d) => sum + d.amount, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'processing':
      case 'approved':
        return <Send className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Disbursement Management</h1>
            <p className="text-gray-500 mt-1">
              Manage payments to service providers with approval workflows
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Disbursement
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Disbursed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalDisbursed)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {mockDisbursements.filter((d) => d.status === 'completed').length} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Approval
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {formatCurrency(pendingApproval)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {mockDisbursements.filter((d) => d.status === 'pending_approval').length} requests
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(processingAmount)}
              </div>
              <p className="text-xs text-gray-500 mt-1">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockDisbursements.filter((d) =>
                  d.period.includes('January 2025')
                ).length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Disbursements</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Disbursements</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search disbursements..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending_approval">Pending Approval</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Disbursement #</TableHead>
                      <TableHead>Service Provider</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Approval Level</TableHead>
                      <TableHead>Requested</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDisbursements.map((disbursement) => (
                      <TableRow key={disbursement.id}>
                        <TableCell className="font-medium">
                          {disbursement.disbursementNumber}
                        </TableCell>
                        <TableCell className="font-medium">
                          {disbursement.serviceProviderName}
                        </TableCell>
                        <TableCell>{disbursement.period}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {disbursement.purpose}
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {formatCurrency(disbursement.amount)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {disbursement.paymentMethod.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(disbursement.status)}
                            <Badge className={getStatusColor(disbursement.status)}>
                              {disbursement.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            Level {disbursement.approvalLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {formatDateTime(disbursement.requestedAt)}
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
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">
                  Showing only disbursements pending approval
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">
                  Showing only approved disbursements
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">
                  Showing only completed disbursements
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
