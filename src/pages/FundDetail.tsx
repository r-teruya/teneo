import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Divider,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import { Fund, Position } from '../types';

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
  description: `
    世界の主要株式市場に投資するグローバル株式ファンドです。
    先進国を中心に、厳選された優良企業への分散投資を行います。
    長期的な資産の成長を目指します。
  `.trim(),
  features: [
    '世界の優良企業に投���',
    'アクティブ運用による銘柄選定',
    '為替ヘッジなし',
    '年4回決算',
  ],
};

const FundDetail = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();

  // 実際のアプリケーションではfundIdを使用してデータを取得

  const handleBuy = () => {
    navigate(`/funds/${fundId}/buy`);
  };

  const handleSell = () => {
    navigate(`/funds/${fundId}/sell`);
  };

  const StatusCard = ({ 
    title, 
    value, 
    subValue, 
    trend 
  }: { 
    title: string; 
    value: string; 
    subValue?: string; 
    trend?: 'up' | 'down';
  }) => (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
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
              <TrendingUpIcon sx={{ color: 'success.main', fontSize: 20 }} />
            ) : trend === 'down' ? (
              <TrendingDownIcon sx={{ color: 'error.main', fontSize: 20 }} />
            ) : null}
            <Typography
              variant="body2"
              color={trend === 'up' ? 'success.main' : trend === 'down' ? 'error.main' : 'text.secondary'}
            >
              {subValue}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 2,
          mb: 2,
        }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {fundDetail.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                label={fundDetail.type} 
                color="primary" 
                variant="outlined" 
              />
              <Chip 
                label={`リスク ${fundDetail.risk}`} 
                color="warning" 
                variant="outlined" 
              />
              <Chip 
                label={fundDetail.currency} 
                color="default" 
                variant="outlined" 
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleBuy}
            >
              追加購入
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<RemoveIcon />}
              onClick={handleSell}
            >
              解約
            </Button>
          </Box>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          {fundDetail.description}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* 投資状況 */}
        <Grid item xs={12} md={6} lg={3}>
          <StatusCard
            title="保有口数"
            value={`${fundDetail.units.toLocaleString()}口`}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatusCard
            title="取得価額"
            value={`¥${fundDetail.bookValue.toLocaleString()}`}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatusCard
            title="評価額"
            value={`¥${fundDetail.currentValue.toLocaleString()}`}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatusCard
            title="評価損益"
            value={`¥${fundDetail.unrealizedGain.toLocaleString()}`}
            subValue={`${fundDetail.unrealizedGainPercent}%`}
            trend={fundDetail.unrealizedGain >= 0 ? 'up' : 'down'}
          />
        </Grid>

        {/* パフォーマンスチャート */}
        <Grid item xs={12}>
          <PerformanceChart fundId={fundDetail.id} />
        </Grid>

        {/* ファンドの特徴 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ファンドの特徴
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                {fundDetail.features.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: 'background.default',
                      borderRadius: 1,
                      height: '100%',
                    }}>
                      <Typography variant="body1">
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