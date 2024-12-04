import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';

interface TransactionHistoryProps {
  fundId: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ fundId }) => {
  // 仮のデータ（後で実際のデータに置き換え）
  const transactions = [
    {
      date: '2024/03/15',
      type: '購入',
      amount: 500000,
      units: 500,
      price: 1000,
    },
    {
      date: '2024/02/01',
      type: '購入',
      amount: 1000000,
      units: 1000,
      price: 1000,
    },
  ];

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>日付</TableCell>
            <TableCell>種別</TableCell>
            <TableCell align="right">金額</TableCell>
            <TableCell align="right">口数</TableCell>
            <TableCell align="right">基準価額</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx, index) => (
            <TableRow key={index}>
              <TableCell>{tx.date}</TableCell>
              <TableCell>{tx.type}</TableCell>
              <TableCell align="right">¥{tx.amount.toLocaleString()}</TableCell>
              <TableCell align="right">{tx.units.toLocaleString()}</TableCell>
              <TableCell align="right">¥{tx.price.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {transactions.length === 0 && (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            取引履歴はありません
          </Typography>
        </Box>
      )}
    </TableContainer>
  );
};

export default TransactionHistory; 