import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "hoodie-001",
    slug: "classic-hoodie",

    name: "Classic Hoodie",
    subtitle: "Heavyweight Coastal Essential",

    collection: "Mens",

    price: 119,
    compareAtPrice: 149,

    featured: true,
    badge: "New",

    description:
      "A heavyweight premium hoodie designed for crisp mornings, cool evenings and everyday coastal living.",

    story:
      "Inspired by Australia's rugged coastline, the Classic Hoodie blends timeless design with premium craftsmanship. Built to become your favourite layer season after season.",

    fabric: "460gsm Brushed Cotton Fleece",

    fit: "Relaxed",

    weight: "Heavyweight",

    features: [
      "460gsm premium fleece",
      "Double stitched seams",
      "Brushed cotton interior",
      "Premium embroidered logo",
      "Ribbed cuffs and hem",
    ],

    care: ["Cold machine wash", "Wash inside out", "Do not tumble dry", "Cool iron if required"],

    shipping: "Complimentary Australian shipping on orders over $150.",

    returns: "30-day returns on unworn garments.",

    images: [
      "/images/products/classic-hoodie/front.jpg",
      "/images/products/classic-hoodie/back.jpg",
      "/images/products/classic-hoodie/detail.jpg",
      "/images/products/classic-hoodie/lifestyle.jpg",
    ],

    colours: ["Black", "Sand", "Stone"],

    sizes: ["S", "M", "L", "XL"],

    badges: ["Premium Cotton", "Heavyweight", "Relaxed Fit"],

    relatedProducts: ["coastal-tee", "surf-cap"],
  },

  {
    id: "tee-001",

    slug: "coastal-tee",

    name: "Coastal Tee",

    subtitle: "Premium Everyday Tee",

    collection: "Mens",

    price: 69,

    description: "Premium cotton tee inspired by Australia's coastline.",

    images: ["/images/products/coastal-tee/front.jpg"],

    colours: ["White", "Black"],

    sizes: ["S", "M", "L", "XL"],
  },

  {
    id: "cap-001",

    slug: "surf-cap",

    name: "Surf Cap",

    subtitle: "Classic Coastal Cap",

    collection: "Accessories",

    price: 49,

    description: "Premium curved peak cap with embroidered Salt & Swell branding.",

    images: ["/images/products/surf-cap/front.jpg"],

    colours: ["Black", "Stone"],

    sizes: ["One Size"],
  },
];
