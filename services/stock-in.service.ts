export const fetchStockInLogs = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    { 
      id: "TRX-001", 
      productName: "iPhone 13 LCD", 
      quantity: 20, 
      supplier: "K-Parts Wholesale", 
      date: "2024-03-20", 
      receivedBy: "Nay Myo Thant",
      note: "Restock for summer" 
    },
    { 
      id: "TRX-002", 
      productName: "Samsung S23 Battery", 
      quantity: 50, 
      supplier: "Global Mobile Spares", 
      date: "2024-03-18", 
      receivedBy: "Admin",
      note: "New batch" 
    },
  ];
};