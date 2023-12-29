import { z } from 'zod';

export const ValidatorEventInput = z.object({
  description: z.string().min(1, 'Description is required'),
  dayOfWeek: z.string().min(1, 'Day of week is required'),
  userId: z.string().min(1, 'User ID is required'),
});
