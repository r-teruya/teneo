import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { UserBankAccount } from '../../types/bank';

interface BankAccountListProps {
  accounts: UserBankAccount[];
  onEdit: (account: UserBankAccount) => void;
  onDelete: (accountId: string) => void;
  onAdd: () => void;
}

const BankAccountList: React.FC<BankAccountListProps> = ({
  accounts,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2,
        }}>
          <Typography 
            variant="h6"
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.25rem' },
              fontWeight: 500,
            }}
          >
            登録口座一覧
          </Typography>
          <Button
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            onClick={onAdd}
          >
            口座を追加
          </Button>
        </Box>

        <List>
          {accounts.map((account) => (
            <ListItem
              key={account.id}
              sx={{
                borderRadius: 1,
                mb: 1,
                bgcolor: 'background.default',
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {account.bankName} {account.branchName}
                    </Typography>
                    {account.verified && (
                      <CheckCircleIcon 
                        sx={{ 
                          color: 'success.main',
                          fontSize: { xs: 16, sm: 20 },
                        }}
                      />
                    )}
                    {account.isDefault && (
                      <Chip 
                        label="デフォルト" 
                        size="small"
                        color="primary"
                        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  >
                    {account.accountType} {account.accountNumber}
                    <br />
                    {account.accountName}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => onEdit(account)}
                  size={isMobile ? "small" : "medium"}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => onDelete(account.id)}
                  size={isMobile ? "small" : "medium"}
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default BankAccountList; 