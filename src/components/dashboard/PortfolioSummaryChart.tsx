import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
  useMediaQuery,
  Stack,
  Chip,
} from '@mui/material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { getPortfolioHistory } from '../../data/portfolio';
import { HistoryPeriod } from '../../types/portfolio';

const PortfolioSummaryChart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [period, setPeriod] = useState<HistoryPeriod>('6M');

  const historicalData = getPortfolioHistory();

  const handlePeriodChange = (
    event: React.MouseEvent<HTMLElement>,
    newPeriod: HistoryPeriod | null,
  ) => {
    if (newPeriod !== null) {
      setPeriod(newPeriod);
    }
  };

  const data = historicalData[period];
  const firstValue = data[0].totalAssets;
  const lastValue = data[data.length - 1].totalAssets;
  const totalReturn = ((lastValue - firstValue) / firstValue) * 100;

  const currentData = data[data.length - 1];
  const profitAmount = currentData.totalAssets - currentData.principal;
  const profitPercent = (profitAmount / currentData.principal) * 100;

  return (
    <Card>
      <CardContent sx={{ 
        p: { xs: 2, sm: 3 },
        '&:last-child': { pb: { xs: 2, sm: 3 } },
      }}>
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 2,
          mb: 2,
        }}>
          <Box>
            <Typography 
              variant="h6"
              sx={{ 
                fontSize: { xs: '1rem', sm: '1.25rem' },
                fontWeight: 500,
                mb: 1,
              }}
            >
              資産推移
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
              <Chip
                label={`総資産: ¥${currentData.totalAssets.toLocaleString()}`}
                color="primary"
                size={isMobile ? "small" : "medium"}
              />
              <Chip
                label={`投資元本: ¥${currentData.principal.toLocaleString()}`}
                color="secondary"
                size={isMobile ? "small" : "medium"}
              />
              <Chip
                label={`保有現金: ¥${currentData.cash.toLocaleString()}`}
                color="default"
                size={isMobile ? "small" : "medium"}
              />
            </Stack>
            <Typography 
              variant="body2"
              sx={{ 
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                color: profitAmount >= 0 ? 'success.main' : 'error.main',
                fontWeight: 500,
              }}
            >
              評価損益: {profitAmount >= 0 ? '+' : ''}¥{profitAmount.toLocaleString()}
              （{profitAmount >= 0 ? '+' : ''}{profitPercent.toFixed(1)}%）
            </Typography>
          </Box>
          <ToggleButtonGroup
            value={period}
            exclusive
            onChange={handlePeriodChange}
            size={isMobile ? "small" : "medium"}
            sx={{
              '& .MuiToggleButton-root': {
                px: { xs: 1, sm: 2 },
                py: { xs: 0.5, sm: 1 },
              },
            }}
          >
            <ToggleButton value="1M">1ヶ月</ToggleButton>
            <ToggleButton value="3M">3ヶ月</ToggleButton>
            <ToggleButton value="6M">6ヶ月</ToggleButton>
            <ToggleButton value="1Y">1年</ToggleButton>
            <ToggleButton value="ALL">全期間</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ 
          width: '100%',
          height: isMobile ? 200 : 300,
        }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: isMobile ? -25 : 0,
                bottom: 5,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3"
                stroke={theme.palette.divider}
              />
              <XAxis 
                dataKey="date"
                tick={{ 
                  fontSize: isMobile ? 10 : 12,
                  fill: theme.palette.text.secondary,
                }}
                tickMargin={8}
              />
              <YAxis
                tick={{ 
                  fontSize: isMobile ? 10 : 12,
                  fill: theme.palette.text.secondary,
                }}
                tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                tickMargin={8}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 4,
                  fontSize: isMobile ? 12 : 14,
                  padding: '8px 12px',
                }}
                formatter={(value: number, name: string) => {
                  const labels = {
                    totalAssets: '総資産',
                    principal: '投資元本',
                    cash: '保有現金',
                  };
                  return [`¥${value.toLocaleString()}`, labels[name as keyof typeof labels]];
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => {
                  const labels = {
                    totalAssets: '総資産',
                    principal: '投資元本',
                    cash: '保有現金',
                  };
                  return labels[value as keyof typeof labels];
                }}
              />
              <Line
                type="monotone"
                dataKey="totalAssets"
                stroke={theme.palette.primary.main}
                strokeWidth={2}
                dot={{
                  r: isMobile ? 2 : 3,
                  fill: theme.palette.primary.main,
                }}
                activeDot={{
                  r: isMobile ? 4 : 5,
                  fill: theme.palette.primary.main,
                }}
              />
              <Line
                type="monotone"
                dataKey="principal"
                stroke={theme.palette.secondary.main}
                strokeWidth={2}
                dot={{
                  r: isMobile ? 2 : 3,
                  fill: theme.palette.secondary.main,
                }}
                activeDot={{
                  r: isMobile ? 4 : 5,
                  fill: theme.palette.secondary.main,
                }}
              />
              <Line
                type="monotone"
                dataKey="cash"
                stroke={theme.palette.grey[500]}
                strokeWidth={2}
                dot={{
                  r: isMobile ? 2 : 3,
                  fill: theme.palette.grey[500],
                }}
                activeDot={{
                  r: isMobile ? 4 : 5,
                  fill: theme.palette.grey[500],
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummaryChart; 