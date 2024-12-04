import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { UserBankAccount } from '../../types/bank';

interface BankAccountFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (account: Omit<UserBankAccount, 'id' | 'verified'>) => void;
  initialData?: UserBankAccount;
}

const BankAccountForm: React.FC<BankAccountFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    bankName: initialData?.bankName || '',
    branchName: initialData?.branchName || '',
    accountType: initialData?.accountType || '普通',
    accountNumber: initialData?.accountNumber || '',
    accountName: initialData?.accountName || '',
    isDefault: initialData?.isDefault || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.bankName) newErrors.bankName = '銀行名を入力してください';
    if (!formData.branchName) newErrors.branchName = '支店名を入力してください';
    if (!formData.accountNumber) newErrors.accountNumber = '口座番号を入力してください';
    if (!formData.accountName) newErrors.accountName = '口座名義を入力してください';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ 
        fontSize: { xs: '1.25rem', sm: '1.5rem' },
        pb: 1,
      }}>
        {initialData ? '口座情報を編集' : '口座を追加'}
      </DialogTitle>

      <DialogContent sx={{ pt: '16px !important' }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            ご登録いただいた口座の名義人が、お客様ご本人であることを確認させていただきます。
            確認完了までに数営業日かかる場合があります。
          </Typography>
        </Alert>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="銀行名"
                value={formData.bankName}
                onChange={(e) => {
                  setFormData({ ...formData, bankName: e.target.value });
                  setErrors({ ...errors, bankName: '' });
                }}
                error={!!errors.bankName}
                helperText={errors.bankName}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="支店名"
                value={formData.branchName}
                onChange={(e) => {
                  setFormData({ ...formData, branchName: e.target.value });
                  setErrors({ ...errors, branchName: '' });
                }}
                error={!!errors.branchName}
                helperText={errors.branchName}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="口座種別"
                value={formData.accountType}
                onChange={(e) => setFormData({ ...formData, accountType: e.target.value as '普通' | '当座' })}
                SelectProps={{
                  native: true,
                }}
                size={isMobile ? "small" : "medium"}
              >
                <option value="普通">普通</option>
                <option value="当座">当座</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="口座番号"
                value={formData.accountNumber}
                onChange={(e) => {
                  setFormData({ ...formData, accountNumber: e.target.value });
                  setErrors({ ...errors, accountNumber: '' });
                }}
                error={!!errors.accountNumber}
                helperText={errors.accountNumber}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="口座名義（カタカナ）"
                value={formData.accountName}
                onChange={(e) => {
                  setFormData({ ...formData, accountName: e.target.value });
                  setErrors({ ...errors, accountName: '' });
                }}
                error={!!errors.accountName}
                helperText={errors.accountName}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  />
                }
                label={
                  <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    デフォルトの出金口座に設定する
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          size={isMobile ? "large" : "medium"}
        >
          キャンセル
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          size={isMobile ? "large" : "medium"}
        >
          {initialData ? '更新する' : '登録する'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BankAccountForm; 