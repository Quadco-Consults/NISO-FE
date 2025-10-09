# User Management System Documentation

## Overview

The NISO ERP User Management System provides comprehensive role-based access control (RBAC) for managing users across the Nigerian power sector. This system allows NISO administrators to create and manage user accounts for various entities including DisCos, GenCos, TCN, NERC, NBET, TIF, IPPs, and Traders.

## Key Features

### 1. **Multi-Entity User Management**
- Support for 9 different entity types in the power sector
- NISO (System Operator)
- DisCos (Distribution Companies)
- GenCos (Generation Companies)
- TCN (Transmission Company of Nigeria)
- TIF (Transitional Electricity Market Integration Fund)
- NERC (Nigerian Electricity Regulatory Commission)
- NBET (Nigerian Bulk Electricity Trading Plc)
- IPPs (Independent Power Producers)
- Traders (Energy Traders)

### 2. **Role-Based Access Control**
The system includes 11 predefined user roles with specific permissions:

| Role | Description | Access Level |
|------|-------------|--------------|
| Super Admin | Full system access | All permissions |
| Admin | Administrative access | All except system settings modification |
| Finance Manager | Financial operations | Payments, disbursements, treasury, reconciliation |
| Billing Manager | Billing operations | Customers, billing, settlements |
| Debt Collector | Collections management | Customers, collections (read/write, no delete) |
| Auditor | Read-only audit access | All modules (view & export only) |
| Entity User | Limited entity access | Dashboard, billing, payments (view only) |
| Grid Operator | Grid operations | Dashboard, reports |
| Market Operator | Market operations | Dashboard, customers, settlements, reports |
| Customer Service | Customer support | Customers, dashboard (read/write, no delete) |
| Viewer | Read-only access | All modules (view only) |

### 3. **Granular Permissions System**
The system implements a fine-grained permission model with:
- **13 Module Types**: Dashboard, Customers, Billing, Payments, Disbursements, Settlements, Collections, Treasury, Reconciliation, Reports, Audit, Users, Settings
- **6 Action Types**: View, Create, Edit, Delete, Approve, Export
- **65+ Individual Permissions**: Each permission is a combination of module and action (e.g., `billing:create`, `payments:approve`)

### 4. **User Status Management**
Users can have four different statuses:
- **Active**: User can access the system
- **Inactive**: User account is disabled
- **Suspended**: User access is temporarily suspended
- **Pending**: User account awaiting activation

## Technical Architecture

### Type Definitions (`types/index.ts`)

```typescript
// Core user types
export type UserRole = 'super_admin' | 'admin' | 'finance_manager' | ...
export type EntityType = 'niso' | 'disco' | 'genco' | 'tcn' | ...
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending'

// User interface with full entity and permission info
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  entityType: EntityType;
  entityId?: string;
  entityName?: string;
  department?: string;
  phone?: string;
  status: UserStatus;
  permissions: string[];
  lastLogin?: Date;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Permission structure
export interface Permission {
  id: string;
  module: PermissionModule;
  action: PermissionAction;
  name: string;
  description: string;
}
```

### Permission Configuration (`lib/config/permissions.ts`)

The permissions configuration file:
- Defines all 65+ available permissions
- Maps permissions to each role
- Provides helper functions for permission checks

**Key Functions:**
```typescript
// Get all permissions for a specific role
getPermissionsForRole(role: UserRole): Permission[]

// Check if a role has a specific permission
hasPermission(role: UserRole, permissionId: string): boolean

// Check module-level permission
hasModulePermission(role: UserRole, module: string, action: string): boolean
```

### Service Layer (`server/services/user-service.ts`)

Mock data service providing:
- **10 Mock Users**: Sample users across different entities and roles
- **9 Mock Entities**: All power sector organizations
- CRUD operations for users and entities
- Entity-based user filtering

**Available Functions:**
```typescript
userService.getUsers(): Promise<User[]>
userService.getUserById(id: string): Promise<User | null>
userService.getEntities(): Promise<Entity[]>
userService.getUsersByEntity(entityId: string): Promise<User[]>
userService.createUser(userData: Partial<User>): Promise<User>
userService.updateUser(id: string, userData: Partial<User>): Promise<User | null>
userService.deleteUser(id: string): Promise<boolean>
```

### UI Components

#### Main User Management Page (`app/(users)/users/page.tsx`)

**Features:**
- User listing with advanced filtering (role, entity, status, search)
- Create new user dialog
- Edit user dialog
- Delete user confirmation
- Permission viewer
- User statistics dashboard
- Action dropdown menu for each user

**Filters:**
- Search by name, email, or entity
- Filter by role (11 options)
- Filter by entity type (9 options)
- Filter by status (4 options)

**User Actions:**
- Edit user details
- View user permissions
- Reset password
- Delete user

#### Permissions Dialog (`components/features/users/permissions-dialog.tsx`)

Interactive permission viewer with 4 tabs:
1. **All Permissions**: Shows all permissions with granted/denied status
2. **Granted**: Lists only permissions the user has
3. **Denied**: Lists permissions the user doesn't have
4. **Summary**: Statistics and breakdown by module/action

