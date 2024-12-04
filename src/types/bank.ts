export interface BankAccount {
  id: string;
  bankName: string;
  branchName: string;
  accountType: '普通' | '当座';
  accountNumber: string;
  accountName: string;
  isDefault?: boolean;
}

export interface UserBankAccount extends BankAccount {
  lastUsed?: string;  // 最終利用日
  verified: boolean;  // 口座確認済みかどうか
} 