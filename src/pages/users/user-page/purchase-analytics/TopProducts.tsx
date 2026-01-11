import { Package } from "lucide-react";
import { getKeyString } from "../functions";
import { Card } from "../../../../components/ui/card";
import { useGetUserTopProducts } from "../../../../hooks/useGetUserTopProducts";
import type { TopProduct } from "../../../../types/goods";
import { useParams } from "react-router-dom";

export default function TopProducts() {
  const userId = useParams().id!;
  const { data, loading, error } = useGetUserTopProducts(userId);

  if (loading) return <TopProductsSkeleton count={data?.length || 5} />;

  if (error) {
    return <ErrorContainer message={error} />;
  }

  if (!data || data.length === 0) {
    return (
      <Card className="p-4 sm:p-6 border border-gray-200 bg-gray-50">
        <p className="text-sm text-neutral-500">Нет данных для отображения</p>
      </Card>
    );
  }
  return (
    <Card className="p-4 sm:p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Package className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-500 flex-shrink-0" />
        <h3 className="text-base sm:text-lg">Часто заказываемые товары</h3>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {data.map((product: TopProduct, index: number) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-neutral-100 rounded-full flex items-center justify-center text-xs sm:text-sm text-neutral-600 flex-shrink-0">
                {index + 1}
              </div>
              <span className="text-xs sm:text-sm text-neutral-700 truncate">
                {product.name}
              </span>
            </div>
            <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-neutral-100 rounded-full whitespace-nowrap flex-shrink-0">
              {`${product.count} ${getKeyString(product.count)}`}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TopProductsSkeleton({ count = 5 }: { count :number }) {
  return (
    <Card className="p-4 sm:p-6 shadow-sm border border-gray-200">
      {/* Заголовок */}
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <div className="h-4 w-4 sm:h-5 sm:w-5 bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 sm:h-5 w-40 bg-neutral-200 rounded animate-pulse" />
      </div>

      {/* Список товаров */}
      <div className="space-y-3 sm:space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-3 animate-pulse"
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-neutral-200 rounded-full" />
              <div className="h-3 w-32 bg-neutral-200 rounded" />
            </div>
            <div className="h-3 w-14 bg-neutral-200 rounded" />
          </div>
        ))}
      </div>
    </Card>
  );
}

function ErrorContainer({ message }: { message: string }) {
  return (
    <Card className="p-4 sm:p-6 border border-red-200 bg-red-50">
      <p className="text-sm text-red-600">❌ {message}</p>
    </Card>
  );
}
