export interface Product {
  id: string;
  slug: string;

  name: string;
  subtitle?: string;

  collection: string;

  price: number;
  compareAtPrice?: number;

  featured?: boolean;
  badge?: string;

  description: string;
  story?: string;

  images: string[];

  colours: string[];
  sizes: string[];

  fabric?: string;
  fit?: string;
  weight?: string;

  features?: string[];
  care?: string[];

  shipping?: string;
  returns?: string;

  badges?: string[];

  relatedProducts?: string[];
}
