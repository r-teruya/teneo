import React, { useState } from 'react';
import {
  Box,
  Container,
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
  useTheme,
  useMediaQuery,
  Tab,
  Tabs,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';

interface Transaction {
  id: string;
  date: string;
  type: '購入' | '解約' | '入金' | '出金';
  fundId?: string;
  fundName?: string;
  units?: number;
  amount: number;
  status: '完了' | '処理中' | 'キャンセル';
}

// ダミーデータ
const transactions: Transaction[] = [
  {
    id: '1',
    date: '2024/03/15',
    type: '購入',
    fundId: '1',
    fundName: 'グローバル株式ロングショート・ファンド',
    units: 100,
    amount: 10000000,
    status: '完了',
  },
  {
    id: '2',
    date: '2024/03/10',
    type: '入金',
    amount: 5000000,
    status: '完了',
  },
  {
    id: '3',
    date: '2024/03/05',
    type: '解約',
    fundId: '2',
    fundName: 'アジア株式ロングショート・ファンド',
    units: 50,
    amount: 5500000,
    status: '処理中',
  },
  // ... 他の取引履歴
];

const TransactionHistory = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case '完了': return 'success';
      case '処理中': return 'warning';
      case 'キャンセル': return 'error';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case '購入':
      case '入金':
        return <TrendingUpIcon sx={{ color: 'success.main', fontSize: isMobile ? 16 : 20 }} />;
      case '解約':
      case '出金':
        return <TrendingDownIcon sx={{ color: 'error.main', fontSize: isMobile ? 16 : 20 }} />;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    switch (tabValue) {
      case 0: return true; // すべて
      case 1: return transaction.type === '購入' || transaction.type === '解約';
      case 2: return transaction.type === '入金' || transaction.type === '出金';
      default: return true;
    }
  });

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
          取引履歴
        </Typography>

        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              sx={{
                px: { xs: 2, sm: 3 },
                '& .MuiTab-root': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                },
              }}
            >
              <Tab label="すべて" />
              <Tab label="ファンド取引" />
              <Tab label="入出金" />
            </Tabs>
          </Box>

          <CardContent sx={{ 
            p: { xs: 1.5, sm: 2, md: 3 },
            '&:last-child': { pb: { xs: 1.5, sm: 2, md: 3 } },
          }}>
            <TableContainer sx={{ 
              overflow: 'auto',
              maxHeight: { xs: 'calc(100vh - 300px)', sm: 'calc(100vh - 350px)' },
            }}>
              <Table size={isMobile ? "small" : "medium"}>
                <TableHead>
                  <TableRow>
                    <TableCell>日付</TableCell>
                    <TableCell>取引種別</TableCell>
                    <TableCell>ファンド名</TableCell>
                    <TableCell align="right">口数</TableCell>
                    <TableCell align="right">金額</TableCell>
                    <TableCell align="center">状態</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      sx={{
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                    >
                      <TableCell>
                        <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          {transaction.date}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getTypeIcon(transaction.type)}
                          <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            {transaction.type}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography 
                          sx={{ 
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            color: transaction.fundName ? 'text.primary' : 'text.secondary',
                          }}
                        >
                          {transaction.fundName || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          {transaction.units ? `${transaction.units.toLocaleString()}口` : '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography 
                          sx={{ 
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            fontWeight: 500,
                            color: transaction.type === '購入' || transaction.type === '出金' 
                              ? 'error.main' 
                              : 'success.main',
                          }}
                        >
                          {transaction.type === '購入' || transaction.type === '出金' ? '-' : '+'}
                          ¥{transaction.amount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={transaction.status}
                          color={getStatusColor(transaction.status)}
                          size={isMobile ? "small" : "medium"}
                          sx={{ 
                            minWidth: 80,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default TransactionHistory; 