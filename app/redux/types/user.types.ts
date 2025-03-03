export interface UserState {
  allUsers: AllUsers | null;
  activeUser: ActiveUser | null;
  createUser: CreateUser | null;
}

export interface AllUsers {
  isLoading: boolean;
  isSuccessful: boolean;
  serverMessage: string;
  data: User[] | null;
}

export interface ActiveUser {
  isLoading: boolean;
  isSuccessful: boolean;
  serverMessage: string;
  data: User | null;
}

export interface CreateUser {
  isLoading: boolean;
  isSuccessful: boolean;
  serverMessage: string;
  data: User | null;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  nic: string;
  phone_num: string;
  address: string;
  profile_image_url: string;
  created_at: string;
  updated_at: string;
}
