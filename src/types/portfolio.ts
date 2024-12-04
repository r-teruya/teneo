export interface PortfolioHistory {
  date: string;
  totalAssets: number;
  principal: number;
  cash: number;
}

export interface PortfolioHistoryData {
  '1M': PortfolioHistory[];
  '3M': PortfolioHistory[];
  '6M': PortfolioHistory[];
  '1Y': PortfolioHistory[];
  'ALL': PortfolioHistory[];
}

export type HistoryPeriod = '1M' | '3M' | '6M' | '1Y' | 'ALL'; 