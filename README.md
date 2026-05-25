# 📱 Next.js Mobile Spare Parts & Batch Inventory System

A production-ready, full-stack inventory management system built with **Next.js**. Developed as a custom enterprise solution for a mobile repair and wholesale spare parts business, this platform handles precision stock tracking, incoming batch management, and real-time stock allocation.

> 🔒 **Public Repository Note:** This repository hosts the open-source/core codebase of a real-world freelance project. All proprietary client data, environment variables, security keys, and private business logic have been strictly sanitized and removed.

---

## 🚀 Business Logic & Core Workflows

Unlike generic e-commerce platforms, this system is engineered around the strict realities of mobile repair supply chains (fragile components, varying supplier quality, and specific device compatibility).

### 1. Advanced Batch Management (`StockBatch`)
* **FIFO Cost Tracking:** Automatically tracks incoming item costs per batch to calculate accurate profit margins even if supplier prices fluctuate.
* **Defect Isolation:** If a batch of replacement screens has a high failure rate, the system can track down the exact supplier batch and isolate remaining units.
* **Warranty & Aging Analytics:** Tracks how long lithium-ion batteries or high-value components have been sitting in storage.

### 2. Precision Stock Movements
* **Stock-In Workflows:** Seamlessly add incoming shipments, assign them to a dynamic Batch ID, calculate landed costs, and update global stock levels.
* **Stock-Out Workflows:** Deduct inventory based on direct retail sales, wholesale fulfillment, or internal technician allocations for specific repair tickets.
* **Inventory Reconciliation:** Built-in audit logging to catch differences between physical stock counts and digital records.

---

## 🛠️ Architecture & Modern Tech Stack

* **Framework:** Next.js (App Router, Server Actions for optimized data mutation)
* **Language:** TypeScript (Strict type safety across inventory states)
* **UI & Styling:** Tailwind CSS + Shadcn UI (Clean, accessible dashboard design tailored for warehouse/shop desktop monitors)
* **State & Data Fetching:** TanStack Query (React Query) for instant interface updates without page reloads

---

## 🔧 Installation & Local Setup

1. **Clone the repository:**
```bash
   git clone [https://github.com/MinKhantAung23/Spare-Part-Inventory-Management.git](https://github.com/MinKhantAung23/Spare-Part-Inventory-Management.git)
   cd Spare-Part-Inventory-Management

---

### ⚠️ Crucial Security Reminders Before You Commit!

Since this was a paid freelance project, double-check these three things before pushing your code live on GitHub
