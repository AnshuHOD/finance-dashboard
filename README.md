# 💰 Zorvyn Finance Dashboard

A modern, high-performance personal finance dashboard built with **React**, **Vite**, and **Tailwind CSS**. This application provides users with a comprehensive view of their finances, transaction management, and AI-powered insights.

![Finance Dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000)

## ✨ Key Features

- **📊 Comprehensive Overview**: Visualize your financial health with summary cards (Balance, Income, Expenses) and interactive charts.
- **💸 Transaction Management**: Full CRUD operations for transactions with advanced filtering, searching, and sorting.
- **🧠 Smart Insights**: Automated analysis of spending habits, savings rate, and monthly comparisons.
- **👥 Role-Based UI**: Switch between **Admin** (Full Access) and **Viewer** (Read-Only) modes to test different user permissions.
- **🌓 Dynamic Themes**: Seamlessly switch between Light and Dark modes with persistent settings.
- **📥 CSV Export**: Export your transaction history to CSV for external analysis.
- **💾 Local Persistence**: All data is stored in `localStorage`, so your progress is never lost.
- **⚡ Performance First**: Built with Vite for ultra-fast HMR and optimized production builds.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [React Context API](https://reactjs.org/docs/context.html)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (or download the source):
   ```bash
   git clone [repository-url]
   cd finance-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 👥 Roles & Permissions

| Feature | Admin | Viewer |
|---------|-------|--------|
| View Dashboard | ✅ | ✅ |
| View Transactions | ✅ | ✅ |
| Add / Edit / Delete | ✅ | ❌ |
| Export CSV | ✅ | ✅ |
| View Smart Insights | ✅ | ✅ |

## 📐 Project Structure

```text
src/
├── components/     # UI, Layout, and Feature components
├── context/        # App & Theme state management
├── data/           # Mock data and constants
├── hooks/          # Custom React hooks (useTransactions)
├── pages/          # Dashboard, Transactions, Insights
├── utils/          # Helper functions (formatting, math)
└── App.jsx         # Main application routing
```

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by **Anshu Hooda** for the Zorvyn FinTech Assignment.
