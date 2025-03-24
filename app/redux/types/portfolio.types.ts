import { User } from "./user.types";

export interface PortfolioState {
  allPortfolio: AllPortfolio;
  activePortfolio: ActivePortfolio;
  createPortfolio: CreatePortfolio;
  activeGallery: ActiveGallery;
  activeReview: ActiveReview;
  activeSocialLinks: ActiveSocialLinks;
  activePackages: ActivePackages;
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
  data: Gallery[] | null;
}

export interface ActiveReview {
  isLoading: boolean;
  isSuccessful: boolean;
  serverPortfolio: string;
  data: Review[] | null;
}

export interface ActiveSocialLinks {
  isLoading: boolean;
  isSuccessful: boolean;
  serverPortfolio: string;
  data: SocialLinks | null;
}

export interface ActivePackages {
  isLoading: boolean;
  isSuccessful: boolean;
  serverPortfolio: string;
  data: Package | null;
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
  description: string;
  photographer: User;
  Background_image_url: string;
  profile_image_url: string;
  images: Gallery[];
  social_links: SocialLinks;
  packages: Package[];
  reviews: number;
  rating: number;
  min_price: number | null;
  max_price: number | null;
  created_at: number | null;
  updated_at: number | null;
}

export interface Gallery {
  url: string;
  category: string;
  photographer: User;
}

export interface Review {
  id: string;
  user: User;
  photographer: User;
  rating: number;
  reviewText: string;
}

export interface SocialLinks {
  facebook: string; // Optional social media URLs
  instagram: string;
  twitter: string;
  linkedin: string;
}

export interface Package {
  id: string;
  title: string;
  description: string;
  details: string[]; // Array of strings, matching backend
  price: string;
}
