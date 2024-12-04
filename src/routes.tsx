import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import FundDetail from './components/fund/FundDetail';
import TransactionHistory from './components/transaction/TransactionHistory';
import NewPurchase from './components/fund/NewPurchase';
import BuyForm from './components/fund/BuyForm';
import SellForm from './components/fund/SellForm';
import CashTransactions from './components/cash/CashTransactions';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      <Route path="/funds/:fundId" element={<FundDetail />} />
      <Route path="/funds/:fundId/buy" element={<BuyForm />} />
      <Route path="/funds/:fundId/sell" element={<SellForm />} />
      <Route path="/funds/new" element={<NewPurchase />} />
      <Route path="/transactions" element={<TransactionHistory />} />
      <Route path="/cash-transactions" element={<CashTransactions />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 