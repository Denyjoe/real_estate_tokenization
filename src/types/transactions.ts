export type TransactionType = 'Buy' | 'Sell' | 'Transfer' | 'Deposit' | 'Withdrawal';
export type TransactionStatus = 'Completed' | 'Pending' | 'Failed';

export interface Transaction {
  id: string;
  property: string;
  propertyImage?: string;
  type: TransactionType;
  amount: number;
  tokens: number;
  wallet: string;
  date: string;
  status: TransactionStatus;
  stellarFee?: number;
  stellarTxHash?: string;
  datetime?: string;
}

export interface SummaryStats {
  totalTransactions: number;
  totalInvested: number;
  totalTokensPurchased: number;
  totalTokensSold: number;
  changeTotalTransactions?: number;
  changeTotalInvested?: number;
  changeTokensPurchased?: number;
  changeTokensSold?: number;
}
