import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Card,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';
import { OnboardingStepProps } from './types';

const occupations = [
  '会社員', '公務員', '自営業', '会社役員', '専門職', '主婦/主夫',
  '学生', '退職者', 'その他'
];

const annualIncomes = [
  '300万円未満',
  '300万円以上500万円未満',
  '500万円以上700万円未満',
  '700万円以上1,000万円未満',
  '1,000万円以上',
];

const investmentExperiences = [
  '初めて',
  '1年未満',
  '1年以上3年未満',
  '3年以上5年未満',
  '5年以上',
];

const FinancialInfo: React.FC<OnboardingStepProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    occupation: '会社員',
    annualIncome: '500万円以上700万円未満',
    investmentExperience: '3年以上5年未満',
    riskTolerance: '中',
    investmentGoal: '長期的な資産形成のため、分散投資を通じて安定的なリターンを目指したいと考えています。',
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
              select
              label="ご職業"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            >
              {occupations.map((occupation) => (
                <MenuItem key={occupation} value={occupation}>
                  {occupation}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              select
              label="年収"
              value={formData.annualIncome}
              onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
            >
              {annualIncomes.map((income) => (
                <MenuItem key={income} value={income}>
                  {income}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              select
              label="投資経験"
              value={formData.investmentExperience}
              onChange={(e) => setFormData({ ...formData, investmentExperience: e.target.value })}
            >
              {investmentExperiences.map((exp) => (
                <MenuItem key={exp} value={exp}>
                  {exp}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">リスク許容度</FormLabel>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                投資におけるリスクの取り方についてお選びください
              </Typography>
              <RadioGroup
                row
                value={formData.riskTolerance}
                onChange={(e) => setFormData({ ...formData, riskTolerance: e.target.value })}
              >
                <FormControlLabel value="低" control={<Radio />} label="低" />
                <FormControlLabel value="中" control={<Radio />} label="中" />
                <FormControlLabel value="高" control={<Radio />} label="高" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="投資目的"
              placeholder="投資を通じて達成したい目標をご記入ください"
              value={formData.investmentGoal}
              onChange={(e) => setFormData({ ...formData, investmentGoal: e.target.value })}
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

export default FinancialInfo; 