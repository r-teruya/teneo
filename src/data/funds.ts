export interface Fund {
  id: string;
  name: string;
  type: '株式ロングショート' | 'グローバルマクロ' | 'イベントドリブン' | 'プライベートクレジット';
  risk: 1 | 2 | 3 | 4 | 5;
  currency: '円' | 'ドル';
  minInvestment: number;
  description: string;
  features: string[];
}

export interface Position {
  fundId: string;
  units: number;
  bookValue: number;
  currentValue: number;
  unrealizedGain: number;
  unrealizedGainPercent: number;
}

export const funds: Fund[] = [
  {
    id: '1',
    name: 'グローバル株式ロングショート・ファンド',
    type: '株式ロングショート',
    risk: 4,
    currency: '円',
    minInvestment: 1000000,
    description: 'グローバルな株式市場で、割安な銘柄のロングと割高な銘柄のショートを組み合わせて、市場環境に左右されにくい安定的なリターンを目指します。',
    features: [
      'マーケットニュートラル戦略',
      'グローバル分散投資',
      '厳格なリスク管理',
      '月次決算',
    ],
  },
  {
    id: '2',
    name: 'アジア株式ロングショート・ファンド',
    type: '株式ロングショート',
    risk: 5,
    currency: '円',
    minInvestment: 1000000,
    description: 'アジア地域の株式市場において、成長性の高い銘柄をロング、構造的な課題を抱える銘柄をショートすることで、高いリターンを目指します。',
    features: [
      'アジア市場特化',
      'アクティブ運用',
      '高リターン志向',
      '四半期決算',
    ],
  },
  {
    id: '3',
    name: 'グローバルマクロ・ファンド',
    type: 'グローバルマクロ',
    risk: 4,
    currency: '円',
    minInvestment: 30000000,
    description: 'マクロ経済分析に基づき、通貨、金利、株式指数などの様々な資産クラスにわたってポジションを構築し、市場環境に応じた機動的な運用を行います。',
    features: [
      'マルチアセット戦略',
      'トレンド分析',
      '機動的な投資配分',
      '月次決算',
    ],
  },
  {
    id: '4',
    name: 'マージャー・アービトラージ・ファンド',
    type: 'イベントドリブン',
    risk: 3,
    currency: '円',
    minInvestment: 50000000,
    description: 'M&Aや企業再編などの個別イベントに着目し、関連する複数の証券の価格差から収益を獲得することを目指します。',
    features: [
      '低相関戦略',
      'イベント投資',
      'リスク抑制型',
      '四半期決算',
    ],
  },
  {
    id: '5',
    name: 'プライベートクレジット・ファンド',
    type: 'プライベートクレジット',
    risk: 4,
    currency: 'ドル',
    minInvestment: 100000000,
    description: '非上場企業向けの直接貸付や、メザニンファイナンス等の投資を通じて、伝統的な債券投資を上回るリターンを目指します。',
    features: [
      '高利回り追求',
      '長期投資',
      '分散投資',
      '四半期決算',
    ],
  },
];

export const positions: Position[] = [
  {
    fundId: '1',
    units: 100,
    bookValue: 1000000,
    currentValue: 1280000,
    unrealizedGain: 280000,
    unrealizedGainPercent: 28.0,
  },
  {
    fundId: '2',
    units: 80,
    bookValue: 800000,
    currentValue: 920000,
    unrealizedGain: 120000,
    unrealizedGainPercent: 15.0,
  },
  {
    fundId: '3',
    units: 150,
    bookValue: 1500000,
    currentValue: 1650000,
    unrealizedGain: 150000,
    unrealizedGainPercent: 10.0,
  },
  {
    fundId: '4',
    units: 50,
    bookValue: 500000,
    currentValue: 525000,
    unrealizedGain: 25000,
    unrealizedGainPercent: 5.0,
  },
  {
    fundId: '5',
    units: 200,
    bookValue: 2000000,
    currentValue: 2300000,
    unrealizedGain: 300000,
    unrealizedGainPercent: 15.0,
  },
];

// 資産推移データを現実的な金額に調整
export interface AssetHistory {
  date: string;
  value: number;
  previousValue: number;
  change: number;
  changePercent: number;
}

