'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils/formatters';
import { INVOICE_TYPES } from '@/lib/constants';
import type { Invoice } from '@/types';
import { FileText, Calendar, User, Hash, DollarSign } from 'lucide-react';

interface InvoiceViewModalProps {
  invoice: Invoice | null;
  open: boolean;
  onClose: () => void;
}

export function InvoiceViewModal({ invoice, open, onClose }: InvoiceViewModalProps) {
  if (!invoice) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl font-bold">Invoice Details</span>
            <Badge className={getStatusColor(invoice.status)}>
              {invoice.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Invoice Header */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Hash className="h-4 w-4" />
                  <span className="text-sm">Invoice Number</span>
                </div>
                <p className="text-lg font-semibold">{invoice.invoiceNumber}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">Invoice Type</span>
                </div>
                <p className="text-lg font-semibold">
                  {INVOICE_TYPES[invoice.type as keyof typeof INVOICE_TYPES]}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Customer Name</p>
                  <p className="font-medium">{invoice.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer ID</p>
                  <p className="font-medium">{invoice.customerId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Date Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Date Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Issue Date</p>
                <p className="font-medium">{formatDate(invoice.issueDate)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="font-medium">{formatDate(invoice.dueDate)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Period Start</p>
                <p className="font-medium">{formatDate(invoice.billingPeriodStart)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Period End</p>
                <p className="font-medium">{formatDate(invoice.billingPeriodEnd)}</p>
              </div>
            </div>
          </div>

          {/* Energy Details (if applicable) */}
          {invoice.energyConsumed && invoice.rate && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Energy Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Energy Consumed</p>
                  <p className="font-medium">{invoice.energyConsumed.toLocaleString()} MWh</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Rate per MWh</p>
                  <p className="font-medium">{formatCurrency(invoice.rate)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Financial Breakdown */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financial Breakdown
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(invoice.amount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax (7%)</span>
                <span className="font-medium">{formatCurrency(invoice.tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Total Amount</span>
                <span className="font-bold text-primary">
                  {formatCurrency(invoice.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Information (if paid) */}
          {invoice.paidDate && invoice.paidAmount && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Payment Information</h3>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Payment Date</p>
                    <p className="font-medium">{formatDate(invoice.paidDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Amount Paid</p>
                    <p className="font-medium text-green-700">
                      {formatCurrency(invoice.paidAmount)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs">Created By</p>
                <p className="font-medium text-gray-900">{invoice.createdBy}</p>
              </div>
              <div>
                <p className="text-xs">Created At</p>
                <p className="font-medium text-gray-900">
                  {formatDate(invoice.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
