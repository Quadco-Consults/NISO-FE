'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Activity, User, FileText } from 'lucide-react';
import { formatDateTime } from '@/lib/utils/formatters';
import { useState } from 'react';
import type { AuditLog } from '@/types';

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    module: 'disbursement',
    action: 'approve',
    entityId: 'DSB-2025-001',
    entityType: 'Disbursement',
    userId: 'user1',
    userName: 'Finance Manager',
    userRole: 'finance_manager',
    description: 'Approved disbursement DSB-2025-001 for ₦450,000,000',
    oldValues: { status: 'pending_approval', approvalLevel: 1 },
    newValues: { status: 'approved', approvalLevel: 2 },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0...',
    timestamp: new Date('2025-01-17T14:30:00'),
    createdAt: new Date('2025-01-17T14:30:00'),
  },
  {
    id: '2',
    module: 'payment',
    action: 'create',
    entityId: 'PAY-2025-045',
    entityType: 'Payment',
    userId: 'user2',
    userName: 'Treasury Officer',
    userRole: 'billing_manager',
    description: 'Created payment record PAY-2025-045 from Eko DisCo for ₦4,500,000,000',
    newValues: { amount: 4500000000, customerId: 'cust1', status: 'completed' },
    ipAddress: '192.168.1.101',
    timestamp: new Date('2025-01-17T13:15:00'),
    createdAt: new Date('2025-01-17T13:15:00'),
  },
  {
    id: '3',
    module: 'reconciliation',
    action: 'reconcile',
    entityId: 'REC-2025-001',
    entityType: 'Reconciliation',
    userId: 'user1',
    userName: 'Finance Manager',
    userRole: 'finance_manager',
    description: 'Completed bank reconciliation REC-2025-001 with zero variance',
    oldValues: { status: 'in_progress', variance: 0 },
    newValues: { status: 'completed', reconciledBy: 'Finance Manager' },
    ipAddress: '192.168.1.100',
    timestamp: new Date('2025-01-16T16:45:00'),
    createdAt: new Date('2025-01-16T16:45:00'),
  },
  {
    id: '4',
    module: 'invoice',
    action: 'update',
    entityId: 'INV-2025-123',
    entityType: 'Invoice',
    userId: 'user3',
    userName: 'Billing Manager',
    userRole: 'billing_manager',
    description: 'Updated invoice INV-2025-123 status from pending to sent',
    oldValues: { status: 'pending' },
    newValues: { status: 'sent' },
    ipAddress: '192.168.1.102',
    timestamp: new Date('2025-01-16T11:20:00'),
    createdAt: new Date('2025-01-16T11:20:00'),
  },
  {
    id: '5',
    module: 'service_provider',
    action: 'create',
    entityId: 'sp6',
    entityType: 'ServiceProvider',
    userId: 'user1',
    userName: 'Finance Manager',
    userRole: 'finance_manager',
    description: 'Added new service provider: Alternative TSP',
    newValues: { name: 'Alternative TSP', type: 'transmission_service_provider', status: 'active' },
    ipAddress: '192.168.1.100',
    timestamp: new Date('2025-01-15T09:30:00'),
    createdAt: new Date('2025-01-15T09:30:00'),
  },
];

export default function AuditTrailPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState<string>('all');
  const [actionFilter, setActionFilter] = useState<string>('all');

  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    return matchesSearch && matchesModule && matchesAction;
  });

  const getActionColor = (action: string) => {
    const colors: Record<string, string> = {
      create: 'bg-green-100 text-green-800 border-green-200',
      update: 'bg-blue-100 text-blue-800 border-blue-200',
      delete: 'bg-red-100 text-red-800 border-red-200',
      approve: 'bg-purple-100 text-purple-800 border-purple-200',
      reject: 'bg-orange-100 text-orange-800 border-orange-200',
      disburse: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      reconcile: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      export: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[action] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const uniqueUsers = new Set(mockAuditLogs.map(log => log.userName)).size;
  const todayLogs = mockAuditLogs.filter(log =>
    new Date(log.timestamp).toDateString() === new Date().toDateString()
  ).length;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Trail & Historical Analysis</h1>
          <p className="text-gray-500 mt-1">
            Complete audit trail of all system activities and transactions
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Total Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAuditLogs.length}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Today&apos;s Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{todayLogs}</div>
              <p className="text-xs text-gray-500 mt-1">In last 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <User className="h-4 w-4" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueUsers}</div>
              <p className="text-xs text-gray-500 mt-1">Unique users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Modules Tracked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(mockAuditLogs.map(log => log.module)).size}
              </div>
              <p className="text-xs text-gray-500 mt-1">System modules</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search audit logs..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={moduleFilter} onValueChange={setModuleFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modules</SelectItem>
                  <SelectItem value="invoice">Invoice</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="disbursement">Disbursement</SelectItem>
                  <SelectItem value="reconciliation">Reconciliation</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="service_provider">Service Provider</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="approve">Approve</SelectItem>
                  <SelectItem value="reject">Reject</SelectItem>
                  <SelectItem value="disburse">Disburse</SelectItem>
                  <SelectItem value="reconcile">Reconcile</SelectItem>
                  <SelectItem value="export">Export</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead className="text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm">
                      {formatDateTime(log.timestamp)}
                    </TableCell>
                    <TableCell className="font-medium">{log.userName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.userRole.replace('_', ' ')}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{log.module}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getActionColor(log.action)}>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.entityId}</TableCell>
                    <TableCell className="max-w-sm text-sm">{log.description}</TableCell>
                    <TableCell className="font-mono text-xs">{log.ipAddress}</TableCell>
                    <TableCell className="text-right">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from(new Set(mockAuditLogs.map(log => log.userName))).map((userName) => {
                  const userLogs = mockAuditLogs.filter(log => log.userName === userName);
                  return (
                    <div key={userName} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <div className="font-medium">{userName}</div>
                        <div className="text-sm text-gray-600">
                          {userLogs[0].userRole.replace('_', ' ')}
                        </div>
                      </div>
                      <Badge>{userLogs.length} actions</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Activity by Module</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from(new Set(mockAuditLogs.map(log => log.module))).map((module) => {
                  const moduleLogs = mockAuditLogs.filter(log => log.module === module);
                  return (
                    <div key={module} className="flex items-center justify-between border-b pb-2">
                      <div className="font-medium capitalize">{module.replace('_', ' ')}</div>
                      <Badge variant="secondary">{moduleLogs.length} activities</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
