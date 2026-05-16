export interface TodaySales {
    date: string;
    quantity: number;
    sales_value: number;
    cost_value: number;
    profit: number;
}

export interface LowStock {
    threshold: number;
    products: number;
    quantity: number;
}

export interface DashboardData {
    total_products: number;
    total_inventory_quantity: number;
    total_inventory_value: number;
    today_sales: TodaySales;
    low_stock: LowStock;
}

export interface DashboardResponse {
    success: boolean;
    data: DashboardData;
}