import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import BalanceOverview from './BalanceOverview';
import BankAccountList from './BankAccountList';
import BankAccountForm from './BankAccountForm';
import CashTransactionForm from './CashTransactionForm';
import { getBalance } from '../../data/balance';
import { getUserBankAccounts, addUserBankAccount } from '../../data/bankAccounts';
import { UserBankAccount } from '../../types/bank';

const CashTransactions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [bankFormOpen, setBankFormOpen] = useState(false);
  const [editBankAccount, setEditBankAccount] = useState<UserBankAccount | undefined>();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const balance = getBalance();
  const bankAccounts = getUserBankAccounts();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddAccount = () => {
    setEditBankAccount(undefined);
    setBankFormOpen(true);
  };

  const handleEditAccount = (account: UserBankAccount) => {
    setEditBankAccount(account);
    setBankFormOpen(true);
  };

  const handleDeleteAccount = (accountId: string) => {
    setDeleteTargetId(accountId);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    // TODO: 口座削除の実装
    console.log('Delete account:', deleteTargetId);
    setDeleteConfirmOpen(false);
    setDeleteTargetId(null);
  };

  const handleSubmitBankAccount = (account: Omit<UserBankAccount, 'id' | 'verified'>) => {
    if (editBankAccount) {
      // TODO: 口座更新の実装
      console.log('Update account:', { id: editBankAccount.id, ...account });
    } else {
      addUserBankAccount(account);
    }
    setBankFormOpen(false);
  };

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
          入出金
        </Typography>

        <Stack spacing={{ xs: 2, sm: 3 }}>
          {/* 資産状況 */}
          <BalanceOverview balance={balance} />

          {/* 入出金タブ */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  py: { xs: 1.5, sm: 2 },
                },
              }}
            >
              <Tab 
                label="入金" 
                sx={{ color: theme.palette.success.main }}
              />
              <Tab 
                label="出金" 
                sx={{ color: theme.palette.error.main }}
              />
            </Tabs>
          </Box>

          {/* 入出金フォーム */}
          <CashTransactionForm 
            type={tabValue === 0 ? 'deposit' : 'withdraw'}
            balance={balance}
            bankAccounts={bankAccounts}
          />

          {/* 登録口座一覧 */}
          <BankAccountList
            accounts={bankAccounts}
            onAdd={handleAddAccount}
            onEdit={handleEditAccount}
            onDelete={handleDeleteAccount}
          />
        </Stack>

        {/* 口座登録・編集フォーム */}
        <BankAccountForm
          open={bankFormOpen}
          onClose={() => setBankFormOpen(false)}
          onSubmit={handleSubmitBankAccount}
          initialData={editBankAccount}
        />

        {/* 削除確認ダイアログ */}
        <Dialog
          open={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
        >
          <DialogTitle>口座を削除</DialogTitle>
          <DialogContent>
            <DialogContentText>
              この口座を削除してもよろしいですか？
              <br />
              削除後は元に戻せません。
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button 
              onClick={() => setDeleteConfirmOpen(false)}
              variant="outlined"
              size={isMobile ? "large" : "medium"}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="error"
              size={isMobile ? "large" : "medium"}
            >
              削除する
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default CashTransactions; 