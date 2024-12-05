import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import FundDetail from './components/fund/FundDetail';
import TransactionHistory from './components/transaction/TransactionHistory';
import NewPurchase from './components/fund/NewPurchase';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import CashTransactions from './components/cash/CashTransactions';
import { useAuth } from './contexts/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element={!isAuthenticated ? <Onboarding /> : <Navigate to="/dashboard" />} />

      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/funds"
        element={isAuthenticated ? <NewPurchase /> : <Navigate to="/" />}
      />
      <Route
        path="/funds/:fundId"
        element={isAuthenticated ? <FundDetail /> : <Navigate to="/" />}
      />
      <Route
        path="/funds/:fundId/buy"
        element={isAuthenticated ? <NewPurchase /> : <Navigate to="/" />}
      />
      <Route
        path="/funds/:fundId/sell"
        element={isAuthenticated ? <NewPurchase /> : <Navigate to="/" />}
      />
      <Route
        path="/transactions"
        element={isAuthenticated ? <TransactionHistory /> : <Navigate to="/" />}
      />
      <Route
        path="/funds/new"
        element={isAuthenticated ? <NewPurchase /> : <Navigate to="/" />}
      />
      <Route
        path="/cash-transactions"
        element={isAuthenticated ? <CashTransactions /> : <Navigate to="/" />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes; 