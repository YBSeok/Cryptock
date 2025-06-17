import { useState, useEffect } from 'react';
import { TokenomicsAPI } from '@/services/tokenomics';
import { TokenomistAPI } from '@/services/tokenomist';

export const useTokenomicsData = (coinId: string) => {
  const [tokenAllocation, setTokenAllocation] = useState([]);
  const [vestingData, setVestingData] = useState([]);
  const [fundingData, setFundingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        setLoading(true);

        // 여러 소스에서 데이터 수집
        const [supplyData, allocationData, unlockData] = await Promise.all([
          TokenomicsAPI.getTokenSupply(coinId),
          TokenomistAPI.getAllocationData(coinId).catch(() => null),
          TokenomistAPI.getVestingSchedule(coinId).catch(() => null),
        ]);

        // 데이터 변환 및 설정
        if (allocationData) {
          const transformedAllocation = allocationData.allocations.map(
            (item, index) => ({
              name: item.allocationName,
              value: item.allocationAmount,
              percentage: item.trackedAllocationPercentage,
              color: getColorByIndex(index),
              description: item.standardAllocationName,
            }),
          );
          setTokenAllocation(transformedAllocation);
        }

        if (unlockData) {
          setVestingData(unlockData.unlockSchedule);
        }

        // 자금 흐름 데이터는 보통 API로 제공되지 않으므로
        // 화이트페이퍼나 공식 문서에서 수동으로 입력해야 함
      } catch (err) {
        setError('실제 토큰이코노믹스 데이터를 불러오는데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (coinId) {
      fetchRealData();
    }
  }, [coinId]);

  return { tokenAllocation, vestingData, fundingData, loading, error };
};
