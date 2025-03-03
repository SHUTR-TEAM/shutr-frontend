//import { User } from "./user.types";

export interface PortfolioState {
  allPortfolio: AllPortfolio;
  activePortfolio: ActivePortfolio;
  createPortfolio: CreatePortfolio;
  activeGallery : ActiveGallery;
  activeReview : ActiveReview ;
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

export interface ActiveReview{
  isLoading : boolean ;
  isSuccessful : boolean ;
  serverPortfolio : string;
  data : Review | null ;
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


export interface GalleryFormat{
  url: string;
  category: string ;
}

export interface Gallery {
  id: string;
  Gallery: GalleryFormat[];
  
}

// export interface Review {
//   id: string;
//   name: string;
//   rating: number;
//   reviewtext: string;
//   profile_image_url :string;
// }


export interface ReviewFormat {
  name: string;
  rating: number;
  reviewText: string;
  profile_image_url: string;
  address: string;
}

export interface Review {
  id: string;
  reviews: ReviewFormat[];
}


