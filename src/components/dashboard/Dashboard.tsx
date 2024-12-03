import React from 'react';
import { Box, Grid } from '@mui/material';
import PortfolioSummary from './PortfolioSummary';
import PortfolioSummaryChart from './PortfolioSummaryChart';
import AssetAllocationChart from './AssetAllocationChart';
import FundList from './FundList';
import RecentTransactions from './RecentTransactions';

const Dashboard = () => {
  return (
    <Box sx={{ 
      p: { xs: 1.5, sm: 2, md: 3 },
      pt: { xs: '64px', sm: '64px', md: '64px' },
    }}>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <PortfolioSummary />
        </Grid>

        <Grid item xs={12}>
          <PortfolioSummaryChart />
        </Grid>

        <Grid item xs={12} md={6}>
          <AssetAllocationChart />
        </Grid>

        <Grid item xs={12}>
          <FundList />
        </Grid>

        <Grid item xs={12}>
          <RecentTransactions />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 