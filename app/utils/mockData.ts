export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  ratingCount: number;
  inStock: boolean;
  featured?: boolean;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
}

// Using the fashion/clothing images from our search results
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    description: "Soft, breathable cotton t-shirt perfect for everyday wear. Features a comfortable fit and durable construction.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1543218241-f5f4e1cbf4e1?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1543218241-f5f4e1cbf4e1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589886704088-e702adc08e3c?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Apparel",
    rating: 4.5,
    ratingCount: 124,
    inStock: true,
    featured: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#1e3a8a" }
    ]
  },
  {
    id: "2",
    name: "Designer Hoodie",
    description: "Cozy fleece-lined hoodie with modern design elements. Perfect for casual outings and lounging.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1577179362142-865076aff455?auto=format&fit=crop&w=800&q=80",
    category: "Apparel",
    rating: 4.8,
    ratingCount: 89,
    inStock: true,
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "3",
    name: "Athletic Wear Set",
    description: "High-performance athletic wear designed for comfort and mobility during workouts.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1587382667677-aa1304be4776?auto=format&fit=crop&w=800&q=80",
    category: "Sportswear",
    rating: 4.6,
    ratingCount: 156,
    inStock: true,
    featured: true,
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: "4",
    name: "Adventure Jacket",
    description: "Weather-resistant jacket perfect for outdoor adventures. Features multiple pockets and ventilation.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1586999082716-202e0f2f8c12?auto=format&fit=crop&w=800&q=80",
    category: "Outerwear",
    rating: 4.9,
    ratingCount: 203,
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "5",
    name: "Casual Denim Jacket",
    description: "Classic denim jacket with a modern twist. Perfect for layering and casual styling.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1554357475-68b18d2d5f01?auto=format&fit=crop&w=800&q=80",
    category: "Outerwear",
    rating: 4.3,
    ratingCount: 67,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "6",
    name: "Winter Coat",
    description: "Warm, insulated winter coat designed to keep you comfortable in cold weather conditions.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1553034132-0234e7dd7a57?auto=format&fit=crop&w=800&q=80",
    category: "Outerwear",
    rating: 4.7,
    ratingCount: 134,
    inStock: true,
    featured: true,
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "7",
    name: "Lightweight Sweater",
    description: "Soft, lightweight sweater perfect for transitional weather. Features a comfortable relaxed fit.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1561810051-ad54701df7a3?auto=format&fit=crop&w=800&q=80",
    category: "Apparel",
    rating: 4.4,
    ratingCount: 91,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: "8",
    name: "Premium Denim Jeans",
    description: "High-quality denim jeans with perfect fit and durability. A wardrobe essential for every style.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1589886704088-e702adc08e3c?auto=format&fit=crop&w=800&q=80",
    category: "Apparel",
    rating: 4.6,
    ratingCount: 178,
    inStock: true,
    sizes: ["28", "30", "32", "34", "36", "38"]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return mockProducts.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};