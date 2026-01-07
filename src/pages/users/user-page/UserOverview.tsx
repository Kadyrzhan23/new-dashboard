import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import {
  Phone,
  Hash,
  Users,
  MessageSquare,
  Calendar,
  Cake,
  Edit,
  Save,
} from "lucide-react";
import type { User as UserType } from "../types";
import { useState } from "react";
import { successMessage } from "../../../services/show-message";

interface Props {
  user: UserType;
}
export function UserOverview({ user }: Props) {
  const [isSelectActive, setSelectActive] = useState(false);
  const [isSelectOfStatusActive, setSelectOfStatusActive] = useState(false);
  const [_, setIsLoading] = useState(false);
  const [userStatus, setUserStatus] = useState<string>(user.role);
  const [selectValue, setSelectValue] = useState(user.manager.name);
  console.log(isSelectOfStatusActive);
  async function handleManagerChange() {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Manager changed to:", selectValue);
      successMessage(
        `Менеджер с ${user.manager.name} сменён/на на ${selectValue}`
      );
      setSelectActive(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
    // Simulate an API call to update the manager
  }

  async function handleUserStatusChange() {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Статус пользователья сменён на", selectValue);
      const message =
        userStatus === "superUser"
          ? "Статус пользователья сменён на Оптовика"
          : "Статус пользователья сменён на Розницу";
      successMessage(message);
      setSelectOfStatusActive(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
    // Simulate an API call to update the manager
  }
  return (
    <Card className="p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8 ">
        {/* Avatar Section */}
        <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-xl sm:text-2xl">
              {user.name}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* User Details */}
        <div className="flex-1 w-full space-y-4 sm:space-y-6">
          {/* Name and Status */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl mb-2">{user.name}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4">
                <Badge variant={user.isActive ? "default" : "secondary"}>
                  {user.isActive ? "Активный" : "Заблокирован"}
                </Badge>
                <>
                  {isSelectOfStatusActive ? (
                    <motion.div
                      key="select"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="flex items-center gap-2"
                    >
                      <select
                        value={userStatus}
                        onChange={(e) => setUserStatus(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm"
                      >
                        <option>Розница</option>
                        <option>Оптовик</option>
                      </select>

                      <Save
                        className="h-4 w-4 cursor-pointer text-neutral-400 hover:text-neutral-600"
                        onClick={() => handleUserStatusChange()}
                      />
                    </motion.div>
                  ) : (
                    <Badge
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => setSelectOfStatusActive(true)}
                    >
                      {userStatus === "superUser"
                        ? "Оптовик"
                        : userStatus === "user"
                        ? "Розница"
                        : "Стафф"}
                    </Badge>
                  )}
                </>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <Hash className="h-4 w-4 text-neutral-400 flex-shrink-0" />
              <span className="text-neutral-500 whitespace-nowrap">
                User ID:
              </span>
              <span className="font-medium text-neutral-900">
                {user.identifier}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <Phone className="h-4 w-4 text-neutral-400 flex-shrink-0" />
              <span className="text-neutral-500 whitespace-nowrap">Phone:</span>
              <span className="font-medium text-neutral-900 truncate">
                {user.phoneNumber}
              </span>
            </div>

            {user.telegram && (
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <MessageSquare className="h-4 w-4 text-neutral-400 flex-shrink-0" />
                <span className="text-neutral-500 whitespace-nowrap">
                  Telegram:
                </span>
                <span className="font-medium text-neutral-900 truncate">
                  @{user.telegram}
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <Users className="h-4 w-4 text-neutral-400 flex-shrink-0" />
              <span className="text-neutral-500 whitespace-nowrap">
                Manager:
              </span>

              <div className="flex gap-2">
                <AnimatePresence mode="wait">
                  {isSelectActive ? (
                    <motion.div
                      key="select"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="flex items-center gap-2"
                    >
                      <select
                        value={selectValue}
                        onChange={(e) => setSelectValue(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm"
                      >
                        <option>Aleksandr Lachashvili</option>
                        <option>Сабина</option>
                        <option>Арсен</option>
                        <option>Общий</option>
                        <option>Дина</option>
                        <option>Эдем</option>
                      </select>

                      <Save
                        className="h-4 w-4 cursor-pointer text-neutral-400 hover:text-neutral-600"
                        onClick={() => handleManagerChange()}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="text"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="flex items-center gap-2"
                    >
                      <p className="font-mediu hover:underline truncate">
                        {selectValue}
                      </p>

                      <Edit
                        className="h-4 w-4 cursor-pointer text-neutral-400 hover:text-neutral-600"
                        onClick={() => setSelectActive(true)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <Calendar className="h-4 w-4 text-neutral-400 flex-shrink-0" />
              <span className="text-neutral-500 whitespace-nowrap">
                Registered:
              </span>
              <span className="font-medium text-neutral-900 truncate">
                {user.regDate.split(" ")[0]}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <Cake className="h-4 w-4 text-neutral-400 flex-shrink-0" />
              <span className="text-neutral-500 whitespace-nowrap">
                Birthday:
              </span>
              <span className="font-medium text-neutral-900 truncate">
                {user.birthday.str}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
