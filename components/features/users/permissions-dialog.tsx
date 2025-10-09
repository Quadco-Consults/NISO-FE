'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X } from 'lucide-react';
import { ALL_PERMISSIONS } from '@/lib/config/permissions';
import { PERMISSION_MODULES, PERMISSION_ACTIONS } from '@/lib/constants';
import type { User, PermissionModule } from '@/types';

interface PermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

export function PermissionsDialog({ open, onOpenChange, user }: PermissionsDialogProps) {
  if (!user) return null;

  // Group permissions by module
  const permissionsByModule = ALL_PERMISSIONS.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, typeof ALL_PERMISSIONS>);

  const hasPermission = (permissionId: string) => {
    return user.permissions.includes(permissionId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>User Permissions</DialogTitle>
          <DialogDescription>
            Viewing permissions for {user.name} ({user.role})
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Permissions</TabsTrigger>
            <TabsTrigger value="granted">Granted</TabsTrigger>
            <TabsTrigger value="denied">Not Granted</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                {Object.entries(permissionsByModule).map(([module, permissions]) => (
                  <div key={module}>
                    <h3 className="text-sm font-semibold mb-3">
                      {PERMISSION_MODULES[module as PermissionModule]}
                    </h3>
                    <div className="space-y-2">
                      {permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-center justify-between p-2 rounded-lg border"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{permission.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {PERMISSION_ACTIONS[permission.action]}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {permission.description}
                            </p>
                          </div>
                          <div>
                            {hasPermission(permission.id) ? (
                              <Check className="h-5 w-5 text-green-600" />
                            ) : (
                              <X className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="granted" className="mt-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {ALL_PERMISSIONS.filter(p => hasPermission(p.id)).map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-green-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{permission.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {PERMISSION_MODULES[permission.module]}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {PERMISSION_ACTIONS[permission.action]}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {permission.description}
                      </p>
                    </div>
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="denied" className="mt-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {ALL_PERMISSIONS.filter(p => !hasPermission(p.id)).map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">{permission.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {PERMISSION_MODULES[permission.module]}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {PERMISSION_ACTIONS[permission.action]}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {permission.description}
                      </p>
                    </div>
                    <X className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="summary" className="mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border bg-blue-50">
                  <div className="text-2xl font-bold text-blue-600">
                    {user.permissions.length}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Permissions</p>
                </div>
                <div className="p-4 rounded-lg border bg-green-50">
                  <div className="text-2xl font-bold text-green-600">
                    {user.permissions.filter(p => p.includes(':view')).length}
                  </div>
                  <p className="text-sm text-muted-foreground">View Permissions</p>
                </div>
                <div className="p-4 rounded-lg border bg-purple-50">
                  <div className="text-2xl font-bold text-purple-600">
                    {user.permissions.filter(p => p.includes(':create') || p.includes(':edit') || p.includes(':delete')).length}
                  </div>
                  <p className="text-sm text-muted-foreground">Write Permissions</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold mb-3">Permissions by Module</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(PERMISSION_MODULES).map(([module, label]) => {
                    const modulePermissions = user.permissions.filter(p => p.startsWith(`${module}:`));
                    return (
                      <div key={module} className="flex items-center justify-between p-2 rounded border">
                        <span className="text-sm">{label}</span>
                        <Badge variant={modulePermissions.length > 0 ? 'default' : 'outline'}>
                          {modulePermissions.length}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold mb-3">Permissions by Action</h3>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(PERMISSION_ACTIONS).map(([action, label]) => {
                    const actionPermissions = user.permissions.filter(p => p.includes(`:${action}`));
                    return (
                      <div key={action} className="flex items-center justify-between p-2 rounded border">
                        <span className="text-sm">{label}</span>
                        <Badge variant={actionPermissions.length > 0 ? 'default' : 'outline'}>
                          {actionPermissions.length}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
