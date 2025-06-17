import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PriceHistoryProps {
  coinDetail: any;
  priceHistory: Array<{
    date: string;
    price: number;
    change: number;
  }>;
}

export const PriceHistoryPerformance: React.FC<PriceHistoryProps> = ({
  coinDetail,
  priceHistory,
}) => {
  const performanceData = [
    {
      period: 'Current Price',
      value: `${coinDetail.trade_price.toLocaleString()}원`,
    },
    {
      period: '52 Week High',
      value: `${coinDetail.highest_52_week_price.toLocaleString()}원`,
    },
    {
      period: '52 Week Low',
      value: `${coinDetail.lowest_52_week_price.toLocaleString()}원`,
    },
    {
      period: '24H Change',
      value: `${(coinDetail.change_rate * 100).toFixed(2)}%`,
    },
    { period: '7D Change', value: '계산 필요' },
    { period: '1M Change', value: '계산 필요' },
    { period: '3M Change', value: '계산 필요' },
    { period: '1Y Change', value: '계산 필요' },
  ];

  return (
    <div className="space-y-6">
      {/* 가격 히스토리 테이블 */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold text-blue-900">
          Price History & Performance
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {performanceData.map((item, index) => (
            <div key={index} className="border-b pb-2">
              <div className="text-sm text-blue-600">{item.period}</div>
              <div className="font-semibold text-blue-900">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 가격 차트 */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold text-blue-900">
          Price Chart (30 Days)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#1e40af"
              strokeWidth={2}
              dot={{ fill: '#1e40af', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
