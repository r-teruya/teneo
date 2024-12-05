import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import theme from './theme';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes';
import Sidebar from './components/Sidebar';
import ScrollToTop from './components/ScrollToTop';

// サイドバーを表示しないパス
const noSidebarPaths = ['/', '/onboarding'];

// レイアウトコンポーネント
const Layout = () => {
  const location = useLocation();
  const showSidebar = !noSidebarPaths.includes(location.pathname);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {showSidebar && <Sidebar />}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: showSidebar ? 'calc(100% - 280px)' : '100%',  // サイドバーの幅を考慮
        }}
      >
        <AppRoutes />
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter basename="/teneo">
          <ScrollToTop />
          <Layout />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; 