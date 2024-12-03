import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Divider,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import FundPerformanceChart from './FundPerformanceChart';
import { Fund, Position } from '../../types';

// ダミーデータ
const fundDetail: Fund & Position = {
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
  description: '世界の主要株式市場に投資するグローバル株式ファンドです。先進国を中心に、厳選された優良企業への分散投資を行います。長期的な資産の成長を目指します。',
  features: [
    '世界の優良企業に投資',
    'アクティブ運用による銘柄選定',
    '為替ヘッジなし',
    '年4回決算',
  ],
};

const FundDetail = () => {
  const { fundId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleBuy = () => {
    navigate(`/funds/${fundId}/buy`);
  };

  const handleSell = () => {
    navigate(`/funds/${fundId}/sell`);
  };

  const StatusCard = ({ title, value, subValue, trend }: { 
    title: string; 
    value: string; 
    subValue?: string; 
    trend?: 'up' | 'down';
  }) => (
    <Card>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Typography 
          variant="subtitle2" 
          color="text.secondary" 
          gutterBottom
          sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h5" 
          component="div"
          sx={{ fontSize: isMobile ? '1.25rem' : '1.5rem' }}
        >
          {value}
        </Typography>
        {subValue && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5,
            mt: 1,
          }}>
            {trend === 'up' ? (
              <TrendingUpIcon sx={{ color: 'success.main', fontSize: isMobile ? 16 : 20 }} />
            ) : trend === 'down' ? (
              <TrendingDownIcon sx={{ color: 'error.main', fontSize: isMobile ? 16 : 20 }} />
            ) : null}
            <Typography
              variant="body2"
              sx={{
                color: trend === 'up' ? 'success.main' : trend === 'down' ? 'error.main' : 'text.secondary',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
              }}
            >
              {subValue}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ 
      p: { xs: 1.5, sm: 2, md: 3 },
      pt: { xs: '64px', sm: '64px', md: '64px' },
    }}>
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: { xs: 1, sm: 2 },
          mb: { xs: 1.5, sm: 2 },
        }}>
          <Box>
            <Typography 
              variant="h4" 
              gutterBottom
              sx={{ fontSize: isMobile ? '1.5rem' : '2.125rem' }}
            >
              {fundDetail.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                label={fundDetail.type} 
                color="primary" 
                variant="outlined"
                size={isMobile ? "small" : "medium"}
              />
              <Chip 
                label={`リスク ${fundDetail.risk}`} 
                color="warning" 
                variant="outlined"
                size={isMobile ? "small" : "medium"}
              />
              <Chip 
                label={fundDetail.currency} 
                color="default" 
                variant="outlined"
                size={isMobile ? "small" : "medium"}
              />
            </Box>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            width: { xs: '100%', sm: 'auto' },
          }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleBuy}
              size={isMobile ? "small" : "medium"}
              fullWidth={isMobile}
            >
              追加購入
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<RemoveIcon />}
              onClick={handleSell}
              size={isMobile ? "small" : "medium"}
              fullWidth={isMobile}
            >
              解約
            </Button>
          </Box>
        </Box>

        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            mt: 2,
            fontSize: isMobile ? '0.875rem' : '1rem',
          }}
        >
          {fundDetail.description}
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
        {/* 投資状況 */}
        <Grid item xs={6} sm={6} md={3}>
          <StatusCard
            title="保有口数"
            value={`${fundDetail.units.toLocaleString()}口`}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatusCard
            title="取得価額"
            value={`¥${fundDetail.bookValue.toLocaleString()}`}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatusCard
            title="評価額"
            value={`¥${fundDetail.currentValue.toLocaleString()}`}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatusCard
            title="評価損益"
            value={`¥${fundDetail.unrealizedGain.toLocaleString()}`}
            subValue={`${fundDetail.unrealizedGainPercent}%`}
            trend={fundDetail.unrealizedGain >= 0 ? 'up' : 'down'}
          />
        </Grid>

        {/* パフォーマンスチャート */}
        <Grid item xs={12}>
          <FundPerformanceChart 
            fundId={fundDetail.id} 
            fundName={fundDetail.name}
            benchmarkName="TOPIX（配当込み）"
          />
        </Grid>

        {/* ファンドの特徴 */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
              >
                ファンドの特徴
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                {fundDetail.features.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box sx={{ 
                      p: { xs: 1.5, sm: 2 }, 
                      bgcolor: 'background.default',
                      borderRadius: 1,
                      height: '100%',
                    }}>
                      <Typography 
                        variant="body1"
                        sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                      >
                        {feature}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FundDetail; 