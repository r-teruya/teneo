import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from 'recharts';
import { useTheme, useMediaQuery } from '@mui/material';

interface YourPerformanceChartProps {
  fundId: string;
}

const YourPerformanceChart: React.FC<YourPerformanceChartProps> = ({ fundId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // 仮のデータ（後で実際のデータに置き換え）
  const data = [
    { date: '2024/01/01', value: 1000000, principal: 1000000 },
    { date: '2024/01/15', value: 1020000, principal: 1000000 },
    { date: '2024/02/01', value: 1050000, principal: 1000000 },
    { date: '2024/02/15', value: 1080000, principal: 1200000 }, // 追加投資
    { date: '2024/03/01', value: 1100000, principal: 1200000 },
    { date: '2024/03/15', value: 1150000, principal: 1200000 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: isMobile ? -25 : 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: isMobile ? 10 : 12 }}
          tickMargin={8}
        />
        <YAxis
          tick={{ fontSize: isMobile ? 10 : 12 }}
          tickFormatter={(value) => `${(value / 10000).toFixed(0)}万円`}
          tickMargin={8}
        />
        <Tooltip
          formatter={(value: number) => [`${(value / 10000).toFixed(1)}万円`]}
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 4,
          }}
        />
        <Area
          type="monotone"
          dataKey="principal"
          stackId="1"
          stroke="none"
          fill={theme.palette.success.light}
          fillOpacity={0.3}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={theme.palette.primary.main}
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default YourPerformanceChart; 