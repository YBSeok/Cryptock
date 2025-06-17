import { axiosInstance } from './index';

export const UpbitAPI = {
  async getKRWMarkets() {
    const res = await axiosInstance.get('/v1/market/all', {
      params: { isDetails: true },
      baseURL: 'https://api.upbit.com',
    });
    return res.data.filter((m: any) => m.market.startsWith('KRW-'));
  },

  async getTickers(marketCodes: string[]) {
    const res = await axiosInstance.get('/v1/ticker', {
      params: { markets: marketCodes.join(',') },
      baseURL: 'https://api.upbit.com',
    });
    return res.data;
  },

  async getCoinDetail(market: string) {
    const res = await axiosInstance.get('/v1/ticker', {
      params: { markets: market },
      baseURL: 'https://api.upbit.com',
    });
    return res.data[0];
  },

  async getCandles(
    market: string,
    type: 'minutes' | 'days' | 'weeks' | 'months' = 'days',
    count: number = 200,
  ) {
    let endpoint = '/v1/candles/days';
    if (type === 'minutes') endpoint = '/v1/candles/minutes/60';
    else if (type === 'weeks') endpoint = '/v1/candles/weeks';
    else if (type === 'months') endpoint = '/v1/candles/months';

    const res = await axiosInstance.get(endpoint, {
      params: { market, count },
      baseURL: 'https://api.upbit.com',
    });
    return res.data;
  },

  async getOrderbook(market: string) {
    const res = await axiosInstance.get('/v1/orderbook', {
      params: { markets: market },
      baseURL: 'https://api.upbit.com',
    });
    return res.data[0];
  },
};
