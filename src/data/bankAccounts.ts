import { BankAccount, UserBankAccount } from '../types/bank';

// 入金用口座（テネオ側の口座）
export const companyBankAccount: BankAccount = {
  id: 'company-1',
  bankName: '○○銀行',
  branchName: '△△支店',
  accountType: '普通',
  accountNumber: '1234567',
  accountName: 'カ）テネオ',
};

// ユーザーの登録口座一覧
export const userBankAccounts: UserBankAccount[] = [
  {
    id: 'user-1',
    bankName: 'みずほ銀行',
    branchName: '渋谷支店',
    accountType: '普通',
    accountNumber: '1234567',
    accountName: 'ヤマダ タロウ',
    isDefault: true,
    lastUsed: '2024-03-15',
    verified: true,
  },
  {
    id: 'user-2',
    bankName: '三菱UFJ銀行',
    branchName: '新宿支店',
    accountType: '普通',
    accountNumber: '7654321',
    accountName: 'ヤマダ タロウ',
    lastUsed: '2024-02-20',
    verified: true,
  },
];

// 口座情報を取得する関数
export const getUserBankAccounts = () => userBankAccounts;

// デフォルト口座を取得する関数
export const getDefaultBankAccount = () => 
  userBankAccounts.find(account => account.isDefault);

// 口座情報を追加する関数
export const addUserBankAccount = (account: Omit<UserBankAccount, 'id' | 'verified'>) => {
  const newAccount: UserBankAccount = {
    ...account,
    id: `user-${userBankAccounts.length + 1}`,
    verified: false,
  };
  userBankAccounts.push(newAccount);
  return newAccount;
}; 