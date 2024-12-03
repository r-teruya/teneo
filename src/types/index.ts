// 共通の型定義
export interface Fund {
  id: string;
  name: string;
  type: '株式' | '債券' | 'バランス' | 'オルタナティブ';
  risk: 1 | 2 | 3 | 4 | 5;  // リスク度合い
  currency: '円' | 'ドル' | 'ユーロ';
  minInvestment: number;  // 最低投資金額
  description: string;  // 追加
  features: string[];   // 追加
}

export interface Position {
  fundId: string;
  units: number;         // 保有口数
  bookValue: number;     // 取得価額
  currentValue: number;  // 現在価値
  currency: string;
  unrealizedGain: number; // 評価損益
  unrealizedGainPercent: number; // 評価損益率
}

export interface Performance {
  period: '1ヶ月' | '3ヶ月' | '6ヶ月' | '1年' | '3年' | '5年' | '設定来';
  return: number;
  risk: number;
  sharpe: number;
}

export interface AssetAllocation {
  type: string;
  value: number;
  ratio: number;
}

export interface Transaction {
  id: string;
  fundId: string;
  type: '買付' | '解約';
  status: '処理中' | '完了' | '却下';
  amount: number;
  units?: number;
  date: string;
  settlementDate?: string;
} 