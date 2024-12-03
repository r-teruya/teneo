import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
  Card,
  CardContent,
} from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  TooltipProps,
  Tooltip as RechartsTooltip,
} from 'recharts';

interface ChartData {
  date: string;
  value: number;
  previousValue: number;
  change: number;
  changePercent: number;
}

// ダミーデータ生成（実際のアプリケーションではAPIから取得）
const generateChartData = (): ChartData[] => {
  const data: ChartData[] = [];
  let currentValue = 10000000;
  let previousValue = currentValue;

  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (11 - i));
    
    // 前月比で-3%から+5%の範囲でランダムな変動を生成
    const changePercent = (Math.random() * 8 - 3);
    const change = currentValue * (changePercent / 100);
    previousValue = currentValue;
    currentValue += change;

    data.push({
      date: date.toISOString().slice(0, 7), // YYYY-MM形式
      value: Math.round(currentValue),
      previousValue: Math.round(previousValue),
      change: Math.round(change),
      changePercent: Math.round(changePercent * 100) / 100,
    });
  }
  return data;
};

const chartData = generateChartData();

// Tooltipの型定義を修正
type ValueType = number;
type NameType = string;
type CustomTooltipProps = TooltipProps<ValueType, NameType>;

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartData;
    return (
      <Card sx={{ p: 1.5, boxShadow: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          {label}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            資産総額
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            ¥{data.value.toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            前月比
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: data.change >= 0 ? 'success.main' : 'error.main',
              fontWeight: 500,
            }}
          >
            {data.change >= 0 ? '+' : ''}¥{data.change.toLocaleString()}
            {' '}
            ({data.change >= 0 ? '+' : ''}{data.changePercent}%)
          </Typography>
        </Box>
      </Card>
    );
  }
  return null;
};

const PortfolioSummaryChart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // 最新のデータと前月のデータを取得
  const latestData = chartData[chartData.length - 1];
  const previousData = chartData[chartData.length - 2];
  const yearAgoData = chartData[0];

  // 年間の変化率を計算
  const yearlyChange = latestData.value - yearAgoData.value;
  const yearlyChangePercent = (yearlyChange / yearAgoData.value) * 100;

  return (
    <Box>
      {/* チャート上部の説明テキスト */}
      <Box sx={{ mb: 2 }}>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
        >
          資産総額の推移（過去12ヶ月）
        </Typography>
        <Box sx={{ mt: 0.5 }}>
          <Typography 
            variant="h6"
            sx={{ fontSize: isMobile ? '1.125rem' : '1.25rem' }}
          >
            ¥{latestData.value.toLocaleString()}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: yearlyChange >= 0 ? 'success.main' : 'error.main',
              fontWeight: 500,
              fontSize: isMobile ? '0.75rem' : '0.875rem',
            }}
          >
            前年比: {yearlyChange >= 0 ? '+' : ''}¥{yearlyChange.toLocaleString()}
            {' '}
            ({yearlyChange >= 0 ? '+' : ''}{yearlyChangePercent.toFixed(1)}%)
          </Typography>
        </Box>
      </Box>

      {/* チャート本体 */}
      <Box sx={{ height: { xs: 200, sm: 250, md: 300 } }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={theme.palette.primary.main}
                  stopOpacity={0.1}
                />
                <stop
                  offset="95%"
                  stopColor={theme.palette.primary.main}
                  stopOpacity={0.01}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={theme.palette.divider}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: isMobile ? 10 : 12 }}
              tickFormatter={(value) => value.slice(5)} // MM形式で表示
            />
            <YAxis
              tick={{ fontSize: isMobile ? 10 : 12 }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
              width={35}
            />
            <RechartsTooltip<ValueType, NameType>
              content={({ active, payload, label }) => (
                <CustomTooltip active={active} payload={payload} label={label} />
              )}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={theme.palette.primary.main}
              fill="url(#colorValue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>

      {/* チャート下部の補足説明 */}
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: isMobile ? '0.625rem' : '0.75rem' }}
        >
          ※ グラフの金額は月末時点の評価額です。
          日々の市場変動により、実際の評価額は異なる場合があります。
        </Typography>
      </Box>
    </Box>
  );
};

export default PortfolioSummaryChart; 