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
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const data = [
  { name: '国内株式', value: 3500000 },
  { name: '先進国株式', value: 4000000 },
  { name: '新興国株式', value: 1500000 },
  { name: '国内債券', value: 2000000 },
  { name: '外国債券', value: 1500000 },
];

const AssetAllocationChart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    '#2196f3',
    '#ff9800',
    '#4caf50',
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
        >
          資産配分
        </Typography>

        <Box sx={{ height: { xs: 250, sm: 300, md: 350 } }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? 40 : 60}
                outerRadius={isMobile ? 70 : 100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Legend
                verticalAlign={isMobile ? "bottom" : "middle"}
                align={isMobile ? "center" : "right"}
                layout={isMobile ? "horizontal" : "vertical"}
                formatter={(value, entry) => {
                  const item = data.find(d => d.name === value);
                  if (item) {
                    const percentage = ((item.value / total) * 100).toFixed(1);
                    return `${value} (${percentage}%)`;
                  }
                  return value;
                }}
              />
              <Tooltip
                formatter={(value: number) => [
                  `¥${value.toLocaleString()}`,
                  '投資額'
                ]}
              />
            </PieChart>
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
          ※ 資産配分は時価評価額に基づいて計算されています。
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AssetAllocationChart; 