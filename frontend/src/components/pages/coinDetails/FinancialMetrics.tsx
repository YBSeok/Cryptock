import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface FinancialMetricsProps {
  coinDetail: any;
  marketData: {
    marketCap?: number;
    volume24h: number;
    volatility: number;
    liquidityScore: number;
  };
}

export const FinancialMetrics: React.FC<FinancialMetricsProps> = ({
  coinDetail,
  marketData,
}) => {
  const volumeData = [
    { name: '24H Volume', value: marketData.volume24h },
    { name: 'Avg Volume', value: marketData.volume24h * 0.8 },
    { name: 'Peak Volume', value: marketData.volume24h * 1.5 },
  ];

  const riskMetrics = [
    { name: 'Volatility', value: marketData.volatility, color: '#ef4444' },
    { name: 'Liquidity', value: marketData.liquidityScore, color: '#22c55e' },
    { name: 'Market Depth', value: 75, color: '#3b82f6' },
  ];

  return (
    <div className="space-y-6">
      {/* 기본 재무 지표 */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold text-blue-900">
          Financial Fundamentals
        </h3>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">
              {Math.round(coinDetail.acc_trade_price_24h / 1e8) / 10}B
            </div>
            <div className="text-sm text-blue-600">Market Cap (24H)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">
              {coinDetail.acc_trade_volume_24h.toFixed(2)}
            </div>
            <div className="text-sm text-blue-600">Volume (24H)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">
              {(
                ((coinDetail.high_price - coinDetail.low_price) /
                  coinDetail.trade_price) *
                100
              ).toFixed(2)}
              %
            </div>
            <div className="text-sm text-blue-600">Volatility</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">
              {(
                ((coinDetail.trade_price - coinDetail.opening_price) /
                  coinDetail.opening_price) *
                100
              ).toFixed(2)}
              %
            </div>
            <div className="text-sm text-blue-600">Daily Return</div>
          </div>
        </div>
      </div>

      {/* 거래량 차트 */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold text-blue-900">
          Trading Volume Analysis
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={volumeData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value" fill="#1e40af" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 리스크 지표 */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold text-blue-900">Risk Metrics</h3>
        <div className="grid grid-cols-3 gap-4">
          {riskMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="relative mx-auto mb-2 h-20 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { value: metric.value },
                        { value: 100 - metric.value },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={40}
                      startAngle={90}
                      endAngle={450}
                      dataKey="value"
                    >
                      <Cell fill={metric.color} />
                      <Cell fill="#e5e7eb" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold">{metric.value}</span>
                </div>
              </div>
              <div className="text-sm font-semibold text-blue-900">
                {metric.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
