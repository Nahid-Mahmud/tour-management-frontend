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

export interface ITourTypeCreate {
  name: string;
}

export interface IResponseStructure<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

export interface ITourTypeResponse {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITour {
  _id: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  constFrom: number;
  startDate: string;
  endDate: string;
  included: string[];
  excluded: string[];
  amenities: string[];
  tourPlan: string[];
  maxGuest: number;
  minAge: number;
  division: string;
  tourType: string;
  departureLocation: string;
  arrivalLocation: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}
