// components/TokenAllocationChart.tsx
'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface TokenAllocation {
  name: string;
  value: number;
  percentage: number;
  color: string;
  description: string;
}

interface TokenAllocationChartProps {
  totalSupply: number;
  allocations: TokenAllocation[];
}

export const TokenAllocationChart: React.FC<TokenAllocationChartProps> = ({
  totalSupply,
  allocations,
}) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border bg-white p-4 shadow-lg">
          <h3 className="font-semibold text-blue-900">{data.name}</h3>
          <p className="text-sm text-blue-600">
            토큰 수량: {data.value.toLocaleString()}
          </p>
          <p className="text-sm text-blue-600">비율: {data.percentage}%</p>
          <p className="mt-2 text-xs text-gray-600">{data.description}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percentage,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percentage < 5) return null; // 5% 미만은 라벨 숨김

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${percentage}%`}
      </text>
    );
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-bold text-blue-900">토큰 분배 계획</h3>
      <div className="flex flex-col items-center gap-6 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={allocations}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {allocations.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="space-y-3">
            <div className="mb-4 text-center">
              <h4 className="text-lg font-semibold text-blue-900">총 발행량</h4>
              <p className="text-2xl font-bold text-blue-700">
                {totalSupply.toLocaleString()}
              </p>
            </div>

            {allocations.map((allocation, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: allocation.color }}
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-blue-900">
                      {allocation.name}
                    </span>
                    <span className="text-blue-600">
                      {allocation.percentage}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {allocation.value.toLocaleString()} 토큰
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
