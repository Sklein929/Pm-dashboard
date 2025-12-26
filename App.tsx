
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Properties } from './components/Properties';
import { Tenants } from './components/Tenants';
import { Financials } from './components/Financials';
import { Maintenance } from './components/Maintenance';
import { Reports } from './components/Reports';
import { Messages } from './components/Messages';
import { DashboardStats, Priority, MaintenanceRequest, PaymentRecord, Property, Tenant, Transaction, Conversation } from './types';

const INITIAL_STATS: DashboardStats = {
  totalProperties: 124,
  occupancyRate: 94,
  rentCollected: 45200,
  activeRequests: 8,
  revenueHistory: [
    { month: 'Feb', amount: 18000 },
    { month: 'Mar', amount: 24000 },
    { month: 'Apr', amount: 20000 },
    { month: 'May', amount: 28000 },
    { month: 'Jun', amount: 35000 },
    { month: 'Jul', amount: 45200 },
  ]
};

const INITIAL_MAINTENANCE: MaintenanceRequest[] = [
  {
    id: '1',
    title: 'Leaking Roof - Unit 4B',
    unit: '4B',
    property: 'Highland Apartments',
    description: 'Tenant reported severe leak during storm.',
    priority: Priority.HIGH,
    status: 'In Progress',
    timeAgo: '2 hours ago',
    icon: 'water_drop'
  },
  {
    id: '2',
    title: 'AC Malfunction - Unit 12',
    unit: '12',
    property: 'Sunnyvale Plaza',
    description: 'Unit is not cooling below 80 degrees.',
    priority: Priority.MED,
    status: 'New',
    timeAgo: '5 hours ago',
    icon: 'hvac'
  }
];

const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'p1',
    tenantName: 'Sarah Jenkins',
    tenantImage: 'https://picsum.photos/seed/sarah/100/100',
    property: 'Highland Apt #304',
    date: 'July 24, 2023',
    amount: 1250,
    status: 'Paid'
  }
];

const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop1',
    name: 'Highland Apartments',
    address: '423 Highland Dr, Seattle, WA',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=400',
    units: 24,
    occupied: 22,
    monthlyRent: 35000,
    status: 'Active',
    type: 'Residential'
  }
];

const INITIAL_TENANTS: Tenant[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@outlook.com',
    phone: '(206) 555-0123',
    propertyId: 'prop1',
    propertyName: 'Highland Apartments',
    unit: '304',
    rentStatus: 'Current',
    leaseEnd: 'Aug 12, 2024',
    image: 'https://picsum.photos/seed/sarah/100/100'
  }
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 't1', category: 'Rent', property: 'Highland Apt', date: 'July 24', amount: 35000, type: 'Income', status: 'Completed' }
];

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    participantName: 'Sarah Jenkins',
    participantImage: 'https://picsum.photos/seed/sarah/100/100',
    participantRole: 'Tenant - Unit 304',
    lastMessage: 'Is there an update on the kitchen faucet?',
    lastMessageTime: '10:45 AM',
    unreadCount: 2,
    online: true,
    messages: [
      { id: 'm1', senderId: 't1', text: 'Hi, I just noticed the faucet in the kitchen is dripping.', timestamp: '9:00 AM', isMe: false },
      { id: 'm2', senderId: 'admin', text: 'Thanks for letting us know, Sarah. I will send a plumber today.', timestamp: '9:15 AM', isMe: true },
      { id: 'm3', senderId: 't1', text: 'Great, thank you! Will they need me to be home?', timestamp: '9:20 AM', isMe: false },
      { id: 'm4', senderId: 't1', text: 'Is there an update on the kitchen faucet?', timestamp: '10:45 AM', isMe: false },
    ]
  },
  {
    id: 'c2',
    participantName: 'Robert Vance',
    participantImage: 'https://picsum.photos/seed/vance/100/100',
    participantRole: 'Maintenance Lead',
    lastMessage: 'All clear on the roof repairs for Bldg A.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    online: false,
    messages: [
      { id: 'm1', senderId: 'vance', text: 'The materials arrived for the roof job.', timestamp: 'Yesterday', isMe: false },
      { id: 'm2', senderId: 'vance', text: 'All clear on the roof repairs for Bldg A.', timestamp: 'Yesterday', isMe: false },
    ]
  },
  {
    id: 'c3',
    participantName: 'Michael Ross',
    participantImage: 'https://picsum.photos/seed/michael/100/100',
    participantRole: 'Tenant - Unit 12C',
    lastMessage: 'Rent payment confirmed, thanks!',
    lastMessageTime: 'Jul 22',
    unreadCount: 0,
    online: true,
    messages: [
      { id: 'm1', senderId: 'mross', text: 'Just sent the rent for July.', timestamp: 'Jul 22', isMe: false },
      { id: 'm2', senderId: 'admin', text: 'Rent payment confirmed, thanks!', timestamp: 'Jul 22', isMe: true },
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const goToMessages = () => setActiveTab('Messages');

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard stats={INITIAL_STATS} maintenance={INITIAL_MAINTENANCE} payments={INITIAL_PAYMENTS} />;
      case 'Properties':
        return <Properties properties={INITIAL_PROPERTIES} />;
      case 'Tenants':
        return <Tenants tenants={INITIAL_TENANTS} />;
      case 'Financials':
        return <Financials transactions={INITIAL_TRANSACTIONS} />;
      case 'Maintenance':
        return <Maintenance requests={INITIAL_MAINTENANCE} />;
      case 'Reports':
        return <Reports />;
      case 'Messages':
        return <Messages conversations={INITIAL_CONVERSATIONS} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <span className="material-symbols-outlined text-6xl mb-4">construction</span>
            <h2 className="text-2xl font-bold">{activeTab} View Coming Soon</h2>
            <button 
              onClick={() => setActiveTab('Dashboard')}
              className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Go back to Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex flex-1 flex-col overflow-y-auto">
        <Header 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
          onBellClick={goToMessages} 
        />
        <div className="flex-1 overflow-x-hidden p-6 lg:p-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
