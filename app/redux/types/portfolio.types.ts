import { User } from "./user.types";

export interface PortfolioState {
  allPortfolio: AllPortfolio;
  activePortfolio: ActivePortfolio;
  createPortfolio: CreatePortfolio;
}

export interface AllPortfolio {
  isLoading: boolean;
  isSuccessful: boolean;
  serverPortfolio: string;
  data: Portfolio[] | null;
}

export interface ActivePortfolio {
  isLoading: boolean;
  isSuccessful: boolean;
  serverPortfolio: string;
  data: ChatDetails;
}

export interface CreatePortfolio {
  isLoading: boolean;
  isSuccessful: boolean;
  serverPortfolio: string;
  data: Portfolio | null;
}

export interface ChatDetails {
  portfolio: Portfolio | null;
}

export interface Portfolio {
  id: string;
  name: string;
  participants: string[];
  participant_details: User[];
  results:string[];
  
}