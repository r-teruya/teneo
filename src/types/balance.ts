export interface Balance {
  totalBalance: number;      // 総資産
  availableBalance: number;  // 出金可能額
  pendingDeposit: number;    // 入金処理中
  pendingWithdraw: number;   // 出金処理中
  reservedAmount: number;    // 購入予約済み金額
} 