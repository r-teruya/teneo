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

const PerformanceTable: React.FC<PerformanceTableProps> = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TableContainer>
      <Table size={isMobile ? "small" : "medium"}>
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
              <TableCell align="right">
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'flex-end',
                  gap: 0.5,
                }}>
                  {row.return >= 0 ? (
                    <TrendingUpIcon 
                      sx={{ 
                        color: 'success.main',
                        fontSize: isMobile ? 16 : 20,
                      }} 
                    />
                  ) : (
                    <TrendingDownIcon 
                      sx={{ 
                        color: 'error.main',
                        fontSize: isMobile ? 16 : 20,
                      }} 
                    />
                  )}
                  <Typography
                    sx={{
                      color: row.return >= 0 ? 'success.main' : 'error.main',
                      fontWeight: 500,
                      fontSize: isMobile ? '0.75rem' : '0.875rem',
                    }}
                  >
                    {row.return}%
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                  {row.risk}%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography 
                  sx={{ 
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    color: row.sharpe >= 0 ? 'success.main' : 'error.main',
                    fontWeight: 500,
                  }}
                >
                  {row.sharpe}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PerformanceTable; 