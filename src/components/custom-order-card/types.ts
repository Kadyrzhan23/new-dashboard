export default interface Order {
  _id: string;
  userId: string;
  user: User;
  userName: string;
  listProducts: OrderProduct[];
  creationDate: string;
  // creationTime: number;
  departureDate: string | null;
  closingDate: string | null;
  address: Address;
  comment: string;
  totalPriceNumber: null | number;
  totalPriceTiyin: null | number;
  status: "В ожидании" | "Оформлен" | "В пути" | "Доставлен" | "Отказано";
  userStatus: "user" | "superUser" | "admin";
  totalPrice: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  rejectedList: any[];
  identifier: string;
  manager: Manager;
  createdAt: MongoDate;
  updatedAt: MongoDate;
  telegram?: TelegramInfo;
  isActive: boolean;
  isPaid: boolean;
  click?: any;
  //  instancePaid: boolean;
  statusInfo: Array<any>;
  __v: number;
}

export interface StatusBoxProps {
  status: OrderStatus
}

interface TelegramInfo {
  storehouse: {
    message_id: number;
  };
}

export interface OrderProduct {
  _id: string;
  amount: number;
  weight?: number;
  pomol?: number;
  price: number;
  name: string;
  img: string[];
  type: string;
  roast?: string;
  stopList?: boolean;
  treatment?: string;
  index?: number;
  identifier?: string;
  sort?: string;
  package?: string | number;
  description?: string;
}

interface User {
  _id: string;
  name: string;
  phoneNumber: string;
  role: "user" | "manager" | "admin";
  address: Address[];
  city: string;
  telegram: string;
  avatarUrl: string | null;
  organization?: {
    name: string;
  };
  birthday?: any;
  isActive: boolean;
  manager: Manager;
  basket: any[];
  email?: string;
  updates: string;
  identifier?: string;
  creationTime?: number;
  regDate: string;
  __v: number;
}

interface Manager {
  _id: string;
  name: string;
  chat_id: string;
  id: string;
  __v: number;
}

interface Address {
  organization: string;
  address: string;
}

export type OrderStatus = "В ожидании" | "Оформлен" | "В пути" | "Доставлен" | "Отказано";

export type PaymentStatus = "В ожидании" | "Оплачен" | "Отменено";
export type PaymentMethod = "PayMe" | "Click" | "Перечислением";

type MongoDate = {
  $date: string;
};
