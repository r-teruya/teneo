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

// 日付文字列をYYYY/MM/DD形式に変換する関数
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

// 指定された期間の日次データを生成する関数
const generateDailyData = (
  startDate: Date, 
  endDate: Date, 
  startValue: number, 
  endValue: number, 
  principalChanges: { date: Date; value: number }[]
): any[] => {
  const data = [];
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // 初期の収益率を計算
  const initialProfitRate = (startValue - principalChanges[0].value) / principalChanges[0].value;
  
  // 最終的な収益率を計算
  const finalProfitRate = (endValue - principalChanges[principalChanges.length - 1].value) / principalChanges[principalChanges.length - 1].value;
  
  // 収益率の日次変化
  const profitRateChange = (finalProfitRate - initialProfitRate) / days;
  
  let lastTotalAssets = startValue;
  
  for (let i = 0; i <= days; i++) {
    const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    
    // その日の投資元本を決定
    const principal = principalChanges.reduce((acc, change) => {
      return currentDate >= change.date ? change.value : acc;
    }, principalChanges[0].value);
    
    // 前日の投資元本を取得（投資元本の変化を検出するため）
    const previousDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
    const previousPrincipal = i === 0 ? principal : principalChanges.reduce((acc, change) => {
      return previousDate >= change.date ? change.value : acc;
    }, principalChanges[0].value);
    
    // 投資元本の変化額
    const principalChange = principal - previousPrincipal;
    
    // 現在の収益率を計算
    const currentProfitRate = initialProfitRate + (profitRateChange * i);
    
    // その日の総資産を計算
    let totalAssets;
    if (i === 0) {
      totalAssets = startValue;
    } else if (i === days) {
      totalAssets = endValue;
    } else if (principalChange > 0) {
      // 投資元本が増加した日は、前日の総資産に投資元本の増加分を加算
      totalAssets = lastTotalAssets + principalChange;
    } else {
      // 通常の日は、前日の総資産から変動を計算
      const baseChange = lastTotalAssets * (profitRateChange + (Math.random() * 0.006 - 0.003));
      totalAssets = Math.round(lastTotalAssets + baseChange);
    }
    
    lastTotalAssets = totalAssets;
    
    data.push({
      date: formatDate(currentDate),
      totalAssets: totalAssets,
      principal: principal
    });
  }
  
  return data;
};

