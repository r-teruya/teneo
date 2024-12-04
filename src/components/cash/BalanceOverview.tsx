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
import { Balance } from '../../types/balance';

interface BalanceOverviewProps {
  balance: Balance;
}

const BalanceOverview: React.FC<BalanceOverviewProps> = ({ balance }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const balanceItems = [
    {
      label: '総資産',
      value: balance.totalBalance,
      color: theme.palette.primary.main,
    },
    {
      label: '出金可能額',
      value: balance.availableBalance,
      color: theme.palette.success.main,
    },
    {
      label: '入金処理中',
      value: balance.pendingDeposit,
      color: theme.palette.info.main,
    },
    {
      label: '出金処理中',
      value: balance.pendingWithdraw,
      color: theme.palette.warning.main,
    },
    {
      label: '購入予約済み',
      value: balance.reservedAmount,
      color: theme.palette.error.main,
    },
  ];

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '1rem', sm: '1.25rem' },
            fontWeight: 500,
          }}
        >
          資産状況
        </Typography>
        <Grid container spacing={2}>
          {balanceItems.map((item) => (
            <Grid item xs={6} sm={4} key={item.label}>
              <Box sx={{ mb: 1 }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
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
                  ¥{item.value.toLocaleString()}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BalanceOverview; 