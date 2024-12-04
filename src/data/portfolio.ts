import { getAllFundsWithPositions } from './funds';

// ポートフォリオサマリー用のデータ型
export interface PortfolioSummary {
  totalAssets: number;      // 総資産
  totalPrincipal: number;   // 投資元本
  totalGain: number;        // 評価損益
  gainPercent: number;      // 評価損益率
  cashBalance: number;      // 保有現金
}

// 資産推移データの型
export interface AssetHistory {
  date: string;
  totalAssets: number;      // 総資産
  principal: number;        // 投資元本
  cash: number;            // 保有現金
  gain: number;            // 評価損益
  gainPercent: number;     // 評価損益率
}

// 現在のポートフォリオサマリーを取得
export const getPortfolioSummary = (): PortfolioSummary => {
  const positions = getAllFundsWithPositions();
  const totalAssets = positions.reduce((sum, fund) => sum + fund.currentValue, 0);
  const totalPrincipal = positions.reduce((sum, fund) => sum + fund.bookValue, 0);
  const totalGain = positions.reduce((sum, fund) => sum + fund.unrealizedGain, 0);
  const gainPercent = (totalGain / totalPrincipal) * 100;
  const cashBalance = 1000000;  // 現金残高100万円

  return {
    totalAssets: totalAssets + cashBalance,
    totalPrincipal,
    totalGain,
    gainPercent,
    cashBalance,
  };
};

// 資産推移データを取得
export const getAssetHistory = (): AssetHistory[] => {
  const currentSummary = getPortfolioSummary();
  
  return [
    {
      date: '2023/04',
      totalAssets: 5800000,    // 580万円
      principal: 5500000,      // 550万円
      cash: 1000000,          // 100万円
      gain: 300000,           // 30万円
      gainPercent: 5.45,
    },
    {
      date: '2023/05',
      totalAssets: 6000000,    // 600万円
      principal: 5500000,      // 550万円
      cash: 1000000,          // 100万円
      gain: 500000,           // 50万円
      gainPercent: 9.09,
    },
    // ... 中略 ...
    {
      date: '2024/01',
      totalAssets: currentSummary.totalAssets,
      principal: currentSummary.totalPrincipal,
      cash: currentSummary.cashBalance,
      gain: currentSummary.totalGain,
      gainPercent: currentSummary.gainPercent,
    },
  ];
}; 