// 期間別のデータを生成
const generateHistoricalData = () => {
  const now = new Date();
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
  const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());

  return {
    '1M': generateDailyData(
      oneMonthAgo, 
      now, 
      6500000, 
      6675000, 
      [
        { date: oneMonthAgo, value: 5800000 },
        { date: new Date(now.getFullYear(), now.getMonth(), 15), value: 5900000 }
      ]
    ),
    '3M': generateDailyData(
      threeMonthsAgo, 
      now, 
      6300000, 
      6675000, 
      [
        { date: threeMonthsAgo, value: 5600000 },
        { date: new Date(now.getFullYear(), now.getMonth() - 2, 10), value: 5700000 },
        { date: new Date(now.getFullYear(), now.getMonth() - 1, 15), value: 5800000 },
        { date: new Date(now.getFullYear(), now.getMonth(), 15), value: 5900000 }
      ]
    ),
    '6M': (() => {
      const midDate = new Date(2023, 11, 1);
      const firstHalf = generateDailyData(
        sixMonthsAgo, 
        midDate, 
        5800000, 
        6200000, 
        [
          { date: sixMonthsAgo, value: 5300000 },
          { date: new Date(2023, 8, 15), value: 5400000 },
          { date: new Date(2023, 9, 20), value: 5500000 },
          { date: new Date(2023, 10, 15), value: 5600000 }
        ]
      );
      const secondHalf = generateDailyData(
        midDate, 
        now, 
        6200000, 
        6675000, 
        [
          { date: midDate, value: 5600000 },
          { date: new Date(2023, 11, 20), value: 5700000 },
          { date: new Date(2024, 0, 15), value: 5800000 },
          { date: new Date(now.getFullYear(), now.getMonth(), 15), value: 5900000 }
        ]
      );
      return [...firstHalf.slice(0, -1), ...secondHalf];
    })(),
    '1Y': (() => {
      const midDate = new Date(2023, 11, 1);
      const firstPart = generateDailyData(
        oneYearAgo, 
        midDate, 
        5200000, 
        6200000, 
        [
          { date: oneYearAgo, value: 5000000 },
          { date: new Date(2023, 3, 15), value: 5200000 },
          { date: new Date(2023, 6, 20), value: 5400000 },
          { date: new Date(2023, 9, 15), value: 5600000 }
        ]
      );
      const secondPart = generateDailyData(
        midDate, 
        now, 
        6200000, 
        6675000, 
        [
          { date: midDate, value: 5600000 },
          { date: new Date(2023, 11, 20), value: 5700000 },
          { date: new Date(2024, 0, 15), value: 5800000 },
          { date: new Date(now.getFullYear(), now.getMonth(), 15), value: 5900000 }
        ]
      );
      return [...firstPart.slice(0, -1), ...secondPart];
    })(),
    'ALL': (() => {
      const firstYear = generateDailyData(
        twoYearsAgo, 
        new Date(2022, 9, 1), 
        3000000, 
        4200000, 
        [
          { date: twoYearsAgo, value: 3000000 },
          { date: new Date(2022, 3, 15), value: 3300000 },
          { date: new Date(2022, 6, 20), value: 3600000 },
          { date: new Date(2022, 8, 15), value: 4000000 }
        ]
      );
      const secondYear = generateDailyData(
        new Date(2022, 9, 1), 
        new Date(2023, 3, 1), 
        4200000, 
        5200000, 
        [
          { date: new Date(2022, 9, 1), value: 4000000 },
          { date: new Date(2022, 11, 15), value: 4500000 },
          { date: new Date(2023, 2, 20), value: 5000000 }
        ]
      );
      const thirdYear = generateDailyData(
        new Date(2023, 3, 1), 
        new Date(2023, 11, 1), 
        5200000, 
        6200000, 
        [
          { date: new Date(2023, 3, 1), value: 5000000 },
          { date: new Date(2023, 5, 15), value: 5200000 },
          { date: new Date(2023, 8, 20), value: 5400000 },
          { date: new Date(2023, 10, 15), value: 5600000 }
        ]
      );
      const lastPart = generateDailyData(
        new Date(2023, 11, 1), 
        now, 
        6200000, 
        6675000, 
        [
          { date: new Date(2023, 11, 1), value: 5600000 },
          { date: new Date(2023, 11, 20), value: 5700000 },
          { date: new Date(2024, 0, 15), value: 5800000 },
          { date: new Date(now.getFullYear(), now.getMonth(), 15), value: 5900000 }
        ]
      );
      return [...firstYear.slice(0, -1), ...secondYear.slice(0, -1), ...thirdYear.slice(0, -1), ...lastPart];
    })(),
  };
};

const historicalData = generateHistoricalData();

type Period = '1M' | '3M' | '6M' | '1Y' | 'ALL';

const PortfolioSummaryChart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [period, setPeriod] = useState<Period>('6M');

  const handlePeriodChange = (
    event: React.MouseEvent<HTMLElement>,
    newPeriod: Period | null,
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
                left: isMobile ? -35 : 0,
                bottom: isMobile ? 35 : 20,
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
                tickMargin={isMobile ? 15 : 8}
                tickFormatter={(value) => {
                  const date = value.split('/');
                  if (period === '1M') {
                    return isMobile ? date[0].slice(2) + '/' + date[1] + '/' + date[2] : date[1] + '/' + date[2]; // YY/MM/DD or MM/DD
                  } else if (period === '3M') {
                    return isMobile ? date[0].slice(2) + '/' + date[1] + '/' + date[2] : date[1] + '/' + date[2]; // YY/MM/DD or MM/DD
                  } else if (period === '6M') {
                    return date[0].slice(2) + '/' + date[1]; // YY/MM
                  } else if (period === '1Y') {
                    return date[0].slice(2) + '/' + date[1]; // YY/MM
                  } else {
                    return date[0].slice(2) + '/' + date[1]; // YY/MM
                  }
                }}
                interval={period === '1M' ? 5 : period === '3M' ? 15 : period === '6M' ? (isMobile ? 45 : 30) : period === '1Y' ? 60 : 90}
                height={isMobile ? 45 : 30}
                angle={isMobile ? -45 : 0}
              />
              <YAxis
                tick={{ 
                  fontSize: isMobile ? 10 : 12,
                  fill: theme.palette.text.secondary,
                }}
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                tickMargin={8}
                domain={['dataMin - 100000', 'dataMax + 100000']}
                allowDataOverflow={true}
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
                  };
                  return labels[value as keyof typeof labels];
                }}
              />
              <Line
                type="monotone"
                dataKey="totalAssets"
                stroke={theme.palette.primary.main}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="stepAfter"
                dataKey="principal"
                stroke={theme.palette.secondary.main}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummaryChart; 