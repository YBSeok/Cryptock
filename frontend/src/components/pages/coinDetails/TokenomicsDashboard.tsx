'use client';

import React, { useState } from 'react';
import { TokenAllocationChart } from './Tokenomics/TokenAllocationChart';
import { VestingScheduleChart } from './Tokenomics/VestingScheduleChart';
import { FundFlowDiagram } from './Tokenomics/FundFlowDiagram';
import { useTokenomicsData } from '@/hooks/useTokenomicsData';

// 모의 데이터
const mockTokenAllocation = [
  {
    name: '팀',
    value: 200000000,
    percentage: 20,
    color: '#1e40af',
    description: '4년 베스팅, 1년 클리프',
  },
  {
    name: '투자자',
    value: 300000000,
    percentage: 30,
    color: '#dc2626',
    description: '2년 베스팅, 6개월 클리프',
  },
  {
    name: '커뮤니티',
    value: 250000000,
    percentage: 25,
    color: '#16a34a',
    description: '에어드랍 및 리워드',
  },
  {
    name: '생태계',
    value: 150000000,
    percentage: 15,
    color: '#ca8a04',
    description: '파트너십 및 개발 지원',
  },
  {
    name: '리저브',
    value: 100000000,
    percentage: 10,
    color: '#9333ea',
    description: '미래 확장 및 운영비',
  },
];

const mockVestingData = [
  {
    date: '2024-01',
    month: 1,
    team: 0,
    investors: 0,
    advisors: 0,
    community: 5000000,
    ecosystem: 2000000,
    totalUnlocked: 7000000,
    cumulativeUnlocked: 7000000,
  },
  {
    date: '2024-02',
    month: 2,
    team: 0,
    investors: 0,
    advisors: 0,
    community: 5000000,
    ecosystem: 2000000,
    totalUnlocked: 7000000,
    cumulativeUnlocked: 14000000,
  },
  {
    date: '2024-07',
    month: 7,
    team: 0,
    investors: 50000000,
    advisors: 1000000,
    community: 5000000,
    ecosystem: 2000000,
    totalUnlocked: 58000000,
    cumulativeUnlocked: 72000000,
  },
  {
    date: '2024-12',
    month: 12,
    team: 50000000,
    investors: 25000000,
    advisors: 500000,
    community: 5000000,
    ecosystem: 2000000,
    totalUnlocked: 82500000,
    cumulativeUnlocked: 154500000,
  },
];

const mockFundFlow: [string, string, number][] = [
  ['토큰 세일', '개발비', 400000],
  ['토큰 세일', '마케팅', 250000],
  ['토큰 세일', '운영비', 200000],
  ['토큰 세일', '리저브', 150000],
  ['개발비', '스마트 컨트랙트', 200000],
  ['개발비', 'dApp 개발', 150000],
  ['개발비', '감사 및 보안', 50000],
  ['마케팅', '디지털 마케팅', 100000],
  ['마케팅', '커뮤니티 구축', 80000],
  ['마케팅', '파트너십', 70000],
  ['운영비', '인건비', 120000],
  ['운영비', '인프라', 50000],
  ['운영비', '법무 및 규제', 30000],
];

export default function TokenomicsDashboard({ coinId }: { coinId?: string }) {
  const [activeTab, setActiveTab] = useState('allocation');
  const { tokenAllocation, vestingData, loading, error } =
    useTokenomicsData(coinId);

  const displayAllocation =
    tokenAllocation.length > 0 ? tokenAllocation : mockTokenAllocation;
  const displayVesting = vestingData.length > 0 ? vestingData : mockVestingData;

  const tabs = [
    { id: 'allocation', name: '토큰 분배' },
    { id: 'vesting', name: '베스팅 스케줄' },
    { id: 'fundflow', name: '자금 흐름' },
  ];

  return (
    <div className="min-h-screen bg-blue-950 text-blue-50">
      {/* 헤더 */}
      <header className="flex items-center justify-between bg-blue-950 px-8 py-4 shadow">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">
            토큰이코노믹스 대시보드
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* 탭 네비게이션 */}
        <div className="mb-8">
          <div className="border-b border-blue-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`border-b-2 px-1 py-2 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-blue-300 hover:border-blue-300 hover:text-blue-400'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="space-y-8">
          {activeTab === 'allocation' && (
            <>
              <TokenAllocationChart
                allocations={displayAllocation}
                totalSupply={1000000000}
              />

              {/* 핵심 지표 요약 */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <h4 className="mb-2 text-lg font-semibold text-blue-900">
                    총 발행량
                  </h4>
                  <p className="text-3xl font-bold text-blue-700">
                    1,000,000,000
                  </p>
                  <p className="mt-1 text-sm text-blue-600">
                    고정 공급량, 추가 발행 없음
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <h4 className="mb-2 text-lg font-semibold text-blue-900">
                    초기 유통량
                  </h4>
                  <p className="text-3xl font-bold text-blue-700">
                    250,000,000
                  </p>
                  <p className="mt-1 text-sm text-blue-600">
                    전체 공급량의 25%
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <h4 className="mb-2 text-lg font-semibold text-blue-900">
                    평균 베스팅 기간
                  </h4>
                  <p className="text-3xl font-bold text-blue-700">3년</p>
                  <p className="mt-1 text-sm text-blue-600">
                    장기 인센티브 정렬
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'vesting' && (
            <VestingScheduleChart
              vestingData={displayVesting}
              cliffPeriod={12}
            />
          )}

          {activeTab === 'fundflow' && (
            <FundFlowDiagram
              fundingData={mockFundFlow}
              totalFunding={1000000}
            />
          )}
        </div>
      </main>
    </div>
  );
}
