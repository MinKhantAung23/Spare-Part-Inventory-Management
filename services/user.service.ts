export const fetchUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 700));
  return [
    {
      id: "u-1",
      name: "Nay Myo Thant",
      email: "naymyo@nayatech.com",
      role: "Administrator",
      status: "Active",
      lastLogin: "2024-03-22T10:00:00Z",
      avatar: "" // URL if available
    },
    {
      id: "u-2",
      name: "Kyaw Zayar",
      email: "kyaw@nayatech.com",
      role: "Staff",
      status: "Active",
      lastLogin: "2024-03-21T15:30:00Z",
      avatar: ""
    },
    {
      id: "u-3",
      name: "Hsu Myat",
      email: "hsu@nayatech.com",
      role: "Staff",
      status: "Inactive",
      lastLogin: "2024-02-10T09:00:00Z",
      avatar: ""
    }
  ];
};