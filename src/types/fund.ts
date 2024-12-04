import { Position } from './position';

export type FundType = 
  | '株式' 
  | '債券' 
  | 'バランス' 
  | 'その他'
  | '株式ロングショート'
  | 'グローバルマクロ'
  | 'イベントドリブン'
  | 'プライベートクレジット';

export interface Fund {
  id: string;
  name: string;
  type: FundType;
  risk: number;
  currency: string;
  minInvestment: number;
  description?: string;
  features?: string[];
}

export type FundWithPosition = Fund & Position; 