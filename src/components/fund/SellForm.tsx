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
import { Fund, Position } from '../../types';

// ダミーデータ
const fundData: Fund & Position = {
  id: '1',
  fundId: '1',
  name: 'グローバル・エクイティ・ファンド',
  type: '株式',
  risk: 4,
  currency: '円',
  minInvestment: 1000000,
  description: '世界の主要株式市場に投資するグローバル株式ファンドです。',
  features: ['世界の優良企業に投資', 'アクティブ運用による銘柄選定', '為替ヘッジなし'],
  units: 1000,
  bookValue: 2000000,
  currentValue: 2200000,
  unrealizedGain: 200000,
  unrealizedGainPercent: 10,
};

const SellForm = () => {
  const { fundId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [units, setUnits] = React.useState<string>('');

  const handleUnitsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^\d]/g, '');
    setUnits(value);
  };

  const handleSubmit = () => {
    if (!units) return;
    
    // 実際のアプリケーションでは解約処理を実行
    console.log('Sell:', {
      fundId,
      units: parseInt(units),
    });

    // 取引履歴画面に遷移
    navigate('/transactions');
  };

  const isValidUnits = parseInt(units) > 0 && parseInt(units) <= fundData.units;
  const estimatedValue = isValidUnits 
    ? Math.round((parseInt(units) / fundData.units) * fundData.currentValue)
    : 0;

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
        解約
      </Typography>

      <Card sx={{ mb: { xs: 2, sm: 3 } }}>
        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Typography 
            variant="h6"
            sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
          >
            {fundData.name}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
            >
              保有口数
            </Typography>
            <Typography 
              variant="h6"
              sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
            >
              {fundData.units.toLocaleString()}口
            </Typography>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
            >
              評価額
            </Typography>
            <Typography 
              variant="h6"
              sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
            >
              ¥{fundData.currentValue.toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Stack spacing={2}>
            <Typography 
              variant="h6"
              sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
            >
              解約口数を入力
            </Typography>
            <TextField
              fullWidth
              label="解約口数"
              value={units ? parseInt(units).toLocaleString() : ''}
              onChange={handleUnitsChange}
              error={!!units && !isValidUnits}
              helperText={
                units && !isValidUnits
                  ? '解約口数が保有口数を超えています'
                  : ' '
              }
              size={isMobile ? "small" : "medium"}
            />
            {isValidUnits && (
              <Typography 
                variant="body1"
                sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
              >
                概算解約金額: ¥{estimatedValue.toLocaleString()}
              </Typography>
            )}
            <Button
              variant="contained"
              color="error"
              fullWidth
              size={isMobile ? "large" : "large"}
              disabled={!isValidUnits}
              onClick={handleSubmit}
            >
              解約を申請
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
              解約代金は、受渡日に指定口座へ入金されます。
              解約時の基準価額により、実際の解約金額は概算額と異なる場合があります。
            </Alert>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SellForm; 