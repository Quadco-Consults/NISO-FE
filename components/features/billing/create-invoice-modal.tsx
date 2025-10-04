'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockCustomers } from '@/server/services/mock-data';
import { INVOICE_TYPES } from '@/lib/constants';
import { toast } from 'sonner';
import type { InvoiceType, InvoiceStatus } from '@/types';

interface CreateInvoiceModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateInvoiceModal({ open, onClose }: CreateInvoiceModalProps) {
  const [formData, setFormData] = useState({
    customerId: '',
    type: '' as InvoiceType,
    amount: '',
    tax: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    billingPeriodStart: '',
    billingPeriodEnd: '',
    energyConsumed: '',
    rate: '',
    status: 'draft' as InvoiceStatus,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateTax = (amount: number) => {
    return amount * 0.07; // 7% tax
  };

  const handleAmountChange = (value: string) => {
    const amount = parseFloat(value) || 0;
    const tax = calculateTax(amount);
    setFormData((prev) => ({
      ...prev,
      amount: value,
      tax: tax.toString(),
    }));
  };

  const handleEnergyCalculation = () => {
    const energy = parseFloat(formData.energyConsumed) || 0;
    const rateValue = parseFloat(formData.rate) || 0;
    const calculatedAmount = energy * rateValue;
    const tax = calculateTax(calculatedAmount);

    setFormData((prev) => ({
      ...prev,
      amount: calculatedAmount.toString(),
      tax: tax.toString(),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.customerId || !formData.type || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    const selectedCustomer = mockCustomers.find((c) => c.id === formData.customerId);

    const newInvoice = {
      id: Math.random().toString(36).substring(7),
      invoiceNumber: `INV-${new Date().getFullYear()}${(new Date().getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0')}`,
      customerId: formData.customerId,
      customerName: selectedCustomer?.name || '',
      type: formData.type,
      amount: parseFloat(formData.amount),
      tax: parseFloat(formData.tax),
      totalAmount: parseFloat(formData.amount) + parseFloat(formData.tax),
      status: formData.status,
      issueDate: new Date(formData.issueDate),
      dueDate: new Date(formData.dueDate),
      billingPeriodStart: new Date(formData.billingPeriodStart),
      billingPeriodEnd: new Date(formData.billingPeriodEnd),
      energyConsumed: formData.energyConsumed ? parseFloat(formData.energyConsumed) : undefined,
      rate: formData.rate ? parseFloat(formData.rate) : undefined,
      createdBy: 'admin@niso.ng',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('New Invoice Created:', newInvoice);
    toast.success(`Invoice ${newInvoice.invoiceNumber} created successfully!`);

    // Reset form
    setFormData({
      customerId: '',
      type: '' as InvoiceType,
      amount: '',
      tax: '',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      billingPeriodStart: '',
      billingPeriodEnd: '',
      energyConsumed: '',
      rate: '',
      status: 'draft',
    });

    onClose();
  };

  const totalAmount = (parseFloat(formData.amount) || 0) + (parseFloat(formData.tax) || 0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Invoice</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Customer & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer">
                Customer <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.customerId}
                onValueChange={(value) => handleInputChange('customerId', value)}
              >
                <SelectTrigger id="customer">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} ({customer.type.toUpperCase()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">
                Invoice Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange('type', value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(INVOICE_TYPES).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate">
                Issue Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) => handleInputChange('issueDate', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">
                Due Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Billing Period */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="periodStart">
                Billing Period Start <span className="text-red-500">*</span>
              </Label>
              <Input
                id="periodStart"
                type="date"
                value={formData.billingPeriodStart}
                onChange={(e) => handleInputChange('billingPeriodStart', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="periodEnd">
                Billing Period End <span className="text-red-500">*</span>
              </Label>
              <Input
                id="periodEnd"
                type="date"
                value={formData.billingPeriodEnd}
                onChange={(e) => handleInputChange('billingPeriodEnd', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Energy Calculation (Optional) */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold mb-3">Energy-Based Calculation (Optional)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="energyConsumed">Energy Consumed (MWh)</Label>
                <Input
                  id="energyConsumed"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.energyConsumed}
                  onChange={(e) => handleInputChange('energyConsumed', e.target.value)}
                  onBlur={handleEnergyCalculation}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Rate per MWh (₦)</Label>
                <Input
                  id="rate"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.rate}
                  onChange={(e) => handleInputChange('rate', e.target.value)}
                  onBlur={handleEnergyCalculation}
                />
              </div>

              <div className="space-y-2">
                <Label>Calculated Amount</Label>
                <div className="h-10 px-3 py-2 bg-white border rounded-md flex items-center">
                  ₦{((parseFloat(formData.energyConsumed) || 0) * (parseFloat(formData.rate) || 0)).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">
                Amount (₦) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tax">Tax (7%)</Label>
              <Input
                id="tax"
                type="number"
                step="0.01"
                value={formData.tax}
                readOnly
                className="bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label>Total Amount</Label>
              <div className="h-10 px-3 py-2 bg-blue-50 border border-blue-200 rounded-md flex items-center font-semibold text-blue-700">
                ₦{totalAmount.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Invoice Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange('status', value)}
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Invoice</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
