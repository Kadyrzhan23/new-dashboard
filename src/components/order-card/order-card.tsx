import { Package, User, MapPin, Phone, CreditCard, Truck, Store, Calendar, Clock, Circle } from 'lucide-react';
import { Badge } from './ui/badge.tsx';
import { Button } from './ui/button.tsx';
import { Card } from './ui/card.tsx';
import { Separator } from './ui/separator.tsx';

type OrderStatus = 'New' | 'Confirmed' | 'In Progress' | 'Delivered' | 'Cancelled';
type PaymentStatus = 'Paid' | 'Pending' | 'Failed';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  pricePerUnit: number;
}

interface TimelineEntry {
  id: string;
  action: string;
  previousStatus: OrderStatus | null;
  newStatus: OrderStatus;
  userName: string;
  userRole: 'Admin' | 'Manager';
  timestamp: string;
}

interface OrderData {
  orderId: string;
  status: OrderStatus;
  orderDate: string;
  orderTime: string;
  customerName: string;
  businessName: string;
  deliveryAddress: string;
  phoneNumber: string;
  assignedManager: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  timeline: TimelineEntry[];
}

const getStatusColor = (status: OrderStatus): string => {
  const colors = {
    'New': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    'Confirmed': 'bg-green-100 text-green-800 hover:bg-green-100',
    'In Progress': 'bg-amber-100 text-amber-800 hover:bg-amber-100',
    'Delivered': 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100',
    'Cancelled': 'bg-red-100 text-red-800 hover:bg-red-100',
  };
  return colors[status];
};

const getPaymentStatusColor = (status: PaymentStatus): string => {
  const colors = {
    'Paid': 'bg-green-100 text-green-800 hover:bg-green-100',
    'Pending': 'bg-amber-100 text-amber-800 hover:bg-amber-100',
    'Failed': 'bg-red-100 text-red-800 hover:bg-red-100',
  };
  return colors[status];
};

function OrderCard({ order }: { order: OrderData }) {
  const total = order.subtotal - order.discount + order.deliveryFee;

  return (
    <Card className="w-full max-w-7xl mx-auto bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-gray-600" />
            <h2 className="font-semibold text-gray-900">Order #{order.orderId}</h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Badge className={getStatusColor(order.status)}>
              {order.status}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{order.orderDate}</span>
              <Clock className="w-4 h-4 ml-2" />
              <span>{order.orderTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Customer & Business Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 mb-4">Customer Information</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Customer Name</p>
                  <p className="text-gray-900">{order.customerName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Store className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Business Name</p>
                  <p className="text-gray-900">{order.businessName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Delivery Address</p>
                  <p className="text-gray-900">{order.deliveryAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-gray-900">{order.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 mb-4">Order Management</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Assigned Manager</p>
                  <p className="text-gray-900">{order.assignedManager}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Delivery Status</p>
                  <Badge className={getStatusColor(order.status)} variant="outline">
                    {order.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Order Items Table */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Order Items</h3>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Product Name</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Quantity</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Price/Unit</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-gray-900">{item.name}</td>
                    <td className="py-3 px-4 text-center text-gray-700">{item.quantity}</td>
                    <td className="py-3 px-4 text-right text-gray-700">${item.pricePerUnit.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">${(item.quantity * item.pricePerUnit).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Separator />

        {/* Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Payment Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="text-gray-900">{order.paymentMethod}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Circle className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                    {order.paymentStatus}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Order Summary</h3>
            <div className="space-y-2 bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Discount</span>
                <span className="text-red-600">-${order.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="text-gray-900">${order.deliveryFee.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total Amount</span>
                <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Actions</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 sm:flex-none" variant="default">
              Change Status
            </Button>
            <Button className="flex-1 sm:flex-none" variant="outline">
              Confirm Order
            </Button>
            <Button className="flex-1 sm:flex-none" variant="outline">
              Cancel Order
            </Button>
          </div>
        </div>

        <Separator />

        {/* Order Activity Timeline */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Order Activity</h3>
          <div className="space-y-4">
            {order.timeline.map((entry, index) => (
              <div key={entry.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Circle className={`w-4 h-4 ${index === 0 ? 'text-blue-600 fill-blue-600' : 'text-gray-400'}`} />
                  </div>
                  {index !== order.timeline.length - 1 && (
                    <div className="w-0.5 h-full min-h-[32px] bg-gray-200 mt-1" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                    <p className="font-medium text-gray-900">{entry.action}</p>
                    <p className="text-sm text-gray-500">{entry.timestamp}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                    {entry.previousStatus && (
                      <>
                        <Badge className={getStatusColor(entry.previousStatus)} variant="outline">
                          {entry.previousStatus}
                        </Badge>
                        <span>→</span>
                      </>
                    )}
                    <Badge className={getStatusColor(entry.newStatus)} variant="outline">
                      {entry.newStatus}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    by {entry.userName} ({entry.userRole})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default OrderCard;
