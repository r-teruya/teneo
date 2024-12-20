import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
  Grid,
} from '@mui/material';
import {
  Info as InfoIcon,
} from '@mui/icons-material';
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

  const MobileListItem = ({ fund }: { fund: FundWithPosition }) => (
    <Box
      sx={{
        p: 1.5,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography 
          sx={{ 
            fontSize: '0.875rem',
            fontWeight: 500,
            mb: 0.5,
          }}
        >
          {fund.name}
        </Typography>
        <Chip
          label={fund.type}
          size="small"
          sx={{ 
            fontSize: '0.75rem',
            height: 20,
          }}
        />
      </Box>

      <Grid container spacing={1} sx={{ mb: 1.5 }}>
        <Grid item xs={6}>
          <Typography variant="caption" color="text.secondary">
            基準価額
          </Typography>
          <Typography sx={{ fontSize: '0.875rem' }}>
            ¥{(fund.currentValue / fund.units).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="text.secondary">
            評価額
          </Typography>
          <Typography sx={{ fontSize: '0.875rem' }}>
            ¥{fund.currentValue.toLocaleString()}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography 
          sx={{ 
            fontSize: '0.875rem',
            color: fund.unrealizedGain >= 0 ? 'success.main' : 'error.main',
          }}
        >
          損益: {fund.unrealizedGain >= 0 ? '+' : ''}{fund.unrealizedGainPercent}%
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleBuy(fund.id)}
          >
            購入
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleSell(fund.id)}
          >
            解約
          </Button>
          <Button
            variant="text"
            color="primary"
            size="small"
            onClick={() => handleShowDetails(fund.id)}
          >
            詳細
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Card>
      <CardContent sx={{ 
        p: { xs: 0, sm: 2, md: 3 },
        '&:last-child': { pb: { xs: 0, sm: 2, md: 3 } },
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2,
          px: 2,
          pt: 2,
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
            size={isMobile ? "small" : "medium"}
          >
            新規購入
          </Button>
        </Box>

        {isMobile ? (
          <Box>
            {fundsWithPositions.map((fund) => (
              <MobileListItem key={fund.id} fund={fund} />
            ))}
          </Box>
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
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => handleBuy(fund.id)}
                        >
                          購入
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleSell(fund.id)}
                        >
                          解約
                        </Button>
                        <Button
                          variant="text"
                          color="primary"
                          size="small"
                          onClick={() => handleShowDetails(fund.id)}
                        >
                          詳細
                        </Button>
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