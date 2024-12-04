import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Timeline as TimelineIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material';

const Landing = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: '安全性重視',
      description: '厳格なリスク管理と分散投資で、お客様の資産を守ります。',
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40 }} />,
      title: '実績のある運用',
      description: '長期的な視点で、安定的なリターンを目指します。',
    },
    {
      icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />,
      title: 'プロフェッショナルの運用',
      description: '経験豊富な運用チームが、最適な投資判断を行います。',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* ヒーローセクション */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: { xs: 8, sm: 12, md: 16 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography 
              variant="h2" 
              component="h1"
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
                mb: 3,
              }}
            >
              プロフェッショナルによる
              <br />
              ヘッジファンド運用
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                fontSize: { xs: '1rem', sm: '1.25rem' },
                opacity: 0.9,
              }}
            >
              最先端の運用戦略と徹底したリスク管理で、
              <br />
              お客様の大切な資産を守りながら成長させます。
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/onboarding')}
              sx={{ 
                py: 2,
                px: 4,
                fontSize: '1.125rem',
                borderRadius: 2,
              }}
            >
              サービスを利用する
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 特徴セクション */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 8, md: 10 } }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Landing; 