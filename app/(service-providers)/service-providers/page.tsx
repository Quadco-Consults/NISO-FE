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
import { Plus, Search, Building2, TrendingUp, AlertCircle } from 'lucide-react';
import { formatCurrency, getStatusColor } from '@/lib/utils/formatters';
import type { ServiceProvider } from '@/types';

// Mock data
const mockServiceProviders: ServiceProvider[] = [
  {
    id: 'sp1',
    name: 'Market Operator',
    code: 'MO',
    type: 'market_operator',
    status: 'active',
    bankName: 'First Bank Nigeria',
    accountNumber: '3012345678',
    accountName: 'Market Operator - NISO',
    contactPerson: 'John Doe',
    email: 'john.doe@mo.ng',
    phone: '+234 801 234 5678',
    address: '123 Market Street, Abuja, Nigeria',
    allocationPercentage: 8.5,
    currentBalance: 0,
    totalDisbursed: 5400000000,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-01-15'),
  },
  {
    id: 'sp2',
    name: 'System Operator',
    code: 'SO',
    type: 'system_operator',
    status: 'active',
    bankName: 'Access Bank',
    accountNumber: '0123456789',
    accountName: 'System Operator - NISO',
    contactPerson: 'Jane Smith',
    email: 'jane.smith@so.ng',
    phone: '+234 802 345 6789',
    address: '456 Grid Avenue, Abuja, Nigeria',
    allocationPercentage: 7.2,
    currentBalance: 0,
    totalDisbursed: 4560000000,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-01-15'),
  },
  {
    id: 'sp3',
    name: 'Nigerian Bulk Electricity Trading Plc',
    code: 'NBET',
    type: 'nbet',
    status: 'active',
    bankName: 'Zenith Bank',
    accountNumber: '2034567890',
    accountName: 'NBET - Collections',
    contactPerson: 'Ahmed Hassan',
    email: 'ahmed.hassan@nbet.gov.ng',
    phone: '+234 803 456 7890',
    address: '789 Energy Plaza, Abuja, Nigeria',
    allocationPercentage: 55.0,
    currentBalance: 0,
    totalDisbursed: 34850000000,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-01-16'),
  },
  {
    id: 'sp4',
    name: 'Nigerian Electricity Regulatory Commission',
    code: 'NERC',
    type: 'nerc',
    status: 'active',
    bankName: 'GTBank',
    accountNumber: '0145678901',
    accountName: 'NERC - Regulatory Fees',
    contactPerson: 'Fatima Mohammed',
    email: 'fatima.mohammed@nerc.gov.ng',
    phone: '+234 804 567 8901',
    address: '321 Regulatory Road, Abuja, Nigeria',
    allocationPercentage: 2.5,
    currentBalance: 0,
    totalDisbursed: 1500000000,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-01-14'),
  },
  {
    id: 'sp5',
    name: 'Transmission Service Provider',
    code: 'TSP',
    type: 'transmission_service_provider',
    status: 'active',
    bankName: 'UBA',
    accountNumber: '1023456789',
    accountName: 'TSP - Transmission Charges',
    contactPerson: 'David Okonkwo',
    email: 'david.okonkwo@tsp.ng',
    phone: '+234 805 678 9012',
    address: '654 Transmission Way, Abuja, Nigeria',
    allocationPercentage: 26.8,
    currentBalance: 0,
    totalDisbursed: 16960000000,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-01-15'),
  },
];

export default function ServiceProvidersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProviders = mockServiceProviders.filter((provider) =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDisbursed = mockServiceProviders.reduce((sum, sp) => sum + sp.totalDisbursed, 0);
  const activeProviders = mockServiceProviders.filter((sp) => sp.status === 'active').length;

  const getProviderTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      market_operator: 'Market Operator',
      system_operator: 'System Operator',
      transmission_service_provider: 'TSP',
      nerc: 'NERC',
      nbet: 'NBET',
    };
    return labels[type] || type;
  };

  const getProviderTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      market_operator: 'bg-blue-100 text-blue-800 border-blue-200',
      system_operator: 'bg-purple-100 text-purple-800 border-purple-200',
      transmission_service_provider: 'bg-green-100 text-green-800 border-green-200',
      nerc: 'bg-orange-100 text-orange-800 border-orange-200',
      nbet: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Service Providers</h1>
            <p className="text-gray-500 mt-1">
              Manage service provider accounts and disbursement allocations
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Service Provider
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Total Providers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockServiceProviders.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                {activeProviders} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Total Disbursed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalDisbursed)}
              </div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Largest Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">55.0%</div>
              <p className="text-xs text-gray-500 mt-1">NBET</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Outstanding Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(mockServiceProviders.reduce((sum, sp) => sum + sp.currentBalance, 0))}
              </div>
              <p className="text-xs text-gray-500 mt-1">Pending payments</p>
            </CardContent>
          </Card>
        </div>

        {/* Service Providers Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search service providers..."
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
                  <TableHead>Code</TableHead>
                  <TableHead>Service Provider</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Allocation %</TableHead>
                  <TableHead className="text-right">Total Disbursed</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProviders.map((provider) => (
                  <TableRow key={provider.id}>
                    <TableCell className="font-mono font-bold">
                      {provider.code}
                    </TableCell>
                    <TableCell className="font-medium">
                      {provider.name}
                    </TableCell>
                    <TableCell>
                      <Badge className={getProviderTypeColor(provider.type)}>
                        {getProviderTypeLabel(provider.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>{provider.contactPerson}</TableCell>
                    <TableCell className="text-sm">{provider.email}</TableCell>
                    <TableCell className="text-sm">{provider.phone}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {provider.allocationPercentage}%
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-600">
                      {formatCurrency(provider.totalDisbursed)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(provider.currentBalance)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(provider.status)}>
                        {provider.status}
                      </Badge>
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

        {/* Bank Account Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bank Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{provider.code}</CardTitle>
                      <Badge className={getProviderTypeColor(provider.type)}>
                        {getProviderTypeLabel(provider.type)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Name:</span>
                      <span className="font-medium">{provider.accountName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank:</span>
                      <span className="font-medium">{provider.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Number:</span>
                      <span className="font-mono font-medium">{provider.accountNumber}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-600">Allocation:</span>
                      <span className="font-bold text-blue-600">{provider.allocationPercentage}%</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
