import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';
import PortfolioSummary from './dashboard/PortfolioSummary';
import AssetAllocationChart from './dashboard/AssetAllocationChart';
import PerformanceOverview from './dashboard/PerformanceOverview';
import RecentTransactions from './dashboard/RecentTransactions';
import FundList from './dashboard/FundList';

const Dashboard = () => {
  const theme = useTheme();

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