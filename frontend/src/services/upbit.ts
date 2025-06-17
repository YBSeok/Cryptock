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
};
