import {
  MapPin,
  Phone,
  Store,
  Truck,
  User,
} from "lucide-react";
import StatusBox from "./status-box.tsx";
import { Separator } from "../ui/separator.tsx";
import type Order from "./types.ts";


type Props = {
    order: Order;
  };
export default function customerInformation({
  order
}: Props) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 mb-4">
            Информация о клиенте
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Имя клиента</p>
                <p className="text-gray-900">{order.userName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Store className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Организация</p>
                <p className="text-gray-900">{order.address.organization}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Адрес доставки</p>
                <p className="text-gray-900">{order.address.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Номер телефона</p>
                <p className="text-gray-900">{order.user.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 mb-4">Отвачающий сотрудник</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Менеджер</p>
                <p className="text-gray-900">{order.manager.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Статус заказа</p>
                <StatusBox status={order.status} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
}