export const assetHistory: AssetHistory[] = [
  {
    date: '2023/04',
    value: 5800000,    // 580万円
    previousValue: 5500000,
    change: 300000,
    changePercent: 5.45,
  },
  {
    date: '2023/05',
    value: 6000000,    // 600万円
    previousValue: 5800000,
    change: 200000,
    changePercent: 3.45,
  },
  {
    date: '2023/06',
    value: 6200000,    // 620万円
    previousValue: 6000000,
    change: 200000,
    changePercent: 3.33,
  },
  {
    date: '2023/07',
    value: 6300000,    // 630万円
    previousValue: 6200000,
    change: 100000,
    changePercent: 1.61,
  },
  {
    date: '2023/08',
    value: 6400000,    // 640万円
    previousValue: 6300000,
    change: 100000,
    changePercent: 1.59,
  },
  {
    date: '2023/09',
    value: 6500000,    // 650万円
    previousValue: 6400000,
    change: 100000,
    changePercent: 1.56,
  },
  {
    date: '2023/10',
    value: 6550000,    // 655万円
    previousValue: 6500000,
    change: 50000,
    changePercent: 0.77,
  },
  {
    date: '2023/11',
    value: 6600000,    // 660万円
    previousValue: 6550000,
    change: 50000,
    changePercent: 0.76,
  },
  {
    date: '2023/12',
    value: 6650000,    // 665万円
    previousValue: 6600000,
    change: 50000,
    changePercent: 0.76,
  },
  {
    date: '2024/01',
    value: 6675000,    // 667.5万円（現在の総資産と一致）
    previousValue: 6650000,
    change: 25000,
    changePercent: 0.38,
  },
];

// ヘルパー関数
export const getFundWithPosition = (fundId: string) => {
  const fund = funds.find(f => f.id === fundId);
  const position = positions.find(p => p.fundId === fundId);
  return fund && position ? { ...fund, ...position } : null;
};

export const getAllFundsWithPositions = () => {
  return funds.map(fund => {
    const position = positions.find(p => p.fundId === fund.id);
    return position ? { ...fund, ...position } : null;
  }).filter((f): f is Fund & Position => f !== null);
};

export const getTotalAssets = () => {
  return positions.reduce((sum, pos) => sum + pos.currentValue, 0);
};

// ファンドごとのパフォーマンスデータの型定義
export interface FundPerformance {
  date: string;
  value: number;
  benchmark?: number;
}

