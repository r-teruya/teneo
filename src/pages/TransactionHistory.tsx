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
  Chip,
  IconButton,
  TextField,
  MenuItem,
  Stack,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Transaction } from '../types';

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
  {
    id: 't2',
    fundId: '2',
    fundName: 'アジア成長株ファンド',
    type: '解約',
    status: '処理中',
    amount: 500000,
    units: 250,
    date: '2024-02-28',
  },
  // ... さらにダミーデータを追加
];

const TransactionHistory = () => {
  const theme = useTheme();
  const navigate = useNavigate();
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

  const getTypeIcon = (type: Transaction['type']) => {
    return type === '買付' ? (
      <AddIcon sx={{ color: 'success.main', fontSize: 20 }} />
    ) : (
      <RemoveIcon sx={{ color: 'error.main', fontSize: 20 }} />
    );
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.fundName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        取引履歴
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="ファンド名で検索"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 200 }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
            />
            <TextField
              select
              label="取引状態"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
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
              size="small"
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="all">すべて</MenuItem>
              <MenuItem value="買付">買付</MenuItem>
              <MenuItem value="解約">解約</MenuItem>
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>取引日</TableCell>
                <TableCell>ファンド名</TableCell>
                <TableCell>種類</TableCell>
                <TableCell align="right">金額</TableCell>
                <TableCell align="right">口数</TableCell>
                <TableCell align="center">状態</TableCell>
                <TableCell>受渡日</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{
                    '&:hover': { 
                      bgcolor: 'action.hover',
                      cursor: 'pointer',
                    },
                  }}
                  onClick={() => navigate(`/funds/${transaction.fundId}`)}
                >
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getTypeIcon(transaction.type)}
                      <Typography variant="body2">
                        {transaction.fundName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color={transaction.type === '買付' ? 'success.main' : 'error.main'}
                    >
                      {transaction.type}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    ¥{transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    {transaction.units?.toLocaleString()}口
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={transaction.status}
                      size="small"
                      color={getStatusColor(transaction.status)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {transaction.settlementDate || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default TransactionHistory; 