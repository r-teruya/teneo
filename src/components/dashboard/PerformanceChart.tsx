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
} from 'recharts';

interface Props {
  fundId: string;
}

// ダミーデータ生成
const generateData = () => {
  const data = [];
  let value = 10000;
  
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    
    // -2%から+3%の範囲でランダムな変動を生成
    const change = (Math.random() * 5 - 2) / 100;
    value *= (1 + change);

    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value * 100) / 100,
    });
  }
  return data;
};

const PerformanceChart: React.FC<Props> = ({ fundId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const data = React.useMemo(() => generateData(), []);

  // 期間のリターンを計算
  const totalReturn = ((data[data.length - 1].value - data[0].value) / data[0].value) * 100;

  return (
    <Card>
      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
          >
            基準価額の推移（30日間）
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: totalReturn >= 0 ? 'success.main' : 'error.main',
              fontWeight: 500,
              mt: 0.5,
            }}
          >
            {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
          </Typography>
        </Box>

        <Box sx={{ height: { xs: 200, sm: 250, md: 300 } }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: isMobile ? 10 : 12 }}
                tickFormatter={(value) => value.slice(5)} // MM-DD形式で表示
              />
              <YAxis
                tick={{ fontSize: isMobile ? 10 : 12 }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                formatter={(value: number) => [value.toLocaleString(), '基準価額']}
                labelFormatter={(label) => `日付: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={theme.palette.primary.main}
                strokeWidth={2}
                dot={false}
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
          ※ 基準価額は1万口あたりの値です。
          過去の運用実績は将来の運用成果を示唆・保証するものではありません。
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart; 