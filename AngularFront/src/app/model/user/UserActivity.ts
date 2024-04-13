import {UserAddress} from "./UserAddress";

export interface UserActivity {
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  loginCount?: number;
}
