'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Send, Clock, CheckCircle2 } from 'lucide-react';
import { formatDate } from '@/lib/utils/formatters';
import type { RegulatoryReport } from '@/types';

const mockReports: RegulatoryReport[] = [
  {
    id: '1',
    reportNumber: 'RPT-2025-001',
    reportType: 'monthly_settlement',
    title: 'Monthly Settlement Report - January 2025',
    period: 'January 2025',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-31'),
    status: 'completed',
    generatedBy: 'System',
    generatedAt: new Date('2025-01-17'),
    fileUrl: '/reports/settlement-jan-2025.pdf',
    notes: 'All settlements reconciled successfully',
    createdAt: new Date('2025-01-17'),
    updatedAt: new Date('2025-01-17'),
  },
  {
    id: '2',
    reportType: 'disbursement_summary',
    reportNumber: 'RPT-2025-002',
    title: 'Disbursement Summary Report - Q1 2025',
    period: 'Q1 2025',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-03-31'),
    status: 'generating',
    generatedBy: 'Finance Manager',
    notes: 'Service provider disbursements and allocations',
    createdAt: new Date('2025-01-17'),
    updatedAt: new Date('2025-01-17'),
  },
  {
    id: '3',
    reportNumber: 'RPT-2025-003',
    reportType: 'collection_report',
    title: 'Collection Performance Report - January 2025',
    period: 'January 2025',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-31'),
    status: 'completed',
    generatedBy: 'Collections Manager',
    generatedAt: new Date('2025-01-16'),
    submittedTo: 'NERC',
    submittedAt: new Date('2025-01-16'),
    fileUrl: '/reports/collections-jan-2025.pdf',
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-16'),
  },
  {
    id: '4',
    reportNumber: 'RPT-2025-004',
    reportType: 'debt_aging',
    title: 'Debt Aging Analysis - January 2025',
    period: 'January 2025',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-31'),
    status: 'draft',
    generatedBy: 'Debt Manager',
    notes: 'Comprehensive aging report for all market participants',
    createdAt: new Date('2025-01-16'),
    updatedAt: new Date('2025-01-16'),
  },
];

export default function ReportsPage() {
  const getReportTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      monthly_settlement: 'Monthly Settlement',
      quarterly_financial: 'Quarterly Financial',
      annual_compliance: 'Annual Compliance',
      debt_aging: 'Debt Aging',
      disbursement_summary: 'Disbursement Summary',
      collection_report: 'Collection Report',
    };
    return labels[type] || type;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'submitted':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'generating':
        return <Clock className="h-4 w-4 text-blue-600 animate-spin" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Regulatory Reports & Compliance</h1>
            <p className="text-gray-500 mt-1">
              Generate and manage regulatory reports for NERC and stakeholders
            </p>
          </div>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockReports.length}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mockReports.filter(r => r.status === 'completed').length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Ready for submission</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Send className="h-4 w-4" />
                Submitted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockReports.filter(r => r.submittedAt).length}
              </div>
              <p className="text-xs text-gray-500 mt-1">To NERC</p>
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
                {mockReports.filter(r => r.period.includes('January 2025')).length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Reports generated</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Regulatory Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report #</TableHead>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Generated By</TableHead>
                  <TableHead>Submitted To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      {report.reportNumber}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getReportTypeLabel(report.reportType)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium max-w-xs">
                      {report.title}
                    </TableCell>
                    <TableCell>{report.period}</TableCell>
                    <TableCell>{formatDate(report.startDate)}</TableCell>
                    <TableCell>{formatDate(report.endDate)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(report.status)}
                        <Badge variant={
                          report.status === 'completed' || report.status === 'submitted' ? 'default' :
                          report.status === 'generating' ? 'secondary' : 'outline'
                        }>
                          {report.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{report.generatedBy}</TableCell>
                    <TableCell>{report.submittedTo || 'Not submitted'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        {report.fileUrl && (
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        {report.status === 'completed' && !report.submittedAt && (
                          <Button variant="ghost" size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Monthly Settlement
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  Monthly energy settlement and reconciliation reports
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Quarterly Financial
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  Quarterly financial performance and cash flow reports
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Annual Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  Annual compliance reports for NERC and regulators
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Debt Aging
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  Market participant debt aging and collection reports
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Disbursement Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  Service provider disbursement and allocation reports
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Collection Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  Collection performance and remittance reports
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
