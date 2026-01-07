import OrderCard from "../../components/order-card/order-card.tsx";

export default function pending() {

  // Mock data for demonstration
const mockOrderData = {
  orderId: 'ORD-2024-001457',
  status: 'Delivered' ,
  orderDate: 'Jan 2, 2026',
  orderTime: '14:32 PM',
  customerName: 'Sarah Johnson',
  businessName: 'Bella Vista Restaurant',
  deliveryAddress: '1234 Ocean Drive, Suite 200, Miami Beach, FL 33139',
  phoneNumber: '+1 (305) 555-0128',
  assignedManager: 'Michael Chen',
  items: [
    {
      id: '1',
      name: 'Premium Organic Coffee Beans (1kg)',
      quantity: 5,
      pricePerUnit: 24.99,
    },
    {
      id: '2',
      name: 'Fresh Pasta Variety Pack',
      quantity: 3,
      pricePerUnit: 18.50,
    },
    {
      id: '3',
      name: 'Extra Virgin Olive Oil (500ml)',
      quantity: 8,
      pricePerUnit: 15.75,
    },
    {
      id: '4',
      name: 'Artisan Bread Mix (2.5kg)',
      quantity: 2,
      pricePerUnit: 32.00,
    },
    {
      id: '5',
      name: 'Imported Italian Tomatoes (6-pack)',
      quantity: 4,
      pricePerUnit: 12.99,
    },
  ],
  subtotal: 456.41,
  discount: 45.64,
  deliveryFee: 15.00,
  paymentMethod: 'Credit Card (**** 4532)',
  paymentStatus: 'Paid' as const,
  timeline: [
    {
      id: 't1',
      action: 'Order status updated',
      previousStatus: 'Confirmed' as const,
      newStatus: 'In Progress' as const,
      userName: 'Michael Chen',
      userRole: 'Manager' as const,
      timestamp: 'Jan 2, 2026 at 15:45 PM',
    },
    {
      id: 't2',
      action: 'Order confirmed',
      previousStatus: 'New' as const,
      newStatus: 'Confirmed' as const,
      userName: 'Emily Rodriguez',
      userRole: 'Admin' as const,
      timestamp: 'Jan 2, 2026 at 14:50 PM',
    },
    {
      id: 't3',
      action: 'Order created',
      previousStatus: null,
      newStatus: 'New' as const,
      userName: 'System',
      userRole: 'Admin' as const,
      timestamp: 'Jan 2, 2026 at 14:32 PM',
    },
  ],
};
  return (
    <div>
      <h1>pending</h1>
      <OrderCard order={mockOrderData}/>
    </div>
  )
}
