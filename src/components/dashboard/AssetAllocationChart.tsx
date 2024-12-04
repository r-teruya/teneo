import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
  Chip,
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

  const total = data.reduce((sum, item) => sum + item.value, 0);

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

  // ファンドタイプごとの集計を計算
  const typeAggregation = data.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + item.value;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 2,
          mb: 2,
        }}>
          <Box>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, fontWeight: 500, mb: 1 }}>
              ファンド別資産配分
            </Typography>
            <Stack 
              direction="row" 
              spacing={0} 
              flexWrap="wrap" 
              sx={{ 
                mb: 1,
                gap: 1,
                '& > *': { 
                  ml: '0 !important',
                },
              }}
            >
              <Chip
                label={`総資産: ¥${total.toLocaleString()}`}
                color="primary"
                size={isMobile ? "small" : "medium"}
              />
              <Chip
                label={`ファンド数: ${data.length}`}
                color="secondary"
                size={isMobile ? "small" : "medium"}
              />
            </Stack>
          </Box>
        </Box>

        {/* ファンドタイプ別の集計 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            運用タイプ別構成比
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {Object.entries(typeAggregation).map(([type, value]) => (
              <Chip
                key={type}
                label={`${type}: ${((value / total) * 100).toFixed(1)}%`}
                variant="outlined"
                size="small"
                sx={{ 
                  fontSize: '0.75rem',
                  bgcolor: 'background.paper',
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* リスク分布の表示 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            リスクレベル分布
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {[1, 2, 3, 4, 5].map((risk) => {
              const riskAmount = data
                .filter(item => item.risk === risk)
                .reduce((sum, item) => sum + item.value, 0);
              const percentage = (riskAmount / total) * 100;
              
              return (
                <Box 
                  key={risk}
                  sx={{ 
                    flex: 1,
                    height: 4,
                    bgcolor: getColor(risk),
                    position: 'relative',
                    borderRadius: 1,
                    '&::after': {
                      content: `"${percentage.toFixed(0)}%"`,
                      position: 'absolute',
                      top: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '0.625rem',
                      color: 'text.secondary',
                    },
                  }}
                />
              );
            })}
          </Box>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            mt: 3,
            px: 1,
          }}>
            <Typography variant="caption" color="text.secondary">低リスク</Typography>
            <Typography variant="caption" color="text.secondary">高リスク</Typography>
          </Box>
        </Box>

        {/* 円グラフ */}
        <Box sx={{ height: isMobile ? 300 : 350, position: 'relative' }}>
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
                formatter={(value: number) => [
                  <Box>
                    <Typography sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                      ¥{value.toLocaleString()} ({((value / total) * 100).toFixed(1)}%)
                    </Typography>
                  </Box>,
                ]}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconSize={isMobile ? 8 : 10}
                iconType="circle"
                wrapperStyle={{
                  paddingLeft: isMobile ? 0 : 20,
                  right: isMobile ? 0 : 10,
                  maxWidth: isMobile ? '40%' : '30%',
                }}
                formatter={(value: string) => (
                  <Typography 
                    sx={{ 
                      fontSize: isMobile ? '0.625rem' : '0.75rem',
                      lineHeight: 1.2,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      wordBreak: 'break-all',
                    }}
                  >
                    {value}
                  </Typography>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* 注釈 */}
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
          ※ 資産配分は時価評価額に基づいて計算されています
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AssetAllocationChart; 