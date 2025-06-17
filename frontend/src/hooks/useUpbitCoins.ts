import { useEffect, useState } from 'react';
import { UpbitAPI } from '@/services/upbit';

type Coin = {
  market: string;
  korean_name: string;
  trade_price: number;
  change_rate: number;
  acc_trade_price_24h: number;
};

export const useUpbitCoins = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCoins = async () => {
      try {
        setLoading(true);
        setError(null);
        // 1. KRW 마켓 전체 조회
        const krwMarkets = await UpbitAPI.getKRWMarkets();
        // 2. 100개씩 분할
        const chunkSize = 100;
        const marketChunks = [];
        for (let i = 0; i < krwMarkets.length; i += chunkSize) {
          marketChunks.push(krwMarkets.slice(i, i + chunkSize));
        }
        // 3. 모든 티커 데이터 병합
        const pricesArr = await Promise.all(
          marketChunks.map((chunk) =>
            UpbitAPI.getTickers(chunk.map((m: any) => m.market)),
          ),
        );
        const prices = pricesArr.flat();
        // 4. 마켓 정보와 매칭
        const coinList: Coin[] = prices.map((price: any) => {
          const marketInfo = krwMarkets.find(
            (m: any) => m.market === price.market,
          );
          return {
            market: price.market,
            korean_name: marketInfo?.korean_name || price.market,
            trade_price: price.trade_price,
            change_rate: price.signed_change_rate,
            acc_trade_price_24h: price.acc_trade_price_24h,
          };
        });
        if (isMounted) setCoins(coinList);
      } catch (err) {
        setError('업비트 API 호출 중 오류가 발생했습니다.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchCoins();
    return () => {
      isMounted = false;
    };
  }, []);

  return { coins, loading, error };
};
