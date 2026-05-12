import axios from "axios";

export const fetchInventory = async () => {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Returning the same structure as products but with more "inventory" focus
  return [
    { id: "1", name: "iPhone 13 LCD", brand: "Apple", model: "iPhone 13", category: "Screen", stock: 9, salePrice: 85000,  batch: "A", costPrice: 55000 },
    { id: "2", name: "Samsung S23 Battery", brand: "Samsung", model: "S23", category: "Power", stock: 2, salePrice: 45000, batch: "B", costPrice: 25000 },
    { id: "3", name: "Redmi Note 12 Shell", brand: "Xiaomi", model: "Note 12", category: "Body", stock: 45, salePrice: 15000, batch: "C", costPrice: 8000 },
  ];
};