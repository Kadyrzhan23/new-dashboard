import { useParams } from "react-router-dom";
import { useGetUserOrderAnalytics } from "../../../../hooks/useGetUserOrderAnalytics";
import { DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import { Card } from "../../../../components/ui/card";

export default function SummaryCards() {
  const userId = useParams().id!;
  const { data, loading, error } = useGetUserOrderAnalytics(userId);

  // 1️⃣ Показываем Skeleton, пока данные загружаются
  if (loading) {
    return <StatsCardsSkeleton />;
  }

  // 2️⃣ Показываем ошибку, если она есть
  if (error) {
    return (
      <Card className="p-4 sm:p-6 border border-red-200 bg-red-50">
        <p className="text-sm text-red-600">❌ {error}</p>
      </Card>
    );
  }

  // 3️⃣ Если данных нет (data === null), ничего не рендерим
  if (!data) return null;

  // 4️⃣ Рендерим карточки с безопасным доступом к полям data
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ">
      {/* Карточка: Кол-во заказов */}
      <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 bg-blue-100 rounded-lg flex-shrink-0">
            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-neutral-500">Кол-во заказов</p>
            <p className="text-xl sm:text-2xl mt-0.5 sm:mt-1 truncate">
              {data.totalOrders}
            </p>
          </div>
        </div>
      </Card>

      {/* Карточка: Общая сумма заказов */}
      <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 bg-green-100 rounded-lg flex-shrink-0">
            <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-neutral-500">Общая сумма заказов</p>
            <p className="text-xl sm:text-2xl mt-0.5 sm:mt-1 truncate">
              {data.totalSpent.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>

      {/* Карточка: Средняя сумма одного заказа */}
      <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 bg-purple-100 rounded-lg flex-shrink-0">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-neutral-500">Средная сумма одного заказа</p>
            <p className="text-xl sm:text-2xl mt-0.5 sm:mt-1 truncate">
              {data.averageOrderValue.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Skeleton для карточек
export function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {[1, 2, 3].map((_, idx) => (
        <Card
          key={idx}
          className="p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow animate-pulse"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3 bg-neutral-100 rounded-lg flex-shrink-0">
              <div className="h-5 w-5 sm:h-6 sm:w-6 bg-neutral-300 rounded" />
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-3 w-24 bg-neutral-200 rounded" />
              <div className="h-6 w-20 sm:w-28 bg-neutral-200 rounded" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
