import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  SwipeableDrawer,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountBalance as AccountBalanceIcon,
  Dashboard as DashboardIcon,
  History as HistoryIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DRAWER_WIDTH = 240;

const MENU_ITEMS = [
  { path: '/dashboard', label: 'ダッシュボード', icon: <DashboardIcon /> },
  { path: '/funds', label: 'ファンド一覧', icon: <AccountBalanceIcon /> },
  { path: '/transactions', label: '取引履歴', icon: <HistoryIcon /> },
  { path: '/cash-transactions', label: '入出金', icon: <PaymentIcon /> },
];

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogoClick = () => {
    logout();
    navigate('/', { replace: true });
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawerContent = (
    <>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        pt: 2,
        pb: 1,
      }}>
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/images/logo.png`}
          alt="Logo"
          sx={{
            height: 40,
            width: 'auto',
            mb: 1,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8
            }
          }}
          onClick={handleLogoClick}
        />
        <Typography 
          variant="subtitle2" 
          color="text.secondary"
          sx={{ 
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
          }}
        >
          投資ファンド管理
        </Typography>
      </Box>
      <List>
        {MENU_ITEMS.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleMenuClick(item.path)}
            >
              <Box sx={{ mr: 2, color: 'primary.main' }}>
                {item.icon}
              </Box>
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  sx: { 
                    fontSize: '0.9rem',
                    fontWeight: location.pathname === item.path ? 500 : 400,
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      {isMobile && (
        <AppBar 
          position="fixed" 
          sx={{ 
            bgcolor: 'background.paper',
            boxShadow: 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="primary"
              aria-label="メニューを開く"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
              alt="Logo"
              sx={{
                height: 32,
                width: 'auto',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8
                }
              }}
              onClick={handleLogoClick}
            />
          </Toolbar>
        </AppBar>
      )}

      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        {isMobile ? (
          <SwipeableDrawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onOpen={() => setMobileOpen(true)}
            onClose={() => setMobileOpen(false)}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
              },
            }}
          >
            {drawerContent}
          </SwipeableDrawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              width: DRAWER_WIDTH,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
                borderRight: '1px solid rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        )}
      </Box>
    </>
  );
};

export default Sidebar; 