import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';

interface PerformanceData {
  period: string;
  return: number;
  risk: number;
  sharpe: number;
}

interface PerformanceTableProps {
  data: PerformanceData[];
}

const PerformanceTable = ({ data }: PerformanceTableProps) => {
  return (
    <TableContainer sx={{ boxShadow: 'none' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>期間</TableCell>
            <TableCell align="right">リターン</TableCell>
            <TableCell align="right">リスク</TableCell>
            <TableCell align="right">シャープレシオ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.period}>
              <TableCell component="th" scope="row">
                {row.period}
              </TableCell>
              <TableCell 
                align="right"
                sx={{ 
                  color: row.return >= 0 ? 'success.main' : 'error.main',
                  fontWeight: 500,
                }}
              >
                {row.return >= 0 ? '+' : ''}{row.return}%
              </TableCell>
              <TableCell align="right">{row.risk}%</TableCell>
              <TableCell align="right">{row.sharpe}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PerformanceTable; 