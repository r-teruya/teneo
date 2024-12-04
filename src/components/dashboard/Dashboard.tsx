import React from 'react';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import PortfolioSummaryChart from './PortfolioSummaryChart';
import AssetAllocationChart from './AssetAllocationChart';
import FundList from './FundList';
import PortfolioSummary from './PortfolioSummary';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container 
      maxWidth="xl"
      sx={{
        px: { xs: 1, sm: 2, md: 3 },
        mt: { xs: '64px', sm: 0 },
        overflow: 'hidden',
      }}
    >
      <Box sx={{ 
        py: { xs: 2, sm: 3 },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 3 },
      }}>
        {/* ポートフォリオサマリー */}
        <PortfolioSummary />

        {/* チャートエリア */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 2, sm: 3 },
        }}>
          <PortfolioSummaryChart />
          <AssetAllocationChart />
        </Box>

        {/* ファンド一覧 */}
        <Box>
          <FundList />
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard; 