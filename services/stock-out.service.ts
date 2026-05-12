export const fetchStockOutLogs = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    { 
      id: "OUT-9901", 
      productName: "iPhone 13 LCD", 
      quantity: 2, 
      customer: "iFix Mobile Shop", 
      reason: "Sale",
      date: "2024-03-21", 
      handler: "Nay Myo Thant" 
    },
    { 
      id: "OUT-9902", 
      productName: "Samsung S23 Battery", 
      quantity: 1, 
      customer: "Internal Test", 
      reason: "Damaged",
      date: "2024-03-21", 
      handler: "Admin" 
    },
  ];
};  