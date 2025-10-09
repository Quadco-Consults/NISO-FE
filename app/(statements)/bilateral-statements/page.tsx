'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layouts/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Search,
  Plus,
  MoreVertical,
  Eye,
  Download,
  CheckCircle,
  Send,
  Trash2,
  AlertCircle,
  DollarSign,
  ArrowLeft,
} from 'lucide-react';
import { bilateralStatementService } from '@/server/services/bilateral-statement-service';
import type { BilateralStatement } from '@/types';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils/formatters';
import Link from 'next/link';

export default function BilateralStatementsPage() {
  const router = useRouter();
  const [statements, setStatements] = useState<BilateralStatement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');

  useEffect(() => {
    loadStatements();
  }, []);

  const loadStatements = async () => {
    setLoading(true);
    try {
      const data = await bilateralStatementService.getStatements();
      setStatements(data);
    } catch (error) {
      toast.error('Failed to load bilateral statements');
    } finally {
      setLoading(false);
    }
  };

  const filteredStatements = statements.filter(statement => {
    const matchesSearch =
      statement.statementNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      statement.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
      statement.tradeParticipant1.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || statement.status === statusFilter;
    const matchesYear = yearFilter === 'all' || statement.year.toString() === yearFilter;

    return matchesSearch && matchesStatus && matchesYear;
  });

  const handleApprove = async (id: string) => {
    try {
      await bilateralStatementService.approveStatement(id, 'Current User');
      await loadStatements();
      toast.success('Statement approved successfully');
    } catch (error) {
      toast.error('Failed to approve statement');
    }
  };

  const handleSend = async (id: string) => {
    try {
      await bilateralStatementService.sendStatement(id, 'NERC');
      await loadStatements();
      toast.success('Statement sent successfully');
    } catch (error) {
      toast.error('Failed to send statement');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this statement?')) return;

    try {
      await bilateralStatementService.deleteStatement(id);
      await loadStatements();
      toast.success('Statement deleted successfully');
    } catch (error) {
      toast.error('Failed to delete statement');
    }
  };

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

  const years = Array.from(new Set(statements.map(s => s.year))).sort((a, b) => b - a);

  const summary = {
    total: statements.length,
    totalAmountUSD: statements.reduce((sum, s) => sum + s.totalUSD, 0),
    totalAmountNGN: statements.reduce((sum, s) => sum + s.totalNGN, 0),
    approved: statements.filter(s => s.status === 'approved').length,
    pending: statements.filter(s => s.status === 'pending_approval').length,
    sent: statements.filter(s => s.status === 'sent').length,
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Bilateral Statements</h1>
              <p className="text-muted-foreground">
                Market settlement statements for bilateral trading
              </p>
            </div>
            <Link href="/bilateral-statements/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Statement
              </Button>
            </Link>
          </div>
        </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-6">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total</span>
          </div>
          <div className="text-2xl font-bold mt-2">{summary.total}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-muted-foreground">Pending</span>
          </div>
          <div className="text-2xl font-bold mt-2">{summary.pending}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm text-muted-foreground">Approved</span>
          </div>
          <div className="text-2xl font-bold mt-2">{summary.approved}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Send className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-muted-foreground">Sent</span>
          </div>
          <div className="text-2xl font-bold mt-2">{summary.sent}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-sm text-muted-foreground">Total USD</span>
          </div>
          <div className="text-xl font-bold mt-2">
            ${summary.totalAmountUSD.toLocaleString()}
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Total NGN</div>
          <div className="text-xl font-bold mt-2">
            {formatCurrency(summary.totalAmountNGN)}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search statements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending_approval">Pending Approval</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="acknowledged">Acknowledged</SelectItem>
            <SelectItem value="disputed">Disputed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={yearFilter} onValueChange={setYearFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {years.map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Statement Number</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Trade Participants</TableHead>
              <TableHead>USD Amount</TableHead>
              <TableHead>NGN Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredStatements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No statements found
                </TableCell>
              </TableRow>
            ) : (
              filteredStatements.map((statement) => (
                <TableRow key={statement.id}>
                  <TableCell className="font-medium">
                    {statement.statementNumber}
                  </TableCell>
                  <TableCell>{statement.period}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {statement.tradeParticipant1}
                  </TableCell>
                  <TableCell className="font-mono">
                    ${statement.totalUSD.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono">
                    {formatCurrency(statement.totalNGN)}
                  </TableCell>
                  <TableCell>{getStatusBadge(statement.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(statement.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={`/bilateral-statements/${statement.id}`}>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {statement.status === 'pending_approval' && (
                          <DropdownMenuItem onClick={() => handleApprove(statement.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        {statement.status === 'approved' && (
                          <DropdownMenuItem onClick={() => handleSend(statement.id)}>
                            <Send className="mr-2 h-4 w-4" />
                            Send to NERC
                          </DropdownMenuItem>
                        )}
                        {statement.status === 'draft' && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(statement.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      </div>
    </MainLayout>
  );
}
