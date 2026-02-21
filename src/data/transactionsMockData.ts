import type { Transaction, SummaryStats } from '../types/transactions';

export const mockTransactions: Transaction[] = [
  { id: 'TX123456', property: 'Ocean View Apartments', propertyImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=80&h=80&fit=crop', type: 'Buy', amount: 500, tokens: 50, wallet: 'GABCD1234XYZ5678', date: '2026-02-21', status: 'Completed', stellarFee: 0.00001, stellarTxHash: 'a1b2c3d4e5f6...', datetime: '2026-02-21 14:32:00' },
  { id: 'TX234567', property: 'Dar es Salaam Beach Apartment', propertyImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=80&h=80&fit=crop', type: 'Buy', amount: 1200, tokens: 120, wallet: 'GABCD1234XYZ5678', date: '2026-02-20', status: 'Completed', stellarFee: 0.00001, stellarTxHash: 'b2c3d4e5f6a1...', datetime: '2026-02-20 09:15:00' },
  { id: 'TX345678', property: 'Zanzibar Villa', propertyImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=80&h=80&fit=crop', type: 'Transfer', amount: 0, tokens: 25, wallet: 'GXYZ9876ABCD4321', date: '2026-02-19', status: 'Completed', stellarFee: 0.00001, stellarTxHash: 'c3d4e5f6a1b2...', datetime: '2026-02-19 16:45:00' },
  { id: 'TX456789', property: 'Arusha Lodge', propertyImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=80&h=80&fit=crop', type: 'Sell', amount: 350, tokens: 35, wallet: 'GABCD1234XYZ5678', date: '2026-02-18', status: 'Completed', stellarFee: 0.00001, stellarTxHash: 'd4e5f6a1b2c3...', datetime: '2026-02-18 11:20:00' },
  { id: 'TX567890', property: 'Sunset Residences', propertyImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=80&h=80&fit=crop', type: 'Deposit', amount: 2000, tokens: 0, wallet: 'GABCD1234XYZ5678', date: '2026-02-17', status: 'Completed', stellarFee: 0, stellarTxHash: 'e5f6a1b2c3d4...', datetime: '2026-02-17 08:00:00' },
  { id: 'TX678901', property: 'Ocean View Apartments', propertyImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=80&h=80&fit=crop', type: 'Buy', amount: 750, tokens: 75, wallet: 'GABCD1234XYZ5678', date: '2026-02-16', status: 'Pending', stellarFee: 0.00001, stellarTxHash: 'f6a1b2c3d4e5...', datetime: '2026-02-16 13:22:00' },
  { id: 'TX789012', property: 'Downtown Loft Complex', propertyImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=80&h=80&fit=crop', type: 'Withdrawal', amount: 500, tokens: 0, wallet: 'GABCD1234XYZ5678', date: '2026-02-15', status: 'Failed', stellarFee: 0, stellarTxHash: '', datetime: '2026-02-15 10:05:00' },
  { id: 'TX890123', property: 'Riverside Heights', propertyImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=80&h=80&fit=crop', type: 'Buy', amount: 1800, tokens: 90, wallet: 'GABCD1234XYZ5678', date: '2026-02-14', status: 'Completed', stellarFee: 0.00001, stellarTxHash: 'a1b2c3d4e5f6...', datetime: '2026-02-14 15:40:00' },
  { id: 'TX901234', property: 'Zanzibar Villa', propertyImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=80&h=80&fit=crop', type: 'Transfer', amount: 0, tokens: 10, wallet: 'GXYZ9876ABCD4321', date: '2026-02-13', status: 'Completed', stellarFee: 0.00001, stellarTxHash: 'b2c3d4e5f6a1...', datetime: '2026-02-13 12:00:00' },
  { id: 'TX012345', property: 'Dar es Salaam Beach Apartment', propertyImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=80&h=80&fit=crop', type: 'Sell', amount: 600, tokens: 60, wallet: 'GABCD1234XYZ5678', date: '2026-02-12', status: 'Completed', stellarFee: 0.00001, stellarTxHash: 'c3d4e5f6a1b2...', datetime: '2026-02-12 09:30:00' },
];

export const mockSummaryStats: SummaryStats = {
  totalTransactions: 10,
  totalInvested: 8950,
  totalTokensPurchased: 435,
  totalTokensSold: 95,
  changeTotalTransactions: 2,
  changeTotalInvested: 12.5,
  changeTokensPurchased: 8,
  changeTokensSold: -5,
};
