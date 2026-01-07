import type { StatusBoxProps } from "./types.ts";
import { Button } from "../ui/button.tsx";
export default function actions({ status }: StatusBoxProps) {
  type Props = {
    cancelBtnName: string;
  };
  const Pending = ({ cancelBtnName }: Props) => {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Cancel */}
        <Button
          className="
            flex-1 sm:flex-none
            text-gray-600 border-gray-200
            hover:text-red-600 hover:border-red-300 hover:bg-red-50/50
          "
          variant="outline"
        >
          {cancelBtnName}
        </Button>

        {/* Accept */}
        <Button
          className="
            flex-1 sm:flex-none
            text-gray-700 border-gray-200
            hover:border-gray-300 hover:bg-gray-50
          "
          variant="outline"
        >
          Принять
        </Button>

        {/* Send */}
        <Button
          className="
            flex-1 sm:flex-none
            text-gray-700 border-gray-200
            hover:border-gray-300 hover:bg-gray-50
          "
          variant="outline"
        >
          Отправить
        </Button>

        {/* Delivered (slightly highlighted) */}
        <Button
          className="
            flex-1 sm:flex-none
            font-medium
            border-gray-300 text-gray-900
            hover:border-green-300 hover:bg-green-50/40 hover:text-green-700
          "
          variant="outline"
        >
          Доставлен
        </Button>
      </div>
    );
  };

  const Placed = ({ cancelBtnName }: Props) => {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Cancel */}
        <Button
          className="
              flex-1 sm:flex-none
              text-gray-600 border-gray-200
              hover:text-red-600 hover:border-red-300 hover:bg-red-50/50
            "
          variant="outline"
        >
          {cancelBtnName}
        </Button>
        {/* Send */}
        <Button
          className="
              flex-1 sm:flex-none
              text-gray-700 border-gray-200
              hover:border-gray-300 hover:bg-gray-50
            "
          variant="outline"
        >
          Отправить
        </Button>

        {/* Delivered (slightly highlighted) */}
        <Button
          className="
              flex-1 sm:flex-none
              font-medium
              border-gray-300 text-gray-900
              hover:border-green-300 hover:bg-green-50/40 hover:text-green-700
            "
          variant="outline"
        >
          Доставлен
        </Button>
      </div>
    );
  };

  const Shipped = ({ cancelBtnName }: Props) => {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Cancel */}
        <Button
          className="
            flex-1 sm:flex-none
            text-gray-600 border-gray-200
            hover:text-red-600 hover:border-red-300 hover:bg-red-50/50
          "
          variant="outline"
        >
          {cancelBtnName}
        </Button>

        {/* Delivered (slightly highlighted) */}
        <Button
          className="
            flex-1 sm:flex-none
            font-medium
            border-gray-300 text-gray-900
            hover:border-green-300 hover:bg-green-50/40 hover:text-green-700
          "
          variant="outline"
        >
          Доставлен
        </Button>
      </div>
    );
  };

  const AllCases = () => {
    switch (status) {
      case "В ожидании":
        return <Pending cancelBtnName="Отменить" />;
      case "Оформлен":
        return <Placed cancelBtnName="Вернуть" />;
      case "В пути":
        return <Shipped cancelBtnName="Вернуть" />;
      default:
        return null;
    }
  };
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900">Управление заказом</h3>
      <AllCases />
    </div>
  );
}
