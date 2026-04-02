/**
 * Format a number as Indian Rupee currency
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Get color for transaction type or amount
 */
export const getTypeColor = (type) => {
  return type === 'income' ? 'text-accent-green' : 'text-accent-red';
};

/**
 * Calculate totals for a given set of transactions
 */
export const calculateTotals = (transactions) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  return {
    income,
    expenses,
    balance: income - expenses
  };
};

/**
 * Group transactions by month for the line chart
 */
export const getMonthlyTrend = (transactions) => {
  const months = {};
  
  // Last 6 months including current
  const result = [];
  const now = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = d.toLocaleString('default', { month: 'short' });
    const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    
    const monthlyTxns = transactions.filter(t => t.date.startsWith(yearMonth));
    const { income, expenses } = calculateTotals(monthlyTxns);
    
    result.push({
      name: monthKey,
      income,
      expenses,
      balance: income - expenses
    });
  }
  
  return result;
};

/**
 * Group expenses by category for donut chart
 */
export const getCategoryBreakdown = (transactions) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const categories = {};
  
  expenses.forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + t.amount;
  });
  
  return Object.entries(categories).map(([name, value]) => ({ name, value }));
};

/**
 * Filter transactions based on filter object
 */
export const filterTransactions = (transactions, filters) => {
  return transactions
    .filter(t => {
      const matchType = filters.type === 'all' || t.type === filters.type;
      const matchCategory = filters.category === 'all' || t.category === filters.category;
      const matchSearch = t.description.toLowerCase().includes(filters.search.toLowerCase());
      return matchType && matchCategory && matchSearch;
    })
    .sort((a, b) => {
      const valA = filters.sortBy === 'date' ? new Date(a.date) : a.amount;
      const valB = filters.sortBy === 'date' ? new Date(b.date) : b.amount;
      
      if (filters.sortOrder === 'asc') return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });
};
