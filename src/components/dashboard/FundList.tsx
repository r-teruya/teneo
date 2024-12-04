import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
  Grid,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getAllFundsWithPositions } from '../../data/funds';
import { Fund, FundWithPosition } from '../../types/fund';

const FundList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const fundsWithPositions = getAllFundsWithPositions();

  const handleShowDetails = (fundId: string) => {
    navigate(`/funds/${fundId}`);
  };

  const handleBuy = (fundId: string) => {
    navigate(`/funds/${fundId}/buy`);
  };

  const handleSell = (fundId: string) => {
    navigate(`/funds/${fundId}/sell`);
  };

  const handleNewPurchase = () => {
    navigate('/funds/new');
  };

  const MobileView = () => (
    <Stack spacing={2}>
      {fundsWithPositions.map((fund) => (
        <Card key={fund.id}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                {fund.name}
              </Typography>
              <Chip 
                label={fund.type} 
                size="small" 
                sx={{ fontSize: '0.75rem' }}
              />
            </Box>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  基準価額
                </Typography>
                <Typography variant="body2">
                  ¥{(fund.currentValue / fund.units).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  評価額
                </Typography>
                <Typography variant="body2">
                  ¥{fund.currentValue.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography 
                sx={{ 
                  color: fund.unrealizedGain >= 0 ? 'success.main' : 'error.main',
                  fontSize: '0.875rem',
                }}
              >
                {fund.unrealizedGain >= 0 ? '+' : ''}{fund.unrealizedGainPercent}%
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleBuy(fund.id)}
                  sx={{ color: 'success.main' }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleSell(fund.id)}
                  sx={{ color: 'error.main' }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleShowDetails(fund.id)}
                  color="primary"
                >
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );

  return (
    <Card>
      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          px: { xs: 1, sm: 0 },
        }}>
          <Typography 
            variant="h6"
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.25rem' },
              fontWeight: 500,
            }}
          >
            保有ファンド一覧
          </Typography>
          <Button
            variant="contained"
            onClick={handleNewPurchase}
            startIcon={<AddIcon />}
            size={isMobile ? "small" : "medium"}
          >
            新規購入
          </Button>
        </Box>

        {isMobile ? (
          <MobileView />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ファンド名</TableCell>
                  <TableCell align="right">基準価額</TableCell>
                  <TableCell align="right">評価額</TableCell>
                  <TableCell align="right">損益</TableCell>
                  <TableCell align="center" sx={{ minWidth: isMobile ? 100 : 120 }}>操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fundsWithPositions.map((fund) => (
                  <TableRow
                    key={fund.id}
                    sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                  >
                    <TableCell>
                      <Box sx={{ maxWidth: { xs: 120, sm: 'none' } }}>
                        <Typography 
                          sx={{ 
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            fontWeight: 500,
                            mb: 0.5,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {fund.name}
                        </Typography>
                        <Chip
                          label={fund.type}
                          size="small"
                          sx={{ 
                            fontSize: { xs: '0.625rem', sm: '0.75rem' },
                            height: { xs: 20, sm: 24 },
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        ¥{(fund.currentValue / fund.units).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        ¥{fund.currentValue.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        sx={{ 
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          color: fund.unrealizedGain >= 0 ? 'success.main' : 'error.main',
                        }}
                      >
                        {fund.unrealizedGain >= 0 ? '+' : ''}
                        {fund.unrealizedGainPercent}%
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        gap: { xs: 0.5, sm: 1 },
                      }}>
                        <IconButton
                          size={isMobile ? "small" : "medium"}
                          onClick={() => handleBuy(fund.id)}
                          sx={{ 
                            color: 'success.main',
                            p: { xs: 0.5, sm: 1 },
                          }}
                        >
                          <AddIcon fontSize={isMobile ? "small" : "medium"} />
                        </IconButton>
                        <IconButton
                          size={isMobile ? "small" : "medium"}
                          onClick={() => handleSell(fund.id)}
                          sx={{ 
                            color: 'error.main',
                            p: { xs: 0.5, sm: 1 },
                          }}
                        >
                          <RemoveIcon fontSize={isMobile ? "small" : "medium"} />
                        </IconButton>
                        <IconButton
                          size={isMobile ? "small" : "medium"}
                          onClick={() => handleShowDetails(fund.id)}
                          color="primary"
                          sx={{ p: { xs: 0.5, sm: 1 } }}
                        >
                          <InfoIcon fontSize={isMobile ? "small" : "medium"} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default FundList; 