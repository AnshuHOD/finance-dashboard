import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import { Button } from '../ui';
import { motion, AnimatePresence } from 'framer-motion';

const AddTransactionModal = ({ isOpen, onClose, onSave, editingTransaction }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: 'Other',
    amount: '',
    type: 'expense'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        ...editingTransaction,
        amount: String(editingTransaction.amount)
      });
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: 'Other',
        amount: '',
        type: 'expense'
      });
    }
    setErrors({});
  }, [editingTransaction, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-primary-card border border-primary-border rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-primary-border flex items-center justify-between">
            <h3 className="text-xl font-bold">
              {editingTransaction ? 'Edit Transaction' : 'New Transaction'}
            </h3>
            <button onClick={onClose} className="p-1 hover:bg-primary-hover rounded-full text-text-secondary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Type Switcher */}
            <div className="flex bg-primary-hover p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'income'})}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  formData.type === 'income' ? 'bg-accent-green text-white shadow-lg' : 'text-text-secondary'
                }`}
              >
                INCOME
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'expense'})}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  formData.type === 'expense' ? 'bg-accent-red text-white shadow-lg' : 'text-text-secondary'
                }`}
              >
                EXPENSE
              </button>
            </div>

            {/* Amount */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-secondary uppercase">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-text-secondary italic">₹</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className={`w-full bg-primary-hover border ${errors.amount ? 'border-accent-red' : 'border-primary-border'} rounded-xl pl-8 pr-4 py-3 text-xl font-mono font-bold focus:outline-none focus:border-accent-blue transition-all`}
                />
              </div>
              {errors.amount && <p className="text-xs text-accent-red flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.amount}</p>}
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-secondary uppercase">Description</label>
              <input
                type="text"
                placeholder="Where did it go?"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className={`w-full bg-primary-hover border ${errors.description ? 'border-accent-red' : 'border-primary-border'} rounded-xl px-4 py-2.5 focus:outline-none focus:border-accent-blue transition-all`}
              />
              {errors.description && <p className="text-xs text-accent-red flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-secondary uppercase">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-primary-hover border border-primary-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent-blue cursor-pointer"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-secondary uppercase">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-primary-hover border border-primary-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-accent-blue"
                />
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1 flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Save
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddTransactionModal;
