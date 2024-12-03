import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Button,
  useTheme,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Info as InfoIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material';
import { Fund, Position } from '../../types';
import { useNavigate } from 'react-router-dom';

// ダミーデータ
const fundPositions: (Fund & Position)[] = [
  {
    id: '1',
    fundId: '1',
    name: 'グローバル・エクイティ・ファンド',
    type: '株式',
    risk: 4,
    currency: '円',
    minInvestment: 1000000,
    units: 1000,
    bookValue: 2000000,
    currentValue: 2200000,
    unrealizedGain: 200000,
    unrealizedGainPercent: 10,
    description: `世界の主要株式市場に投資するグローバル株式ファンドです。先進国を中心に、厳選された優良企業への分散投資を行います。`,
    features: [
      '世界の優良企業に投資',
      'アクティブ運用による銘柄選定',
      '為替ヘッジなし',
    ],
  },
  {
    id: '2',
    fundId: '2',
    name: 'アジア成長株ファンド',
    type: '株式',
    risk: 5,
    currency: '円',
    minInvestment: 500000,
    units: 500,
    bookValue: 1500000,
    currentValue: 1650000,
    unrealizedGain: 150000,
    unrealizedGainPercent: 10,
    description: `アジア地域の成長企業に投資するファンドです。高い成長が期待される企業を厳選し、積極的な運用を行います。`,
    features: [
      'アジアの成長企業に投資',
      '高成長を目指した積極運用',
      '年2回決算',
    ],
  },
  {
    id: '3',
    fundId: '3',
    name: 'グローバル債券ファンド',
    type: '債券',
    risk: 2,
    currency: '円',
    minInvestment: 1000000,
    units: 2000,
    bookValue: 2500000,
    currentValue: 2400000,
    unrealizedGain: -100000,
    unrealizedGainPercent: -4,
    description: `世界の主要国の国債を中心に投資するファンドです。安定的な運用を目指し、インカムゲインの確保を重視します。`,
    features: [
      '世界の国債中心',
      '安定運用重視',
      '毎月分配型',
    ],
  },
];

const FundList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getRiskLevel = (risk: number) => {
    const colors = ['success', 'info', 'warning', 'error', 'error'];
    return colors[risk - 1] as 'success' | 'info' | 'warning' | 'error';
  };

  const handleBuy = (fundId: string) => {
    navigate(`/funds/${fundId}/buy`);
  };

  const handleSell = (fundId: string) => {
    navigate(`/funds/${fundId}/sell`);
  };

  const handleShowDetails = (fundId: string) => {
    navigate(`/funds/${fundId}`);
  };

  const handleNewPurchase = () => {
    navigate('/purchase/new');
  };

  return (
    <Card>
      <CardContent sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 1,
        }}>
          <Typography variant="h6">
            保有ファンド一覧
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNewPurchase}
            size={isMobile ? "small" : "medium"}
          >
            新規購入
          </Button>
        </Box>

        <Box sx={{ 
          width: '100%', 
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch', // iOSのスムーススクロール
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.15)',
            borderRadius: 4,
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.25)',
            },
          },
        }}>
          <Table sx={{ minWidth: isMobile ? 600 : 'auto' }}>
            <TableHead>
              <TableRow>
                <TableCell>ファンド名</TableCell>
                <TableCell align="right">保有口数</TableCell>
                <TableCell align="right">取得価額</TableCell>
                <TableCell align="right">評価額</TableCell>
                <TableCell align="right">評価損益</TableCell>
                <TableCell align="right">リスク</TableCell>
                <TableCell align="center" sx={{ minWidth: 120 }}>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fundPositions.map((fund) => (
                <TableRow
                  key={fund.id}
                  sx={{
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <TableCell>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      minWidth: isMobile ? 150 : 'auto',
                    }}>
                      <AccountBalanceIcon 
                        sx={{ 
                          color: theme.palette.primary.main,
                          fontSize: isMobile ? 20 : 24,
                        }} 
                      />
                      <Box>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 500,
                            fontSize: isMobile ? '0.8125rem' : '0.875rem',
                          }}
                        >
                          {fund.name}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{
                            fontSize: isMobile ? '0.75rem' : '0.8125rem',
                          }}
                        >
                          {fund.type} • {fund.currency}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {fund.units.toLocaleString()}口
                  </TableCell>
                  <TableCell align="right">
                    ¥{fund.bookValue.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    ¥{fund.currentValue.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'flex-end',
                      gap: 0.5,
                    }}>
                      {fund.unrealizedGain >= 0 ? (
                        <TrendingUpIcon 
                          sx={{ color: 'success.main', fontSize: 16 }} 
                        />
                      ) : (
                        <TrendingDownIcon 
                          sx={{ color: 'error.main', fontSize: 16 }} 
                        />
                      )}
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: fund.unrealizedGain >= 0 ? 'success.main' : 'error.main',
                            fontWeight: 500,
                          }}
                        >
                          ¥{Math.abs(fund.unrealizedGain).toLocaleString()}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: fund.unrealizedGain >= 0 ? 'success.main' : 'error.main',
                          }}
                        >
                          {fund.unrealizedGain >= 0 ? '+' : ''}{fund.unrealizedGainPercent}%
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`リスク ${fund.risk}`}
                      size="small"
                      color={getRiskLevel(fund.risk)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Tooltip title="追加購入">
                        <IconButton
                          size="small"
                          onClick={() => handleBuy(fund.id)}
                          sx={{ color: 'success.main' }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="解約">
                        <IconButton
                          size="small"
                          onClick={() => handleSell(fund.id)}
                          sx={{ color: 'error.main' }}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="詳細">
                        <IconButton
                          size="small"
                          onClick={() => handleShowDetails(fund.id)}
                          color="primary"
                        >
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FundList; 