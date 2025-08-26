import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  try {
    await supabase.auth.signOut();
  } catch {
    // ignore
  }

  const { origin } = new URL(request.url);
  const redirectUrl = new URL('/auth', origin);
  redirectUrl.searchParams.set('authType', 'sign-in');
  return NextResponse.redirect(redirectUrl.toString());
}
