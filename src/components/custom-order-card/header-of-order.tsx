import { Calendar, Clock, Package } from "lucide-react";
import StatusBox from "./status-box.tsx";
import { getOrderCreatedDay, getOrderCreatedTime } from "./functions.ts";
import type { OrderStatus } from "./types.ts";
interface HeaderProps {
  status: OrderStatus;
  identifier: string;
  date: string;
}

function Header({ status, identifier, date }: HeaderProps) {
  const formattedDate = getOrderCreatedDay(date);
  const formattedTime = getOrderCreatedTime(date);
  return (
    <header className="w-full max-w-7xl mx-auto bg-white shadow-sm border border-gray-200 rounded-t-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-gray-600" />
            <h2 className="font-semibold text-gray-900">Заказ #{identifier}</h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <StatusBox status={status} />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
              <Clock className="w-4 h-4 ml-2" />
              <span>{formattedTime}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
