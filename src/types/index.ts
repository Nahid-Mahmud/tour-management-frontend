export interface ISidebarItem {
  title: string;
  url: string;
  items?: {
    title: string;
    url: string;
    element: React.ReactNode;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  picture: string;
  role: string;
  isDeleted: boolean;
  isActive: string;
  isVerified: boolean;
  auths: Auth[];
  createdAt: string;
  updatedAt: string;
  address: string;
  phone: string;
}

export interface Auth {
  provider: string;
  providerId: string;
}
