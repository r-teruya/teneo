import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Card,
  MenuItem,
} from '@mui/material';
import { OnboardingStepProps } from './types';

const prefectures = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
];

const AddressInfo: React.FC<OnboardingStepProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    postalCode: '100-0005',
    prefecture: '東京都',
    city: '千代田区',
    address1: '丸の内1-1-1',
    address2: '丸の内ビル101',
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
              label="郵便番号"
              placeholder="例：123-4567"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              select
              label="都道府県"
              value={formData.prefecture}
              onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
            >
              {prefectures.map((prefecture) => (
                <MenuItem key={prefecture} value={prefecture}>
                  {prefecture}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="市区町村"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="番地"
              value={formData.address1}
              onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="建物名・部屋番号（任意）"
              value={formData.address2}
              onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              mt: 2,
            }}>
              <Button
                variant="outlined"
                onClick={onBack}
                size="large"
                sx={{ minWidth: 200 }}
              >
                戻る
              </Button>
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

export default AddressInfo;