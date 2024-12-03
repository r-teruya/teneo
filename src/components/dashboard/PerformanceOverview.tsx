import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Performance } from '../../types';

// ダミーデータ
const performanceData: Performance[] = [
  { period: '1ヶ月', return: 2.5, risk: 12.3, sharpe: 0.8 },
  { period: '3ヶ月', return: 5.8, risk: 11.8, sharpe: 1.2 },
  { period: '6ヶ月', return: 8.2, risk: 11.5, sharpe: 1.4 },
  { period: '1年', return: 15.2, risk: 12.1, sharpe: 1.6 },
  { period: '3年', return: 45.5, risk: 13.2, sharpe: 1.8 },
  { period: '5年', return: 82.3, risk: 12.8, sharpe: 1.9 },
  { period: '設定来', return: 120.5, risk: 13.5, sharpe: 1.7 },
];

// リターン推移のダミーデータ
const returnTrendData = Array.from({ length: 12 }, (_, i) => ({
  month: `${2024 - Math.floor(i / 12)}-${String(12 - (i % 12)).padStart(2, '0')}`,
  return: (Math.random() * 10 - 3).toFixed(2),
})).reverse();

const PerformanceOverview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const ReturnTrendChart = () => (
    <Box sx={{ 
      height: { xs: 250, sm: 300, md: 350 },
      mt: { xs: 2, sm: 3 },
    }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={returnTrendData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickFormatter={(value) => value.slice(5)}
          />
          <YAxis
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{ fontSize: isMobile ? 12 : 14 }}
            formatter={(value: string) => [`${value}%`, 'リターン']}
            labelFormatter={(label) => `${label}`}
          />
          <Line
            type="monotone"
            dataKey="return"
            stroke={theme.palette.primary.main}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );

  const PerformanceTable = () => (
    <TableContainer sx={{ mt: { xs: 2, sm: 3 } }}>
      <Table size={isMobile ? "small" : "medium"}>
        <TableHead>
          <TableRow>
            <TableCell>期間</TableCell>
            <TableCell align="right">リターン</TableCell>
            <TableCell align="right">リスク</TableCell>
            <TableCell align="right">シャープレシオ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {performanceData.map((row) => (
            <TableRow key={row.period}>
              <TableCell 
                component="th" 
                scope="row"
                sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
              >
                {row.period}
              </TableCell>
              <TableCell align="right">
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'flex-end',
                  gap: 0.5,
                }}>
                  {Number(row.return) >= 0 ? (
                    <TrendingUpIcon 
                      sx={{ 
                        color: 'success.main',
                        fontSize: isMobile ? 16 : 20,
                      }} 
                    />
                  ) : (
                    <TrendingDownIcon 
                      sx={{ 
                        color: 'error.main',
                        fontSize: isMobile ? 16 : 20,
                      }} 
                    />
                  )}
                  <Typography
                    sx={{
                      color: Number(row.return) >= 0 ? 'success.main' : 'error.main',
                      fontWeight: 500,
                      fontSize: isMobile ? '0.75rem' : '0.875rem',
                    }}
                  >
                    {row.return}%
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Chip
                  label={`${row.risk}%`}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    minWidth: 60,
                    height: isMobile ? 20 : 24,
                    '& .MuiChip-label': {
                      fontSize: isMobile ? '0.75rem' : '0.875rem',
                      px: isMobile ? 1 : 2,
                    },
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <Chip
                  label={row.sharpe.toFixed(2)}
                  size="small"
                  color={row.sharpe >= 1 ? 'success' : 'default'}
                  sx={{ 
                    minWidth: 60,
                    height: isMobile ? 20 : 24,
                    '& .MuiChip-label': {
                      fontSize: isMobile ? '0.75rem' : '0.875rem',
                      px: isMobile ? 1 : 2,
                    },
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Card>
      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
        >
          パフォーマンス分析
        </Typography>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            mb: 2,
            minHeight: isMobile ? 36 : 48,
            '& .MuiTab-root': {
              minHeight: isMobile ? 36 : 48,
              fontSize: isMobile ? '0.75rem' : '0.875rem',
            },
          }}
        >
          <Tab label="リターン推移" />
          <Tab label="パフォーマンス指標" />
        </Tabs>
        {tabValue === 0 ? (
          <ReturnTrendChart />
        ) : (
          <PerformanceTable />
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview; 