// ファンドごとのパフォーマンスデータ
export const fundPerformanceData: Record<string, FundPerformance[]> = {
  '1': [
    { date: '2023/04', value: 100.0 },
    { date: '2023/05', value: 102.5 },
    { date: '2023/06', value: 105.8 },
    { date: '2023/07', value: 108.2 },
    { date: '2023/08', value: 110.4 },
    { date: '2023/09', value: 112.6 },
    { date: '2023/10', value: 114.2 },
    { date: '2023/11', value: 115.5 },
    { date: '2023/12', value: 116.8 },
    { date: '2024/01', value: 118.2 },
    { date: '2024/02', value: 119.0 },
    { date: '2024/03', value: 120.5 },
  ],
  '2': [
    { date: '2023/04', value: 100.0, benchmark: 100.0 },
    { date: '2023/05', value: 103.5, benchmark: 101.5 },
    { date: '2023/06', value: 107.2, benchmark: 103.2 },
    { date: '2023/07', value: 110.8, benchmark: 104.8 },
    { date: '2023/08', value: 108.6, benchmark: 103.5 },
    { date: '2023/09', value: 106.2, benchmark: 102.8 },
    { date: '2023/10', value: 109.5, benchmark: 104.2 },
    { date: '2023/11', value: 112.8, benchmark: 105.6 },
    { date: '2023/12', value: 115.4, benchmark: 106.8 },
    { date: '2024/01', value: 108.2, benchmark: 104.5 },
    { date: '2024/02', value: 110.0, benchmark: 105.2 },
    { date: '2024/03', value: 111.2, benchmark: 105.8 },
  ],
  '3': [
    { date: '2023/04', value: 100.0, benchmark: 100.0 },
    { date: '2023/05', value: 101.8, benchmark: 100.8 },
    { date: '2023/06', value: 104.2, benchmark: 101.5 },
    { date: '2023/07', value: 106.5, benchmark: 102.2 },
    { date: '2023/08', value: 108.8, benchmark: 103.0 },
    { date: '2023/09', value: 110.2, benchmark: 103.8 },
    { date: '2023/10', value: 112.5, benchmark: 104.5 },
    { date: '2023/11', value: 114.8, benchmark: 105.2 },
    { date: '2023/12', value: 116.2, benchmark: 105.8 },
    { date: '2024/01', value: 108.5, benchmark: 104.2 },
    { date: '2024/02', value: 110.0, benchmark: 104.8 },
    { date: '2024/03', value: 111.5, benchmark: 105.5 },
  ],
  '4': [
    { date: '2023/04', value: 100.0, benchmark: 100.0 },
    { date: '2023/05', value: 101.2, benchmark: 100.5 },
    { date: '2023/06', value: 102.5, benchmark: 101.2 },
    { date: '2023/07', value: 103.8, benchmark: 101.8 },
    { date: '2023/08', value: 104.5, benchmark: 102.2 },
    { date: '2023/09', value: 105.2, benchmark: 102.8 },
    { date: '2023/10', value: 106.0, benchmark: 103.2 },
    { date: '2023/11', value: 106.8, benchmark: 103.8 },
    { date: '2023/12', value: 107.5, benchmark: 104.2 },
    { date: '2024/01', value: 108.2, benchmark: 104.8 },
    { date: '2024/02', value: 108.8, benchmark: 105.2 },
    { date: '2024/03', value: 109.5, benchmark: 105.8 },
  ],
  '5': [
    { date: '2023/04', value: 100.0, benchmark: 100.0 },
    { date: '2023/05', value: 102.2, benchmark: 100.8 },
    { date: '2023/06', value: 104.5, benchmark: 101.5 },
    { date: '2023/07', value: 106.8, benchmark: 102.2 },
    { date: '2023/08', value: 109.2, benchmark: 103.0 },
    { date: '2023/09', value: 111.5, benchmark: 103.8 },
    { date: '2023/10', value: 113.8, benchmark: 104.5 },
    { date: '2023/11', value: 116.2, benchmark: 105.2 },
    { date: '2023/12', value: 118.5, benchmark: 105.8 },
    { date: '2024/01', value: 120.8, benchmark: 106.5 },
    { date: '2024/02', value: 123.2, benchmark: 107.2 },
    { date: '2024/03', value: 125.5, benchmark: 108.0 },
  ],
};

// ベンチマーク情報
export const benchmarkInfo: Record<string, string> = {
  '1': 'MSCI World Index',
  '2': 'MSCI Asia Index',
  '3': 'Global Macro Index',
  '4': 'Event Driven Index',
  '5': 'Private Credit Index',
};

// パフォーマンスデータを取得するヘルパー関数
export const getFundPerformance = (fundId: string) => {
  return {
    data: fundPerformanceData[fundId] || [],
    benchmark: benchmarkInfo[fundId],
  };
};

// ポートフォリオサマリー用のデータ
export interface PortfolioSummary {
  totalAssets: number;      // 総資産
  totalPrincipal: number;   // 投資元本
  totalGain: number;        // 評価損益
  gainPercent: number;      // 評価損益率
  cashBalance: number;      // 保有現金
}

export const getPortfolioSummary = (): PortfolioSummary => {
  const positions = getAllFundsWithPositions();
  const totalAssets = positions.reduce((sum, fund) => sum + fund.currentValue, 0);
  const totalPrincipal = positions.reduce((sum, fund) => sum + fund.bookValue, 0);
  const totalGain = positions.reduce((sum, fund) => sum + fund.unrealizedGain, 0);
  const gainPercent = (totalGain / totalPrincipal) * 100;
  const cashBalance = 1000000;  // 現金残高100万円

  return {
    totalAssets,
    totalPrincipal,
    totalGain,
    gainPercent,
    cashBalance,
  };
}; 