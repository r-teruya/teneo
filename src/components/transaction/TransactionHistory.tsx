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
  TextField,
  MenuItem,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Transaction } from '../../types';

// ダミーデータ
const transactions: (Transaction & { fundName: string })[] = [
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
  // ... 他の取引データ
];

const TransactionHistory = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [typeFilter, setTypeFilter] = React.useState<string>('all');

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
      <AddIcon sx={{ color: 'success.main', fontSize: isMobile ? 16 : 20 }} />
    ) : (
      <RemoveIcon sx={{ color: 'error.main', fontSize: isMobile ? 16 : 20 }} />
    );
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.fundName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

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
        取引履歴
      </Typography>

      {/* フィルター */}
      <Card sx={{ mb: { xs: 2, sm: 3 } }}>
        <CardContent>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 1.5, sm: 2 }}
          >
            <TextField
              label="ファンド名で検索"
              variant="outlined"
              size={isMobile ? "small" : "medium"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: { xs: '100%', sm: 200 } }}
              InputProps={{
                startAdornment: (
                  <SearchIcon 
                    sx={{ 
                      color: 'text.secondary', 
                      mr: 1,
                      fontSize: isMobile ? 20 : 24,
                    }} 
                  />
                ),
              }}
            />
            <TextField
              select
              label="取引状態"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              size={isMobile ? "small" : "medium"}
              sx={{ minWidth: { xs: '100%', sm: 150 } }}
            >
              <MenuItem value="all">すべて</MenuItem>
              <MenuItem value="完了">完了</MenuItem>
              <MenuItem value="処理中">処理中</MenuItem>
              <MenuItem value="却下">却下</MenuItem>
            </TextField>
            <TextField
              select
              label="取引種類"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              size={isMobile ? "small" : "medium"}
              sx={{ minWidth: { xs: '100%', sm: 150 } }}
            >
              <MenuItem value="all">すべて</MenuItem>
              <MenuItem value="買付">買付</MenuItem>
              <MenuItem value="解約">解約</MenuItem>
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      {/* 取引リスト */}
      <Card>
        <List sx={{ p: 0 }}>
          {filteredTransactions.map((transaction, index) => (
            <React.Fragment key={transaction.id}>
              {index > 0 && <Box sx={{ my: 1, borderTop: 1, borderColor: 'divider' }} />}
              <ListItem
                sx={{
                  py: { xs: 1.5, sm: 2 },
                  px: { xs: 1.5, sm: 2, md: 3 },
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
      </Card>
    </Box>
  );
};

export default TransactionHistory; 