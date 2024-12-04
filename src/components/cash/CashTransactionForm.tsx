import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Balance } from '../../types/balance';
import { UserBankAccount } from '../../types/bank';

interface CashTransactionFormProps {
  type: 'deposit' | 'withdraw';
  balance: Balance;
  bankAccounts: UserBankAccount[];
}

const CashTransactionForm: React.FC<CashTransactionFormProps> = ({
  type,
  balance,
  bankAccounts,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [amount, setAmount] = useState<string>('');
  const [selectedBankId, setSelectedBankId] = useState<string>('');
  const [error, setError] = useState<string>('');

  const defaultAccount = bankAccounts.find(account => account.isDefault);

  // 出金時は、デフォルト口座を自動選択
  React.useEffect(() => {
    if (type === 'withdraw' && defaultAccount && !selectedBankId) {
      setSelectedBankId(defaultAccount.id);
    }
  }, [type, defaultAccount, selectedBankId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = Number(amount);

    if (isNaN(value) || value <= 0) {
      setError('有効な金額を入力してください。');
      return;
    }

    if (type === 'deposit' && value < 10000) {
      setError('入金額は10,000円以上を指定してください。');
      return;
    }

    if (type === 'withdraw') {
      if (value < 1000) {
        setError('出金額は1,000円以上を指定してください。');
        return;
      }
      if (value > balance.availableBalance) {
        setError('出金可能額を超えています。');
        return;
      }
      if (!selectedBankId) {
        setError('出金先の口座を選択してください。');
        return;
      }
    }

    // TODO: 入出金処理の実装
    console.log('Transaction:', { 
      type, 
      amount: value,
      bankAccountId: selectedBankId,
    });
    navigate('/dashboard');
  };

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              gutterBottom
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              {type === 'deposit' ? (
                '入金額（最低入金額: ¥10,000）'
              ) : (
                `出金額（最低出金額: ¥1,000、出金可能額: ¥${balance.availableBalance.toLocaleString()}）`
              )}
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError('');
              }}
              placeholder={type === 'deposit' ? '入金額を入力' : '出金額を入力'}
              error={!!error}
              helperText={error}
              InputProps={{
                startAdornment: '¥',
              }}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                },
              }}
            />
          </Box>

          {type === 'withdraw' && (
            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth error={!!error && !selectedBankId}>
                <InputLabel>出金先口座</InputLabel>
                <Select
                  value={selectedBankId}
                  onChange={(e) => {
                    setSelectedBankId(e.target.value);
                    setError('');
                  }}
                  label="出金先口座"
                >
                  {bankAccounts.map((account) => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.bankName} {account.branchName} {account.accountType} {account.accountNumber}
                      {account.isDefault && ' （デフォルト）'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          <Alert 
            severity="info" 
            sx={{ 
              mb: 3,
              '& .MuiAlert-message': {
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              },
            }}
          >
            {type === 'deposit' ? (
              '入金は銀行振込の確認後、即時反映されます。入金額に上限はありません。'
            ) : (
              '出金申請後、翌営業日までに指定の口座へ振り込まれます。'
            )}
          </Alert>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
          }}>
            <Button
              variant="contained"
              color={type === 'deposit' ? 'success' : 'error'}
              type="submit"
              fullWidth={isMobile}
              size={isMobile ? "large" : "medium"}
            >
              {type === 'deposit' ? '入金する' : '出金する'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/dashboard')}
              fullWidth={isMobile}
              size={isMobile ? "large" : "medium"}
            >
              キャンセル
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CashTransactionForm; 