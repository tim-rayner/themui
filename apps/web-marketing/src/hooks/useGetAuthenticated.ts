'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export type AuthStatus = {
  isAuthenticated: boolean;
  email?: string;
  userId?: string;
};

export function useGetAuthenticated(): AuthStatus {
  const [status, setStatus] = useState<AuthStatus>({ isAuthenticated: false });

  useEffect(() => {
    const supabase = createClient();

    let isMounted = true;

    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!isMounted) return;
      if (user) {
        setStatus({
          isAuthenticated: true,
          email: user.email ?? undefined,
          userId: user.id,
        });
      } else {
        setStatus({ isAuthenticated: false });
      }
    };

    load();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      if (session?.user) {
        setStatus({
          isAuthenticated: true,
          email: session.user.email ?? undefined,
          userId: session.user.id,
        });
      } else {
        setStatus({ isAuthenticated: false });
      }
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return status;
}
