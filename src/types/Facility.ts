import { z } from 'zod';

export const FacilityMatchSchema = z.object({
  name: z.string(),
  type: z.string().array(),
  zipCode: z.number(),
  distance: z.number().optional(),
});
export type FacilityMatch = z.infer<typeof FacilityMatchSchema>;
