import { axiosInstance } from './index';

export const TokenomistAPI = {
  async getAllocationData(tokenId: string) {
    const response = await axiosInstance.get(`/allocations/${tokenId}`, {
      baseURL: 'https://api.tokenomist.ai',
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_TOKENOMIST_API_KEY,
      },
    });
    return response.data;
  },

  async getVestingSchedule(tokenId: string) {
    const response = await axiosInstance.get(`/unlocks/${tokenId}`, {
      baseURL: 'https://api.tokenomist.ai',
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_TOKENOMIST_API_KEY,
      },
    });
    return response.data;
  },
};
