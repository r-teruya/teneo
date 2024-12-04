import { Balance } from '../types/balance';
import { getTotalAssets } from './funds';

// 現在の総資産額を取得
const currentTotalAssets = getTotalAssets();

// 資産状況データを取得する関数
export const getBalance = (): Balance => ({
  totalBalance: currentTotalAssets,    // fundsから取得した総資産額
  availableBalance: 3500000,           // 出金可能額（保有現金）
  pendingDeposit: 1000000,            // 入金処理中
  pendingWithdraw: 500000,            // 出金処理中
  reservedAmount: 1500000,            // 購入予約済み金額
});

// 保有現金を取得する関数（出金可能額 + 処理中の金額 + 予約済み金額）
export const getTotalCash = () => {
  const balance = getBalance();
  return balance.availableBalance + balance.pendingDeposit - balance.pendingWithdraw - balance.reservedAmount;
}; 