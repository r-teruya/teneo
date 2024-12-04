import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  AddCircleOutline as AddIcon,
  RemoveCircleOutline as RemoveIcon,
} from '@mui/icons-material';
import { getFundWithPosition } from '../../data/funds';
import FundPerformanceChart from './FundPerformanceChart';
import PerformanceTable from '../dashboard/PerformanceTable';
import YourPerformanceChart from './YourPerformanceChart';
import TransactionHistory from './TransactionHistory';

// タブパネルのコンポーネント
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const FundDetail = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [tradeType, setTradeType] = useState<'buy' | 'sell' | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const fundWithPosition = fundId ? getFundWithPosition(fundId) : null;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenTradeModal = (type: 'buy' | 'sell') => {
    setTradeType(type);
    setTradeModalOpen(true);
    setAmount('');
    setError('');
  };

  const handleCloseTradeModal = () => {
    setTradeModalOpen(false);
    setTradeType(null);
    setAmount('');
    setError('');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 円マークを除去
    const valueWithoutYen = value.replace('¥', '');
    // カンマを除去して数値のみを取得
    const numericValue = valueWithoutYen.replace(/[^\d]/g, '');
    
    // 空の場合はクリア
    if (!numericValue) {
      setAmount('');
      setError('');
      return;
    }

    // 数値として有効な場合のみ更新
    const parsedValue = parseInt(numericValue, 10);
    if (!isNaN(parsedValue)) {
      setAmount(parsedValue.toString());
      setError('');
    }
  };

  const handleTrade = () => {
    if (!amount || !tradeType || !fundWithPosition) return;

    const value = Number(amount);
    if (isNaN(value) || value <= 0) {
      setError('有効な金額を入力してください');
      return;
    }

    if (tradeType === 'buy' && value < fundWithPosition.minInvestment) {
      setError(`最低投資額（${fundWithPosition.minInvestment.toLocaleString()}円）以上の金額を入力してください`);
      return;
    }

    if (tradeType === 'sell' && value > fundWithPosition.currentValue) {
      setError('保有評価額を超える金額は解約できません');
      return;
    }

    // TODO: 実際の取引処理
    console.log('Trade:', { type: tradeType, fundId, amount: value });
    handleCloseTradeModal();
  };

  if (!fundWithPosition) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 2, sm: 3 } }}>
          <Typography>ファンドが見つかりません。</Typography>
        </Box>
      </Container>
    );
  }

  // パフォーマンスデータを修正
  const performanceData = [
    { period: '直近', return: 1.2, risk: 8.3, sharpe: 0.8 },
    { period: '1ヶ月', return: 2.8, risk: 8.5, sharpe: 1.1 },
    { period: '3ヶ月', return: 5.5, risk: 8.8, sharpe: 1.3 },
    { period: '6ヶ月', return: 8.2, risk: 9.1, sharpe: 1.4 },
    { period: '1年', return: 15.5, risk: 9.5, sharpe: 1.5 },
    { period: '3年', return: 42.3, risk: 10.2, sharpe: 1.6 },
    { period: '5年', return: 68.5, risk: 10.8, sharpe: 1.5 },
    { period: '設定来', return: 82.2, risk: 11.2, sharpe: 1.4 },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 2, sm: 3 }, mt: { xs: '64px', sm: 0 } }}>
        {/* ファンド名とボタン */}
        <Box sx={{ 
          mb: 3,
          position: 'relative',  // 追加：ボタンの絶対配置のため
        }}>
          {/* ファンド名 */}
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '1.25rem', sm: '1.75rem' },
              pr: { sm: '200px' },  // 追加：デスクトップでボタンとの重なりを防ぐ
            }}
          >
            {fundWithPosition.name}
          </Typography>

          {/* タイプ、リスク、通貨のチップ */}
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            flexWrap: 'wrap',
            mb: { xs: 2, sm: 3 },
            pr: { sm: '200px' },  // 追加：デスクトップでボタンとの重なりを防ぐ
          }}>
            <Chip 
              label={fundWithPosition.type} 
              color="primary" 
              sx={{ borderRadius: '16px', fontWeight: 500, px: 1.5 }}
            />
            <Chip 
              label={`リスク ${fundWithPosition.risk}`} 
              color="warning" 
              sx={{ borderRadius: '16px', fontWeight: 500, px: 1.5 }}
            />
            <Chip 
              label={fundWithPosition.currency} 
              sx={{ 
                borderRadius: '16px',
                fontWeight: 500,
                px: 1.5,
                bgcolor: 'grey.100',
              }}
            />
          </Box>

          {/* 売買ボタン - デスクトップ版 */}
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              display: { xs: 'none', sm: 'flex' },
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<RemoveIcon />}
              onClick={() => handleOpenTradeModal('sell')}
              color="error"
            >
              解約
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenTradeModal('buy')}
            >
              追加購入
            </Button>
          </Stack>

          {/* 売買ボタン - スマホ版 */}
          <Box 
            sx={{ 
              display: { xs: 'flex', sm: 'none' },
              gap: 2,
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              fullWidth
              startIcon={<AddIcon />}
              onClick={() => handleOpenTradeModal('buy')}
              size="large"
              sx={{ 
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
              }}
            >
              追加購入
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<RemoveIcon />}
              onClick={() => handleOpenTradeModal('sell')}
              color="error"
              size="large"
              sx={{ 
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
              }}
            >
              解約
            </Button>
          </Box>
        </Box>

        {/* タブ付きカード */}
        <Card sx={{ 
          borderRadius: 3, 
          boxShadow: theme.shadows[3],
          overflow: 'hidden',  // 追加：タブのボーダーを確実に表示
        }}>
          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            bgcolor: 'grey.50',
          }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                minHeight: 48,  // 追加：タブの高さを調整
                '& .MuiTab-root': {
                  minHeight: 48,  // 追加：タブの高さを調整
                  textTransform: 'none',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                },
              }}
            >
              <Tab label="ファンド情報" />
              <Tab label="保有状況" />
            </Tabs>
          </Box>

          {/* タブパネルのスタイル調整 */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ 
              maxWidth: 800, 
              mx: 'auto',
              px: { xs: 2, sm: 3 },
            }}>
              {/* ファンドの説明 */}
              <Box sx={{ 
                bgcolor: 'background.default',
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                mb: 4,
              }}>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {fundWithPosition.description}
                </Typography>
              </Box>

              {/* 基本情報 */}
              <Typography variant="h6" gutterBottom sx={{ 
                mt: 4, 
                mb: 3,
                fontSize: { xs: '1.125rem', sm: '1.25rem' },
                fontWeight: 700,
                color: 'primary.main',
              }}>
                基本情報
              </Typography>
              <Grid container spacing={3} sx={{ mb: 6 }}>
                {[
                  { label: '運用タイプ', value: fundWithPosition.type },
                  { label: 'リスク', value: fundWithPosition.risk },
                  { label: '通貨', value: fundWithPosition.currency },
                  { label: '最低投資額', value: `¥${fundWithPosition.minInvestment.toLocaleString()}` },
                ].map((item, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Box sx={{ 
                      p: 2.5,
                      bgcolor: 'background.default',
                      borderRadius: 2,
                      height: '100%',
                    }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {item.label}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* パフォーマンス推移 */}
              <Typography variant="h6" gutterBottom sx={{ 
                mt: 4, 
                mb: 3,
                fontSize: { xs: '1.125rem', sm: '1.25rem' },
                fontWeight: 700,
                color: 'primary.main',
              }}>
                パフォーマンス推移
              </Typography>
              <Box sx={{ mb: 6 }}>
                <Box sx={{ 
                  width: '100%',
                  height: 300,
                  '& .recharts-responsive-container': {
                    maxWidth: '100%',
                  },
                }}>
                  <FundPerformanceChart fundId={fundWithPosition.id} />
                </Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ 
                    display: 'block',
                    mt: 2,
                    fontSize: { xs: '0.625rem', sm: '0.75rem' },
                    textAlign: 'center',
                  }}
                >
                  ※ 基準価額を100として指数化したパフォーマンスを表示しています。
                  <br />
                  過去の運用実績は将来の運用成果を示唆するものではありません。
                </Typography>
              </Box>

              {/* リターン・リスク分析 */}
              <Typography variant="h6" gutterBottom sx={{ 
                mt: 4, 
                mb: 3,
                fontSize: { xs: '1.125rem', sm: '1.25rem' },
                fontWeight: 700,
                color: 'primary.main',
              }}>
                リターン・リスク分析
              </Typography>
              <Box sx={{ mb: 6 }}>
                <PerformanceTable data={performanceData} />
              </Box>

              {/* ファンドの特徴 */}
              <Typography variant="h6" gutterBottom sx={{ 
                mt: 4, 
                mb: 3,
                fontSize: { xs: '1.125rem', sm: '1.25rem' },
                fontWeight: 700,
                color: 'primary.main',
              }}>
                ファンドの特徴
              </Typography>
              <Grid container spacing={2}>
                {fundWithPosition.features.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ 
                      p: 2.5, 
                      bgcolor: 'background.default', 
                      borderRadius: 2,
                      height: '100%',
                      transition: 'all 0.2s',
                      '&:hover': {
                        boxShadow: theme.shadows[2],
                        transform: 'translateY(-2px)',
                      },
                    }}>
                      <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                        {feature}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ 
              maxWidth: 800, 
              mx: 'auto',
              px: { xs: 2, sm: 3 },  // パディングを調整
            }}>
              {/* 保有状況サマリー */}
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={6} sm={6} md={3}>
                  <Box sx={{ 
                    p: { xs: 1.5, sm: 2 },
                    bgcolor: 'background.default', 
                    borderRadius: 2,
                  }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      gutterBottom
                      sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                    >
                      保有口数
                    </Typography>
                    <Typography 
                      variant="h6"
                      sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                    >
                      {fundWithPosition.units.toLocaleString()}口
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                  <Box sx={{ 
                    p: { xs: 1.5, sm: 2 },
                    bgcolor: 'background.default', 
                    borderRadius: 2,
                  }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      gutterBottom
                      sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                    >
                      取得価額
                    </Typography>
                    <Typography 
                      variant="h6"
                      sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                    >
                      ¥{fundWithPosition.bookValue.toLocaleString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                  <Box sx={{ 
                    p: { xs: 1.5, sm: 2 },
                    bgcolor: 'background.default', 
                    borderRadius: 2,
                  }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      gutterBottom
                      sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                    >
                      評価額
                    </Typography>
                    <Typography 
                      variant="h6"
                      sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                    >
                      ¥{fundWithPosition.currentValue.toLocaleString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                  <Box sx={{ 
                    p: { xs: 1.5, sm: 2 },
                    bgcolor: 'background.default', 
                    borderRadius: 2,
                  }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      gutterBottom
                      sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                    >
                      評価損益
                    </Typography>
                    <Typography 
                      variant="h6"
                      color={fundWithPosition.unrealizedGain >= 0 ? 'success.main' : 'error.main'}
                      sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                    >
                      {fundWithPosition.unrealizedGain >= 0 ? '+' : ''}
                      ¥{fundWithPosition.unrealizedGain.toLocaleString()}
                      <Typography 
                        component="span" 
                        color="inherit"
                        sx={{ 
                          ml: 1, 
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        }}
                      >
                        ({fundWithPosition.unrealizedGainPercent}%)
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* 運用実績グラフ */}
              <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2, color: 'primary.main' }}>
                あなたの運用実績
              </Typography>
              <Box sx={{ height: 300, mb: 4 }}>
                <YourPerformanceChart fundId={fundWithPosition.id} />
              </Box>

              {/* 取引履歴 */}
              <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2, color: 'primary.main' }}>
                取引履歴
              </Typography>
              <TransactionHistory fundId={fundWithPosition.id} />
            </Box>
          </TabPanel>
        </Card>

        {/* 取引モーダル */}
        <Dialog 
          open={tradeModalOpen} 
          onClose={handleCloseTradeModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {tradeType === 'buy' ? 'ファンド購入' : 'ファンド解約'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ py: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {fundWithPosition.name}
              </Typography>
              
              {tradeType === 'buy' ? (
                <Alert severity="info" sx={{ mb: 3 }}>
                  最低投資額: ¥{fundWithPosition.minInvestment.toLocaleString()}
                </Alert>
              ) : (
                <Alert severity="info" sx={{ mb: 3 }}>
                  解約可能額: ¥{fundWithPosition.currentValue.toLocaleString()}
                </Alert>
              )}

              <TextField
                fullWidth
                label={tradeType === 'buy' ? '購入金額' : '解約金額'}
                value={amount ? `¥${Number(amount).toLocaleString()}` : ''}
                onChange={handleAmountChange}
                error={!!error}
                helperText={error}
                placeholder="¥1,000,000"
                InputProps={{
                  inputMode: 'numeric',
                  sx: { 
                    fontSize: '1.25rem',
                    textAlign: 'right',
                  },
                }}
                sx={{ mb: 2 }}
              />

              <Typography variant="caption" color="text.secondary">
                {tradeType === 'buy' 
                  ? '※ 購入申請後、5営業日以内に指定口座への入金が必要です'
                  : '※ 解約申請から受渡までに5営業日程度かかります'}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseTradeModal}>
              キャンセル
            </Button>
            <Button
              variant="contained"
              onClick={handleTrade}
              color={tradeType === 'buy' ? 'primary' : 'error'}
              disabled={!amount || !!error}
            >
              {tradeType === 'buy' ? '購入する' : '解約する'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default FundDetail; 