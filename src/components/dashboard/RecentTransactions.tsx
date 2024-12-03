import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  KeyboardArrowRight as ArrowIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Transaction } from '../../types';

// ダミーデータ
const recentTransactions: (Transaction & { fundName: string })[] = [
  {
    id: 't1',
    fundId: '1',
    fundName: 'グローバル・エクイティ・ファンド',
    type: '買付',
    status: '完了',
    amount: 1000000,
    units: 500,
    date: '2024-03-01',
    settlementDate: '2024-03-05',
  },
  {
    id: 't2',
    fundId: '2',
    fundName: 'アジア成長株ファンド',
    type: '解約',
    status: '処理中',
    amount: 500000,
    units: 250,
    date: '2024-02-28',
    settlementDate: '2024-03-04',
  },
];

const RecentTransactions = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case '完了':
        return 'success';
      case '処理中':
        return 'warning';
      case '却下':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    return type === '買付' ? (
      <AddIcon sx={{ color: 'success.main' }} />
    ) : (
      <RemoveIcon sx={{ color: 'error.main' }} />
    );
  };

  return (
    <Card>
      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2,
        }}>
          <Typography 
            variant="h6"
            sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
          >
            最近の取引
          </Typography>
          <IconButton
            size={isMobile ? "small" : "medium"}
            onClick={() => navigate('/transactions')}
          >
            <ArrowIcon />
          </IconButton>
        </Box>

        <List sx={{ p: 0 }}>
          {recentTransactions.map((transaction, index) => (
            <React.Fragment key={transaction.id}>
              {index > 0 && <Box sx={{ my: 1, borderTop: 1, borderColor: 'divider' }} />}
              <ListItem
                sx={{
                  px: 0,
                  py: 1,
                  '&:hover': { 
                    bgcolor: 'action.hover',
                    cursor: 'pointer',
                  },
                }}
                onClick={() => navigate(`/funds/${transaction.fundId}`)}
              >
                <Box sx={{ mr: 2 }}>
                  {getTransactionIcon(transaction.type)}
                </Box>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 500,
                          fontSize: isMobile ? '0.875rem' : '1rem',
                        }}
                      >
                        {transaction.fundName}
                      </Typography>
                      <Chip
                        label={transaction.status}
                        size="small"
                        color={getStatusColor(transaction.status)}
                        variant="outlined"
                        sx={{
                          height: isMobile ? 20 : 24,
                          '& .MuiChip-label': {
                            px: isMobile ? 1 : 2,
                            fontSize: isMobile ? '0.75rem' : '0.875rem',
                          },
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 0.5 }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                      >
                        {transaction.date}
                        {transaction.settlementDate && 
                          ` • 受渡日: ${transaction.settlementDate}`}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: transaction.type === '買付' ? 'success.main' : 'error.main',
                          fontWeight: 500,
                          mt: 0.5,
                          fontSize: isMobile ? '0.875rem' : '1rem',
                        }}
                      >
                        ¥{transaction.amount.toLocaleString()}
                        {transaction.units && 
                          ` (${transaction.units.toLocaleString()}口)`}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions; 