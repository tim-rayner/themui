'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { SignInInput, SignUpInput } from './types';

const SignInActionSchema = z.object({
  email: z.string().email(),
  redirectTo: z.string().url().optional(),
  priceId: z.string().optional(),
  discountCode: z.string().optional(),
});

export async function signInWithMagicLink(input: SignInInput) {
  try {
    const validatedInput = SignInActionSchema.parse(input);
    const supabase = createClient();

    const redirectUrl = new URL(
      '/api/auth/callback',
      process.env.NEXT_PUBLIC_SITE_URL!
    );

    // Add custom parameters to redirect URL
    if (validatedInput.redirectTo) {
      redirectUrl.searchParams.set('redirectTo', validatedInput.redirectTo);
    }
    if (validatedInput.priceId) {
      redirectUrl.searchParams.set('priceId', validatedInput.priceId);
    }
    if (validatedInput.discountCode) {
      redirectUrl.searchParams.set('discountCode', validatedInput.discountCode);
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: validatedInput.email,
      options: {
        emailRedirectTo: redirectUrl.toString(),
      },
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: 'Invalid input data' };
    }
    return { error: 'An unexpected error occurred' };
  }
}

export async function signUpWithMagicLink(input: SignUpInput) {
  // For magic links, sign up and sign in are the same
  return signInWithMagicLink(input);
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/auth/signin');
}

export async function updateUserRole(
  userId: string,
  role: 'FREE' | 'PAID' | 'BYOK'
) {
  const supabase = createClient();

  const { error } = await supabase
    .from('user_profiles')
    .update({ role })
    .eq('id', userId);

  if (error) {
    throw new Error(`Failed to update user role: ${error.message}`);
  }

  return { success: true };
}
