import { z } from 'zod';

import { careTypeSchema } from '@/types/CareType';

export const MatchingRequestSchema = z
  .object({
    firstName: z.string().min(1, { message: 'Patient name is required' }),
    lastName: z.string().min(1, { message: 'Patient name is required' }),
    careType: careTypeSchema,
    zipCode: z
      .string()
      .regex(/^\d{5}$/, { message: 'Zip code must be a 5-digit number' })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.careType !== 'dayCare') {
        return !!data.zipCode;
      }
      return true;
    },
    {
      message: 'Zip code is required when care type is not daycare',
      path: ['zipCode'],
    }
  );

export type MatchingRequest = z.infer<typeof MatchingRequestSchema>;
export type CareType = MatchingRequest['careType'];
