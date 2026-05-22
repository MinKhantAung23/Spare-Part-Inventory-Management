export const fetchActivityLogs = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    {
      id: "LOG-101",
      user: "Nay Myo Thant",
      action: "STOCK_IN",
      entity: "iPhone 13 LCD",
      details: "Added 50 units to main warehouse",
      timestamp: "2024-03-22T10:30:00Z",
      ipAddress: "192.168.1.15"
    },
    {
      id: "LOG-102",
      user: "Admin",
      action: "UPDATE",
      entity: "Samsung S23 Battery",
      details: "Changed sale price from 45,000 to 48,000 Ks",
      timestamp: "2024-03-22T09:15:00Z",
      ipAddress: "192.168.1.1"
    },
    {
      id: "LOG-103",
      user: "Staff-01",
      action: "DELETE",
      entity: "Old Redmi Note 7 Shell",
      details: "Removed obsolete category item",
      timestamp: "2024-03-21T16:45:00Z",
      ipAddress: "172.16.0.42"
    }
  ];
};