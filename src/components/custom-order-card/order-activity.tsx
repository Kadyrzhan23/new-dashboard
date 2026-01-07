import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function OrderActivityContainer() {
  // 🔹 состояние раскрытия блока истории
  const [isOpen, setIsOpen] = useState(false);

  // 🔹 toggle функции
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="space-y-4">
      {/* ===== Header ===== */}
      <div
        onClick={toggleOpen}
        className="
          flex items-center cursor-pointer select-none gap-2
          bg-gray-50 h-10 px-4 rounded-md
          border border-gray-200
          hover:bg-gray-100
          transition-colors
        "
      >
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
        <h3 className="font-medium text-gray-900">История действий</h3>
      </div>

      {/* ===== Collapsible block ===== */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="order-activity"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* Контейнер для записей таймлайна */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-2 space-y-4">
              {/* Здесь будут компоненты с действиями */}
              <p className="text-gray-500 text-sm">
                Здесь будут записи таймлайна...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
