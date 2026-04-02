import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { filterTransactions } from '../utils/helpers';

export const useTransactions = () => {
  const { transactions, filters } = useApp();

  const filteredTransactions = useMemo(() => {
    return filterTransactions(transactions, filters);
  }, [transactions, filters]);

  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 5);
  }, [transactions]);

  const income = useMemo(() => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const expenses = useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const balance = useMemo(() => income - expenses, [income, expenses]);

  return {
    transactions: filteredTransactions,
    recentTransactions,
    totals: { income, expenses, balance }
  };
};
