import { z } from 'zod';

export const ValidatorUserInput = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  birthDate: z.string().transform((str) => {
    const [day, month, year] = str.split('/');
    return new Date(`${day}-${month}-${year}`);
  }),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
  confirmPassword: z
    .string()
    .min(6, 'Password confirmation must be equal of password.'),
});
