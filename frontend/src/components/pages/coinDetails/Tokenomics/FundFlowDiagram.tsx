// components/FundFlowDiagram.tsx
'use client';

import React from 'react';
import { Chart } from 'react-google-charts';

interface FundFlowProps {
  fundingData: Array<[string, string, number]>;
  totalFunding: number;
}

export const FundFlowDiagram: React.FC<FundFlowProps> = ({
  fundingData,
  totalFunding,
}) => {
  const options = {
    title: '프로젝트 자금 흐름',
    titleTextStyle: {
      fontSize: 18,
      bold: true,
      color: '#1e40af',
    },
    sankey: {
      node: {
        colors: ['#1e40af', '#dc2626', '#16a34a', '#ca8a04', '#9333ea'],
        label: {
          fontSize: 12,
          color: '#374151',
          bold: true,
        },
        interactivity: true,
        width: 5,
      },
      link: {
        colorMode: 'gradient',
        colors: ['#3b82f6', '#ef4444', '#22c55e', '#eab308', '#a855f7'],
      },
    },
    tooltip: {
      isHtml: true,
      textStyle: {
        fontSize: 12,
      },
    },
  };

  const data = [['From', 'To', 'Amount'], ...fundingData];

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-blue-900">자금 흐름 분석</h3>
        <p className="mt-1 text-sm text-blue-600">
          총 자금 규모: {totalFunding.toLocaleString()} USD
        </p>
      </div>

      <Chart
        chartType="Sankey"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />

      {/* 주요 지출 항목 요약 */}
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded bg-blue-50 p-3 text-center">
          <div className="text-lg font-bold text-blue-900">개발비</div>
          <div className="text-sm text-blue-600">40-50%</div>
        </div>
        <div className="rounded bg-red-50 p-3 text-center">
          <div className="text-lg font-bold text-red-900">마케팅</div>
          <div className="text-sm text-red-600">20-30%</div>
        </div>
        <div className="rounded bg-green-50 p-3 text-center">
          <div className="text-lg font-bold text-green-900">운영비</div>
          <div className="text-sm text-green-600">15-25%</div>
        </div>
        <div className="rounded bg-yellow-50 p-3 text-center">
          <div className="text-lg font-bold text-yellow-900">리저브</div>
          <div className="text-sm text-yellow-600">10-15%</div>
        </div>
      </div>
    </div>
  );
};
