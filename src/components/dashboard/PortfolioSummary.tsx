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
import { getTotalAssets } from '../../data/funds';

const PortfolioSummary = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const totalAssets = getTotalAssets();
  const unrealizedGain = 16600000;
  const todayGain = 150000;
  const yearReturn = 15.2;

  const summaryItems = [
    {
      label: '総資産',
      value: `¥${totalAssets.toLocaleString()}`,
      color: theme.palette.primary.main,
    },
    {
      label: '含み益',
      value: `¥${unrealizedGain.toLocaleString()}`,
      color: unrealizedGain >= 0 ? theme.palette.success.main : theme.palette.error.main,
    },
    {
      label: '本日の損益',
      value: `¥${todayGain.toLocaleString()}`,
      color: todayGain >= 0 ? theme.palette.success.main : theme.palette.error.main,
    },
    {
      label: '年間リターン',
      value: `${yearReturn}%`,
      color: yearReturn >= 0 ? theme.palette.success.main : theme.palette.error.main,
    },
  ];

  return (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      {summaryItems.map((item, index) => (
        <Grid item xs={6} md={3} key={index}>
          <Card>
            <CardContent sx={{ 
              p: { xs: 1.5, sm: 2 },
              '&:last-child': { pb: { xs: 1.5, sm: 2 } },
            }}>
              <Typography 
                variant="body2" 
                color="text.secondary"
                gutterBottom
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                {item.label}
              </Typography>
              <Typography 
                variant="h6"
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  fontWeight: 500,
                  color: item.color,
                }}
              >
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PortfolioSummary; 