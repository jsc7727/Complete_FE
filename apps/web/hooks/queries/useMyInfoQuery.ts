import { MyUserInfo } from '@/types/userInfo';
import { api } from '@/utils/api';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

const myInfoFetcher = async () => {
  const response = await api.get(`users`).json();
  return response;
};

export const useMyInfoQuery = (
  isLogin: boolean = true,
): UseQueryResult<MyUserInfo, Error> => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: myInfoFetcher,
    staleTime: 60 * 1000 * 24,
    gcTime: Infinity,
    enabled: isLogin,
  });
};
