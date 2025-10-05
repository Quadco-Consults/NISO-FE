'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, AlertCircle, TrendingDown, Shield, CheckCircle } from 'lucide-react';
import { formatCurrency, formatDateTime } from '@/lib/utils/formatters';
import type { RiskAlert, RiskMetric } from '@/types';

const mockRiskAlerts: RiskAlert[] = [
  {
    id: '1',
    alertType: 'liquidity',
    priority: 'urgent',
    riskLevel: 'critical',
    title: 'Low Liquidity Warning',
    description: 'Available cash falling below operational threshold',
    affectedEntity: 'NISO Disbursement Account',
    amount: 4300000000,
    threshold: 5000000000,
    status: 'open',
    assignedTo: 'Treasury Manager',
    createdAt: new Date('2025-01-17T10:30:00'),
    updatedAt: new Date('2025-01-17T10:30:00'),
  },
  {
    id: '2',
    alertType: 'credit',
    priority: 'high',
    riskLevel: 'high',
    title: 'Debt Aging Alert',
    description: 'Multiple customers with 90+ days overdue invoices',
    affectedEntity: 'Kano DisCo, Jos DisCo',
    amount: 2400000000,
    status: 'acknowledged',
    assignedTo: 'Collections Manager',
    acknowledgedAt: new Date('2025-01-16T14:20:00'),
    createdAt: new Date('2025-01-16T09:15:00'),
    updatedAt: new Date('2025-01-16T14:20:00'),
  },
  {
    id: '3',
    alertType: 'payment_delay',
    priority: 'medium',
    riskLevel: 'medium',
    title: 'Disbursement Delay',
    description: 'Service provider payment pending approval for 3+ days',
    affectedEntity: 'System Operator',
    amount: 380000000,
    status: 'open',
    assignedTo: 'Finance Manager',
    createdAt: new Date('2025-01-15T16:45:00'),
    updatedAt: new Date('2025-01-15T16:45:00'),
  },
  {
    id: '4',
    alertType: 'compliance',
    priority: 'high',
    riskLevel: 'high',
    title: 'Missing Reconciliation',
    description: 'Bank account not reconciled for 7+ days',
    affectedEntity: 'NISO Operational Account',
    status: 'escalated',
    assignedTo: 'Treasury Manager',
    createdAt: new Date('2025-01-14T11:00:00'),
    updatedAt: new Date('2025-01-16T09:00:00'),
  },
  {
    id: '5',
    alertType: 'operational',
    priority: 'low',
    riskLevel: 'low',
    title: 'Collection Rate Drop',
    description: 'Collection rate dropped below 85%',
    status: 'resolved',
    resolvedAt: new Date('2025-01-16T15:30:00'),
    createdAt: new Date('2025-01-13T10:00:00'),
    updatedAt: new Date('2025-01-16T15:30:00'),
  },
];

const mockRiskMetrics: RiskMetric[] = [
  {
    id: '1',
    metricType: 'liquidity_ratio',
    value: 65.6,
    threshold: 70,
    status: 'warning',
    date: new Date('2025-01-17'),
    createdAt: new Date('2025-01-17'),
  },
  {
    id: '2',
    metricType: 'collection_rate',
    value: 82.5,
    threshold: 85,
    status: 'warning',
    date: new Date('2025-01-17'),
    createdAt: new Date('2025-01-17'),
  },
  {
    id: '3',
    metricType: 'debt_ratio',
    value: 18.2,
    threshold: 15,
    status: 'critical',
    date: new Date('2025-01-17'),
    createdAt: new Date('2025-01-17'),
  },
  {
    id: '4',
    metricType: 'payment_delay',
    value: 2.3,
    threshold: 3,
    status: 'normal',
    date: new Date('2025-01-17'),
    createdAt: new Date('2025-01-17'),
  },
];

export default function RiskManagementPage() {
  const getRiskBadgeColor = (level: string) => {
    const colors: Record<string, string> = {
      critical: 'bg-red-600 text-white',
      high: 'bg-orange-500 text-white',
      medium: 'bg-yellow-500 text-white',
      low: 'bg-green-500 text-white',
    };
    return colors[level] || colors.medium;
  };

  const getPriorityBadgeColor = (priority: string) => {
    const colors: Record<string, string> = {
      urgent: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200',
    };
    return colors[priority] || colors.medium;
  };

  const getMetricStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      critical: 'text-red-600',
      warning: 'text-yellow-600',
      normal: 'text-green-600',
    };
    return colors[status] || colors.normal;
  };

  const openAlerts = mockRiskAlerts.filter(a => a.status === 'open').length;
  const criticalAlerts = mockRiskAlerts.filter(a => a.riskLevel === 'critical').length;
  const resolvedToday = mockRiskAlerts.filter(a =>
    a.status === 'resolved' &&
    a.resolvedAt &&
    new Date(a.resolvedAt).toDateString() === new Date().toDateString()
  ).length;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Management & Alerts</h1>
          <p className="text-gray-500 mt-1">
            Monitor risks and compliance alerts across treasury operations
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Open Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{openAlerts}</div>
              <p className="text-xs text-gray-500 mt-1">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Critical Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{criticalAlerts}</div>
              <p className="text-xs text-gray-500 mt-1">Immediate action</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Resolved Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{resolvedToday}</div>
              <p className="text-xs text-gray-500 mt-1">Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Risk Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockRiskMetrics.length}</div>
              <p className="text-xs text-gray-500 mt-1">Being monitored</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="alerts">
          <TabsList>
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
            <TabsTrigger value="metrics">Risk Metrics</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Risk Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Alert Type</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Affected Entity</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRiskAlerts.filter(a => a.status !== 'resolved').map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell>
                          <Badge className={getRiskBadgeColor(alert.riskLevel)}>
                            {alert.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityBadgeColor(alert.priority)}>
                            {alert.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {alert.alertType.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{alert.title}</TableCell>
                        <TableCell className="max-w-xs text-sm">
                          {alert.description}
                        </TableCell>
                        <TableCell className="text-sm">{alert.affectedEntity || 'N/A'}</TableCell>
                        <TableCell className="text-right font-medium">
                          {alert.amount ? formatCurrency(alert.amount) : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={alert.status === 'open' ? 'destructive' : 'default'}>
                            {alert.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{alert.assignedTo || 'Unassigned'}</TableCell>
                        <TableCell>{formatDateTime(alert.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Metrics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {mockRiskMetrics.map((metric) => (
                    <Card key={metric.id} className="border-2">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            {metric.metricType.replace('_', ' ').toUpperCase()}
                          </CardTitle>
                          <Badge variant={
                            metric.status === 'critical' ? 'destructive' :
                            metric.status === 'warning' ? 'default' : 'outline'
                          }>
                            {metric.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-end justify-between">
                          <div>
                            <div className={`text-4xl font-bold ${getMetricStatusColor(metric.status)}`}>
                              {metric.value}%
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                              Threshold: {metric.threshold}%
                            </p>
                          </div>
                          {metric.status === 'critical' ? (
                            <TrendingDown className="h-12 w-12 text-red-600" />
                          ) : metric.status === 'warning' ? (
                            <AlertTriangle className="h-12 w-12 text-yellow-600" />
                          ) : (
                            <Shield className="h-12 w-12 text-green-600" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resolved" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Resolved Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  {resolvedToday} alerts resolved today
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
