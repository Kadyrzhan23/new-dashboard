import  { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type Order from "./types";
import Product from "./item-of-products";

type Props = {
  order: Order;
};

export default function ItemsOfOrder({ order }: Props) {
  // раскрытие ВСЕГО блока
  const [isItemsOpen, setIsItemsOpen] = useState(false);

  // раскрытие КОНКРЕТНОГО товара
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItems = () => {
    setIsItemsOpen((prev) => {
      if (prev) setOpenIndex(null);
      return !prev;
    });
  };

  const toggleProduct = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-3">
      {/* ===== Header ===== */}
      <div
        onClick={toggleItems}
        className="
          flex items-center gap-2 cursor-pointer select-none
          h-10 px-4 rounded-md
          bg-gray-50 border border-gray-200
          hover:bg-gray-100 transition-colors justify-between
        "
      >
        <div className="flex items-center gap-2">
          {isItemsOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
          <h3 className="font-medium text-gray-900">Список товаров</h3>
        </div>
        <h3 className="font-medium text-gray-900">{order.listProducts.length} позиции</h3>
      </div>

      {/* ===== Collapsible block ===== */}
      <AnimatePresence initial={false}>
        {isItemsOpen && (
          <motion.div
            key="order-items"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Название
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">
                      Кол-во
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                      Цена
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                      Сумма
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {order.listProducts.map((item, index) => {
                    const isOpen = openIndex === index;
                    const total =
                      Number(item.price.toString().replace(/\s/g, "")) *
                      Number(item.amount);

                    return (
                      <Product
                        key={item._id}
                        orderStatus={order.status}
                        product={item}
                        isOpen={isOpen}
                        toggleOpen={toggleProduct}
                        index={index}
                        total={total}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
