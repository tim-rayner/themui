import { createClient } from '@/lib/supabase/server';
import { UserProfile, UserRole } from './types';

export async function getSessionUser(): Promise<UserProfile | null> {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    // Get user profile from our custom table
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      // Create profile if it doesn't exist
      const { data: newProfile, error: createError } = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          email: user.email!,
          role: 'FREE' as UserRole,
        })
        .select()
        .single();

      if (createError || !newProfile) {
        console.error('Failed to create user profile:', createError);
        return null;
      }

      return newProfile as UserProfile;
    }

    return profile as UserProfile;
  } catch (error) {
    console.error('Error getting session user:', error);
    return null;
  }
}

export async function getUserRole(): Promise<UserRole | null> {
  const user = await getSessionUser();
  return user?.role || null;
}

export async function isUserPaid(): Promise<boolean> {
  const role = await getUserRole();
  return role === 'PAID' || role === 'BYOK';
}

export async function isUserFree(): Promise<boolean> {
  const role = await getUserRole();
  return role === 'FREE';
}

export async function isUserByok(): Promise<boolean> {
  const role = await getUserRole();
  return role === 'BYOK';
}
