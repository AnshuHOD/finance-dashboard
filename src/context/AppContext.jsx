import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockTransactions } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : mockTransactions;
  });
  
  const [role, setRole] = useState('admin'); // 'admin' | 'viewer'
  const [filters, setFilters] = useState({
    type: 'all',       // 'all' | 'income' | 'expense'
    category: 'all',
    search: '',
    sortBy: 'date',    // 'date' | 'amount'
    sortOrder: 'desc', // 'asc' | 'desc'
  });

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (txn) => {
    const newTxn = {
      ...txn,
      id: `txn_${Date.now()}`,
    };
    setTransactions(prev => [newTxn, ...prev]);
  };

  const editTransaction = (id, updated) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, ...updated } : t)
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider value={{
      transactions, 
      role, 
      setRole,
      filters, 
      setFilters,
      addTransaction, 
      editTransaction, 
      deleteTransaction
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
