import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
} from '@mui/material';
import { OnboardingStepProps } from './types';

const PersonalInfo: React.FC<OnboardingStepProps> = ({ onNext }) => {
  const [formData, setFormData] = useState({
    lastName: '山田',
    firstName: '太郎',
    lastNameKana: 'ヤマダ',
    firstNameKana: 'タロウ',
    birthDate: '1990-01-01',
    gender: '男性',
    phoneNumber: '090-1234-5678',
    email: 'yamada@example.com',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <Card sx={{ p: { xs: 2, sm: 3 } }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="姓"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="名"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="セイ"
              value={formData.lastNameKana}
              onChange={(e) => setFormData({ ...formData, lastNameKana: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="メイ"
              value={formData.firstNameKana}
              onChange={(e) => setFormData({ ...formData, firstNameKana: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="date"
              label="生年月日"
              InputLabelProps={{ shrink: true }}
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">性別</FormLabel>
              <RadioGroup
                row
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as '男性' | '女性' | 'その他' })}
              >
                <FormControlLabel value="男性" control={<Radio />} label="男性" />
                <FormControlLabel value="女性" control={<Radio />} label="女性" />
                <FormControlLabel value="その他" control={<Radio />} label="その他" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="電話番号"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type="email"
              label="メールアドレス"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                type="submit"
                size="large"
                sx={{ minWidth: 200 }}
              >
                次へ
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default PersonalInfo; 