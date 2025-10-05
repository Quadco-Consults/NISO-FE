'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link2, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import type { InvoicePaymentMapping } from '@/types';

const mockMappings: InvoicePaymentMapping[] = [
  {
    id: '1',
    invoiceId: 'inv1',
    invoiceNumber: 'INV-2025-001',
    paymentId: 'pay1',
    paymentNumber: 'PAY-2025-045',
    customerId: 'cust1',
    customerName: 'Eko Electricity Distribution Company',
    invoiceAmount: 4500000000,
    allocatedAmount: 4500000000,
    remainingAmount: 0,
    allocationDate: new Date('2025-01-17'),
    allocatedBy: 'Treasury Officer',
    status: 'full',
    createdAt: new Date('2025-01-17'),
  },
  {
    id: '2',
    invoiceId: 'inv2',
    invoiceNumber: 'INV-2025-002',
    paymentId: 'pay2',
    paymentNumber: 'PAY-2025-046',
    customerId: 'cust2',
    customerName: 'Ikeja Electric',
    invoiceAmount: 3800000000,
    allocatedAmount: 3200000000,
    remainingAmount: 600000000,
    allocationDate: new Date('2025-01-16'),
    allocatedBy: 'Treasury Officer',
    status: 'partial',
    createdAt: new Date('2025-01-16'),
  },
  {
    id: '3',
    invoiceId: 'inv3',
    invoiceNumber: 'INV-2025-003',
    paymentId: 'pay3',
    paymentNumber: 'PAY-2025-047',
    customerId: 'cust3',
    customerName: 'Kano Electricity Distribution Company',
    invoiceAmount: 2500000000,
    allocatedAmount: 2800000000,
    remainingAmount: -300000000,
    allocationDate: new Date('2025-01-16'),
    allocatedBy: 'Treasury Officer',
    status: 'overpaid',
    createdAt: new Date('2025-01-16'),
  },
  {
    id: '4',
    invoiceId: 'inv4',
    invoiceNumber: 'INV-2025-004',
    paymentId: 'pay4',
    paymentNumber: 'PAY-2025-048',
    customerId: 'cust4',
    customerName: 'Abuja Electricity Distribution Company',
    invoiceAmount: 3200000000,
    allocatedAmount: 3200000000,
    remainingAmount: 0,
    allocationDate: new Date('2025-01-15'),
    allocatedBy: 'Finance Manager',
    status: 'full',
    createdAt: new Date('2025-01-15'),
  },
  {
    id: '5',
    invoiceId: 'inv5',
    invoiceNumber: 'INV-2025-005',
    paymentId: 'pay5',
    paymentNumber: 'PAY-2025-049',
    customerId: 'cust5',
    customerName: 'Port Harcourt Electricity Distribution Company',
    invoiceAmount: 2900000000,
    allocatedAmount: 1500000000,
    remainingAmount: 1400000000,
    allocationDate: new Date('2025-01-15'),
    allocatedBy: 'Treasury Officer',
    status: 'partial',
    createdAt: new Date('2025-01-15'),
  },
];

export default function PaymentMappingPage() {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      full: 'bg-green-100 text-green-800 border-green-200',
      partial: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      overpaid: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return colors[status] || colors.partial;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'full':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'overpaid':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const totalAllocated = mockMappings.reduce((sum, m) => sum + m.allocatedAmount, 0);
  const fullyPaid = mockMappings.filter(m => m.status === 'full').length;
  const partiallyPaid = mockMappings.filter(m => m.status === 'partial').length;
  const totalRemaining = mockMappings.reduce((sum, m) => sum + Math.max(m.remainingAmount, 0), 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoice-to-Payment Mapping</h1>
            <p className="text-gray-500 mt-1">
              Track payment allocations to invoices and outstanding balances
            </p>
          </div>
          <Button className="gap-2">
            <Link2 className="h-4 w-4" />
            Create Mapping
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Allocated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalAllocated)}
              </div>
              <p className="text-xs text-gray-500 mt-1">{mockMappings.length} mappings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Fully Paid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{fullyPaid}</div>
              <p className="text-xs text-gray-500 mt-1">
                {((fullyPaid / mockMappings.length) * 100).toFixed(0)}% of invoices
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Partially Paid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{partiallyPaid}</div>
              <p className="text-xs text-gray-500 mt-1">Pending balance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Outstanding Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(totalRemaining)}
              </div>
              <p className="text-xs text-gray-500 mt-1">To be collected</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Allocations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Payment #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Invoice Amount</TableHead>
                  <TableHead className="text-right">Allocated Amount</TableHead>
                  <TableHead className="text-right">Remaining</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Allocation Date</TableHead>
                  <TableHead>Allocated By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMappings.map((mapping) => (
                  <TableRow key={mapping.id}>
                    <TableCell className="font-medium font-mono">
                      {mapping.invoiceNumber}
                    </TableCell>
                    <TableCell className="font-mono">
                      {mapping.paymentNumber}
                    </TableCell>
                    <TableCell className="font-medium">
                      {mapping.customerName}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(mapping.invoiceAmount)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-600">
                      {formatCurrency(mapping.allocatedAmount)}
                    </TableCell>
                    <TableCell className={`text-right font-bold ${
                      mapping.remainingAmount === 0 ? 'text-green-600' :
                      mapping.remainingAmount < 0 ? 'text-blue-600' :
                      'text-red-600'
                    }`}>
                      {mapping.remainingAmount === 0 ? (
                        <span className="flex items-center justify-end gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Cleared
                        </span>
                      ) : mapping.remainingAmount < 0 ? (
                        `+${formatCurrency(Math.abs(mapping.remainingAmount))}`
                      ) : (
                        formatCurrency(mapping.remainingAmount)
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(mapping.status)}
                        <Badge className={getStatusColor(mapping.status)}>
                          {mapping.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(mapping.allocationDate)}</TableCell>
                    <TableCell>{mapping.allocatedBy}</TableCell>
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
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Allocation Summary by Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from(new Set(mockMappings.map(m => m.customerName))).map((customer) => {
                  const customerMappings = mockMappings.filter(m => m.customerName === customer);
                  const totalInvoiced = customerMappings.reduce((sum, m) => sum + m.invoiceAmount, 0);
                  const totalPaid = customerMappings.reduce((sum, m) => sum + m.allocatedAmount, 0);
                  const balance = totalInvoiced - totalPaid;

                  return (
                    <div key={customer} className="border-b pb-3">
                      <div className="font-medium mb-2">{customer}</div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <div className="text-gray-600">Invoiced</div>
                          <div className="font-medium">{formatCurrency(totalInvoiced)}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Paid</div>
                          <div className="font-medium text-green-600">{formatCurrency(totalPaid)}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Balance</div>
                          <div className={`font-medium ${balance === 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(Math.abs(balance))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border-2 border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="font-medium">Fully Paid</div>
                      <div className="text-sm text-gray-600">{fullyPaid} invoices</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    {((fullyPaid / mockMappings.length) * 100).toFixed(0)}%
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 border-2 border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-8 w-8 text-yellow-600" />
                    <div>
                      <div className="font-medium">Partially Paid</div>
                      <div className="text-sm text-gray-600">{partiallyPaid} invoices</div>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    {((partiallyPaid / mockMappings.length) * 100).toFixed(0)}%
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 border-2 border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="font-medium">Overpaid</div>
                      <div className="text-sm text-gray-600">
                        {mockMappings.filter(m => m.status === 'overpaid').length} invoices
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    Credit balance
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
