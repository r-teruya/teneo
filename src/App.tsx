import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <AppRoutes />
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App; 