### Authentication Store (`lib/store/auth-store.ts`)

Enhanced with permission checking:
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasRole: (roles: string | string[]) => boolean;
  hasPermission: (permissionId: string) => boolean;
  hasModuleAccess: (module: string) => boolean;
}
```

## Usage Guide

### Accessing User Management

1. Log in as admin or super_admin
2. Navigate to **User Management** from the sidebar
3. The user list will display with filtering options

### Creating a New User

1. Click **Add User** button
2. Fill in user details:
   - Full Name (required)
   - Email (required)
   - Phone (optional)
   - Department (optional)
   - Role (required) - Select from dropdown
   - Status (required) - Usually "Active" or "Pending"
   - Entity Type (required) - Select organization type
   - Entity (required) - Select specific organization
3. Click **Create User**
4. Permissions are automatically assigned based on the selected role

### Editing a User

1. Click the **⋮** menu next to the user
2. Select **Edit User**
3. Modify user details
4. Click **Update User**

### Viewing User Permissions

1. Click the **⋮** menu next to the user
2. Select **View Permissions**
3. Navigate through tabs to see:
   - All permissions with status
   - Only granted permissions
   - Only denied permissions
   - Permission summary and statistics

### User Status Management

Change user status to:
- **Active**: Enable user access
- **Inactive**: Disable user account
- **Suspended**: Temporarily suspend access
- **Pending**: Mark for activation

### Deleting a User

1. Click the **⋮** menu next to the user
2. Select **Delete User**
3. Confirm deletion
4. User is removed from the system

## Power Sector Workflow

### Typical User Hierarchy

```
NISO (Central Authority)
├── Super Admin (Full access)
├── Finance Manager (Manages all payments & disbursements)
├── Billing Manager (Creates invoices for all entities)
└── Auditor (Reviews all transactions)

DisCos/GenCos/TCN/Others (Entities)
└── Entity User (View own invoices, payments, reports)
```

### Payment Flow Example

1. **NISO Finance Manager** receives payments from all entities
2. **NISO Billing Manager** creates invoices for services
3. **Entity Users** (DisCo, GenCo, etc.) view their invoices and payment status
4. **NISO Finance Manager** disburses funds to GenCos, TCN, etc.
5. **Auditor** reviews all transactions

## Security Features

1. **Role-Based Access**: Users only see modules they have permission to access
2. **Entity Isolation**: Entity users only see their organization's data
3. **Audit Trail**: All user actions are logged (when connected to backend)
4. **Status Control**: Admins can suspend or deactivate users instantly
5. **Permission Granularity**: Fine-grained control over every action

## Integration Points

### Backend Integration (Future)

When connecting to a real backend:

1. Replace mock service with API calls
2. Implement authentication endpoint
3. Add permission middleware for API routes
4. Store user sessions securely
5. Implement audit logging

### Suggested API Endpoints

```
POST   /api/users              - Create user
GET    /api/users              - List users
GET    /api/users/:id          - Get user details
PUT    /api/users/:id          - Update user
DELETE /api/users/:id          - Delete user
GET    /api/users/:id/permissions - Get user permissions
POST   /api/users/:id/reset-password - Reset password
GET    /api/entities           - List all entities
```

## Customization

### Adding New Roles

1. Update `UserRole` type in `types/index.ts`
2. Add role to `USER_ROLES` in `lib/constants/index.ts`
3. Define permissions in `lib/config/permissions.ts`
4. Add to `ROLE_PERMISSIONS` mapping

### Adding New Permissions

1. Create permission object in `ALL_PERMISSIONS` array
2. Assign to appropriate roles in `ROLE_PERMISSIONS`
3. Add permission checks in UI components where needed

### Adding New Entity Types

1. Update `EntityType` in `types/index.ts`
2. Add to `ENTITY_TYPES` in `lib/constants/index.ts`
3. Create entity records in `user-service.ts`

## Troubleshooting

### User can't access a module
- Check user's role and assigned permissions
- Verify navigation is configured for that role in `lib/constants/index.ts`
- Check if user status is "Active"

### Permissions not updating
- Ensure permissions are recalculated when role changes
- Check `getPermissionsForRole()` function
- Verify auth store is updated after user changes

### Entity user sees wrong data
- Verify entityId and entityType are correctly set
- Implement entity-level filtering in data queries
- Check permission middleware on API routes

## Best Practices

1. **Always assign minimum required permissions** - Follow principle of least privilege
2. **Use Entity Users for external organizations** - Keep NISO roles for internal staff
3. **Regular permission audits** - Review user permissions quarterly
4. **Deactivate instead of delete** - Set status to "Inactive" to preserve audit trail
5. **Use department field** - Helps organize users within large entities
6. **Monitor last login** - Identify inactive accounts

## Support

For issues or questions about the user management system:
- Check this documentation
- Review permission configuration in `lib/config/permissions.ts`
- Examine mock data in `server/services/user-service.ts`
- Test with different user roles to understand access levels

---

**Version**: 1.0.0
**Last Updated**: October 2025
**Status**: ✅ Complete and Ready for Backend Integration
