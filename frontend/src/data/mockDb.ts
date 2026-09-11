export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  status: 'New' | 'Qualified' | 'Contacted' | 'Lost' | 'Won';
  score: number;
  last_contact: string;
  property_interest: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: string;
  status: 'Available' | 'Sold' | 'Pending';
}

export interface Task {
  id: string;
  assigned_to: string;
  due_date: string;
  status: 'Pending' | 'Completed';
  related_lead: string;
}

export interface Interaction {
  id: string;
  lead_id: string;
  channel: 'WhatsApp' | 'Email' | 'SMS' | 'Call';
  message: string;
  timestamp: string;
  ai_generated: boolean;
}

export const MOCK_PROPERTIES: Property[] = [
  { id: 'p1', title: 'Luxury Villa 4BHK', location: 'Beverly Hills', price: 2500000, type: 'Villa', status: 'Available' },
  { id: 'p2', title: 'Modern Downtown Apartment', location: 'City Center', price: 850000, type: 'Apartment', status: 'Available' },
  { id: 'p3', title: 'Seaview Penthouse', location: 'Marina Bay', price: 3200000, type: 'Penthouse', status: 'Pending' },
  { id: 'p4', title: 'Suburban Family Home', location: 'Oakwood', price: 650000, type: 'House', status: 'Available' }
];

export const MOCK_LEADS: Lead[] = [
  { id: 'l1', name: 'John Doe', phone: '+1 555-0101', email: 'john@example.com', source: 'Facebook Ads', status: 'New', score: 85, last_contact: '2023-10-25T10:00:00Z', property_interest: 'p1' },
  { id: 'l2', name: 'Sarah Smith', phone: '+1 555-0102', email: 'sarah@example.com', source: 'Website', status: 'Qualified', score: 92, last_contact: '2023-10-24T14:30:00Z', property_interest: 'p2' },
  { id: 'l3', name: 'Mike Johnson', phone: '+1 555-0103', email: 'mike@example.com', source: 'Instagram', status: 'Contacted', score: 65, last_contact: '2023-10-20T09:15:00Z', property_interest: 'p4' },
  { id: 'l4', name: 'Emily Davis', phone: '+1 555-0104', email: 'emily@example.com', source: 'Referral', status: 'Won', score: 99, last_contact: '2023-10-15T16:45:00Z', property_interest: 'p3' },
  { id: 'l5', name: 'David Wilson', phone: '+1 555-0105', email: 'david@example.com', source: 'Google Ads', status: 'New', score: 45, last_contact: '2023-10-26T11:20:00Z', property_interest: 'p2' }
];

export const MOCK_INTERACTIONS: Interaction[] = [
  { id: 'i1', lead_id: 'l1', channel: 'WhatsApp', message: 'Hi, I saw your ad for the Luxury Villa.', timestamp: '2023-10-25T09:55:00Z', ai_generated: false },
  { id: 'i2', lead_id: 'l2', channel: 'Email', message: 'Can you send me the floor plan for the Downtown Appt?', timestamp: '2023-10-24T14:20:00Z', ai_generated: false },
  { id: 'i3', lead_id: 'l2', channel: 'Email', message: 'Absolutely! Attached is the detailed floor plan. Would you like to schedule a viewing this weekend?', timestamp: '2023-10-24T14:30:00Z', ai_generated: true }
];

export const PIPELINE_DATA = [
  { name: 'New Leads', value: 45 },
  { name: 'Contacted', value: 30 },
  { name: 'Qualified', value: 15 },
  { name: 'Proposals', value: 8 },
  { name: 'Won', value: 4 }
];

export const REVENUE_DATA = [
  { month: 'Jan', revenue: 120000 },
  { month: 'Feb', revenue: 150000 },
  { month: 'Mar', revenue: 180000 },
  { month: 'Apr', revenue: 140000 },
  { month: 'May', revenue: 210000 },
  { month: 'Jun', revenue: 250000 },
  { month: 'Jul', revenue: 220000 },
  { month: 'Aug', revenue: 280000 },
];
