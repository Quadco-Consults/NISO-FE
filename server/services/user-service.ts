import type { User, Entity } from '@/types';
import { getPermissionsForRole } from '@/lib/config/permissions';

// Mock entities (Power Sector Organizations)
export const MOCK_ENTITIES: Entity[] = [
  {
    id: '1',
    name: 'NISO - Nigeria Independent System Operator',
    code: 'NISO',
    type: 'niso',
    status: 'active',
    contactPerson: 'System Administrator',
    email: 'admin@niso.ng',
    phone: '+234-800-NISO-000',
    address: 'Plot 123, Central Business District, Abuja',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  // DisCos
  {
    id: '2',
    name: 'Abuja Electricity Distribution Company',
    code: 'AEDC',
    type: 'disco',
    status: 'active',
    contactPerson: 'John Okafor',
    email: 'finance@aedc.ng',
    phone: '+234-803-111-2222',
    address: 'Abuja, FCT',
    bankName: 'First Bank of Nigeria',
    accountNumber: '2001234567',
    accountName: 'AEDC Collection Account',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'Eko Electricity Distribution Company',
    code: 'EKEDC',
    type: 'disco',
    status: 'active',
    contactPerson: 'Adewale Johnson',
    email: 'finance@ekedp.com',
    phone: '+234-803-222-3333',
    address: 'Lagos',
    bankName: 'Zenith Bank',
    accountNumber: '1002345678',
    accountName: 'EKEDC Collection Account',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  // GenCos
  {
    id: '4',
    name: 'Egbin Power Plc',
    code: 'EGBIN',
    type: 'genco',
    status: 'active',
    contactPerson: 'Musa Ibrahim',
    email: 'billing@egbinpower.com',
    phone: '+234-803-333-4444',
    address: 'Egbin, Lagos',
    bankName: 'GTBank',
    accountNumber: '0123456789',
    accountName: 'Egbin Power Account',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '5',
    name: 'Kainji Hydro Electric Plc',
    code: 'KAINJI',
    type: 'genco',
    status: 'active',
    contactPerson: 'Aisha Mohammed',
    email: 'accounts@kainji.ng',
    phone: '+234-803-444-5555',
    address: 'Kainji, Niger State',
    bankName: 'Access Bank',
    accountNumber: '0234567890',
    accountName: 'Kainji Hydro Account',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  // TCN
  {
    id: '6',
    name: 'Transmission Company of Nigeria',
    code: 'TCN',
    type: 'tcn',
    status: 'active',
    contactPerson: 'Emeka Obi',
    email: 'finance@tcn.ng',
    phone: '+234-803-555-6666',
    address: 'Abuja, FCT',
    bankName: 'UBA',
    accountNumber: '1023456789',
    accountName: 'TCN Operations Account',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  // Other Entities
  {
    id: '7',
    name: 'Transitional Electricity Market Integration Fund',
    code: 'TIF',
    type: 'tif',
    status: 'active',
    contactPerson: 'Funmi Adebayo',
    email: 'info@tif.ng',
    phone: '+234-803-666-7777',
    address: 'Abuja, FCT',
    bankName: 'Fidelity Bank',
    accountNumber: '2034567890',
    accountName: 'TIF Account',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '8',
    name: 'Nigerian Electricity Regulatory Commission',
    code: 'NERC',
    type: 'nerc',
    status: 'active',
    contactPerson: 'Chidi Nwosu',
    email: 'info@nerc.ng',
    phone: '+234-803-777-8888',
    address: 'Abuja, FCT',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '9',
    name: 'Nigerian Bulk Electricity Trading Plc',
    code: 'NBET',
    type: 'nbet',
    status: 'active',
    contactPerson: 'Ngozi Eze',
    email: 'trading@nbet.ng',
    phone: '+234-803-888-9999',
    address: 'Abuja, FCT',
    bankName: 'Sterling Bank',
    accountNumber: '3045678901',
    accountName: 'NBET Trading Account',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

// Mock users
export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@niso.ng',
    name: 'System Administrator',
    role: 'super_admin',
    entityType: 'niso',
    entityId: '1',
    entityName: 'NISO - Nigeria Independent System Operator',
    department: 'IT & Systems',
    phone: '+234-803-000-0001',
    status: 'active',
    permissions: getPermissionsForRole('super_admin').map(p => p.id),
    lastLogin: new Date('2024-10-08'),
    createdBy: 'system',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'finance@niso.ng',
    name: 'Oluwaseun Adeyemi',
    role: 'finance_manager',
    entityType: 'niso',
    entityId: '1',
    entityName: 'NISO - Nigeria Independent System Operator',
    department: 'Finance',
    phone: '+234-803-000-0002',
    status: 'active',
    permissions: getPermissionsForRole('finance_manager').map(p => p.id),
    lastLogin: new Date('2024-10-08'),
    createdBy: '1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    email: 'billing@niso.ng',
    name: 'Chidinma Okonkwo',
    role: 'billing_manager',
    entityType: 'niso',
    entityId: '1',
    entityName: 'NISO - Nigeria Independent System Operator',
    department: 'Billing',
    phone: '+234-803-000-0003',
    status: 'active',
    permissions: getPermissionsForRole('billing_manager').map(p => p.id),
    lastLogin: new Date('2024-10-07'),
    createdBy: '1',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '4',
    email: 'john.okafor@aedc.ng',
    name: 'John Okafor',
    role: 'entity_user',
    entityType: 'disco',
    entityId: '2',
    entityName: 'Abuja Electricity Distribution Company',
    department: 'Finance',
    phone: '+234-803-111-2222',
    status: 'active',
    permissions: getPermissionsForRole('entity_user').map(p => p.id),
    lastLogin: new Date('2024-10-08'),
    createdBy: '1',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: '5',
    email: 'adewale.johnson@ekedp.com',
    name: 'Adewale Johnson',
    role: 'entity_user',
    entityType: 'disco',
    entityId: '3',
    entityName: 'Eko Electricity Distribution Company',
    department: 'Finance',
    phone: '+234-803-222-3333',
    status: 'active',
    permissions: getPermissionsForRole('entity_user').map(p => p.id),
    lastLogin: new Date('2024-10-07'),
    createdBy: '1',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05'),
  },
  {
    id: '6',
    email: 'musa.ibrahim@egbinpower.com',
    name: 'Musa Ibrahim',
    role: 'entity_user',
    entityType: 'genco',
    entityId: '4',
    entityName: 'Egbin Power Plc',
    department: 'Billing',
    phone: '+234-803-333-4444',
    status: 'active',
    permissions: getPermissionsForRole('entity_user').map(p => p.id),
    lastLogin: new Date('2024-10-06'),
    createdBy: '1',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: '7',
    email: 'emeka.obi@tcn.ng',
    name: 'Emeka Obi',
    role: 'entity_user',
    entityType: 'tcn',
    entityId: '6',
    entityName: 'Transmission Company of Nigeria',
    department: 'Finance',
    phone: '+234-803-555-6666',
    status: 'active',
    permissions: getPermissionsForRole('entity_user').map(p => p.id),
    lastLogin: new Date('2024-10-08'),
    createdBy: '1',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: '8',
    email: 'ngozi.eze@nbet.ng',
    name: 'Ngozi Eze',
    role: 'entity_user',
    entityType: 'nbet',
    entityId: '9',
    entityName: 'Nigerian Bulk Electricity Trading Plc',
    department: 'Trading',
    phone: '+234-803-888-9999',
    status: 'active',
    permissions: getPermissionsForRole('entity_user').map(p => p.id),
    lastLogin: new Date('2024-10-07'),
    createdBy: '1',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    id: '9',
    email: 'auditor@niso.ng',
    name: 'Fatima Bello',
    role: 'auditor',
    entityType: 'niso',
    entityId: '1',
    entityName: 'NISO - Nigeria Independent System Operator',
    department: 'Internal Audit',
    phone: '+234-803-000-0009',
    status: 'active',
    permissions: getPermissionsForRole('auditor').map(p => p.id),
    lastLogin: new Date('2024-10-08'),
    createdBy: '1',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: '10',
    email: 'collections@niso.ng',
    name: 'Ahmed Yusuf',
    role: 'debt_collector',
    entityType: 'niso',
    entityId: '1',
    entityName: 'NISO - Nigeria Independent System Operator',
    department: 'Collections',
    phone: '+234-803-000-0010',
    status: 'active',
    permissions: getPermissionsForRole('debt_collector').map(p => p.id),
    lastLogin: new Date('2024-10-05'),
    createdBy: '1',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
  },
];

// Service functions
export const userService = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_USERS;
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_USERS.find(user => user.id === id) || null;
  },

  // Get all entities
  getEntities: async (): Promise<Entity[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_ENTITIES;
  },

  // Get entity by ID
  getEntityById: async (id: string): Promise<Entity | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_ENTITIES.find(entity => entity.id === id) || null;
  },

  // Get users by entity
  getUsersByEntity: async (entityId: string): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_USERS.filter(user => user.entityId === entityId);
  },

  // Create user (mock)
  createUser: async (userData: Partial<User>): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser: User = {
      id: (MOCK_USERS.length + 1).toString(),
      email: userData.email || '',
      name: userData.name || '',
      role: userData.role || 'viewer',
      entityType: userData.entityType || 'niso',
      entityId: userData.entityId,
      entityName: userData.entityName,
      department: userData.department,
      phone: userData.phone,
      status: userData.status || 'active',
      permissions: userData.permissions || [],
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MOCK_USERS.push(newUser);
    return newUser;
  },

  // Update user (mock)
  updateUser: async (id: string, userData: Partial<User>): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_USERS.findIndex(user => user.id === id);
    if (index === -1) return null;

    MOCK_USERS[index] = {
      ...MOCK_USERS[index],
      ...userData,
      updatedAt: new Date(),
    };
    return MOCK_USERS[index];
  },

  // Delete user (mock)
  deleteUser: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_USERS.findIndex(user => user.id === id);
    if (index === -1) return false;

    MOCK_USERS.splice(index, 1);
    return true;
  },
};
