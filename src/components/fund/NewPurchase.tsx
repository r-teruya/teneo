import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Chip,
  Alert,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Fund } from '../../types';

// ダミーデータ
const availableFunds: Fund[] = [
  {
    id: '1',
    name: 'グローバル・エクイティ・ファンド',
    type: '株式',
    risk: 4,
    currency: '円',
    minInvestment: 1000000,
    description: '世界の主要株式市場に投資するグローバル株式ファンドです。',
    features: ['世界の優良企業に投資', 'アクティブ運用による銘柄選定', '為替ヘッジなし'],
  },
  {
    id: '2',
    name: 'アジア成長株ファンド',
    type: '株式',
    risk: 5,
    currency: '円',
    minInvestment: 500000,
    description: 'アジア地域の成長企業に投資するファンドです。',
    features: ['アジアの成長企業に投資', '高成長を目指した積極運用', '年2回決算'],
  },
];

const NewPurchase = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedFund, setSelectedFund] = React.useState<Fund | null>(null);
  const [amount, setAmount] = React.useState<string>('');

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^\d]/g, '');
    setAmount(value);
  };

  const handleSubmit = () => {
    if (!selectedFund || !amount) return;
    
    // 実際のアプリケーションでは購入処理を実行
    console.log('Purchase:', {
      fundId: selectedFund.id,
      amount: parseInt(amount),
    });

    // 取引履歴画面に遷移
    navigate('/transactions');
  };

  const getRiskColor = (risk: number) => {
    const colors = ['success', 'info', 'warning', 'error', 'error'];
    return colors[risk - 1] as 'success' | 'info' | 'warning' | 'error';
  };

  const isValidAmount = selectedFund && parseInt(amount) >= selectedFund.minInvestment;

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{ fontSize: isMobile ? '1.5rem' : '2.125rem' }}
      >
        新規購入
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* ファンド選択 */}
        <Grid item xs={12}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
          >
            ファンドを選択
          </Typography>
          <Grid container spacing={{ xs: 1.5, sm: 2 }}>
            {availableFunds.map((fund) => (
              <Grid item xs={12} md={6} key={fund.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border: fund === selectedFund ? 2 : 1,
                    borderColor: fund === selectedFund ? 'primary.main' : 'divider',
                    '&:hover': {
                      borderColor: 'primary.main',
                    },
                  }}
                  onClick={() => setSelectedFund(fund)}
                >
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <AccountBalanceIcon 
                        color="primary" 
                        sx={{ fontSize: isMobile ? 32 : 40 }} 
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography 
                          variant="h6"
                          sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
                        >
                          {fund.name}
                        </Typography>
                        <Stack 
                          direction="row" 
                          spacing={1} 
                          sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}
                        >
                          <Chip 
                            label={fund.type} 
                            size={isMobile ? "small" : "medium"}
                            color="primary" 
                            variant="outlined" 
                          />
                          <Chip 
                            label={`リスク ${fund.risk}`} 
                            size={isMobile ? "small" : "medium"}
                            color={getRiskColor(fund.risk)}
                            variant="outlined"
                          />
                          <Chip 
                            label={fund.currency} 
                            size={isMobile ? "small" : "medium"}
                            variant="outlined" 
                          />
                        </Stack>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                        >
                          {fund.description}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="primary" 
                          sx={{ 
                            mt: 1,
                            fontSize: isMobile ? '0.75rem' : '0.875rem',
                          }}
                        >
                          最低投資金額: ¥{fund.minInvestment.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* 購入金額入力 */}
        {selectedFund && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
                >
                  購入金額を入力
                </Typography>
                <TextField
                  fullWidth
                  label="購入金額"
                  value={amount ? `¥${parseInt(amount).toLocaleString()}` : ''}
                  onChange={handleAmountChange}
                  error={!!amount && !isValidAmount}
                  helperText={
                    amount && !isValidAmount
                      ? `最低投資金額は¥${selectedFund.minInvestment.toLocaleString()}です`
                      : ' '
                  }
                  size={isMobile ? "small" : "medium"}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  size={isMobile ? "large" : "large"}
                  disabled={!isValidAmount}
                  onClick={handleSubmit}
                >
                  購入を申請
                </Button>

                <Alert 
                  severity="info" 
                  icon={<WarningIcon />}
                  sx={{ 
                    mt: 2,
                    '& .MuiAlert-message': {
                      fontSize: isMobile ? '0.75rem' : '0.875rem',
                    },
                  }}
                >
                  購入申請後、5営業日以内に指定口座への入金が必要です
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default NewPurchase; 