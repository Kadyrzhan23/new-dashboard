import { Card } from "../../../components/ui/card";
import { MapPin } from "lucide-react";
import type { UserAddress } from "../types";


interface AddressSectionProps {
  addresses: UserAddress[];
}

export function AddressSection({ addresses }: AddressSectionProps) {
  return (
    <Card className="p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200">
      <h2 className="text-lg sm:text-xl mb-4 sm:mb-6">Адреса клиента</h2>
      <div className="space-y-3 sm:space-y-4">
        {addresses.map((address) => (
          <div
            key={address.address}
            className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-colors"
          >
            <MapPin className="h-5 w-5 text-neutral-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-neutral-900 mb-1">{address.organization}</div>
              <div className="text-sm text-neutral-600 break-words">{address.address}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}