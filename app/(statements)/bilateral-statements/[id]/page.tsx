'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Printer,
} from 'lucide-react';
import { bilateralStatementService } from '@/server/services/bilateral-statement-service';
import type { BilateralStatement } from '@/types';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils/formatters';

export default function BilateralStatementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [statement, setStatement] = useState<BilateralStatement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatement();
  }, [params.id]);

  const loadStatement = async () => {
    setLoading(true);
    try {
      const data = await bilateralStatementService.getStatementById(params.id as string);
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
      await bilateralStatementService.approveStatement(statement.id, 'Current User');
      await loadStatement();
      toast.success('Statement approved successfully');
    } catch (error) {
      toast.error('Failed to approve statement');
    }
  };

  const handleSend = async () => {
    if (!statement) return;
    try {
      await bilateralStatementService.sendStatement(statement.id, 'NERC');
      await loadStatement();
      toast.success('Statement sent successfully');
    } catch (error) {
      toast.error('Failed to send statement');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="text-lg">Loading...</div></div>;
  }

  if (!statement) {
    return <div className="flex flex-col items-center justify-center min-h-screen gap-4"><div className="text-lg">Statement not found</div><Button onClick={() => router.back()}>Go Back</Button></div>;
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
      pending_approval: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'Approved', className: 'bg-green-100 text-green-800' },
      sent: { label: 'Sent', className: 'bg-blue-100 text-blue-800' },
      acknowledged: { label: 'Acknowledged', className: 'bg-purple-100 text-purple-800' },
      disputed: { label: 'Disputed', className: 'bg-red-100 text-red-800' },
    };
    const config = statusConfig[status] || statusConfig.draft;
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Actions */}
      <div className="flex items-center justify-between print:hidden">
        <Button variant="outline" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
        <div className="flex items-center gap-2">
          {getStatusBadge(statement.status)}
          {statement.status === 'pending_approval' && <Button onClick={handleApprove}><CheckCircle className="mr-2 h-4 w-4" />Approve</Button>}
          {statement.status === 'approved' && <Button onClick={handleSend}><Send className="mr-2 h-4 w-4" />Send to NERC</Button>}
          <Button variant="outline" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" />Print</Button>
          <Button variant="outline"><Download className="mr-2 h-4 w-4" />Download PDF</Button>
        </div>
      </div>

      {/* Tabs for Page 1 and Page 2 */}
      <Tabs defaultValue="page1" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="page1">Page 1 - Trades List</TabsTrigger>
          <TabsTrigger value="page2">Page 2 - Trade Detail</TabsTrigger>
        </TabsList>

        {/* Page 1: Trades List */}
        <TabsContent value="page1">
          <div className="bg-white rounded-lg border p-8 print:border-0">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">NISO: MARKET OPERATIONS</h1>
            </div>

            {/* Participant Details */}
            <div className="grid grid-cols-2 gap-4 mb-6 border p-4 rounded">
              <div><div className="text-sm font-semibold">Participants Name:</div><div>{statement.recipientEntity}</div></div>
              <div><div className="text-sm font-semibold">Participants Number:</div><div>{statement.recipientCode}</div></div>
              <div><div className="text-sm font-semibold">Participant Rep Name:</div><div>{statement.representativeName}</div></div>
              <div><div className="text-sm font-semibold">Participant Rep Address:</div><div>{statement.address}</div></div>
            </div>

            {/* Title */}
            <div className="text-center bg-black text-white p-3 mb-6"><h2 className="font-bold">{statement.title}</h2></div>

            {/* Bilateral Trades Table */}
            <div className="mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Seller Code</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statement.trades.map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell className="font-medium">{trade.buyer}</TableCell>
                      <TableCell>{trade.seller}</TableCell>
                      <TableCell className="font-mono text-sm">{trade.sellerCode}</TableCell>
                      <TableCell><Badge variant="outline">{trade.currency}</Badge></TableCell>
                      <TableCell className="text-right font-mono">
                        {trade.currency === 'USD' ? `$${trade.amount.toLocaleString()}` : formatCurrency(trade.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Separator className="my-6" />

            {/* Totals */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="font-bold text-lg">JUNE 2025 Total (US Dollars)</div>
                <div className="text-right font-bold text-lg font-mono">${statement.totalUSD.toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="font-bold text-lg">JUNE 2025 Total (NGN Naira)</div>
                <div className="text-right font-bold text-lg font-mono">{formatCurrency(statement.totalNGN)}</div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Outstanding */}
            <div className="space-y-4">
              <div className="bg-gray-100 p-2 font-semibold">Outstanding as at May 2025 (US Dollars)</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="font-semibold">Current Amount Due (US Dollars)</div>
                <div className="text-right font-mono text-lg font-bold">${statement.outstandingUSD.toLocaleString()}</div>
              </div>

              <div className="bg-gray-100 p-2 font-semibold mt-4">Amount in Words (US Dollars)</div>
              <div className="p-4 border rounded">{statement.amountInWordsUSD}</div>

              <div className="bg-gray-100 p-2 font-semibold mt-4">Outstanding as at May 2025 (NGN Naira)</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="font-semibold">Current Amount Due (NGN Naira)</div>
                <div className="text-right font-mono text-lg font-bold">{formatCurrency(statement.outstandingNGN)}</div>
              </div>

              <div className="bg-gray-100 p-2 font-semibold mt-4">Amount in Words (Naira)</div>
              <div className="p-4 border rounded">{statement.amountInWordsNGN}</div>
            </div>

            {/* Signature Section */}
            <div className="grid grid-cols-2 gap-8 mt-8 mb-8">
              <div><div className="font-semibold mb-2">Duly Authorised Signature:</div><div className="border-b-2 border-black h-16 mb-2"></div></div>
              <div><div className="font-semibold mb-2">Date:</div><div className="border-b-2 border-black h-16 mb-2"></div></div>
            </div>
          </div>
        </TabsContent>

        {/* Page 2: Trade Detail */}
        <TabsContent value="page2">
          <div className="bg-white rounded-lg border p-8 print:border-0">
            {/* Header */}
            <div className="text-center mb-8"><h1 className="text-2xl font-bold mb-2">NISO: MARKET OPERATIONS</h1></div>

            {/* Trade Participants & Seller Details */}
            <div className="grid grid-cols-2 gap-4 mb-6 border p-4 rounded">
              <div><div className="text-sm font-semibold">Trade Participants:</div><div>{statement.tradeParticipant1}</div></div>
              <div><div className="text-sm font-semibold">Participants Number:</div><div>{statement.sellerCode || 'PARAS/JDT'}</div></div>
              <div><div className="text-sm font-semibold">Seller Representative Name:</div><div>{statement.sellerRepName || 'The Managing Director'}</div></div>
              <div><div className="text-sm font-semibold">Seller Address:</div><div>{statement.sellerAddress || 'KM 44 ABEOKUTA SHAGAMU EXPRESS WAY, ODUO, OGUN STATE, NIGERIA'}</div></div>
            </div>

            {/* Title */}
            <div className="text-center bg-black text-white p-3 mb-6"><h2 className="font-bold">FINAL MARKET SETTLEMENT STATEMENT - JUNE 2025 Total</h2></div>

            {/* Charges Table */}
            {statement.charges && (
              <div className="mb-6">
                <div className="bg-gray-100 p-2 font-semibold mb-2">Description of Charge</div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-center">Notes</TableHead>
                      <TableHead className="text-right">Amount ({statement.chargesCurrency === 'USD' ? 'US Dollars' : 'Naira'})</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Transmission Service Provider (TSP) Charge</TableCell>
                      <TableCell className="text-center">A</TableCell>
                      <TableCell className="text-right font-mono">
                        {statement.chargesCurrency === 'USD' ? `$${statement.charges.tspCharge.toLocaleString()}` : formatCurrency(statement.charges.tspCharge)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">System Operations (SO) Charges</TableCell>
                      <TableCell className="text-center">B</TableCell>
                      <TableCell className="text-right font-mono">
                        {statement.chargesCurrency === 'USD' ? `$${statement.charges.soCharges.toLocaleString()}` : formatCurrency(statement.charges.soCharges)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Market Operations (MO) Charges</TableCell>
                      <TableCell className="text-center">C</TableCell>
                      <TableCell className="text-right font-mono">
                        {statement.chargesCurrency === 'USD' ? `$${statement.charges.moCharges.toLocaleString()}` : formatCurrency(statement.charges.moCharges)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ancillary Services (AS) Charges</TableCell>
                      <TableCell className="text-center">D</TableCell>
                      <TableCell className="text-right font-mono">
                        {statement.chargesCurrency === 'USD' ? `$${statement.charges.asCharges.toLocaleString()}` : formatCurrency(statement.charges.asCharges)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">TCN Regulatory Charges</TableCell>
                      <TableCell className="text-center">E</TableCell>
                      <TableCell className="text-right font-mono">
                        {statement.chargesCurrency === 'USD' ? `$${statement.charges.tcnRegulatory.toLocaleString()}` : formatCurrency(statement.charges.tcnRegulatory)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">GENCO Regulatory Charges</TableCell>
                      <TableCell className="text-center">F</TableCell>
                      <TableCell className="text-right font-mono">
                        {statement.chargesCurrency === 'USD' ? `$${statement.charges.gencoRegulatory.toLocaleString()}` : formatCurrency(statement.charges.gencoRegulatory)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Separator className="my-6" />

                {/* Total */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="font-bold text-lg">JUNE 2025 Total</div>
                  <div className="text-right font-bold text-lg font-mono">
                    {statement.chargesCurrency === 'USD' ? `$${statement.charges.total.toLocaleString()}` : formatCurrency(statement.charges.total)}
                  </div>
                </div>
              </div>
            )}

            <Separator className="my-6" />

            {/* Outstanding & Amount in Words */}
            <div className="space-y-4">
              <div className="bg-gray-100 p-2 font-semibold">Outstanding Invoices as at May 2025</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="font-semibold">Current Amount Due from {statement.tradeParticipant1}</div>
                <div className="text-right font-mono text-lg font-bold">
                  {statement.chargesCurrency === 'USD' && statement.charges ? `$${statement.charges.total.toLocaleString()}` : ''}
                </div>
              </div>

              <div className="bg-gray-100 p-2 font-semibold mt-4">Amount in Words ({statement.chargesCurrency === 'USD' ? 'US Dollar' : 'Naira'})</div>
              <div className="p-4 border rounded">Nine Hundred and Fifty - Six Thousand, Seven Hundred and Seventy - Two Dollar and Thirty - Four Cent Only</div>
            </div>

            {/* Signature Section */}
            <div className="grid grid-cols-2 gap-8 mt-8 mb-8">
              <div><div className="font-semibold mb-2">Duly Authorised Signature:</div><div className="border-b-2 border-black h-16 mb-2"></div></div>
              <div><div className="font-semibold mb-2">Date:</div><div className="border-b-2 border-black h-16 mb-2"></div></div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
