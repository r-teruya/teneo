import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';

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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/teneo">
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App; 