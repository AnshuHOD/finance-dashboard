import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const TransactionFilters = () => {
  const { filters, setFilters } = useApp();

  const handleSearch = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleTypeChange = (type) => {
    setFilters(prev => ({ ...prev, type }));
  };

  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const clearFilters = () => {
    setFilters({
      type: 'all',
      category: 'all',
      search: '',
      sortBy: 'date',
      sortOrder: 'desc',
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
      {/* Search */}
      <div className="relative w-full lg:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <input
          type="text"
          placeholder="Search description..."
          value={filters.search}
          onChange={handleSearch}
          className="w-full bg-primary-card border border-primary-border rounded-lg pl-10 pr-4 py-2 text-sm focus:border-accent-blue focus:outline-none transition-all"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
        {/* Type Filter Buttons */}
        <div className="flex bg-primary-card border border-primary-border rounded-lg p-1 overflow-hidden">
          {['all', 'income', 'expense'].map((t) => (
            <button
              key={t}
              onClick={() => handleTypeChange(t)}
              className={`px-4 py-1.5 text-xs font-bold rounded-md capitalize transition-all ${
                filters.type === t 
                  ? 'bg-accent-blue text-white' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-primary-hover'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <select
            value={filters.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="appearance-none bg-primary-card border border-primary-border rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:border-accent-blue cursor-pointer"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary pointer-events-none" />
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="p-2 border border-primary-border rounded-lg bg-primary-card hover:bg-primary-hover text-text-secondary hover:text-accent-red transition-all"
          title="Clear Filters"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TransactionFilters;
