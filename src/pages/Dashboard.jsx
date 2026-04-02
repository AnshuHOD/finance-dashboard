import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart';
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown';
import { getMonthlyTrend, getCategoryBreakdown, formatCurrency, getTypeColor } from '../utils/helpers';
import { Card, Badge, Button } from '../components/ui';
import { ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { totals, recentTransactions } = useTransactions();
  const { transactions, role } = useApp();

  const monthlyData = getMonthlyTrend(transactions);
  const categoryData = getCategoryBreakdown(transactions);

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-text-secondary mt-1">
            Welcome back! Here's what's happening with your finances.
          </p>
        </div>
        {role === 'admin' && (
          <Link to="/transactions">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Transaction
            </Button>
          </Link>
        )}
      </div>

      {/* Summary Cards */}
      <SummaryCards totals={totals} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" title="Balance Trend" extra={<span className="text-xs text-text-secondary font-medium">LAST 6 MONTHS</span>}>
          <BalanceTrendChart data={monthlyData} />
        </Card>
        
        <Card title="Spending Breakdown" extra={<span className="text-xs text-text-secondary font-medium">BY CATEGORY</span>}>
          <SpendingBreakdown data={categoryData} />
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card 
        title="Recent Transactions" 
        extra={
          <Link to="/transactions" className="text-accent-blue text-xs font-bold flex items-center gap-1 hover:underline group">
            VIEW ALL <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        }
      >
        <div className="space-y-1">
          {recentTransactions.map((txn, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={txn.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-primary-hover transition-colors border border-transparent hover:border-primary-border group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${txn.type === 'income' ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-red/10 text-accent-red'}`}>
                  {txn.description[0]}
                </div>
                <div>
                  <p className="font-medium">{txn.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-text-secondary">{new Date(txn.date).toLocaleDateString()}</span>
                    <Badge variant="gray">{txn.category}</Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold font-mono ${getTypeColor(txn.type)}`}>
                  {txn.type === 'income' ? '+' : '-'} {formatCurrency(txn.amount)}
                </p>
                <p className="text-[10px] text-text-secondary uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {txn.type}
                </p>
              </div>
            </motion.div>
          ))}
          {recentTransactions.length === 0 && (
            <div className="text-center py-8 text-text-secondary italic">
              No recent transactions found.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
