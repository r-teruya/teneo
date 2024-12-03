import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  Today as TodayIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subValue?: string;
  trend?: 'up' | 'down';
  iconColor?: string;
}

const PortfolioSummary = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const SummaryCard = ({ icon, title, value, subValue, trend, iconColor }: SummaryCardProps) => (
    <Card>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ 
            p: 1,
            bgcolor: iconColor || 'primary.main',
            borderRadius: 1,
            color: 'common.white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {React.cloneElement(icon as React.ReactElement, {
              sx: { fontSize: isMobile ? 24 : 32 }
            })}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                my: 0.5,
                fontSize: isMobile ? '1.25rem' : '1.5rem',
              }}
            >
              {value}
            </Typography>
            {subValue && (
              <Typography
                variant="body2"
                sx={{
                  color: trend === 'up' ? 'success.main' : trend === 'down' ? 'error.main' : 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                }}
              >
                {trend === 'up' && <TrendingUpIcon sx={{ fontSize: 'inherit' }} />}
                {subValue}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Grid container spacing={{ xs: 1.5, sm: 2 }}>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          icon={<AccountBalanceIcon />}
          title="資産総額"
          value="¥12,500,000"
          iconColor={theme.palette.primary.main}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          icon={<TrendingUpIcon />}
          title="評価損益"
          value="¥2,500,000"
          subValue="+25%"
          trend="up"
          iconColor={theme.palette.success.main}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          icon={<TodayIcon />}
          title="本日の損益"
          value="¥150,000"
          subValue="+1.2%"
          trend="up"
          iconColor={theme.palette.info.main}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          icon={<TimelineIcon />}
          title="年間リターン"
          value="15.2%"
          subValue="月間: +2.5%"
          trend="up"
          iconColor={theme.palette.warning.main}
        />
      </Grid>
    </Grid>
  );
};

export default PortfolioSummary; 