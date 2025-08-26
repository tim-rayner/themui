import { UserRole } from '@/lib/auth/types';
import { getSessionUser } from '@/lib/auth/utils';
import { redirect } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  fallback?: React.ReactNode;
}

export async function ProtectedRoute({
  children,
  requiredRole,
  fallback,
}: ProtectedRouteProps) {
  const user = await getSessionUser();

  if (!user) {
    redirect('/auth?authType=sign-in');
  }

  if (requiredRole) {
    const hasAccess = await checkUserAccess(user.role, requiredRole);

    if (!hasAccess) {
      if (fallback) {
        return <>{fallback}</>;
      }

      // Default fallback - redirect to upgrade page
      redirect('/upgrade');
    }
  }

  return <>{children}</>;
}

async function checkUserAccess(
  userRole: UserRole,
  requiredRole: UserRole
): Promise<boolean> {
  switch (requiredRole) {
    case 'FREE':
      return true; // All users have access to free content
    case 'PAID':
      return userRole === 'PAID' || userRole === 'BYOK';
    case 'BYOK':
      return userRole === 'BYOK';
    default:
      return false;
  }
}

// Convenience components for different access levels
export function PaidOnly({
  children,
  fallback,
}: Omit<ProtectedRouteProps, 'requiredRole'>) {
  return (
    <ProtectedRoute requiredRole="PAID" fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

export function ByokOnly({
  children,
  fallback,
}: Omit<ProtectedRouteProps, 'requiredRole'>) {
  return (
    <ProtectedRoute requiredRole="BYOK" fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}
