import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { getFundWithPosition } from '../../data/funds';
import FundPerformanceChart from './FundPerformanceChart';

const FundDetail = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const fundWithPosition = fundId ? getFundWithPosition(fundId) : null;

  if (!fundWithPosition) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 2, sm: 3 } }}>
          <Typography>ファンドが見つかりません。</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 3 },
      }}>
        {/* ファンド概要 */}
        <Card>
          <CardContent sx={{ 
            p: { xs: 2, sm: 3 },
            '&:last-child': { pb: { xs: 2, sm: 3 } },
          }}>
            <Box sx={{ mb: 2 }}>
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  fontWeight: 500,
                }}
              >
                {fundWithPosition.name}
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                paragraph
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
              >
                {fundWithPosition.description}
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              flexWrap: 'wrap', 
              mb: 3,
            }}>
              {fundWithPosition.features.map((feature, index) => (
                <Chip
                  key={index}
                  label={feature}
                  variant="outlined"
                  size={isMobile ? "small" : "medium"}
                  sx={{ 
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                />
              ))}
            </Box>

            <Divider sx={{ my: { xs: 2, sm: 3 } }} />

            <Grid container spacing={{ xs: 2, sm: 3 }}>
              <Grid item xs={6} sm={3}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  運用タイプ
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    fontWeight: 500,
                  }}
                >
                  {fundWithPosition.type}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  リスク
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    fontWeight: 500,
                  }}
                >
                  {fundWithPosition.risk}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  通貨
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    fontWeight: 500,
                  }}
                >
                  {fundWithPosition.currency}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  最低投資額
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    fontWeight: 500,
                  }}
                >
                  ¥{fundWithPosition.minInvestment.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* パフォーマンスチャート */}
        <FundPerformanceChart fundId={fundWithPosition.id} />
      </Box>
    </Container>
  );
};

export default FundDetail; 