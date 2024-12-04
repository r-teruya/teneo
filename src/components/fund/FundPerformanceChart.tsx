import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { getFundWithPosition, getFundPerformance } from '../../data/funds';

interface ChartProps {
  fundId: string;
}

const FundPerformanceChart: React.FC<ChartProps> = ({ fundId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fund = getFundWithPosition(fundId);
  const { data: performanceData, benchmark: benchmarkName } = getFundPerformance(fundId);

  if (!fund || !performanceData.length) return null;

  return (
    <Card>
      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
        >
          パフォーマンス推移
        </Typography>
        <Box sx={{ height: { xs: 250, sm: 300, md: 350 } }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performanceData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date"
                tick={{ fontSize: isMobile ? 10 : 12 }}
              />
              <YAxis 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                domain={[60, 140]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                formatter={(value: number) => [`${value}%`, '']}
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
              <Line
                name={fund.name}
                type="monotone"
                dataKey="value"
                stroke={theme.palette.primary.main}
                dot={false}
                strokeWidth={2}
              />
              <Line
                name={benchmarkName}
                type="monotone"
                dataKey="benchmark"
                stroke={theme.palette.grey[500]}
                dot={false}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ 
            display: 'block',
            mt: 2,
            fontSize: isMobile ? '0.625rem' : '0.75rem',
          }}
        >
          ※ 基準価額を100として指数化したパフォーマンスを表示しています。
          過去の運用実績は将来の運用成果を示唆するものではありません。
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FundPerformanceChart; 