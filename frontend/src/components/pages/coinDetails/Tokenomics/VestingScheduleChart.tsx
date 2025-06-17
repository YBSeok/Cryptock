// components/VestingScheduleChart.tsx
'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface VestingEvent {
  date: string;
  month: number;
  team: number;
  investors: number;
  advisors: number;
  community: number;
  ecosystem: number;
  totalUnlocked: number;
  cumulativeUnlocked: number;
}

interface VestingScheduleProps {
  vestingData: VestingEvent[];
  cliffPeriod?: number; // 개월 수
}

export const VestingScheduleChart: React.FC<VestingScheduleProps> = ({
  vestingData,
  cliffPeriod = 12,
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-white p-4 shadow-lg">
          <h4 className="mb-2 font-semibold text-blue-900">{label}</h4>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between gap-4">
              <span style={{ color: entry.color }}>{entry.dataKey}:</span>
              <span className="font-medium">
                {entry.value.toLocaleString()} 토큰
              </span>
            </div>
          ))}
          <div className="mt-2 border-t pt-2">
            <div className="flex justify-between gap-4 font-semibold">
              <span>누적 해제:</span>
              <span>
                {payload[0]?.payload?.cumulativeUnlocked?.toLocaleString()} 토큰
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* 베스팅 개요 */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold text-blue-900">
          토큰 베스팅 스케줄
        </h3>
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">
              {cliffPeriod}개월
            </div>
            <div className="text-sm text-blue-600">클리프 기간</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">
              {vestingData.length}개월
            </div>
            <div className="text-sm text-blue-600">총 베스팅 기간</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">
              {vestingData[
                vestingData.length - 1
              ]?.cumulativeUnlocked?.toLocaleString() || 0}
            </div>
            <div className="text-sm text-blue-600">총 해제 토큰</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">월별</div>
            <div className="text-sm text-blue-600">해제 주기</div>
          </div>
        </div>

        {/* 월별 해제량 차트 */}
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={vestingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="team"
              stackId="1"
              stroke="#1e40af"
              fill="#1e40af"
              fillOpacity={0.8}
            />
            <Area
              type="monotone"
              dataKey="investors"
              stackId="1"
              stroke="#dc2626"
              fill="#dc2626"
              fillOpacity={0.8}
            />
            <Area
              type="monotone"
              dataKey="advisors"
              stackId="1"
              stroke="#16a34a"
              fill="#16a34a"
              fillOpacity={0.8}
            />
            <Area
              type="monotone"
              dataKey="community"
              stackId="1"
              stroke="#ca8a04"
              fill="#ca8a04"
              fillOpacity={0.8}
            />
            <Area
              type="monotone"
              dataKey="ecosystem"
              stackId="1"
              stroke="#9333ea"
              fill="#9333ea"
              fillOpacity={0.8}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 누적 해제량 차트 */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold text-blue-900">
          누적 토큰 해제량
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={vestingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="cumulativeUnlocked"
              stroke="#1e40af"
              strokeWidth={3}
              dot={{ fill: '#1e40af', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
