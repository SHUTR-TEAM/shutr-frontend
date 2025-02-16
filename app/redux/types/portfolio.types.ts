import { User } from "./user.types";

export interface PortfolioState {
  allPortfolio: AllPortfolio;
  activePortfolio: ActivePortfolio;
  createPortfolio: CreatePortfolio;
  activeGallery : ActiveGallery;
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
  data: Portfolio | null;
}

export interface ActiveGallery {
  isLoading: boolean;
  isSuccessful: boolean;
  serverPortfolio: string;
  data: Gallery | null;
}

export interface CreatePortfolio {
  isLoading: boolean;
  isSuccessful: boolean;
  serverPortfolio: string;
  data: Portfolio | null;
}



export interface Portfolio {
  id: string;
  name: string;
  Background_image_url : string;
  profile_image_url :string;
  //participants: string[];
  //participant_details: User[];
  results:string[];
  description : string;
  
  
}

export interface Gallery {
  id: string;
  photo_collection : string[];
  
}

