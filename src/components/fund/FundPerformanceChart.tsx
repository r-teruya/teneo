import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  ButtonGroup,
  Button,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  TooltipProps,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';

interface ChartData {
  date: string;
  value: number;
  benchmark: number;
  valueChange: number;
  valueChangePercent: number;
  benchmarkChange: number;
  benchmarkChangePercent: number;
}

interface ChartProps {
  fundId: string;
  fundName: string;
  benchmarkName: string;
}

// ダミーデータ生成
const generateChartData = (period: '1M' | '3M' | '6M' | '1Y' | 'ALL'): ChartData[] => {
  const data: ChartData[] = [];
  let fundValue = 10000;
  let benchmarkValue = 10000;
  const periods = period === '1M' ? 30 : 
                 period === '3M' ? 90 :
                 period === '6M' ? 180 :
                 period === '1Y' ? 365 : 730;

  for (let i = 0; i < periods; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (periods - i));

    // ファンドの値動き（-2%ら+3%の範囲）
    const fundChange = (Math.random() * 5 - 2) / 100;
    // ベンチマークの値動き（-1.5%から+2.5%の範囲）
    const benchmarkChange = (Math.random() * 4 - 1.5) / 100;

    const prevFundValue = fundValue;
    const prevBenchmarkValue = benchmarkValue;

    fundValue *= (1 + fundChange);
    benchmarkValue *= (1 + benchmarkChange);

    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(fundValue * 100) / 100,
      benchmark: Math.round(benchmarkValue * 100) / 100,
      valueChange: Math.round((fundValue - prevFundValue) * 100) / 100,
      valueChangePercent: Math.round(fundChange * 10000) / 100,
      benchmarkChange: Math.round((benchmarkValue - prevBenchmarkValue) * 100) / 100,
      benchmarkChangePercent: Math.round(benchmarkChange * 10000) / 100,
    });
  }
  return data;
};

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
        {payload.map((entry, index) => {
          if (!entry || typeof entry.value === 'undefined') return null;
          
          const isValue = entry.dataKey === 'value';
          const change = isValue ? data.valueChange : data.benchmarkChange;
          const changePercent = isValue ? data.valueChangePercent : data.benchmarkChangePercent;
          const isPositive = change >= 0;

          return (
            <Box key={index} sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {entry.name}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {entry.value.toLocaleString()}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: isPositive ? 'success.main' : 'error.main',
                  fontWeight: 500,
                }}
              >
                {isPositive ? '+' : ''}{change.toLocaleString()}
                {' '}
                ({isPositive ? '+' : ''}{changePercent}%)
              </Typography>
            </Box>
          );
        })}
      </Card>
    );
  }
  return null;
};

const FundPerformanceChart = ({ fundId, fundName, benchmarkName }: ChartProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [period, setPeriod] = React.useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('1Y');

  const chartData = React.useMemo(() => generateChartData(period), [period]);
  const latestData = chartData[chartData.length - 1];
  const startData = chartData[0];

  // 期間のリターンを計算
  const fundReturn = ((latestData.value - startData.value) / startData.value) * 100;
  const benchmarkReturn = ((latestData.benchmark - startData.benchmark) / startData.benchmark) * 100;

  return (
    <Box>
      {/* チャート上部の明テキスト */}
      <Box sx={{ mb: 2 }}>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
        >
          基準価額の推移（10,000円を基準とした相対値）
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {fundName}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: fundReturn >= 0 ? 'success.main' : 'error.main',
                fontWeight: 500,
              }}
            >
              {fundReturn >= 0 ? '+' : ''}{fundReturn.toFixed(2)}%
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {benchmarkName}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: benchmarkReturn >= 0 ? 'success.main' : 'error.main',
                fontWeight: 500,
              }}
            >
              {benchmarkReturn >= 0 ? '+' : ''}{benchmarkReturn.toFixed(2)}%
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 期間選択ボタン */}
      <ButtonGroup size={isMobile ? "small" : "medium"} sx={{ mb: 2 }}>
        {[
          { value: '1M', label: '1ヶ月' },
          { value: '3M', label: '3ヶ月' },
          { value: '6M', label: '6ヶ月' },
          { value: '1Y', label: '1年' },
          { value: 'ALL', label: '全期間' },
        ].map((btn) => (
          <Button
            key={btn.value}
            onClick={() => setPeriod(btn.value as typeof period)}
            variant={period === btn.value ? 'contained' : 'outlined'}
          >
            {btn.label}
          </Button>
        ))}
      </ButtonGroup>

      {/* チャート本体 */}
      <Box sx={{ height: { xs: 250, sm: 300, md: 350 } }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={theme.palette.divider}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: isMobile ? 10 : 12 }}
              tickFormatter={(value) => value.slice(5)} // MM-DD形式で表示
            />
            <YAxis
              tick={{ fontSize: isMobile ? 10 : 12 }}
              domain={['dataMin - 500', 'dataMax + 500']}
            />
            <RechartsTooltip<ValueType, NameType>
              content={({ active, payload, label }) => (
                <CustomTooltip active={active} payload={payload} label={label} />
              )}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name={fundName}
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              name={benchmarkName}
              stroke={theme.palette.grey[500]}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* チャート下部の補足説明 */}
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: isMobile ? '0.625rem' : '0.75rem' }}
        >
          ※ グラフは10,000円を基準とした相対値です。実際の投資成果とは異なります。
          過去の運用実績は将来の運用成果を示唆・保証するものではありません。
        </Typography>
      </Box>
    </Box>
  );
};

export default FundPerformanceChart; 