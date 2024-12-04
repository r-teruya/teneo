import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from '@mui/material';

// 後で分割する各ステップのコンポーネントをインポート
import PersonalInfo from '../components/onboarding/PersonalInfo';
import AddressInfo from '../components/onboarding/AddressInfo';
import FinancialInfo from '../components/onboarding/FinancialInfo';
import Confirmation from '../components/onboarding/Confirmation';

const steps = [
  '個人情報の入力',
  '住所情報の入力',
  '取引に関する情報',
  '確認・同意',
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // 口座開設完了時の処理
      navigate('/dashboard');
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PersonalInfo onNext={handleNext} />;
      case 1:
        return <AddressInfo onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <FinancialInfo onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Confirmation onNext={handleNext} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            textAlign: 'center',
            mb: 4,
            fontWeight: 700,
          }}
        >
          口座開設
        </Typography>

        <Stepper 
          activeStep={activeStep} 
          alternativeLabel
          sx={{ mb: 6 }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}
      </Box>
    </Container>
  );
};

export default Onboarding; 