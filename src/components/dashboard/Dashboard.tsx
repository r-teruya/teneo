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
        px: { xs: 1, sm: 2, md: 3 },  // 横パディングを調整
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
        <Box sx={{ 
          overflowX: 'auto',
          mx: isMobile ? -1 : 0,  // モバイルでは左右マージンをネガティブに
          pb: isMobile ? 1 : 0,   // スクロールバーのスペース
        }}>
          <Box sx={{ 
            minWidth: isMobile ? 600 : 'auto',  // モバイルでの最小幅を調整
            px: isMobile ? 1 : 0,               // スクロール領域内のパディング
          }}>
            <FundList />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard; 