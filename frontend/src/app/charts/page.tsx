'use client';

import { useUpbitCoins } from '@/hooks/useUpbitCoins';
import React, { useEffect, useState, useMemo } from 'react';

type SortKey = 'trade_price' | 'change_rate' | 'acc_trade_price_24h' | null;
type SortOrder = 'asc' | 'desc' | null;

export default function ChartsPage() {
  const { coins, loading, error } = useUpbitCoins();

  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const sortedCoins = useMemo(() => {
    if (!sortKey || !sortOrder) return coins;
    const sorted = [...coins].sort((a, b) => {
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      if (sortOrder === 'asc') return av - bv;
      if (sortOrder === 'desc') return bv - av;
      return 0;
    });
    return sorted;
  }, [coins, sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else if (sortOrder === 'desc') {
      setSortKey(null);
      setSortOrder(null);
    } else {
      setSortOrder('asc');
    }
  };

  const sortIcon = (key: SortKey) => {
    if (sortKey !== key) return '↕️';
    if (sortOrder === 'asc') return '▲';
    if (sortOrder === 'desc') return '▼';
    return '↕️';
  };
  return (
    <div className="min-h-screen bg-blue-950 text-blue-50">
      <header className="flex items-center justify-between bg-blue-950 px-8 py-4 shadow">
        <div className="flex items-center gap-2">
          <img src="/logo-toss.png" alt="로고" className="h-7" />
          <span className="text-xl font-bold text-white">크립톡</span>
        </div>
        <button className="rounded bg-white px-4 py-1 font-semibold text-blue-900">
          로그인
        </button>
      </header>

      <main className="mx-auto max-w-4xl py-8">
        <h1 className="mb-4 text-2xl font-bold text-white">
          업비트 KRW 마켓 실시간 차트
        </h1>
        <div className="flex gap-8">
          <section className="flex-1 rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-4">
              <span className="font-semibold text-blue-900">
                업비트 거래대금
              </span>
              <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-400">
                실시간
              </span>
            </div>
            <table className="w-full text-blue-900">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">순위</th>
                  <th className="py-2 text-left">종목</th>
                  <th className="py-2 text-right">
                    <button
                      type="button"
                      onClick={() => handleSort('trade_price')}
                      className="flex items-center gap-1 hover:text-blue-700"
                    >
                      현재가 {sortIcon('trade_price')}
                    </button>
                  </th>
                  <th className="py-2 text-right">
                    <button
                      type="button"
                      onClick={() => handleSort('change_rate')}
                      className="flex items-center gap-1 hover:text-blue-700"
                    >
                      등락률 {sortIcon('change_rate')}
                    </button>
                  </th>
                  <th className="py-2 text-right">
                    <button
                      type="button"
                      onClick={() => handleSort('acc_trade_price_24h')}
                      className="flex items-center gap-1 hover:text-blue-700"
                    >
                      거래대금(24h) {sortIcon('acc_trade_price_24h')}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-blue-400">
                      불러오는 중
                    </td>
                  </tr>
                ) : (
                  sortedCoins.map((coin, idx) => (
                    <tr
                      key={coin.market}
                      className="border-b transition last:border-none hover:bg-blue-50/40"
                    >
                      <td className="py-2">{idx + 1}</td>
                      <td className="flex items-center gap-2 py-2">
                        <span className="font-semibold">
                          {coin.korean_name}
                        </span>
                        <span className="ml-2 text-xs text-blue-400">
                          {coin.market}
                        </span>
                      </td>
                      <td className="py-2 text-right font-semibold">
                        {coin.trade_price.toLocaleString()}원
                      </td>
                      <td
                        className={`py-2 text-right font-semibold ${
                          coin.change_rate > 0
                            ? 'text-red-500'
                            : coin.change_rate < 0
                              ? 'text-blue-500'
                              : ''
                        }`}
                      >
                        {(coin.change_rate * 100).toFixed(2)}%
                      </td>
                      <td className="py-2 text-right">
                        {Math.round(coin.acc_trade_price_24h / 1e8) / 10}억
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
}
