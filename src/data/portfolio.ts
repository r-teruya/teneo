import { PortfolioHistoryData } from '../types/portfolio';
import { getTotalAssets } from './funds';
import { getTotalCash } from './balance';

// 現在の総資産額を取得
const currentTotalAssets = getTotalAssets();
const currentPrincipal = currentTotalAssets - getTotalCash();  // 総資産 - 保有現金 = 投資元本
const currentCash = getTotalCash();                            // balanceから保有現金を取得

// 資産推移データ（現在値を基準に過去データを計算）
const portfolioHistory: PortfolioHistoryData = {
  '1M': [
    { date: '03/01', totalAssets: currentTotalAssets * 0.97, principal: currentPrincipal, cash: currentCash * 0.85 },
    { date: '03/05', totalAssets: currentTotalAssets * 0.976, principal: currentPrincipal, cash: currentCash * 0.85 },
    { date: '03/10', totalAssets: currentTotalAssets * 0.984, principal: currentPrincipal, cash: currentCash },
    { date: '03/15', totalAssets: currentTotalAssets * 0.996, principal: currentPrincipal, cash: currentCash },
    { date: '03/20', totalAssets: currentTotalAssets * 0.992, principal: currentPrincipal, cash: currentCash },
    { date: '03/25', totalAssets: currentTotalAssets * 0.998, principal: currentPrincipal, cash: currentCash },
    { date: '03/31', totalAssets: currentTotalAssets, principal: currentPrincipal, cash: currentCash },
  ],
  '3M': [
    { date: '2024/01', totalAssets: currentTotalAssets * 0.94, principal: currentPrincipal * 0.98, cash: currentCash * 0.7 },
    { date: '2024/02', totalAssets: currentTotalAssets * 0.97, principal: currentPrincipal * 0.98, cash: currentCash * 0.85 },
    { date: '2024/03', totalAssets: currentTotalAssets, principal: currentPrincipal, cash: currentCash },
  ],
  '6M': [
    { date: '2023/10', totalAssets: currentTotalAssets * 0.90, principal: currentPrincipal * 0.93, cash: currentCash * 0.6 },
    { date: '2023/11', totalAssets: currentTotalAssets * 0.93, principal: currentPrincipal * 0.97, cash: currentCash * 0.7 },
    { date: '2023/12', totalAssets: currentTotalAssets * 0.94, principal: currentPrincipal, cash: currentCash * 0.85 },
    { date: '2024/01', totalAssets: currentTotalAssets * 0.94, principal: currentPrincipal, cash: currentCash },
    { date: '2024/02', totalAssets: currentTotalAssets * 0.97, principal: currentPrincipal, cash: currentCash },
    { date: '2024/03', totalAssets: currentTotalAssets, principal: currentPrincipal, cash: currentCash },
  ],
  '1Y': [
    { date: '2023/04', totalAssets: currentTotalAssets * 0.84, principal: currentPrincipal * 0.84, cash: currentCash * 0.6 },
    { date: '2023/06', totalAssets: currentTotalAssets * 0.87, principal: currentPrincipal * 0.89, cash: currentCash * 0.7 },
    { date: '2023/08', totalAssets: currentTotalAssets * 0.896, principal: currentPrincipal * 0.91, cash: currentCash * 0.8 },
    { date: '2023/10', totalAssets: currentTotalAssets * 0.90, principal: currentPrincipal * 0.93, cash: currentCash * 0.85 },
    { date: '2023/12', totalAssets: currentTotalAssets * 0.94, principal: currentPrincipal * 0.98, cash: currentCash },
    { date: '2024/02', totalAssets: currentTotalAssets * 0.97, principal: currentPrincipal, cash: currentCash },
    { date: '2024/03', totalAssets: currentTotalAssets, principal: currentPrincipal, cash: currentCash },
  ],
  'ALL': [
    { date: '2022/04', totalAssets: currentTotalAssets * 0.60, principal: currentPrincipal * 0.56, cash: currentCash * 0.3 },
    { date: '2022/07', totalAssets: currentTotalAssets * 0.65, principal: currentPrincipal * 0.60, cash: currentCash * 0.4 },
    { date: '2022/10', totalAssets: currentTotalAssets * 0.70, principal: currentPrincipal * 0.67, cash: currentCash * 0.6 },
    { date: '2023/01', totalAssets: currentTotalAssets * 0.76, principal: currentPrincipal * 0.71, cash: currentCash * 0.7 },
    { date: '2023/04', totalAssets: currentTotalAssets * 0.84, principal: currentPrincipal * 0.84, cash: currentCash * 0.8 },
    { date: '2023/07', totalAssets: currentTotalAssets * 0.88, principal: currentPrincipal * 0.89, cash: currentCash * 0.85 },
    { date: '2023/10', totalAssets: currentTotalAssets * 0.90, principal: currentPrincipal * 0.93, cash: currentCash },
    { date: '2024/01', totalAssets: currentTotalAssets * 0.94, principal: currentPrincipal * 0.98, cash: currentCash },
    { date: '2024/03', totalAssets: currentTotalAssets, principal: currentPrincipal, cash: currentCash },
  ],
};

// 資産推移データを取得する関数
export const getPortfolioHistory = () => portfolioHistory; 