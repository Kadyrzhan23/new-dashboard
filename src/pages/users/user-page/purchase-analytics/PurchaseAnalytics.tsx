import RecentOrders from "./RecentOrders.tsx";
import SummaryCards from "./SummaryCards.tsx";
import TopProducts from "./TopProducts.tsx";

export function PurchaseAnalytics() {
  

  return (
    <div className="space-y-4 sm:space-y-6 shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 ">
      <h2 className="text-lg sm:text-xl px-1">Аналитика покупок</h2>
        
      {/* Summary Cards */}
      <SummaryCards/>

      {/* Top Products and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 ">
        {/* Top Products */}
        <TopProducts/>

        {/* Recent Orders */}
        <RecentOrders />
      </div>
    </div>
  );
}




