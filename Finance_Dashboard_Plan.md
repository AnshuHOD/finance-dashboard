# 💰 Finance Dashboard UI — Complete Build Plan
### Anshu Hooda | Zorvyn FinTech Assignment | April 2026

---

## 🎯 What We're Building

A **single-page React application** — a personal finance dashboard that lets users:
- See their financial summary at a glance
- Browse & filter transactions
- Switch between Admin and Viewer roles
- Get simple spending insights

**Tech Stack chosen:**
- ⚛️ React (Vite) — fast setup, modern
- 🎨 Tailwind CSS — clean, responsive, fast to write
- 📊 Recharts — for charts (lightweight, React-native)
- 🧠 React Context API — for state management
- 💾 localStorage — for data persistence (bonus point!)

---

## 🗂️ Project Structure

```
finance-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Layout.jsx
│   │   ├── dashboard/
│   │   │   ├── SummaryCards.jsx       ← Total Balance, Income, Expenses
│   │   │   ├── BalanceTrendChart.jsx  ← Line chart (time-based)
│   │   │   └── SpendingBreakdown.jsx  ← Donut chart (categorical)
│   │   ├── transactions/
│   │   │   ├── TransactionTable.jsx
│   │   │   ├── TransactionRow.jsx
│   │   │   ├── TransactionFilters.jsx
│   │   │   └── AddTransactionModal.jsx  ← Admin only
│   │   ├── insights/
│   │   │   └── InsightsPanel.jsx
│   │   └── ui/
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       └── EmptyState.jsx
│   ├── context/
│   │   ├── AppContext.jsx      ← Main state: transactions, role, filters
│   │   └── ThemeContext.jsx    ← Dark/light mode (bonus)
│   ├── data/
│   │   └── mockData.js         ← 20+ sample transactions
│   ├── hooks/
│   │   └── useTransactions.js  ← filtering, sorting logic
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   └── Insights.jsx
│   ├── utils/
│   │   └── helpers.js          ← formatCurrency, groupByMonth etc.
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── README.md
├── package.json
└── vite.config.js
```

---

## 📦 Mock Data Structure

```js
// src/data/mockData.js

export const transactions = [
  {
    id: "txn_001",
    date: "2026-03-01",
    description: "Salary Credit",
    amount: 85000,
    category: "Income",
    type: "income",        // "income" | "expense"
  },
  {
    id: "txn_002",
    date: "2026-03-03",
    description: "Amazon Shopping",
    amount: 3200,
    category: "Shopping",
    type: "expense",
  },
  {
    id: "txn_003",
    date: "2026-03-05",
    description: "Zomato",
    amount: 450,
    category: "Food",
    type: "expense",
  },
  // ... 20+ entries across 3 months
]

export const CATEGORIES = [
  "Income", "Food", "Shopping", "Transport",
  "Entertainment", "Bills", "Health", "Education", "Other"
]
```

---

## 🧠 State Management — React Context

```js
// src/context/AppContext.jsx

const AppContext = createContext()

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    // Load from localStorage if exists, else use mock data
    const saved = localStorage.getItem('transactions')
    return saved ? JSON.parse(saved) : mockTransactions
  })
  const [role, setRole] = useState('admin')        // 'admin' | 'viewer'
  const [filters, setFilters] = useState({
    type: 'all',       // 'all' | 'income' | 'expense'
    category: 'all',
    search: '',
    sortBy: 'date',    // 'date' | 'amount'
    sortOrder: 'desc', // 'asc' | 'desc'
  })
  const [darkMode, setDarkMode] = useState(false)

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  // Add transaction (Admin only)
  const addTransaction = (txn) => {
    setTransactions(prev => [
      { ...txn, id: `txn_${Date.now()}` },
      ...prev
    ])
  }

  // Edit transaction (Admin only)
  const editTransaction = (id, updated) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, ...updated } : t)
    )
  }

  // Delete transaction (Admin only)
  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  return (
    <AppContext.Provider value={{
      transactions, role, setRole,
      filters, setFilters,
      darkMode, setDarkMode,
      addTransaction, editTransaction, deleteTransaction
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
```

---

## 🖥️ Pages Breakdown

### Page 1: Dashboard (`/`)

**Layout:** Sidebar + Main content

**Sections:**
1. **Header** — Page title + Role switcher dropdown
2. **Summary Cards (3 cards):**
   - 💰 Total Balance (income - expenses)
   - 📈 Total Income (current month)
   - 📉 Total Expenses (current month)
   - Each card: icon + amount + % change from last month
3. **Charts row (2 charts side by side):**
   - Left: Balance Trend — Line chart (last 6 months)
   - Right: Spending Breakdown — Donut chart by category
4. **Recent Transactions** — last 5 only, "View All" button

---

### Page 2: Transactions (`/transactions`)

