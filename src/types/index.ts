export type ProductCategory = 'all' | 'consoles' | 'games' | 'accessories' | 'controllers';

export interface Product {
  id: string;
  name: string;
  category: 'consoles' | 'games' | 'accessories' | 'controllers';
  brand: 'PlayStation' | 'Xbox' | 'Nintendo' | 'Universal';
  price: number; // in NGN (₦)
  originalPrice?: number;
  condition: 'Brand New' | 'Certified Pre-Owned';
  inStock: boolean;
  stockCount: number;
  image: string;
  description: string;
  features: string[];
  specs?: Record<string, string>;
  warranty: string;
}

export interface RepairService {
  id: string;
  title: string;
  platform: 'PlayStation 5' | 'PlayStation 4' | 'Xbox Series' | 'Xbox One' | 'Nintendo Switch' | 'Controllers';
  estimatedCost: number; // in NGN
  turnaroundTime: string;
  commonSymptoms: string[];
  warrantyMonths: number;
  description: string;
  popular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface RepairAppointment {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deviceType: string;
  serialNumber?: string;
  issueDescription: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: 'Shop Drop-Off (Dugbe)' | 'Pickup & Delivery in Ibadan' | 'Waybill Delivery (Nationwide)';
  urgency: 'Standard (1-2 Days)' | 'Express Same-Day Priority';
  status: 'Appointment Confirmed' | 'Device Received' | 'Under Diagnosis' | 'Repairing & Sourcing Parts' | 'Quality Testing' | 'Ready for Pickup';
  estimatedCost: number;
  createdAt: string;
  technicianNotes?: string;
}

export interface TradeInQuote {
  deviceCategory: string;
  model: string;
  condition: 'Brand New' | 'Like New (Flawless)' | 'Good (Minor wear)' | 'Faulty / Needs Repair';
  includedItems: string[];
  estimatedMin: number;
  estimatedMax: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'technician' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  suggestedReplies?: string[];
}

export interface GameDemo {
  id: string;
  title: string;
  studio: string;
  genre: string;
  category: 'Blockbusters' | 'PlayStation Exclusives' | 'Upcoming' | 'Action RPG' | 'Sports';
  platforms: string[];
  releaseStatus: 'In Store Now (Discs Ready)' | 'Playable on Dugbe OLED Station' | 'Pre-Order / Upcoming 2026';
  resolutionBadge: string;
  poster: string;
  trailerUrl: string;
  description: string;
  keyFeatures: string[];
  discPrice?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  tier: 'Regular Gamer' | 'VIP Pro Member';
  registeredAt: string;
  savedOrders?: Array<{
    id: string;
    date: string;
    items: string;
    totalAmount: number;
    status: 'Confirmed' | 'Processing' | 'Delivered';
  }>;
}


