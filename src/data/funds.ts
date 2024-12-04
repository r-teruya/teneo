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
    minInvestment: 10000000,
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
    minInvestment: 10000000,
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
    units: 1000,
    bookValue: 10000000,
    currentValue: 12800000,
    unrealizedGain: 2800000,
    unrealizedGainPercent: 28.0,
  },
  {
    fundId: '2',
    units: 800,
    bookValue: 8000000,
    currentValue: 8800000,
    unrealizedGain: 800000,
    unrealizedGainPercent: 10.0,
  },
  {
    fundId: '3',
    units: 250,
    bookValue: 25000000,
    currentValue: 27500000,
    unrealizedGain: 2500000,
    unrealizedGainPercent: 10.0,
  },
  {
    fundId: '4',
    units: 100,
    bookValue: 50000000,
    currentValue: 52500000,
    unrealizedGain: 2500000,
    unrealizedGainPercent: 5.0,
  },
  {
    fundId: '5',
    units: 50,
    bookValue: 100000000,
    currentValue: 115000000,
    unrealizedGain: 15000000,
    unrealizedGainPercent: 15.0,
  },
];

// 資産推移データ
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
    value: 180000000,
    previousValue: 175000000,
    change: 5000000,
    changePercent: 2.86,
  },
  {
    date: '2023/05',
    value: 185000000,
    previousValue: 180000000,
    change: 5000000,
    changePercent: 2.78,
  },
  {
    date: '2023/06',
    value: 190000000,
    previousValue: 185000000,
    change: 5000000,
    changePercent: 2.70,
  },
  {
    date: '2023/07',
    value: 195000000,
    previousValue: 190000000,
    change: 5000000,
    changePercent: 2.63,
  },
  {
    date: '2023/08',
    value: 200000000,
    previousValue: 195000000,
    change: 5000000,
    changePercent: 2.56,
  },
  {
    date: '2023/09',
    value: 205000000,
    previousValue: 200000000,
    change: 5000000,
    changePercent: 2.50,
  },
  {
    date: '2023/10',
    value: 210000000,
    previousValue: 205000000,
    change: 5000000,
    changePercent: 2.44,
  },
  {
    date: '2023/11',
    value: 212000000,
    previousValue: 210000000,
    change: 2000000,
    changePercent: 0.95,
  },
  {
    date: '2023/12',
    value: 215000000,
    previousValue: 212000000,
    change: 3000000,
    changePercent: 1.42,
  },
  {
    date: '2024/01',
    value: 216000000,
    previousValue: 215000000,
    change: 1000000,
    changePercent: 0.47,
  },
  {
    date: '2024/02',
    value: 216500000,
    previousValue: 216000000,
    change: 500000,
    changePercent: 0.23,
  },
  {
    date: '2024/03',
    value: 216600000,
    previousValue: 216500000,
    change: 100000,
    changePercent: 0.05,
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
  benchmark: number;
}

// ファンドごとのパフォーマンスデータ
export const fundPerformanceData: Record<string, FundPerformance[]> = {
  '1': [
    { date: '2023/04', value: 100.0, benchmark: 100.0 },
    { date: '2023/05', value: 102.5, benchmark: 101.2 },
    { date: '2023/06', value: 105.8, benchmark: 102.8 },
    { date: '2023/07', value: 108.2, benchmark: 103.5 },
    { date: '2023/08', value: 112.4, benchmark: 104.7 },
    { date: '2023/09', value: 115.6, benchmark: 105.9 },
    { date: '2023/10', value: 119.2, benchmark: 107.2 },
    { date: '2023/11', value: 122.5, benchmark: 108.6 },
    { date: '2023/12', value: 125.8, benchmark: 110.1 },
    { date: '2024/01', value: 127.2, benchmark: 111.3 },
    { date: '2024/02', value: 128.0, benchmark: 112.2 },
    { date: '2024/03', value: 128.8, benchmark: 113.0 },
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