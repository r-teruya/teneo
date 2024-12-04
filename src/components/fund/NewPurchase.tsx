import React from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  Info as InfoIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { funds } from '../../data/funds';

const NewPurchase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleSelectFund = (fundId: string) => {
    navigate(`/funds/${fundId}/buy`);
  };

  const handleShowDetails = (fundId: string) => {
    navigate(`/funds/${fundId}`);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 2, sm: 3 }, mt: { xs: '64px', sm: 0 } }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          新規ファンド購入
        </Typography>

        <Grid container spacing={3}>
          {funds.map((fund) => (
            <Grid item xs={12} md={6} key={fund.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  {/* ファンド名とタイプ */}
                  <Box sx={{ mb: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {fund.name}
                      </Typography>
                      <Tooltip title="詳細を見る">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleShowDetails(fund.id)}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                      <Chip 
                        label={fund.type} 
                        color="primary" 
                        size="small"
                      />
                      <Chip 
                        label={`リスク ${fund.risk}`} 
                        color="warning"
                        size="small"
                      />
                      <Chip 
                        label={fund.currency} 
                        variant="outlined"
                        size="small"
                      />
                    </Stack>
                  </Box>

                  {/* ファンドの特徴 */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {fund.description}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                      {fund.features.map((feature, index) => (
                        <Chip
                          key={index}
                          label={feature}
                          variant="outlined"
                          size="small"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* 投資情報と購入ボタン */}
                  <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    mt: 'auto',
                  }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        最低投資金額
                      </Typography>
                      <Typography variant="h6" color="primary.main">
                        ¥{fund.minInvestment.toLocaleString()}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleShowDetails(fund.id)}
                        startIcon={<InfoIcon />}
                      >
                        詳細
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleSelectFund(fund.id)}
                        endIcon={<ArrowForwardIcon />}
                      >
                        購入する
                      </Button>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default NewPurchase; 