import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { getPortfolioSummary } from '../../data/funds';

const PortfolioSummary = () => {
  const summary = getPortfolioSummary();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ポートフォリオサマリー
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                総資産
              </Typography>
              <Typography variant="h6">
                ¥{summary.totalAssets.toLocaleString()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                投資元本
              </Typography>
              <Typography variant="h6">
                ¥{summary.totalPrincipal.toLocaleString()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                評価損益
              </Typography>
              <Typography 
                variant="h6" 
                color={summary.totalGain >= 0 ? 'success.main' : 'error.main'}
              >
                {summary.totalGain >= 0 ? '+' : ''}¥{summary.totalGain.toLocaleString()}
                <Typography 
                  component="span" 
                  variant="body2" 
                  color="inherit"
                  sx={{ ml: 1 }}
                >
                  ({summary.gainPercent >= 0 ? '+' : ''}{summary.gainPercent.toFixed(1)}%)
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                保有現金
              </Typography>
              <Typography variant="h6">
                ¥{summary.cashBalance.toLocaleString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary; 