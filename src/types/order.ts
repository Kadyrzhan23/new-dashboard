// types/order.ts
export interface RecentOrder {
  id: string;
  finalAmount: number;
  date: string;
}


export interface UserOrdersAnalytics {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
}