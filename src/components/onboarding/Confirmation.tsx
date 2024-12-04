import React from 'react';
import {
  Box,
  Button,
  Grid,
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { OnboardingStepProps } from './types';
import { useAuth } from '../../contexts/AuthContext';

const Confirmation: React.FC<OnboardingStepProps> = ({ onNext, onBack }) => {
  const [agreed, setAgreed] = React.useState(true);
  const { login } = useAuth();

  // 仮のデータ（実際には前のステップからのデータを使用）
  const userData = {
    personal: {
      name: '山田 太郎',
      nameKana: 'ヤマダ タロウ',
      birthDate: '1990-01-01',
      gender: '男性',
      phone: '090-1234-5678',
      email: 'yamada@example.com',
    },
    address: {
      postalCode: '123-4567',
      prefecture: '東京都',
      city: '千代田区',
      address1: '丸の内1-1-1',
      address2: '丸の内ビル101',
    },
    financial: {
      occupation: '会社員',
      annualIncome: '500万円以上700万円未満',
      investmentExperience: '3年以上5年未満',
      riskTolerance: '中',
      investmentGoal: '資産形成のため',
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agreed) {
      login();
      onNext();
    }
  };

  const InfoSection = ({ title, data }: { title: string; data: Record<string, string> }) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
        {title}
      </Typography>
      <List>
        {Object.entries(data).map(([key, value], index) => (
          <React.Fragment key={key}>
            <ListItem sx={{ py: 1 }}>
              <ListItemText
                primary={value}
                secondary={key}
                primaryTypographyProps={{
                  variant: 'body1',
                  fontWeight: 500,
                }}
                secondaryTypographyProps={{
                  variant: 'body2',
                  color: 'text.secondary',
                }}
              />
            </ListItem>
            {index < Object.entries(data).length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <Card sx={{ p: { xs: 2, sm: 3 } }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          入力内容の確認
        </Typography>

        <InfoSection title="個人情報" data={userData.personal} />
        <InfoSection title="住所情報" data={userData.address} />
        <InfoSection title="取引情報" data={userData.financial} />

        <Box sx={{ mt: 4, mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                利用規約、プライバシーポリシー、その他の規約に同意します
              </Typography>
            }
          />
        </Box>

        <Grid container spacing={2}>
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
                disabled={!agreed}
                sx={{ minWidth: 200 }}
              >
                口座開設を申し込む
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default Confirmation; 