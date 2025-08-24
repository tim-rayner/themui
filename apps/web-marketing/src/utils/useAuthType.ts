import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type AuthType = 'sign-in' | 'sign-up';

export const useAuthType = () => {
  const searchParams = useSearchParams();
  const authType = useMemo(() => {
    return searchParams.get('authType') as AuthType;
  }, [searchParams]);
  return authType;
};
