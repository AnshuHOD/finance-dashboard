import React from 'react';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { motion } from 'framer-motion';

const SummaryCard = ({ title, amount, type, icon: Icon, trend }) => {
  const isPositive = type === 'income' || type === 'balance';
  const colorClass = type === 'income' ? 'text-accent-green' : type === 'expense' ? 'text-accent-red' : 'text-accent-blue';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-primary-card border border-primary-border p-6 rounded-2xl relative overflow-hidden group hover:border-accent-blue/30 transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-primary-hover ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-red/10 text-accent-red'}`}>
            {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      
      <div>
        <p className="text-text-secondary text-sm font-medium mb-1 uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold font-mono tracking-tighter">
          {formatCurrency(amount)}
        </h3>
      </div>

      {/* Decorative gradient */}
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity ${isPositive ? 'bg-accent-green' : 'bg-accent-red'}`}></div>
    </motion.div>
  );
};

const SummaryCards = ({ totals }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard 
        title="Total Balance" 
        amount={totals.balance} 
        type="balance" 
        icon={Wallet}
        trend={2.4} 
      />
      <SummaryCard 
        title="Total Income" 
        amount={totals.income} 
        type="income" 
        icon={TrendingUp}
        trend={12.1} 
      />
      <SummaryCard 
        title="Total Expenses" 
        amount={totals.expenses} 
        type="expense" 
        icon={TrendingDown}
        trend={-5.2} 
      />
    </div>
  );
};

export default SummaryCards;
