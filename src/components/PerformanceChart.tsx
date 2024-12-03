import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  ButtonGroup,
  Button,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface PerformanceChartProps {
  fundId: string;
}

interface ChartData {
  date: string;
  value: number;
  benchmark: number;
}

const PerformanceChart = ({ fundId }: PerformanceChartProps) => {
  const [period, setPeriod] = React.useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('1Y');

  // 改善されたダミーデータ生成
  const generateData = (): ChartData[] => {
    const data: ChartData[] = [];
    const baseValue = 10000;
    const periods = period === '1M' ? 30 : 
                   period === '3M' ? 90 :
                   period === '6M' ? 180 :
                   period === '1Y' ? 365 : 730;

    let currentValue = baseValue;
    let trend = 0.001; // トレンド係数

    for (let i = 0; i < periods; i++) {
      // より自然な価格変動を生成
      const randomWalk = Math.random() * 0.02 - 0.01;
      const trendEffect = trend * i;
      currentValue = currentValue * (1 + randomWalk + trendEffect);

      // ベンチマークは若干異なる動きを示す
      const benchmarkValue = baseValue * (1 + (i * 0.0002) + (Math.random() * 0.01 - 0.005));

      const date = new Date();
      date.setDate(date.getDate() - (periods - i));

      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(currentValue * 100) / 100,
        benchmark: Math.round(benchmarkValue * 100) / 100,
      });
    }
    return data;
  };

  const data = React.useMemo(() => generateData(), [period]);

  return (
    <Card>
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              パフォーマンス推移
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              ベンチマーク比較
            </Typography>
          </Box>
          <ButtonGroup 
            size="small" 
            sx={{ 
              backgroundColor: 'background.paper',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderRadius: 2,
              '& .MuiButton-root': {
                minWidth: '80px',
              }
            }}
          >
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
                sx={{ px: 2 }}
              >
                {btn.label}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
        <Box sx={{ 
          width: '100%', 
          height: 400,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          p: 2,
          '& .recharts-surface': {
            overflow: 'visible',
          },
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2E3192" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#2E3192" stopOpacity={0.01}/>
                </linearGradient>
                <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9e9e9e" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#9e9e9e" stopOpacity={0.01}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                stroke="#E0E0E0"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: '#666666' }}
                interval={Math.floor(data.length / 6)}
                tickFormatter={(value) => value.slice(5)}
                stroke="#E0E0E0"
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#666666' }}
                domain={['auto', 'auto']}
                tickFormatter={(value) => `¥${value.toLocaleString()}`}
                stroke="#E0E0E0"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: 8,
                  border: 'none',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                }}
                formatter={(value: number) => [`¥${value.toLocaleString()}`, '']}
                labelFormatter={(label) => `日付: ${label}`}
              />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2E3192"
                fill="url(#colorValue)"
                fillOpacity={1}
                name="ファンド"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="benchmark"
                stroke="#9e9e9e"
                fill="url(#colorBenchmark)"
                fillOpacity={1}
                name="ベンチマーク"
                strokeWidth={1.5}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart; 