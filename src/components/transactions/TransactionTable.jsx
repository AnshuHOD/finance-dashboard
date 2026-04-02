import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, getTypeColor } from '../../utils/helpers';
import { Badge, Button } from '../ui';
import { Edit2, Trash2, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionTable = ({ transactions, onEdit, onDelete }) => {
  const { role, filters, setFilters } = useApp();

  const handleSort = (field) => {
    setFilters(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'desc' ? 'asc' : 'desc'
    }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase text-text-secondary bg-primary-hover border-b border-primary-border">
          <tr>
            <th className="px-6 py-4 font-bold cursor-pointer hover:text-text-primary transition-colors" onClick={() => handleSort('date')}>
              <div className="flex items-center gap-2">
                DATE {filters.sortBy === 'date' && <ArrowUpDown className="w-3 h-3 text-accent-blue" />}
              </div>
            </th>
            <th className="px-6 py-4 font-bold">DESCRIPTION</th>
            <th className="px-6 py-4 font-bold">CATEGORY</th>
            <th className="px-6 py-4 font-bold cursor-pointer hover:text-text-primary transition-colors" onClick={() => handleSort('amount')}>
              <div className="flex items-center gap-2">
                AMOUNT {filters.sortBy === 'amount' && <ArrowUpDown className="w-3 h-3 text-accent-blue" />}
              </div>
            </th>
            <th className="px-6 py-4 font-bold">TYPE</th>
            {role === 'admin' && <th className="px-6 py-4 font-bold text-right">ACTIONS</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-border">
          <AnimatePresence>
            {transactions.map((txn, idx) => (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                key={txn.id}
                className="hover:bg-primary-hover/50 transition-colors group"
              >
                <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                  {new Date(txn.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-6 py-4 font-medium">{txn.description}</td>
                <td className="px-6 py-4">
                  <Badge variant="gray">{txn.category}</Badge>
                </td>
                <td className={`px-6 py-4 font-bold font-mono ${getTypeColor(txn.type)}`}>
                  {txn.type === 'income' ? '+' : '-'} {formatCurrency(txn.amount)}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${txn.type === 'income' ? 'bg-accent-green/20 text-accent-green' : 'bg-accent-red/20 text-accent-red'}`}>
                    {txn.type}
                  </span>
                </td>
                {role === 'admin' && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1.5"
                        onClick={() => onEdit(txn)}
                        title="Edit Transaction"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1.5 text-accent-red hover:bg-accent-red/10"
                        onClick={() => onDelete(txn.id)}
                        title="Delete Transaction"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
      {transactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary text-lg">No transactions found match your filters.</p>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
