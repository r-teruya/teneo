import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Fund } from '../../types';

// ダミーデータ
const fundData: Fund = {
  id: '1',
  name: 'グローバル・エクイティ・ファンド',
  type: '株式',
  risk: 4,
  currency: '円',
  minInvestment: 1000000,
  description: '世界の主要株式市場に投資するグローバル株式ファンドです。',
  features: ['世界の優良企業に投資', 'アクティブ運用による銘柄選定', '為替ヘッジなし'],
};

const BuyForm = () => {
  const { fundId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [amount, setAmount] = React.useState<string>('');

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^\d]/g, '');
    setAmount(value);
  };

  const handleSubmit = () => {
    if (!amount) return;
    
    // 実際のアプリケーションでは購入処理を実行
    console.log('Purchase:', {
      fundId,
      amount: parseInt(amount),
    });

    // 取引履歴画面に遷移
    navigate('/transactions');
  };

  const isValidAmount = parseInt(amount) >= fundData.minInvestment;

  return (
    <Box sx={{ 
      p: { xs: 1.5, sm: 2, md: 3 },
      pt: { xs: '64px', sm: '64px', md: '64px' },
    }}>
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{ fontSize: isMobile ? '1.5rem' : '2.125rem' }}
      >
        追加購入
      </Typography>

      <Card sx={{ mb: { xs: 2, sm: 3 } }}>
        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Typography 
            variant="h6"
            sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
          >
            {fundData.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mt: 1,
              fontSize: isMobile ? '0.75rem' : '0.875rem',
            }}
          >
            {fundData.description}
          </Typography>
          <Typography 
            variant="body2" 
            color="primary"
            sx={{ 
              mt: 1,
              fontSize: isMobile ? '0.75rem' : '0.875rem',
            }}
          >
            最低投資金額: ¥{fundData.minInvestment.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Stack spacing={2}>
            <Typography 
              variant="h6"
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
                  ? `最低投資金額は¥${fundData.minInvestment.toLocaleString()}です`
                  : ' '
              }
              size={isMobile ? "small" : "medium"}
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
                '& .MuiAlert-message': {
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                },
              }}
            >
              購入申請後、5営業日以内に指定口座への入金が必要です
            </Alert>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BuyForm; 