import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <AppRoutes />
          </Box>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App; 