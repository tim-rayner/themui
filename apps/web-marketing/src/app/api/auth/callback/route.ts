import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  // Get custom parameters
  const redirectTo = searchParams.get('redirectTo');
  const priceId = searchParams.get('priceId');
  const discountCode = searchParams.get('discountCode');

  if (code) {
    const supabase = createClient();

    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(
        `${origin}/auth/signin?error=Authentication failed`
      );
    }

    if (data.user) {
      // Handle custom logic based on parameters
      if (priceId) {
        // Redirect to checkout with price ID
        const checkoutUrl = new URL('/checkout', origin);
        checkoutUrl.searchParams.set('priceId', priceId);
        if (discountCode) {
          checkoutUrl.searchParams.set('discountCode', discountCode);
        }
        return NextResponse.redirect(checkoutUrl.toString());
      }

      if (redirectTo) {
        // Redirect to custom URL
        return NextResponse.redirect(redirectTo);
      }

      // Default redirect
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(
    `${origin}/auth/signin?error=Authentication failed`
  );
}
