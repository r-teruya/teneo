import { createTheme } from '@mui/material/styles';

const mainColor = '#7b0645';

export const theme = createTheme({
  palette: {
    primary: {
      main: mainColor,
      light: '#a73871',
      dark: '#55001f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2b2b2b',
      light: '#535353',
      dark: '#1d1d1d',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#2b2b2b',
      secondary: '#666666',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          boxShadow: '2px 0 12px rgba(0,0,0,0.08)',
          borderRight: 'none',
          width: 280,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          '&.Mui-selected': {
            backgroundColor: `${mainColor}14`,
            borderLeft: `4px solid ${mainColor}`,
            '&:hover': {
              backgroundColor: `${mainColor}1f`,
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: [
      'Noto Sans JP',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
      letterSpacing: '0.02em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
      letterSpacing: '0.01em',
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.875rem',
    },
  },
});

export default theme; 