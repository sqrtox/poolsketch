import axiosStatic, { type AxiosInstance } from 'axios';
import UserAgent from 'user-agents';

const createAxiosInstance = (): AxiosInstance => {
  const userAgent = new UserAgent([
    /Chrome/,
    {
      deviceCategory: 'desktop',
      platform: 'Win32'
    }
  ]);
  const axios = axiosStatic.create({
    headers: {
      'User-Agent': userAgent.toString()
    }
  });

  return axios;
};

export { createAxiosInstance };
