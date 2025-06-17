'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useUpbitCoinDetail } from '@/hooks/useUpbitCoinDetail';
import { SnowflakeScore } from '@/components/pages/coinDetails/SnowflakeScore';
import { PriceHistoryPerformance } from '@/components/pages/coinDetails/PriceHistoryPerformance';
import { FinancialMetrics } from '@/components/pages/coinDetails/FinancialMetrics';
import TokenomicsDashboard from '@/components/pages/coinDetails/TokenomicsDashboard';

export default function CoinDetailPage() {
  const params = useParams();
  const coinId = params.coinId as string;
  const { coinDetail, candleData, orderbook, loading, error } =
    useUpbitCoinDetail(coinId);

  // 모의 평가 점수 (실제로는 API에서 계산된 값 사용)
  const mockScores = {
    valuation: 2,
    futureGrowth: 5,
    pastPerformance: 5,
    financialHealth: 6,
    dividends: 0,
  };

  const priceHistory = candleData.map((candle) => ({
    date: new Date(candle.candle_date_time_kst).toLocaleDateString(),
    price: candle.trade_price,
    change:
      ((candle.trade_price - candle.opening_price) / candle.opening_price) *
      100,
  }));

  const marketData = {
    marketCap: coinDetail?.acc_trade_price_24h || 0,
    volume24h: coinDetail?.acc_trade_volume_24h || 0,
    volatility: coinDetail
      ? ((coinDetail.high_price - coinDetail.low_price) /
          coinDetail.trade_price) *
        100
      : 0,
    liquidityScore: 85,
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-950">
        <div className="text-xl text-white">
          Loading comprehensive analysis...
        </div>
      </div>
    );
  }

  if (error || !coinDetail) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-950">
        <div className="text-xl text-red-400">
          {error || 'Coin data not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-950 text-blue-50">
      {/* 헤더 */}
      <header className="flex items-center justify-between bg-blue-950 px-8 py-4 shadow">
        <div className="flex items-center gap-4">
          <Link
            href="/charts"
            className="text-xl font-bold text-white hover:text-blue-300"
          >
            ← 크립톡
          </Link>
          <h1 className="text-xl font-semibold">
            {coinDetail.korean_name} ({coinDetail.market}) - Comprehensive
            Analysis
          </h1>
        </div>
        <button className="rounded bg-white px-4 py-1 font-semibold text-blue-900">
          Follow
        </button>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8">
        {/* 현재 가격 정보 */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-blue-900">
                {coinDetail.trade_price.toLocaleString()}원
              </h2>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`font-semibold ${
                    coinDetail.change_rate > 0
                      ? 'text-red-500'
                      : coinDetail.change_rate < 0
                        ? 'text-blue-500'
                        : 'text-gray-500'
                  }`}
                >
                  {coinDetail.change_rate > 0 ? '+' : ''}
                  {(coinDetail.change_rate * 100).toFixed(2)}%
                </span>
                <span className="text-sm text-blue-600">
                  {new Date().toLocaleDateString()} • Market Open
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-600">24H Volume</div>
              <div className="text-xl font-bold text-blue-900">
                {Math.round(coinDetail.acc_trade_price_24h / 1e8) / 10}B
              </div>
            </div>
          </div>
        </div>

        {/* Snowflake Score */}
        <SnowflakeScore {...mockScores} />

        {/* 가격 히스토리 & 성과 */}
        <PriceHistoryPerformance
          coinDetail={coinDetail}
          priceHistory={priceHistory}
        />

        {/* 재무 지표 */}
        <FinancialMetrics coinDetail={coinDetail} marketData={marketData} />

        {/* 기술적 분석 (기존 호가 정보 확장) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 호가 정보 */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-blue-900">Order Book</h3>
            {orderbook && (
              <div className="space-y-1">
                <div className="grid grid-cols-3 gap-2 border-b pb-2 text-xs font-semibold text-blue-600">
                  <span>Ask Size</span>
                  <span className="text-center">Price</span>
                  <span className="text-right">Bid Size</span>
                </div>
                {orderbook.orderbook_units.slice(0, 10).map((unit, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2 text-xs">
                    <span className="text-right text-blue-500">
                      {unit.ask_size.toFixed(4)}
                    </span>
                    <span className="text-center font-semibold text-blue-900">
                      {unit.ask_price.toLocaleString()}
                    </span>
                    <span className="text-red-500">
                      {unit.bid_size.toFixed(4)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 추가 지표 */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-blue-900">
              Technical Indicators
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-blue-600">RSI (14)</span>
                <span className="font-semibold text-blue-900">65.4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">MACD</span>
                <span className="font-semibold text-green-600">Bullish</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Moving Avg (20)</span>
                <span className="font-semibold text-blue-900">
                  {candleData.length > 0 &&
                    Math.round(
                      candleData
                        .slice(0, 20)
                        .reduce((sum, candle) => sum + candle.trade_price, 0) /
                        Math.min(20, candleData.length),
                    ).toLocaleString()}
                  원
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Support Level</span>
                <span className="font-semibold text-blue-900">
                  {coinDetail.low_price.toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Resistance Level</span>
                <span className="font-semibold text-blue-900">
                  {coinDetail.high_price.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <TokenomicsDashboard />
    </div>
  );
}
