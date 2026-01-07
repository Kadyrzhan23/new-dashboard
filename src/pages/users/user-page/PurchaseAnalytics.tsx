import { Card } from "../../../components/ui/card";
import { ShoppingCart, DollarSign, TrendingUp, Package, Calendar } from "lucide-react";

interface PurchaseAnalyticsProps {
  analytics: {
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    topProducts: Array<{
      name: string;
      count: number;
    }>;
    recentOrders: Array<{
      id: string;
      date: string;
      products: string[];
      amount: number;
    }>;
  };
}

export function PurchaseAnalytics({ analytics }: PurchaseAnalyticsProps) {
  return (
    <div className="space-y-4 sm:space-y-6 shadow-sm border border-gray-200">
      <h2 className="text-lg sm:text-xl px-1">Purchase Analytics</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ">
        <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3 bg-blue-100 rounded-lg flex-shrink-0">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-neutral-500">Total Orders</p>
              <p className="text-xl sm:text-2xl mt-0.5 sm:mt-1 truncate">{analytics.totalOrders}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3 bg-green-100 rounded-lg flex-shrink-0">
              <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-neutral-500">Total Spent</p>
              <p className="text-xl sm:text-2xl mt-0.5 sm:mt-1 truncate">${analytics.totalSpent.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3 bg-purple-100 rounded-lg flex-shrink-0">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-neutral-500">Avg Order Value</p>
              <p className="text-xl sm:text-2xl mt-0.5 sm:mt-1 truncate">${analytics.averageOrderValue.toFixed(2)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Products and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 ">
        {/* Top Products */}
        <Card className="p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-500 flex-shrink-0" />
            <h3 className="text-base sm:text-lg">Most Purchased Products</h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {analytics.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-neutral-100 rounded-full flex items-center justify-center text-xs sm:text-sm text-neutral-600 flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-700 truncate">{product.name}</span>
                </div>
                <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-neutral-100 rounded-full whitespace-nowrap flex-shrink-0">
                  {product.count} orders
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Orders */}
        <Card className="p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-500 flex-shrink-0" />
            <h3 className="text-base sm:text-lg">Recent Orders</h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {analytics.recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-3 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2 gap-2">
                  <span className="text-xs sm:text-sm text-neutral-500 truncate">#{order.id}</span>
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">${order.amount.toFixed(2)}</span>
                </div>
                <div className="text-xs text-neutral-600 mb-1">{order.date}</div>
                <div className="text-xs text-neutral-500 truncate">
                  {order.products.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}