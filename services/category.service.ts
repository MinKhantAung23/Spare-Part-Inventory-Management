export const fetchCategories = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return [
    { id: "cat-1", name: "LCD / Display", description: "Mobile screens and touch glass", count: 450, iconColor: "bg-blue-500" },
    { id: "cat-2", name: "Battery", description: "Replacement batteries for all models", count: 120, iconColor: "bg-emerald-500" },
    { id: "cat-3", name: "Charging Port", description: "USB-C and Lightning port flex", count: 85, iconColor: "bg-orange-500" },
    { id: "cat-4", name: "Housing / Shell", description: "Back covers and middle frames", count: 62, iconColor: "bg-purple-500" },
    { id: "cat-5", name: "Mainboard IC", description: "Microchips and SMD components", count: 210, iconColor: "bg-rose-500" },
  ];
};