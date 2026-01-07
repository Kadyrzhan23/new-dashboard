import { Separator } from "@radix-ui/react-separator";
import { Calendar, Circle, Clock, CreditCard, Receipt } from "lucide-react";
import type Order from "./types";
import StatusBox from "./pament-status.tsx";
type Props = {
  order: Order;
};

export default function paymentInformation({ order }: Props) {
  return (
    <>
      {/* Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Информация об оплате</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Способ оплаты</p>
                <p className="text-gray-900">{order.paymentMethod}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Circle className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Статус оплаты</p>
                <StatusBox status={order.paymentStatus} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <>
            {order.paymentMethod === "Click" ||
            (order.paymentMethod === "PayMe" &&
              order.paymentStatus === "Оплачен") ? (
              <>
                <div className="flex flex-col gap-4">
                  {/* ===== Invoice ===== */}
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-gray-500" />
                    <div className="text-sm text-gray-700">
                      <span className="text-gray-500">
                        Номер чека в системе {order.paymentMethod}:
                      </span>{" "}
                      <span className="text-gray-900 font-medium">
                        ############
                      </span>
                    </div>
                  </div>

                  {/* ===== Date & Time ===== */}
                  <div className="flex items-center gap-4 text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>05 Jan 2026</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>14:32</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </>

          <div className="space-y-2 bg-gray-50 rounded-lg p-4">
            <Separator className="my-2" />
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Сумма заказа</span>
              <span className="font-bold text-gray-900">
                {order.totalPrice} сум
              </span>
            </div>
          </div>
        </div>
      </div>
      <Separator/>
    </>
  );
}
