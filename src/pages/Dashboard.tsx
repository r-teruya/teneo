import React from 'react';
import { Box, Grid } from '@mui/material';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import AssetAllocationChart from '../components/dashboard/AssetAllocationChart';
import PerformanceOverview from '../components/dashboard/PerformanceOverview';
import FundList from '../components/dashboard/FundList';
import RecentTransactions from '../components/dashboard/RecentTransactions';

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* ポートフォリオサマリー */}
        <Grid item xs={12}>
          <PortfolioSummary />
        </Grid>

        {/* 資産配分チャート */}
        <Grid item xs={12} md={6}>
          <AssetAllocationChart />
        </Grid>

        {/* パフォーマンス概要 */}
        <Grid item xs={12} md={6}>
          <PerformanceOverview />
        </Grid>

        {/* 保有ファンドリスト */}
        <Grid item xs={12}>
          <FundList />
        </Grid>

        {/* 最近の取引 */}
        <Grid item xs={12}>
          <RecentTransactions />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 