import { z } from 'zod';

export const UserRoleSchema = z.enum(['FREE', 'PAID', 'BYOK']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: UserRoleSchema.default('FREE'),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

export const AuthStateSchema = z.object({
  user: UserProfileSchema.nullable(),
  loading: z.boolean(),
  error: z.string().nullable(),
});

export type AuthState = z.infer<typeof AuthStateSchema>;

export const SignInSchema = z.object({
  email: z.string().email(),
  redirectTo: z.string().url().optional(),
  priceId: z.string().optional(),
  discountCode: z.string().optional(),
});

export type SignInInput = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  email: z.string().email(),
  redirectTo: z.string().url().optional(),
  priceId: z.string().optional(),
  discountCode: z.string().optional(),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
