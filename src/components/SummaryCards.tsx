import type { ComponentType } from 'react';
import type { SummaryStats } from '../types/transactions';
import { ClipboardDocumentListIcon, BanknotesIcon, CircleStackIcon, ArrowUpTrayIcon } from './Icons';

const cards: { key: keyof SummaryStats; title: string; Icon: ComponentType<{ className?: string }>; changeKey?: keyof SummaryStats }[] = [
  { key: 'totalTransactions', title: 'Total Transactions', Icon: ClipboardDocumentListIcon, changeKey: 'changeTotalTransactions' },
  { key: 'totalInvested', title: 'Total Invested (USD)', Icon: BanknotesIcon, changeKey: 'changeTotalInvested' },
  { key: 'totalTokensPurchased', title: 'Total Tokens Purchased', Icon: CircleStackIcon, changeKey: 'changeTokensPurchased' },
  { key: 'totalTokensSold', title: 'Total Tokens Sold', Icon: ArrowUpTrayIcon, changeKey: 'changeTokensSold' },
];

function formatValue(key: string, value: number): string {
  if (key === 'totalInvested') return `$${value.toLocaleString()}`;
  return value.toLocaleString();
}

interface SummaryCardsProps {
  stats: SummaryStats;
}

export default function SummaryCards({ stats }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ key, title, Icon, changeKey }) => {
        const value = stats[key];
        if (typeof value !== 'number') return null;
        const change = changeKey ? stats[changeKey] : undefined;
        const changeNum = typeof change === 'number' ? change : 0;
        const isPositive = changeNum >= 0;
        return (
          <div
            key={key}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-gray-900">{formatValue(key, value)}</span>
              {changeKey && changeNum !== 0 && (
                <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}{changeNum}%
                </span>
              )}
            </div>
            <Icon className="mt-2 h-8 w-8 text-gray-300" aria-hidden />
          </div>
        );
      })}
    </div>
  );
}
