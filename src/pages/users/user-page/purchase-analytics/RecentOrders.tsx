import { useRecentOrders } from "../../../../hooks/useRecentOrders";
import { Card } from "../../../../components/ui/card.tsx";
import { Calendar } from "lucide-react";
import { formatNumber } from "../../../../components/custom-order-card/functions.ts";
import type { RecentOrder } from "../../../../types/order.ts";

export default function RecentOrders() {
  const { data, loading, error } = useRecentOrders();

  if (loading) {
    return <RecentOrdersSkeleton />;
  }

  if (error) {
    return <RecentOrdersError message={error} />;
  }

  if (!data.length) {
    return (
      <Card className="p-4 sm:p-6">
        <p className="text-sm text-neutral-500">Заказы не найдены</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 sm:p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-500 flex-shrink-0" />
        <h3 className="text-base sm:text-lg">Недавние заказы</h3>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {data.map((order: RecentOrder) => (
          <div
            key={order.id}
            className="p-3 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors"
          >
            <div className="flex items-center justify-between mb-2 gap-2">
              <span className="text-xs sm:text-sm text-neutral-500 truncate">
                #{order.id}
              </span>
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                {formatNumber(order.finalAmount.toFixed(2))}
              </span>
            </div>

            <div className="text-xs text-neutral-600 mb-1">{order.date}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RecentOrdersError({ message }: { message: string }) {
  return (
    <Card className="p-4 sm:p-6 border border-red-200 bg-red-50">
        <p className="text-sm text-red-600">❌ {message}</p>
      </Card>
  );
}

function RecentOrdersSkeleton() {
  return (
    <Card className="p-4 sm:p-6 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <div className="h-4 w-4 sm:h-5 sm:w-5 bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 sm:h-5 w-32 bg-neutral-200 rounded animate-pulse" />
      </div>

      {/* Orders */}
      <div className="space-y-3 sm:space-y-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="p-3 rounded-lg border border-neutral-200">
            <div className="flex items-center justify-between mb-2 gap-2">
              <div className="h-3 w-20 bg-neutral-200 rounded animate-pulse" />
              <div className="h-3 w-14 bg-neutral-200 rounded animate-pulse" />
            </div>

            <div className="h-3 w-24 bg-neutral-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </Card>
  );
}
