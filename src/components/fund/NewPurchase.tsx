import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { funds } from '../../data/funds';

const NewPurchase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleSelectFund = (fundId: string) => {
    navigate(`/funds/${fundId}/buy`);
  };

  const getRiskColor = (risk: number) => {
    switch (risk) {
      case 5: return theme.palette.error;
      case 4: return theme.palette.warning;
      case 3: return theme.palette.info;
      case 2: return theme.palette.success;
      default: return theme.palette.primary;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 2, sm: 3 } }}>
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            fontWeight: 500,
            mb: { xs: 2, sm: 3 },
          }}
        >
          新規ファンド購入
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {funds.map((fund) => (
            <Grid item xs={12} sm={6} md={4} key={fund.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <CardContent sx={{ 
                  p: { xs: 2, sm: 3 },
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography 
                      variant="h6"
                      sx={{ 
                        fontSize: { xs: '1rem', sm: '1.25rem' },
                        fontWeight: 500,
                        mb: 1,
                      }}
                    >
                      {fund.name}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex',
                      gap: 1,
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}>
                      <Chip
                        label={fund.type}
                        size={isMobile ? "small" : "medium"}
                        variant="outlined"
                      />
                      <Chip
                        label={`リスク ${fund.risk}`}
                        size={isMobile ? "small" : "medium"}
                        sx={{ 
                          color: getRiskColor(fund.risk).main,
                          borderColor: getRiskColor(fund.risk).main,
                        }}
                        variant="outlined"
                      />
                    </Box>
                  </Box>

                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    paragraph
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      flex: 1,
                    }}
                  >
                    {fund.description}
                  </Typography>

                  <Box sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    flexWrap: 'wrap',
                    mb: 2,
                  }}>
                    {fund.features.map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          fontSize: { xs: '0.625rem', sm: '0.75rem' },
                        }}
                      />
                    ))}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                    >
                      最低投資額
                    </Typography>
                    <Typography 
                      variant="h6"
                      sx={{ 
                        fontSize: { xs: '1rem', sm: '1.25rem' },
                        fontWeight: 500,
                        mb: 2,
                      }}
                    >
                      ¥{fund.minInvestment.toLocaleString()}
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleSelectFund(fund.id)}
                      size={isMobile ? "large" : "medium"}
                    >
                      このファンドを購入
                    </Button>
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