**Sections:**
1. **Filter Bar:**
   - Search input (description search)
   - Type filter: All / Income / Expense (button group)
   - Category dropdown
   - Sort: Date ↑↓ / Amount ↑↓
2. **Transaction Table:**

| Date | Description | Category | Amount | Type | Actions (Admin) |
|------|-------------|----------|--------|------|-----------------|
| Mar 1 | Salary | Income | ₹85,000 | 🟢 Income | Edit / Delete |
| Mar 3 | Amazon | Shopping | ₹3,200 | 🔴 Expense | Edit / Delete |

3. **Admin only:** "Add Transaction" button → Modal with form
4. **Empty State:** If no results, show friendly message + illustration

---

### Page 3: Insights (`/insights`)

**3 insight cards:**

1. **🏆 Highest Spending Category**
   - Show which category cost most this month
   - Mini bar showing % of total expenses

2. **📊 Monthly Comparison**
   - This month vs last month expenses
   - Arrow showing increase/decrease + %

3. **💡 Smart Observation**
   - Auto-generated from data:
     - "You spent 23% more on Food compared to last month"
     - "Your savings rate this month is 42%"

---

## 👥 Role Based UI — How it works

```jsx
// In Header.jsx
<select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="role-switcher"
>
  <option value="admin">👤 Admin</option>
  <option value="viewer">👁️ Viewer</option>
</select>

// In TransactionTable.jsx
{role === 'admin' && (
  <td>
    <button onClick={() => handleEdit(txn)}>Edit</button>
    <button onClick={() => handleDelete(txn.id)}>Delete</button>
  </td>
)}

// In Dashboard.jsx — Add Transaction button
{role === 'admin' && (
  <button onClick={() => setModalOpen(true)}>
    + Add Transaction
  </button>
)}
```

**Role behavior summary:**

| Feature | Admin | Viewer |
|---------|-------|--------|
| View dashboard | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| Filter & search | ✅ | ✅ |
| Add transaction | ✅ | ❌ |
| Edit transaction | ✅ | ❌ |
| Delete transaction | ✅ | ❌ |
| View insights | ✅ | ✅ |

---

## 🎨 Design System

**Color Palette:**
```css
--bg-primary:    #0D1117    /* Dark navy background */
--bg-card:       #161B22    /* Card background */
--bg-hover:      #1C2128    /* Hover state */
--accent-green:  #3FB950    /* Income / positive */
--accent-red:    #F85149    /* Expense / negative */
--accent-blue:   #58A6FF    /* Primary action */
--accent-gold:   #D29922    /* Highlights */
--text-primary:  #E6EDF3    /* Main text */
--text-secondary:#8B949E    /* Muted text */
--border:        #30363D    /* Card borders */
```

**Font:** `DM Sans` (display) + `JetBrains Mono` (numbers/amounts)

**Design direction:** Dark, data-dense, GitHub-inspired — feels like a real fintech product

**Cards:** Subtle border + very slight background difference from page — no heavy shadows

**Charts:** Dark background, muted grid lines, vibrant line/fill colors

---

## ✨ Optional Enhancements (all included for bonus points)

| Enhancement | How |
|-------------|-----|
| Dark mode | Already dark by default! Light mode toggle added |
| Data persistence | localStorage in Context |
| Animations | Framer Motion — cards fade in on load, number count-up |
| CSV Export | `transactions.map()` → CSV string → download |
| Advanced filtering | Multi-select category filter |

---

## 📋 README.md Structure

```markdown
# Finance Dashboard UI

## Live Demo
[deployment link here]

## Setup
npm install
npm run dev

## Features
- Summary cards with month-over-month comparison
- Interactive charts (balance trend + spending breakdown)
- Transaction management with filter, sort, search
- Role-based UI (Admin / Viewer toggle)
- Insights panel with smart observations
- Dark/Light mode
- CSV export
- localStorage persistence

## Approach
- React Context for global state (no Redux overhead needed)
- Recharts for charts — lightweight and React-native
- Component-driven — each section is independent
- Mobile-first responsive layout

## Tech Stack
React + Vite, Tailwind CSS, Recharts, React Context
```

---

## 🗓️ Build Timeline (5 days left)

| Day | Task |
|-----|------|
| Day 1 | Project setup, mock data, Context, routing |
| Day 2 | Dashboard page — cards + charts |
| Day 3 | Transactions page — table, filters, modal |
| Day 4 | Insights page + Role UI + Empty states |
| Day 5 | Polish, dark mode, CSV export, README, deploy |

---

## 🚀 Deployment

**Recommended: Vercel**
```bash
npm run build
# Push to GitHub → connect to Vercel → auto-deploy
```

Or Netlify — both free, both support Vite out of the box.

---

*Assignment: Finance Dashboard UI | Zorvyn FinTech | Deadline: Mon 06 Apr 2026*
