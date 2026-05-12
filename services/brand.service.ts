export const fetchBrands = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: "b1", name: "Apple", origin: "USA", logo: "A", modelCount: 12 },
    { id: "b2", name: "Samsung", origin: "South Korea", logo: "S", modelCount: 25 },
    { id: "b3", name: "Xiaomi", origin: "China", logo: "X", modelCount: 18 },
  ];
};

export const fetchModels = async (brandId?: string) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const models = [
    { id: "m1", name: "iPhone 13", brandId: "b1", year: "2021", category: "Smartphone" },
    { id: "m2", name: "iPhone 15 Pro", brandId: "b1", year: "2023", category: "Smartphone" },
    { id: "m3", name: "Galaxy S23", brandId: "b2", year: "2023", category: "Smartphone" },
  ];
  return brandId ? models.filter(m => m.brandId === brandId) : models;
};  