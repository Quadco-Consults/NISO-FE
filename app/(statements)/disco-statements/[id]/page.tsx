'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowLeft,
  Download,
  CheckCircle,
  Send,
  XCircle,
  FileText,
  Printer,
} from 'lucide-react';
import { detailedDiscoStatementService } from '@/server/services/detailed-disco-statement-service';
import type { DetailedDiscoStatement } from '@/types';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils/formatters';

export default function DiscoStatementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [statement, setStatement] = useState<DetailedDiscoStatement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatement();
  }, [params.id]);

  const loadStatement = async () => {
    setLoading(true);
    try {
      const data = await detailedDiscoStatementService.getDetailedStatementById(params.id as string);
      setStatement(data);
    } catch (error) {
      toast.error('Failed to load statement');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!statement) return;
    try {
      // For demo purposes, just reload
      toast.success('Statement approved successfully');
      await loadStatement();
    } catch (error) {
      toast.error('Failed to approve statement');
    }
  };

  const handleSend = async () => {
    if (!statement) return;
    try {
      // For demo purposes, just show success
      toast.success('Statement sent successfully');
      await loadStatement();
    } catch (error) {
      toast.error('Failed to send statement');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!statement) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-lg">Statement not found</div>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
      pending_approval: { label: 'Pending Approval', className: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'Approved', className: 'bg-green-100 text-green-800' },
      sent: { label: 'Sent', className: 'bg-blue-100 text-blue-800' },
      acknowledged: { label: 'Acknowledged', className: 'bg-purple-100 text-purple-800' },
      disputed: { label: 'Disputed', className: 'bg-red-100 text-red-800' },
    };

    const config = statusConfig[status] || statusConfig.draft;
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Actions */}
      <div className="flex items-center justify-between print:hidden">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          {getStatusBadge(statement.status)}
          {statement.status === 'pending_approval' && (
            <Button onClick={handleApprove}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
          )}
          {statement.status === 'approved' && (
            <Button onClick={handleSend}>
              <Send className="mr-2 h-4 w-4" />
              Send to NERC
            </Button>
          )}
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Statement Document */}
      <div className="bg-white rounded-lg border p-8 print:border-0 print:shadow-none">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">NISO: MARKET OPERATIONS</h1>
        </div>

        {/* Recipient Details */}
        <div className="grid grid-cols-2 gap-4 mb-6 border p-4 rounded">
          <div>
            <div className="text-sm font-semibold">Name:</div>
            <div>{statement.participantName}</div>
          </div>
          <div>
            <div className="text-sm font-semibold">Contract ID:</div>
            <div>{statement.contractId}</div>
          </div>
          <div>
            <div className="text-sm font-semibold">Representative Name:</div>
            <div>{statement.participantRepName}</div>
          </div>
          <div>
            <div className="text-sm font-semibold">Address:</div>
            <div>{statement.participantRepAddress}</div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center bg-black text-white p-3 mb-6">
          <h2 className="font-bold">{statement.title}</h2>
        </div>

        {/* Charge Line Items Table */}
        <div className="mb-6">
          <div className="bg-gray-100 p-2 font-semibold mb-2">
            Description of Charge
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Charge Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Notes</TableHead>
                <TableHead className="text-right">Amount (Naira)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statement.chargeLineItems.map((charge) => (
                <TableRow key={charge.id}>
                  <TableCell className="font-mono text-sm">{charge.chargeCode}</TableCell>
                  <TableCell>{charge.description}</TableCell>
                  <TableCell className="text-center">{charge.notes}</TableCell>
                  <TableCell className="text-right font-mono">
                    {formatCurrency(charge.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Zungeru Credit */}
        <div className="mb-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold bg-gray-100">
                  Zungeru Energy Credit (Naira)
                </TableCell>
                <TableCell className="text-right font-mono">
                  ({formatCurrency(Math.abs(statement.zungeruEnergyCreditNaira))})
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Separator className="my-6" />

        {/* Total */}
        <div className="mb-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-bold text-lg">
                  {statement.period} Total
                </TableCell>
                <TableCell className="text-right font-bold text-lg">
                  {formatCurrency(statement.june2025Total)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Separator className="my-6" />

        {/* Outstanding */}
        <div className="mb-6">
          <div className="bg-gray-100 p-2 font-semibold mb-2">
            Outstanding as at {new Date(statement.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">
                  Current Amount Due To<br />
                  {statement.participantName}
                </TableCell>
                <TableCell className="text-right font-mono text-lg font-bold">
                  {formatCurrency(statement.currentAmountDue)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Separator className="my-6" />

        {/* Amount in Words */}
        <div className="mb-8">
          <div className="bg-gray-100 p-2 font-semibold mb-2">
            Amount in Words (Naira)
          </div>
          <div className="p-4 border rounded">
            {statement.amountInWords}
          </div>
        </div>

        {/* Signature Section */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div className="font-semibold mb-2">Duly Authorised Signature:</div>
            <div className="border-b-2 border-black h-16 mb-2"></div>
          </div>
          <div>
            <div className="font-semibold mb-2">Date:</div>
            <div className="border-b-2 border-black h-16 mb-2"></div>
          </div>
        </div>

      </div>

      {/* Workflow Information */}
      <div className="bg-gray-50 rounded-lg border p-6 print:hidden">
        <h3 className="font-semibold mb-4">Workflow Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Drafted By:</span>
            <div className="font-medium">{statement.draftedBy || 'N/A'}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Drafted At:</span>
            <div className="font-medium">
              {statement.draftedAt ? new Date(statement.draftedAt).toLocaleString() : 'N/A'}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Approved By:</span>
            <div className="font-medium">{statement.approvedBy || 'N/A'}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Approved At:</span>
            <div className="font-medium">
              {statement.approvedAt ? new Date(statement.approvedAt).toLocaleString() : 'N/A'}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Sent To:</span>
            <div className="font-medium">{statement.sentTo || 'N/A'}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Sent At:</span>
            <div className="font-medium">
              {statement.sentAt ? new Date(statement.sentAt).toLocaleString() : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
