import axios from "axios";
import { Product } from "@/types/product";

// Mock Data matching your "MobileParts IMS" screenshot style
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "iPhone 13 LCD",
    brand: "Apple",
    model: "iPhone 13",
    category: "Screen",
    stock: 9,
    salePrice: 85000,
    costPrice: 55000,
    status: "In Stock",
  },
  {
    id: "2",
    name: "Samsung S23 Ultra Battery",
    brand: "Samsung",
    model: "S23 Ultra",
    category: "Battery",
    stock: 3,
    salePrice: 45000,
    costPrice: 30000,
    status: "Low Stock",
  },
  {
    id: "3",
    name: "Xiaomi Redmi Note 12 Charging Port",
    brand: "Xiaomi",
    model: "Note 12",
    category: "Port",
    stock: 0,
    salePrice: 12000,
    costPrice: 5000,
    status: "Out of Stock",
  },
];

export const fetchProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return MOCK_PRODUCTS; 
};

// export const fetchProducts = async () => {
//   // Mocking axios call
//   const { data } = await axios.get("/api/products"); 
//   return data;
// };