'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Next.js에서 react-gauge-component는 SSR 비호환으로 dynamic import 필요
const GaugeComponent = dynamic(() => import('react-gauge-component'), {
  ssr: false,
});

interface SnowflakeScoreProps {
  valuation: number;
  futureGrowth: number;
  pastPerformance: number;
  financialHealth: number;
  dividends: number;
}

export const SnowflakeScore: React.FC<SnowflakeScoreProps> = ({
  valuation,
  futureGrowth,
  pastPerformance,
  financialHealth,
  dividends,
}) => {
  const scoreData = [
    { label: 'Valuation', value: valuation, max: 6 },
    { label: 'Future Growth', value: futureGrowth, max: 6 },
    { label: 'Past Performance', value: pastPerformance, max: 6 },
    { label: 'Financial Health', value: financialHealth, max: 6 },
    { label: 'Dividends', value: dividends, max: 6 },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h3 className="mb-6 text-xl font-bold text-blue-900">Snowflake Score</h3>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {scoreData.map((score, index) => (
          <div key={index} className="text-center">
            <GaugeComponent
              value={(score.value / score.max) * 100}
              minValue={0}
              maxValue={100}
              arc={{
                subArcs: [
                  { limit: 33, color: '#EA4228', showTick: true },
                  { limit: 66, color: '#F5CD19', showTick: true },
                  { limit: 100, color: '#5BE12C', showTick: true },
                ],
              }}
              pointer={{ type: 'blob', animationDelay: 0 }}
              labels={{
                valueLabel: { style: { fontSize: '22px', fill: '#1e40af' } },
                tickLabels: { hideMinMax: true },
              }}
            />
            <div className="mt-2">
              <div className="font-semibold text-blue-900">{score.label}</div>
              <div className="text-lg font-bold text-blue-700">
                {score.value}/{score.max}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
