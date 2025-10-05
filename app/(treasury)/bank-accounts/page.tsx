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
import { Plus, Building, CheckCircle, AlertCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import type { BankAccount } from '@/types';

const mockBankAccounts: BankAccount[] = [
  {
    id: '1',
    accountName: 'NISO Collections Account',
    accountNumber: '1234567890',
    bankName: 'First Bank Nigeria',
    bankCode: '011',
    type: 'collection',
    currency: 'NGN',
    currentBalance: 8200000000,
    availableBalance: 8200000000,
    status: 'active',
    isDefault: true,
    lastReconciled: new Date('2025-01-16'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-01-17'),
  },
  {
    id: '2',
    accountName: 'NISO Disbursement Account',
    accountNumber: '0987654321',
    bankName: 'Access Bank',
    bankCode: '044',
    type: 'disbursement',
    currency: 'NGN',
    currentBalance: 4300000000,
    availableBalance: 4300000000,
    status: 'active',
    isDefault: false,
    lastReconciled: new Date('2025-01-16'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-01-17'),
  },
  {
    id: '3',
    accountName: 'NISO Operational Account',
    accountNumber: '2468135790',
    bankName: 'Zenith Bank',
    bankCode: '057',
    type: 'operational',
    currency: 'NGN',
    currentBalance: 850000000,
    availableBalance: 820000000,
    status: 'active',
    isDefault: false,
    lastReconciled: new Date('2025-01-15'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-01-17'),
  },
  {
    id: '4',
    accountName: 'NISO Reserve Account',
    accountNumber: '1357924680',
    bankName: 'GTBank',
    bankCode: '058',
    type: 'reserve',
    currency: 'NGN',
    currentBalance: 2500000000,
    availableBalance: 2500000000,
    status: 'active',
    isDefault: false,
    lastReconciled: new Date('2025-01-10'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-01-17'),
  },
];

export default function BankAccountsPage() {
  const totalBalance = mockBankAccounts.reduce((sum, acc) => sum + acc.currentBalance, 0);
  const totalAvailable = mockBankAccounts.reduce((sum, acc) => sum + acc.availableBalance, 0);
  const activeAccounts = mockBankAccounts.filter(acc => acc.status === 'active').length;

  const getAccountTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      collection: 'bg-green-100 text-green-800 border-green-200',
      disbursement: 'bg-blue-100 text-blue-800 border-blue-200',
      operational: 'bg-purple-100 text-purple-800 border-purple-200',
      reserve: 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bank Account Management</h1>
            <p className="text-gray-500 mt-1">
              Monitor and manage NISO treasury bank accounts
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Bank Account
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalBalance)}
              </div>
              <p className="text-xs text-gray-500 mt-1">All accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalAvailable)}
              </div>
              <p className="text-xs text-gray-500 mt-1">Liquid funds</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Building className="h-4 w-4" />
                Active Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeAccounts}</div>
              <p className="text-xs text-gray-500 mt-1">
                {mockBankAccounts.length} total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Banks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(mockBankAccounts.map(a => a.bankName)).size}
              </div>
              <p className="text-xs text-gray-500 mt-1">Banking partners</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bank Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Current Balance</TableHead>
                  <TableHead className="text-right">Available Balance</TableHead>
                  <TableHead>Last Reconciled</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBankAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">
                      {account.accountName}
                    </TableCell>
                    <TableCell>{account.bankName}</TableCell>
                    <TableCell className="font-mono">{account.accountNumber}</TableCell>
                    <TableCell>
                      <Badge className={getAccountTypeColor(account.type)}>
                        {account.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(account.currentBalance)}
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      {formatCurrency(account.availableBalance)}
                    </TableCell>
                    <TableCell>
                      {account.lastReconciled ? formatDate(account.lastReconciled) : 'Never'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={account.status === 'active' ? 'default' : 'destructive'}>
                        {account.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {account.isDefault ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <div className="h-4 w-4" />
                      )}
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

        <div className="grid gap-4 md:grid-cols-2">
          {mockBankAccounts.map((account) => (
            <Card key={account.id} className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{account.accountName}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{account.bankName}</p>
                  </div>
                  <Badge className={getAccountTypeColor(account.type)}>
                    {account.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Account Number:</span>
                  <span className="font-mono font-medium">{account.accountNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bank Code:</span>
                  <span className="font-mono">{account.bankCode}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Balance:</span>
                    <span className="text-lg font-bold">{formatCurrency(account.currentBalance)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">Available Balance:</span>
                    <span className="text-lg font-bold text-green-600">{formatCurrency(account.availableBalance)}</span>
                  </div>
                </div>
                <div className="border-t pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {account.lastReconciled && new Date().getTime() - account.lastReconciled.getTime() < 2 * 24 * 60 * 60 * 1000 ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-xs text-green-600">Recently reconciled</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <span className="text-xs text-yellow-600">Needs reconciliation</span>
                      </>
                    )}
                  </div>
                  {account.isDefault && (
                    <Badge variant="outline" className="text-xs">Default</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
