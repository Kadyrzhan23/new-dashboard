import { Phone, Hash, Send } from "lucide-react";
import type {UserCardProps} from "../types.ts";
import { useNavigate } from "react-router-dom";

export default function UserCard({ user }: UserCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`group rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-8 w-sm border ${
        user.role === "superUser"
          ? "bg-blue-50 border-blue-100"
          : "bg-white border-gray-100"
      } ${
        user.role === "superUser"
          ? "bg-gradient-to-br from-blue-50 to-white border-blue-100"
          : "bg-white border-gray-100"
      }`}
      onClick={() => navigate(`/admin/user/${user._id}`)}
    >
      {/* Avatar Section */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-gray-50 group-hover:ring-gray-100 transition-all duration-300"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white"></div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-gray-900 truncate mb-1">{user.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Hash className="w-3.5 h-3.5" />
            <span className="font-mono">{user._id}</span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        {/* Phone Number */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl group-hover:bg-gray-100/70 transition-colors duration-200">
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm">
            <Phone className="w-4.5 h-4.5 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 mb-0.5">Phone Number</p>
            <p className="text-sm text-gray-900 font-medium">{user.phoneNumber}</p>
          </div>
        </div>

        {/* Telegram Handle - Only show if available */}
        {user.telegram && (
          <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-xl group-hover:bg-blue-50 transition-colors duration-200">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm">
              <Send className="w-4.5 h-4.5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-0.5">Telegram</p>
              <p className="text-sm text-blue-900 font-medium">
                @{user.telegram}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
