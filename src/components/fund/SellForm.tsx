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

const SellForm = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fund = fundId ? getFundWithPosition(fundId) : null;
  const [units, setUnits] = useState<string>('');
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
    const sellUnits = Number(units);

    if (isNaN(sellUnits) || sellUnits <= 0) {
      setError('有効な口数を入力してください。');
      return;
    }

    if (sellUnits > fund.units) {
      setError(`保有口数（${fund.units.toLocaleString()}口）を超えて解約することはできません。`);
      return;
    }

    // 概算解約金額を計算
    const estimatedAmount = Math.floor(fund.currentValue * (sellUnits / fund.units));

    // TODO: 売却処理の実装
    console.log('Sell:', { 
      fundId: fund.id, 
      units: sellUnits,
      estimatedAmount,
    });
    navigate('/dashboard');
  };

  const calculateEstimatedAmount = (sellUnits: number) => {
    if (isNaN(sellUnits) || sellUnits <= 0) return 0;
    return Math.floor(fund.currentValue * (sellUnits / fund.units));
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
              ファンド解約
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
                  解約口数（保有口数: {fund.units.toLocaleString()}口）
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={units}
                  onChange={(e) => {
                    setUnits(e.target.value);
                    setError('');
                  }}
                  placeholder="解約口数を入力"
                  error={!!error}
                  helperText={error}
                  InputProps={{
                    endAdornment: '口',
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                    },
                  }}
                />
              </Box>

              {units && !error && (
                <Box sx={{ mb: 3 }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  >
                    概算解約金額
                  </Typography>
                  <Typography 
                    variant="h6"
                    sx={{ 
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                      fontWeight: 500,
                      color: theme.palette.primary.main,
                    }}
                  >
                    ¥{calculateEstimatedAmount(Number(units)).toLocaleString()}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.625rem', sm: '0.75rem' } }}
                  >
                    ※ 実際の解約金額は、解約時の基準価額により変動します。
                  </Typography>
                </Box>
              )}

              <Alert 
                severity="warning" 
                sx={{ 
                  mb: 3,
                  '& .MuiAlert-message': {
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  },
                }}
              >
                解約申請後のキャンセルはできません。
                解約金額は解約時の基準価額で計算され、
                お客様の口座に入金されるまでに5営業日程度かかります。
              </Alert>

              <Box sx={{ 
                display: 'flex', 
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
              }}>
                <Button
                  variant="contained"
                  color="error"
                  type="submit"
                  fullWidth={isMobile}
                  size={isMobile ? "large" : "medium"}
                >
                  解約する
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

export default SellForm; 