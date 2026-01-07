import { ChevronDown, ChevronUp, Minus, Plus, Trash2 } from "lucide-react";
import type { OrderProduct, OrderStatus } from "./types";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import {
  formatNumber,
  getMillingOfCoffee,
  getPackageOfCoffee,
  getPackageOfTea,
} from "./functions";

type Props = {
  orderStatus: OrderStatus;
  product: OrderProduct;
  isOpen: boolean;
  toggleOpen: Function;
  index: number;
  total: number;
};
export default function itemOfProducts({
  orderStatus,
  product,
  isOpen,
  toggleOpen,
  index,
  total,
}: Props) {
  const canEditItems =
    orderStatus === "В ожидании" || orderStatus === "Оформлен";
  function getProductNameColumn() {
    switch (product.type) {
      case "coffe-beans":
        return <span>{product.name}</span>;
      case "tea":
        return (
          <span>{`Чай ${product.name} (${getPackageOfTea(
            product.package!
          )})`}</span>
        );
      case "syrup":
        return <span>{`Сироп ${product.name}`}</span>;
      default:
        return <span>{product.name}</span>;
    }
  }
  return (
    <>
      <React.Fragment key={product._id}>
        <tr
          className={`
    border-b border-gray-100
    hover:bg-gray-50 transition-colors
    cursor-pointer
  `}
          onClick={() => toggleOpen(index)}
        >
          {/* ===== Название + раскрытие ===== */}
          <td className="py-3 px-4">
            <div className="flex items-center gap-2 text-gray-900">
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                {product.type === "coffe-beans" &&
                  (isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ))}
              </div>

              <span className="leading-tight">{getProductNameColumn()}</span>
            </div>
          </td>
          {/* ===== Количество + управление ===== */}
          <td className="py-3 px-4">
            <div className="flex items-center justify-center gap-1">
              {canEditItems && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // decreaseAmount(index);
                  }}
                  className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-100"
                >
                  <Minus className="w-3 h-3 text-gray-600" />
                </button>
              )}

              <span className="min-w-[20px] text-center text-gray-700 text-sm">
                {product.amount}
              </span>

              {canEditItems && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // increaseAmount(index);
                  }}
                  className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-100"
                >
                  <Plus className="w-3 h-3 text-gray-600" />
                </button>
              )}
            </div>
          </td>

          {/* ===== Цена ===== */}
          <td className="py-3 px-4 text-right text-gray-700 whitespace-nowrap">
            {formatNumber(product.price)}
          </td>

          {/* ===== Сумма + удаление ===== */}
          <td className="py-3 px-4">
            <div className="flex items-center justify-end gap-2">
              <span className="font-medium text-gray-900 whitespace-nowrap">
                {formatNumber(total)}
              </span>

              <>
                {canEditItems && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // removeProduct(index);
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded border border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </button>
                )}
              </>
            </div>
          </td>
        </tr>

        {/* Раскрываемый блок с деталями */}
        <AnimatePresence>
          {isOpen && product.type === "coffe-beans" && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
              style={{ transformOrigin: "top" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden bg-gray-50 px-4 py-2"
            >
              {/* content */}
              {product.type === "coffe-beans" && (
                <div className="space-y-2 text-sm text-gray-700 sm:pl:1 md:pl-6 ">
                  {/* <div className="font-medium text-gray-900">{product.name}</div> */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {String(product.weight) && (
                      <div className="flex ">
                        <span className="text-gray-500">Упаковка:</span>
                        <span>
                          {getPackageOfCoffee(String(product.weight))}
                        </span>
                      </div>
                    )}

                    {product.roast && (
                      <div className="flex">
                        <span className="text-gray-500">Обжарка:</span>
                        <span>{product.roast}</span>
                      </div>
                    )}

                    {product.treatment && (
                      <div className="flex">
                        <span className="text-gray-500">Обработка:</span>
                        <span>{product.treatment}</span>
                      </div>
                    )}

                    {String(product.pomol) && (
                      <div className="flex">
                        <span className="text-gray-500">Помол:</span>
                        <span>{getMillingOfCoffee(String(product.pomol))}</span>
                      </div>
                    )}

                    {product.sort && (
                      <div className="flex">
                        <span className="text-gray-500">Сорт:</span>
                        <span>{product.sort}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </React.Fragment>
    </>
  );
}

{
  /* <tr
  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
  onClick={() => toggleOpen(index)}
>
  <td className="py-3 px-4 flex items-center space-x-2 text-gray-900">
    {isOpen && product.type === "coffe-beans" ? (
      <ChevronUp className="w-4 h-4 text-gray-500" />
    ) : (
      <ChevronDown className="w-4 h-4 text-gray-500" />
    )}
    <span>{getProductNameColumn()}</span>
  </td>
  <td className="py-3 px-4 text-center text-gray-700">{product.amount}</td>
  <td className="py-3 px-4 text-right text-gray-700">
    {formatNumber(product.price)}
  </td>
  <td className="py-3 px-4 text-right font-medium text-gray-900">
    {formatNumber(total)}
  </td>
</tr>; */
}
