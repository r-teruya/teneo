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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from 'recharts';
import { getAllFundsWithPositions } from '../../data/funds';

const AssetAllocationChart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fundsWithPositions = getAllFundsWithPositions();
  const data = fundsWithPositions.map(fund => ({
    name: fund.name,
    value: fund.currentValue,
    type: fund.type,
    risk: fund.risk,
  }));

  // リスクレベルに応じた色を設定
  const getColor = (risk: number) => {
    switch (risk) {
      case 5: return theme.palette.error.main;      // 最もリスクが高い
      case 4: return theme.palette.warning.main;    // リスクが高い
      case 3: return theme.palette.info.main;       // 中程度のリスク
      case 2: return theme.palette.success.main;    // リスクが低い
      case 1: return theme.palette.primary.main;    // 最もリスクが低い
      default: return theme.palette.grey[500];
    }
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardContent sx={{ 
        p: { xs: 2, sm: 3 },
        '&:last-child': { pb: { xs: 2, sm: 3 } },
      }}>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '1rem', sm: '1.25rem' },
            fontWeight: 500,
            mb: 2,
          }}
        >
          ファンド別資産配分
        </Typography>
        <Box sx={{ 
          width: '100%',
          height: isMobile ? 200 : 300,
        }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? "45%" : "50%"}
                outerRadius={isMobile ? "70%" : "75%"}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell 
                    key={`cell-${entry.name}`}
                    fill={getColor(entry.risk)}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 4,
                  fontSize: isMobile ? 12 : 14,
                  padding: '8px 12px',
                }}
                formatter={(value: number, name: string, props: any) => [
                  <Box>
                    <Typography sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                      ¥{value.toLocaleString()} ({((value / total) * 100).toFixed(1)}%)
                    </Typography>
                    <Typography 
                      color="text.secondary" 
                      sx={{ fontSize: isMobile ? '0.625rem' : '0.75rem' }}
                    >
                      タイプ: {props.payload.type}
                    </Typography>
                    <Typography 
                      color="text.secondary" 
                      sx={{ fontSize: isMobile ? '0.625rem' : '0.75rem' }}
                    >
                      リスク: {props.payload.risk}
                    </Typography>
                  </Box>,
                  name,
                ]}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconSize={isMobile ? 8 : 10}
                iconType="circle"
                formatter={(value: string, entry: any) => (
                  <Box>
                    <Typography 
                      sx={{ 
                        fontSize: isMobile ? '0.75rem' : '0.875rem',
                        color: theme.palette.text.primary,
                      }}
                    >
                      {value}
                    </Typography>
                    <Typography 
                      sx={{ 
                        fontSize: isMobile ? '0.625rem' : '0.75rem',
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {((entry.payload.value / total) * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ 
            display: 'block',
            textAlign: 'center',
            mt: 2,
            fontSize: { xs: '0.625rem', sm: '0.75rem' },
          }}
        >
          ※ 資産配分は時価評価額に基づいて計算されています。
          リスクレベルは1（低）～5（高）で表示されています。
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AssetAllocationChart; 