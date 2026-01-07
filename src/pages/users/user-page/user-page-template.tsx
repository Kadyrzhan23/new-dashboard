import { UserOverview } from "./UserOverview.tsx";
import { AddressSection } from "./AddressSection.tsx";
import { PurchaseAnalytics } from "./PurchaseAnalytics.tsx";
import { OrderHistoryTable } from "./OrderHistoryTable.tsx";

// Mock user data
const mockUser = {
  id: "47832",
  fullName: "Sarah Johnson",
  phone: "+1 (555) 123-4567",
  role: "manager",
  telegram: "@sarahjohnson",
  status: "active" as const,
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  manager: {
    name: "Michael Roberts",
    id: "12345",
  },
  registrationDate: "March 15, 2024",
  birthday: "August 22, 1990",
};

// Mock addresses
const mockAddresses = [
  {
    id: "1",
    organization: "Tech Solutions Inc.",
    street: "1234 Innovation Drive, San Francisco, CA 94105",
  },
  {
    id: "2",
    organization: "Creative Studio",
    street:
      "5678 Design Boulevard, Suite 200, San Francisco, CA 94107",
  },
  {
    id: "3",
    organization: "Home Office",
    street: "910 Residential Lane, Apt 4B, Oakland, CA 94612",
  },
];

// Mock analytics
const mockAnalytics = {
  totalOrders: 127,
  totalSpent: 45620.5,
  averageOrderValue: 359.21,
  topProducts: [
    { name: "Premium Wireless Headphones", count: 24 },
    { name: "Smart Watch Series 5", count: 18 },
    { name: "Laptop Stand Pro", count: 15 },
  ],
  recentOrders: [
    {
      id: "ORD-1289",
      date: "Jan 2, 2026",
      products: ["Wireless Mouse", "USB-C Cable"],
      amount: 89.99,
    },
    {
      id: "ORD-1278",
      date: "Dec 28, 2025",
      products: ["Mechanical Keyboard"],
      amount: 149.99,
    },
    {
      id: "ORD-1265",
      date: "Dec 22, 2025",
      products: ["Monitor Stand", "Cable Organizer"],
      amount: 75.5,
    },
    {
      id: "ORD-1251",
      date: "Dec 15, 2025",
      products: ["Desk Lamp LED"],
      amount: 45.0,
    },
    {
      id: "ORD-1242",
      date: "Dec 10, 2025",
      products: ["Ergonomic Chair Cushion"],
      amount: 39.99,
    },
  ],
};

// Mock order history
const mockOrders = [
  {
    id: "ORD-1289",
    date: "Jan 2, 2026",
    products: ["Wireless Mouse", "USB-C Cable"],
    quantity: 2,
    total: 89.99,
    status: "completed" as const,
    paymentType: "Credit Card",
  },
  {
    id: "ORD-1278",
    date: "Dec 28, 2025",
    products: ["Mechanical Keyboard"],
    quantity: 1,
    total: 149.99,
    status: "completed" as const,
    paymentType: "PayPal",
  },
  {
    id: "ORD-1265",
    date: "Dec 22, 2025",
    products: ["Monitor Stand", "Cable Organizer"],
    quantity: 2,
    total: 75.5,
    status: "completed" as const,
    paymentType: "Credit Card",
  },
  {
    id: "ORD-1251",
    date: "Dec 15, 2025",
    products: ["Desk Lamp LED"],
    quantity: 1,
    total: 45.0,
    status: "processing" as const,
    paymentType: "Debit Card",
  },
  {
    id: "ORD-1242",
    date: "Dec 10, 2025",
    products: ["Ergonomic Chair Cushion"],
    quantity: 1,
    total: 39.99,
    status: "completed" as const,
    paymentType: "Credit Card",
  },
  {
    id: "ORD-1230",
    date: "Dec 5, 2025",
    products: ["Premium Wireless Headphones", "Carrying Case"],
    quantity: 2,
    total: 299.99,
    status: "completed" as const,
    paymentType: "PayPal",
  },
  {
    id: "ORD-1218",
    date: "Nov 28, 2025",
    products: ["Smart Watch Series 5"],
    quantity: 1,
    total: 399.0,
    status: "completed" as const,
    paymentType: "Credit Card",
  },
  {
    id: "ORD-1205",
    date: "Nov 20, 2025",
    products: ["Laptop Stand Pro", "Wireless Charger"],
    quantity: 2,
    total: 189.99,
    status: "completed" as const,
    paymentType: "Debit Card",
  },
  {
    id: "ORD-1192",
    date: "Nov 15, 2025",
    products: ["Noise Cancelling Earbuds"],
    quantity: 1,
    total: 179.99,
    status: "cancelled" as const,
    paymentType: "Credit Card",
  },
  {
    id: "ORD-1178",
    date: "Nov 8, 2025",
    products: ["4K Webcam", "Microphone Stand"],
    quantity: 2,
    total: 249.99,
    status: "completed" as const,
    paymentType: "PayPal",
  },
  {
    id: "ORD-1165",
    date: "Nov 1, 2025",
    products: ["Blue Light Glasses"],
    quantity: 1,
    total: 49.99,
    status: "pending" as const,
    paymentType: "Cash",
  },
  {
    id: "ORD-1152",
    date: "Oct 25, 2025",
    products: ["USB Hub 7-Port", "HDMI Cable"],
    quantity: 2,
    total: 65.99,
    status: "completed" as const,
    paymentType: "Credit Card",
  },
];

export default function userCard() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <h1 className="text-2xl sm:text-3xl">User Profile</h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-1 sm:mt-2">
            View and manage user information, addresses, and
            order history
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {/* User Overview Section */}
          <UserOverview user={mockUser} />

          {/* Address Section */}
          <AddressSection addresses={mockAddresses} />

          {/* Purchase Analytics Section */}
          <PurchaseAnalytics analytics={mockAnalytics} />

          {/* Order History Table */}
          <OrderHistoryTable orders={mockOrders} />
        </div>
      </div>
    </div>
  );
}