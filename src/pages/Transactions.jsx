import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTransactions } from '../hooks/useTransactions';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionTable from '../components/transactions/TransactionTable';
import AddTransactionModal from '../components/transactions/AddTransactionModal';
import { Card, Button } from '../components/ui';
import { Download, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const Transactions = () => {
  const { role, addTransaction, editTransaction, deleteTransaction } = useApp();
  const { transactions } = useTransactions();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleOpenAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (txn) => {
    setEditingTransaction(txn);
    setIsModalOpen(true);
  };

  const handleSaveTransaction = (txnData) => {
    if (editingTransaction) {
      editTransaction(editingTransaction.id, txnData);
    } else {
      addTransaction(txnData);
    }
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Amount', 'Type'];
    const rows = transactions.map(t => [
      t.date,
      t.description,
      t.category,
      t.amount,
      t.type
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
          <p className="text-text-secondary mt-1">
            Manage and track your income and expenses.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2" onClick={exportToCSV}>
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          {role === 'admin' && (
            <Button className="flex items-center gap-2" onClick={handleOpenAddModal}>
              <Plus className="w-4 h-4" /> Add Transaction
            </Button>
          )}
        </div>
      </div>

      <Card className="border-none bg-transparent p-0 shadow-none">
        <TransactionFilters />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-card border border-primary-border rounded-2xl overflow-hidden"
        >
          <TransactionTable 
            transactions={transactions} 
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTransaction}
          />
        </motion.div>
      </Card>

      <AddTransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
        editingTransaction={editingTransaction}
      />
    </div>
  );
};

export default Transactions;
