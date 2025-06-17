import { useEffect, useState } from 'react';
import { UpbitAPI } from '@/services/upbit';

type CoinDetail = {
  market: string;
  korean_name: string;
  trade_price: number;
  change_rate: number;
  change_price: number;
  high_price: number;
  low_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume_24h: number;
  prev_closing_price: number;
  opening_price: number;
  highest_52_week_price: number;
  lowest_52_week_price: number;
  market_cap?: number;
};

type CandleData = {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
};

type OrderbookData = {
  market: string;
  orderbook_units: Array<{
    ask_price: number;
    bid_price: number;
    ask_size: number;
    bid_size: number;
  }>;
};

export const useUpbitCoinDetail = (coinId: string) => {
  const [coinDetail, setCoinDetail] = useState<CoinDetail | null>(null);
  const [candleData, setCandleData] = useState<CandleData[]>([]);
  const [orderbook, setOrderbook] = useState<OrderbookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!coinId) return;

    const fetchCoinData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 기본 시세 정보, 캔들 데이터, 호가 정보를 병렬로 가져오기
        const [ticker, candles, orderbookData] = await Promise.all([
          UpbitAPI.getCoinDetail(coinId),
          UpbitAPI.getCandles(coinId, 'days', 30),
          UpbitAPI.getOrderbook(coinId),
        ]);

        // 마켓 정보도 가져와서 한글명 매칭
        const markets = await UpbitAPI.getKRWMarkets();
        const marketInfo = markets.find((m: any) => m.market === coinId);

        setCoinDetail({
          ...ticker,
          korean_name: marketInfo?.korean_name || coinId,
        });
        setCandleData(candles);
        setOrderbook(orderbookData);
      } catch (err) {
        setError('코인 정보를 불러오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId]);

  return { coinDetail, candleData, orderbook, loading, error };
};
