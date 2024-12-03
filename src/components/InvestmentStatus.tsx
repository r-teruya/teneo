import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  CalendarToday as CalendarTodayIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

interface InvestmentStatusProps {
  fundId: string;
}

const InvestmentStatus = ({ fundId }: InvestmentStatusProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const statusData = {
    totalInvestment: 5000000,
    currentValue: 5500000,
    unrealizedGain: 500000,
    unrealizedGainPercent: 10,
    nextPaymentDate: '2024-04-01',
    investmentUnit: 500,
    unitPrice: 11000,
  };

  const StatusCard = ({ 
    title, 
    value, 
    subValue, 
    icon, 
    trend 
  }: { 
    title: string; 
    value: string; 
    subValue?: string; 
    icon: React.ReactNode;
    trend?: 'up' | 'down';
  }) => (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        height: '100%',
        minWidth: 0, // オーバーフロー防止
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
              borderRadius: 2,
              bgcolor: 'primary.light',
              color: 'white',
              '& svg': {
                fontSize: { xs: 20, sm: 24 },
              },
            }}
          >
            {icon}
          </Box>
          <Typography 
            variant="subtitle2" 
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography 
            variant="h5" 
            component="div" 
            gutterBottom
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {value}
          </Typography>
          {subValue && (
            <Typography 
              variant="body2" 
              color={trend === 'up' ? 'success.main' : trend === 'down' ? 'error.main' : 'text.secondary'}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5,
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              }}
            >
              {trend === 'up' ? '▲' : trend === 'down' ? '▼' : ''} {subValue}
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );

  return (
    <Grid 
      container 
      spacing={{ xs: 2, sm: 3 }}
      sx={{ 
        width: 'auto',
        margin: { xs: -2, sm: -3 },
        marginRight: { xs: -2, sm: -3 },
        '& > .MuiGrid-item': {
          paddingTop: { xs: '16px', sm: '24px' },
          paddingLeft: { xs: '16px', sm: '24px' },
          paddingRight: { xs: '16px', sm: '24px' },
        },
      }}
    >
      <Grid item xs={12} sm={6} md={3}>
        <StatusCard
          title="投資総額"
          value={`¥${statusData.totalInvestment.toLocaleString()}`}
          icon={<AccountBalanceIcon />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatusCard
          title="評価額"
          value={`¥${statusData.currentValue.toLocaleString()}`}
          subValue={`¥${statusData.unrealizedGain.toLocaleString()} (${statusData.unrealizedGainPercent}%)`}
          icon={<TrendingUpIcon />}
          trend={statusData.unrealizedGain >= 0 ? 'up' : 'down'}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatusCard
          title="基準価額"
          value={`¥${statusData.unitPrice.toLocaleString()}`}
          subValue={`${statusData.investmentUnit.toLocaleString()}口`}
          icon={<AssessmentIcon />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatusCard
          title="次回決済日"
          value={statusData.nextPaymentDate}
          icon={<CalendarTodayIcon />}
        />
      </Grid>
    </Grid>
  );
};

export default InvestmentStatus; 