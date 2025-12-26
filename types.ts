
export enum Priority {
  HIGH = 'HIGH',
  MED = 'MED',
  LOW = 'LOW'
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  unit: string;
  property: string;
  description: string;
  priority: Priority;
  status: 'New' | 'In Progress' | 'Resolved' | 'On Hold';
  timeAgo: string;
  icon: string;
  assignedTo?: string;
}

export interface PaymentRecord {
  id: string;
  tenantName: string;
  tenantImage?: string;
  property: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface DashboardStats {
  totalProperties: number;
  occupancyRate: number;
  rentCollected: number;
  activeRequests: number;
  revenueHistory: { month: string; amount: number }[];
}

export interface Property {
  id: string;
  name: string;
  address: string;
  image: string;
  units: number;
  occupied: number;
  monthlyRent: number;
  status: 'Active' | 'Under Maintenance' | 'Renovating';
  type: 'Residential' | 'Commercial' | 'Industrial';
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  propertyName: string;
  unit: string;
  rentStatus: 'Current' | 'Late' | 'Pending';
  leaseEnd: string;
  image?: string;
}

export interface Transaction {
  id: string;
  category: string;
  property: string;
  date: string;
  amount: number;
  type: 'Income' | 'Expense';
  status: 'Completed' | 'Processing';
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantImage?: string;
  participantRole: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  messages: Message[];
}
