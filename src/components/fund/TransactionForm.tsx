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
  Divider,
  useTheme,
} from '@mui/material';
import {
  Warning as WarningIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Fund } from '../../types';

interface TransactionFormProps {
  type: '買付' | '解約';
  fund: Fund;
  currentUnits?: number;
  currentValue?: number;
}

const TransactionForm = ({ type, fund, currentUnits, currentValue }: TransactionFormProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [amount, setAmount] = React.useState<string>('');

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^\d]/g, '');
    setAmount(value);
  };

  const handleSubmit = () => {
    if (!amount) return;
    
    // 実際のアプリケーションでは取引処理を実行
    console.log('Transaction:', {
      type,
      fundId: fund.id,
      amount: parseInt(amount),
    });

    // 取引履歴画面に遷移
    navigate('/transactions');
  };

  const isValidAmount = type === '買付'
    ? parseInt(amount) >= fund.minInvestment
    : currentValue && parseInt(amount) <= currentValue;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {fund.name}の{type}
      </Typography>

      <Stack spacing={3}>
        {/* ファンド情報 */}
        <Card>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <AccountBalanceIcon color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="subtitle1" color="text.secondary">
                  {fund.type}ファンド
                </Typography>
                <Typography variant="h6">
                  {fund.name}
                </Typography>
              </Box>
            </Stack>
            {currentUnits && currentValue && (
              <>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" spacing={4}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      保有口数
                    </Typography>
                    <Typography variant="h6">
                      {currentUnits.toLocaleString()}口
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      評価額
                    </Typography>
                    <Typography variant="h6">
                      ¥{currentValue.toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
              </>
            )}
          </CardContent>
        </Card>

        {/* 取引フォーム */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {type}金額を入力
            </Typography>
            <TextField
              fullWidth
              label={`${type}金額`}
              value={amount ? `¥${parseInt(amount).toLocaleString()}` : ''}
              onChange={handleAmountChange}
              error={!!amount && !isValidAmount}
              helperText={
                amount && !isValidAmount
                  ? type === '買付'
                    ? `最低投資金額は¥${fund.minInvestment.toLocaleString()}です`
                    : '解約金額が評価額を超えています'
                  : ' '
              }
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              fullWidth
              size="large"
              disabled={!isValidAmount}
              onClick={handleSubmit}
            >
              {type}を申請
            </Button>

            <Alert 
              severity="info" 
              icon={<WarningIcon />}
              sx={{ mt: 2 }}
            >
              {type === '買付'
                ? '申請後、5営業日以内に指定口座への入金が必要です'
                : '解約申請から受渡までに5営業日程度かかります'
              }
            </Alert>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default TransactionForm; 