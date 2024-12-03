import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  useMediaQuery,
  StepConnector,
} from '@mui/material';
import {
  Info as InfoIcon,
  Schedule as ScheduleIcon,
  Payment as PaymentIcon,
  AccountBalance as AccountBalanceIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

const InvestmentGuide = () => {
  const [openInvestDialog, setOpenInvestDialog] = React.useState(false);
  const [openRedeemDialog, setOpenRedeemDialog] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const investmentSteps = [
    {
      label: '申込書の提出',
      description: '必要事項を記入した申込書をご提出ください。',
      details: [
        '本人確認書類の提出',
        '投資家属性に関する質問票への回答',
        'リスク説明書の確認',
      ],
    },
    {
      label: '入金',
      description: '5営業日前までに指定口座へお振込みください。',
      details: [
        '最低投資金額: 100万円',
        '振込手数料はお客様負担',
        '入金確認後に取引が確定',
      ],
    },
    {
      label: '運用開始',
      description: '次回営業日から運用を開始します。',
      details: [
        '運用開始日の基準価額で購入',
        '取引報告書の送付',
        '運用状況はオンラインで確認可能',
      ],
    },
  ];

  const redemptionSteps = [
    {
      label: '解約申請',
      description: '解約申請書をご提出ください。',
      details: [
        'オンラインまたは書面での申請が可能',
        '部分解約も可能（最低保有金額あり）',
        '本人確認が必要',
      ],
    },
    {
      label: '解約通知期間',
      description: '1ヶ月の通知期間が必要です。',
      details: [
        '市場環境により期間が変動する可能性あり',
        '期間中のキャンセルは可能',
        '解約手数料なし',
      ],
    },
    {
      label: '解約処理',
      description: '通知期間終了後、5営業日以内にご指定の口座へ送金いたします。',
      details: [
        '解約日の基準価額で換金',
        '税金は源泉徴収',
        '取引報告書の送付',
      ],
    },
  ];

  const GuideDialog = ({ 
    open, 
    onClose, 
    title, 
    steps 
  }: { 
    open: boolean; 
    onClose: () => void; 
    title: string; 
    steps: { 
      label: string; 
      description: string; 
      details: string[];
    }[]; 
  }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: { xs: 1, sm: 2 },
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            borderBottom: 1,
            borderColor: 'divider',
            pb: 2,
          }}>
            <InfoIcon color="primary" />
            <Typography variant="h6">{title}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stepper 
            activeStep={-1} 
            orientation="vertical"
            sx={{ mt: 2 }}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      '& .MuiStepIcon-root': {
                        color: 'primary.main',
                      },
                    },
                  }}
                >
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 600,
                      color: 'primary.main',
                    }}
                  >
                    {step.label}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mt: 0.5 }}
                  >
                    {step.description}
                  </Typography>
                  <Box sx={{ mt: 1, ml: 2 }}>
                    {step.details.map((detail, i) => (
                      <Typography 
                        key={i} 
                        variant="body2" 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1,
                          mt: 0.5,
                          color: 'text.secondary',
                          '&::before': {
                            content: '""',
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            opacity: 0.5,
                          },
                        }}
                      >
                        {detail}
                      </Typography>
                    ))}
                  </Box>
                </StepLabel>
                {index < steps.length - 1 && (
                  <StepConnector 
                    sx={{
                      '& .MuiStepConnector-line': {
                        borderColor: 'primary.light',
                        borderLeftStyle: 'dashed',
                      },
                    }}
                  />
                )}
              </Step>
            ))}
          </Stepper>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button 
            onClick={onClose} 
            variant="contained" 
            sx={{ 
              borderRadius: 2,
              minWidth: 100,
            }}
          >
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        手続きガイド
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        gap: 2,
        flexDirection: { xs: 'column', sm: 'row' },
      }}>
        <Button
          variant="outlined"
          onClick={() => setOpenInvestDialog(true)}
          sx={{ 
            borderRadius: 2,
            flex: 1,
            p: 2,
            height: 'auto',
            flexDirection: 'column',
            alignItems: 'flex-start',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'primary.light',
              color: 'white',
              '& .MuiTypography-root': {
                color: 'white',
              },
              '& .MuiSvgIcon-root': {
                color: 'white',
              },
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <PaymentIcon color="primary" sx={{ fontSize: 24 }} />
            <Typography variant="subtitle1" color="primary">
              投資申込みの流れ
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" align="left">
            申込みから運用開始までの手順をご確認いただけます
          </Typography>
        </Button>

        <Button
          variant="outlined"
          onClick={() => setOpenRedeemDialog(true)}
          sx={{ 
            borderRadius: 2,
            flex: 1,
            p: 2,
            height: 'auto',
            flexDirection: 'column',
            alignItems: 'flex-start',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'secondary.light',
              color: 'white',
              '& .MuiTypography-root': {
                color: 'white',
              },
              '& .MuiSvgIcon-root': {
                color: 'white',
              },
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <AccountBalanceIcon color="secondary" sx={{ fontSize: 24 }} />
            <Typography variant="subtitle1" color="secondary">
              解約手続きの流れ
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" align="left">
            解約申請から償還までの手順をご確認いただけます
          </Typography>
        </Button>
      </Box>

      <GuideDialog
        open={openInvestDialog}
        onClose={() => setOpenInvestDialog(false)}
        title="投資申込みの流れ"
        steps={investmentSteps}
      />

      <GuideDialog
        open={openRedeemDialog}
        onClose={() => setOpenRedeemDialog(false)}
        title="解約手続きの流れ"
        steps={redemptionSteps}
      />
    </Box>
  );
};

export default InvestmentGuide; 