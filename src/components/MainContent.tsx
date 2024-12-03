import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Grid,
  Divider,
  Stack,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import { 
  Description as DescriptionIcon,
  AccountBalance as AccountBalanceIcon,
  Assessment as AssessmentIcon,
  Download as DownloadIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import TransactionSection from './TransactionSection';
import InvestmentStatus from './InvestmentStatus';
import PerformanceChart from './PerformanceChart';
import { useTheme, useMediaQuery } from '@mui/material';
import InvestmentGuide from './InvestmentGuide';

interface MainContentProps {
  selectedFund: string | null;
}

interface PerformanceData {
  period: string;
  return: string;
  risk: string;
  sharpe: string;
}

const PERFORMANCE_PERIODS = [
  '直近',
  '1ヶ月',
  '3ヶ月',
  '6ヶ月',
  '1年',
  '3年',
  '5年',
  '創設以来',
] as const;

// パフォーマンスデータ生成関数
const generatePerformanceData = (): PerformanceData[] => {
  return PERFORMANCE_PERIODS.map(period => ({
    period,
    return: (Math.random() * 20 - 10).toFixed(2),
    risk: (Math.random() * 10).toFixed(2),
    sharpe: (Math.random() * 2 - 1).toFixed(2),
  }));
};

const MainContent = ({ selectedFund }: MainContentProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!selectedFund) {
    return (
      <Box sx={{ 
        flexGrow: 1, 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'background.default',
      }}>
        <Card sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
          <AssessmentIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            ファンドを選択してください
          </Typography>
          <Typography variant="body2" color="text.secondary">
            左側のメニューからファンドを選択して、詳細情報を表示します
          </Typography>
        </Card>
      </Box>
    );
  }

  const performanceData = generatePerformanceData();

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: { xs: 2, md: 3 }, 
      bgcolor: 'background.default',
      mt: { xs: 8, md: 0 },
      overflow: 'hidden',
    }}>
      <Stack 
        spacing={{ xs: 2, md: 3 }}
        sx={{
          '& > *': {
            width: '100%',
            maxWidth: '100%',
          },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}>
          {!isMobile && (
            <Typography variant="h4" gutterBottom>
              {selectedFund}
            </Typography>
          )}
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{ borderRadius: 2 }}
            fullWidth={isMobile}
          >
            レポートダウンロード
          </Button>
        </Box>

        <InvestmentStatus fundId="1" />
        <PerformanceChart fundId="1" />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TransactionSection />
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <InvestmentGuide />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AssessmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">パフォーマンス分析</Typography>
                </Box>
                <TableContainer>
                  <Table size="medium">
                    <TableHead>
                      <TableRow>
                        <TableCell>期間</TableCell>
                        <TableCell align="right">リターン(%)</TableCell>
                        <TableCell align="right">リスク(%)</TableCell>
                        <TableCell align="right">Sharpe Ratio</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {performanceData.map((row: PerformanceData) => (
                        <TableRow 
                          key={row.period}
                          sx={{ 
                            '&:nth-of-type(odd)': { 
                              bgcolor: 'background.default' 
                            },
                            '&:hover': {
                              bgcolor: 'action.hover',
                            },
                          }}
                        >
                          <TableCell 
                            component="th" 
                            scope="row"
                            sx={{ fontWeight: 500 }}
                          >
                            {row.period}
                          </TableCell>
                          <TableCell align="right">
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'flex-end',
                              gap: 0.5,
                              color: Number(row.return) >= 0 ? 'success.main' : 'error.main',
                            }}>
                              {Number(row.return) >= 0 ? (
                                <TrendingUpIcon sx={{ fontSize: 16 }} />
                              ) : (
                                <TrendingDownIcon sx={{ fontSize: 16 }} />
                              )}
                              <Typography
                                component="span"
                                sx={{ fontWeight: 500 }}
                              >
                                {row.return}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">{row.risk}</TableCell>
                          <TableCell 
                            align="right"
                            sx={{
                              color: Number(row.sharpe) >= 0 ? 'success.main' : 'error.main',
                              fontWeight: 500,
                            }}
                          >
                            {row.sharpe}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default MainContent; 