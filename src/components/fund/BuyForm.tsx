import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { getFundWithPosition } from '../../data/funds';

const BuyForm = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fund = fundId ? getFundWithPosition(fundId) : null;
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!fund) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ py: { xs: 2, sm: 3 } }}>
          <Alert severity="error">ファンドが見つかりません。</Alert>
        </Box>
      </Container>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const purchaseAmount = Number(amount);

    if (isNaN(purchaseAmount) || purchaseAmount <= 0) {
      setError('有効な金額を入力してください。');
      return;
    }

    if (purchaseAmount < fund.minInvestment) {
      setError(`最低投資額（${fund.minInvestment.toLocaleString()}円）以上の金額を入力してください。`);
      return;
    }

    // TODO: 購入処理の実装
    console.log('Purchase:', { fundId: fund.id, amount: purchaseAmount });
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: { xs: 2, sm: 3 } }}>
        <Card>
          <CardContent sx={{ 
            p: { xs: 2, sm: 3 },
            '&:last-child': { pb: { xs: 2, sm: 3 } },
          }}>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                fontWeight: 500,
              }}
            >
              ファンド購入
            </Typography>

            <Box sx={{ my: { xs: 2, sm: 3 } }}>
              <Typography 
                variant="h6"
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  fontWeight: 500,
                }}
              >
                {fund.name}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                {fund.type} • {fund.currency}
              </Typography>
            </Box>

            <Divider sx={{ my: { xs: 2, sm: 3 } }} />

            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  gutterBottom
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  購入金額（最低投資額: ¥{fund.minInvestment.toLocaleString()}）
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setError('');
                  }}
                  placeholder="購入金額を入力"
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

              <Box sx={{ 
                display: 'flex', 
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
              }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth={isMobile}
                  size={isMobile ? "large" : "medium"}
                >
                  購入する
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  fullWidth={isMobile}
                  size={isMobile ? "large" : "medium"}
                >
                  キャンセル
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default BuyForm; 