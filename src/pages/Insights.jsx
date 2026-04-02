import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Card, Badge } from '../components/ui';
import { formatCurrency, calculateTotals, getCategoryBreakdown } from '../utils/helpers';
import { TrendingUp, TrendingDown, Target, Brain, PieChart, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Insights = () => {
  const { transactions } = useApp();

  const insights = useMemo(() => {
    const now = new Date();
    const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthStr = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;

    const currentMonthTxns = transactions.filter(t => t.date.startsWith(currentMonthStr));
    const lastMonthTxns = transactions.filter(t => t.date.startsWith(lastMonthStr));

    const currentTotals = calculateTotals(currentMonthTxns);
    const lastTotals = calculateTotals(lastMonthTxns);

    // 1. Highest Category
    const categoryData = getCategoryBreakdown(currentMonthTxns);
    const highestCategory = categoryData.sort((a, b) => b.value - a.value)[0] || { name: 'None', value: 0 };
    const categoryPercentage = currentTotals.expenses > 0 
      ? Math.round((highestCategory.value / currentTotals.expenses) * 100) 
      : 0;

    // 2. Spending Trend
    const expenseDiff = currentTotals.expenses - lastTotals.expenses;
    const expenseTrend = lastTotals.expenses > 0 
      ? Math.round((expenseDiff / lastTotals.expenses) * 100) 
      : 0;

    // 3. Savings Rate
    const savingsRate = currentTotals.income > 0 
      ? Math.round(((currentTotals.income - currentTotals.expenses) / currentTotals.income) * 100) 
      : 0;

    // 4. Smart Observations
    const observations = [];
    if (expenseTrend > 10) {
      observations.push(`Your spending increased by ${expenseTrend}% compared to last month. Consider reviewing your variable expenses.`);
    } else if (expenseTrend < -5) {
      observations.push(`Great job! You spent ${Math.abs(expenseTrend)}% less than last month.`);
    }

    if (savingsRate > 20) {
      observations.push(`Your savings rate is ${savingsRate}%, which is excellent! Consider investing the surplus.`);
    } else if (savingsRate > 0) {
      observations.push(`You're saving ${savingsRate}% of your income. Increasing this to 20% can help you reach your goals faster.`);
    }

    if (highestCategory.value > 0) {
      observations.push(`${highestCategory.name} is your biggest expense this month, accounting for ${categoryPercentage}% of total spending.`);
    }

    return {
      currentTotals,
      lastTotals,
      highestCategory,
      categoryPercentage,
      expenseTrend,
      savingsRate,
      observations
    };
  }, [transactions]);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Smart Insights</h2>
        <p className="text-text-secondary mt-1">
          AI-powered analysis of your financial habits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Highest Spending */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="h-full border-t-4 border-t-accent-red" title="Top Spending Category">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="p-4 bg-accent-red/10 rounded-full mb-4">
                <PieChart className="w-8 h-8 text-accent-red" />
              </div>
              <h4 className="text-2xl font-bold text-center">{insights.highestCategory.name}</h4>
              <p className="text-text-secondary font-mono mt-1">{formatCurrency(insights.highestCategory.value)}</p>
              <div className="w-full bg-primary-hover h-2 rounded-full mt-6 overflow-hidden">
                <div 
                  className="bg-accent-red h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${insights.categoryPercentage}%` }}
                />
              </div>
              <p className="text-xs text-text-secondary mt-2 font-bold uppercase">
                {insights.categoryPercentage}% of total monthly expenses
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Monthly Comparison */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="h-full border-t-4 border-t-accent-gold" title="Monthly Comparison">
            <div className="space-y-6 py-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-hover rounded-lg">
                    <Calendar className="w-5 h-5 text-text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary font-bold uppercase">This Month</p>
                    <p className="font-mono font-bold">{formatCurrency(insights.currentTotals.expenses)}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold ${insights.expenseTrend > 0 ? 'text-accent-red' : 'text-accent-green'}`}>
                  {insights.expenseTrend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {Math.abs(insights.expenseTrend)}%
                </div>
              </div>

              <div className="flex justify-between items-center opacity-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-hover rounded-lg">
                    <Calendar className="w-5 h-5 text-text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary font-bold uppercase">Last Month</p>
                    <p className="font-mono font-bold">{formatCurrency(insights.lastTotals.expenses)}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-primary-hover rounded-xl border border-primary-border">
                <p className="text-sm italic text-text-secondary">
                  "Your spending has {insights.expenseTrend > 0 ? 'increased' : 'decreased'} by {formatCurrency(Math.abs(insights.currentTotals.expenses - insights.lastTotals.expenses))} compared to last month."
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Savings Goal */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="h-full border-t-4 border-t-accent-green" title="Savings Capacity">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-32 h-32 mb-4">
                 <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-primary-border stroke-current" strokeWidth="10" fill="transparent" r="40" cx="50" cy="50" />
                    <circle 
                      className="text-accent-green stroke-current transition-all duration-1000" 
                      strokeWidth="10" 
                      strokeLinecap="round" 
                      fill="transparent" 
                      r="40" cx="50" cy="50" 
                      strokeDasharray={`${insights.savingsRate * 2.51}, 251`}
                      transform="rotate(-90 50 50)"
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black">{insights.savingsRate}%</span>
                    <span className="text-[10px] text-text-secondary font-bold">SAVED</span>
                 </div>
              </div>
              <p className="text-center text-text-secondary text-sm">
                You saved <span className="font-bold text-text-primary">{formatCurrency(insights.currentTotals.income - insights.currentTotals.expenses)}</span> of your income this month.
              </p>
              <Badge variant="green" className="mt-4">Excellent Progress</Badge>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Observations */}
      <Card title="Smart Observations" extra={<Brain className="w-5 h-5 text-accent-blue" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.observations.map((obs, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="flex gap-4 p-4 rounded-xl bg-primary-hover border border-primary-border"
            >
              <div className="p-2 h-fit bg-accent-blue/10 rounded-lg">
                <Target className="w-5 h-5 text-accent-blue" />
              </div>
              <p className="text-sm leading-relaxed">{obs}</p>
            </motion.div>
          ))}
          {insights.observations.length === 0 && (
            <p className="text-text-secondary italic">Keep using the app to generate more insights!</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Insights;
