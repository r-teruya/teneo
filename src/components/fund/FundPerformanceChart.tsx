import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getFundWithPosition, getFundPerformance } from '../../data/funds';

interface ChartProps {
  fundId: string;
}

const FundPerformanceChart: React.FC<ChartProps> = ({ fundId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fund = getFundWithPosition(fundId);
  const { data: performanceData } = getFundPerformance(fundId);

  if (!fund || !performanceData.length) return null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={performanceData}
        margin={{
          top: 10,
          right: 10,
          left: isMobile ? -25 : -10,
          bottom: 0,
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
        <Line
          name={fund.name}
          type="monotone"
          dataKey="value"
          stroke={theme.palette.primary.main}
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FundPerformanceChart; 