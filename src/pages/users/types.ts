


export interface UserAddress {
  address: string;
  organization?: string;
}

export interface UserManager {
  name: string;
  chat_id?: string;
  _id: string;
  __v?: number;
}

export interface UserBirthday {
  str: string;
  date: number;
  day: number;
  month: number;
  year: number;
}

export type UserType = "user" | "superUser";

export interface User {
  _id: string;
  name: string;
  phoneNumber: string;
  role: UserType;

  address: UserAddress[];
  city?: string;
  telegram?: string;
  avatarUrl?: string;

  isActive: boolean;
  manager: UserManager;

  basket: any[];
  updates?: string;

  regDate: string;
  creationTime: number;
  identifier: string;

  birthday: UserBirthday | {
    str: "";
    date: 0;
    day: 0;
    month: 0;
    year: 0;
  };
  __v?: number;
}
