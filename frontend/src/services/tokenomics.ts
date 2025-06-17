import { axiosInstance } from './index';

export const TokenomicsAPI = {
  // CoinGecko의 토큰이코노믹스 데이터 조회
  async getTokenomicsData(coinId: string) {
    // 참고: CoinGecko의 토큰이코노믹스 API는 유료 플랜에서만 제공될 수 있음
    const response = await axiosInstance.get(`/coins/${coinId}/tokenomics`, {
      baseURL: 'https://api.coingecko.com/api/v3',
    });
    return response.data;
  },

  // 토큰 공급량 정보 조회
  async getTokenSupply(coinId: string) {
    const response = await axiosInstance.get(`/coins/${coinId}`, {
      baseURL: 'https://api.coingecko.com/api/v3',
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
      },
    });
    return {
      totalSupply: response.data.market_data.total_supply,
      circulatingSupply: response.data.market_data.circulating_supply,
      maxSupply: response.data.market_data.max_supply,
    };
  },
};
