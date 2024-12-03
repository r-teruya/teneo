import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
  Chip,
  InputAdornment,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

interface Transaction {
  id: string;
  type: '入金' | '出金';
  amount: number;
  date: string;
  status: '処理中' | '完了' | '却下';
}

const TransactionSection = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [transactionType, setTransactionType] = React.useState<'入金' | '出金' | null>(null);
  const [amount, setAmount] = React.useState('');

  const recentTransactions: Transaction[] = [
    { id: '1', type: '入金', amount: 1000000, date: '2024-03-01', status: '完了' },
    { id: '2', type: '出金', amount: 500000, date: '2024-02-15', status: '完了' },
    { id: '3', type: '入金', amount: 2000000, date: '2024-02-01', status: '処理中' },
  ];

  const handleOpen = (type: '入金' | '出金') => {
    setTransactionType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTransactionType(null);
    setAmount('');
  };

  const handleSubmit = () => {
    console.log(`${transactionType}: ${amount}円`);
    handleClose();
  };

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

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">入出金</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpen('入金')}
                sx={{ borderRadius: 2 }}
              >
                入金申請
              </Button>
              <Button
                variant="outlined"
                startIcon={<RemoveIcon />}
                onClick={() => handleOpen('出金')}
                sx={{ borderRadius: 2 }}
              >
                出金申請
              </Button>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              最近の取引
            </Typography>
            <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
              {recentTransactions.map((transaction) => (
                <ListItem
                  key={transaction.id}
                  sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle2">
                          {transaction.type}
                        </Typography>
                        <ArrowForwardIcon sx={{ color: 'text.secondary', fontSize: 16 }} />
                        <Typography variant="subtitle2" color="primary.main">
                          ¥{transaction.amount.toLocaleString()}
                        </Typography>
                      </Box>
                    }
                    secondary={transaction.date}
                  />
                  <Chip
                    label={transaction.status}
                    size="small"
                    color={getStatusColor(transaction.status)}
                    variant="outlined"
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </CardContent>

      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: '100%',
            maxWidth: 400,
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          {transactionType}申請
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="金額"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">¥</InputAdornment>
              ),
            }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2 }}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ borderRadius: 2 }}>
            申請する
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default TransactionSection; 