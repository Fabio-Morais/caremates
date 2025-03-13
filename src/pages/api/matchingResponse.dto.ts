import { z } from 'zod';

import { FacilityMatchSchema } from '@/types/Facility';

export const CapacitySchema = z.enum(['Full', 'Available']);
export const CareTypeRequestSchema = z.enum([
  'stationary',
  'ambulatory',
  'dayCare',
]);
export const FacilityTypeSchema = z.enum([
  'Stationary',
  'Ambulatory',
  'Stationary & Ambulatory',
]);

export type Capacity = z.infer<typeof CapacitySchema>;
export type CareTypeRequest = z.infer<typeof CareTypeRequestSchema>;
export type FacilityType = z.infer<typeof FacilityTypeSchema>;

export const FacilitySchema = z.object({
  name: z.string(),
  type: FacilityTypeSchema,
  servesZipCodes: z.tuple([
    z.number().int().min(10000).max(99999),
    z.number().int().min(10000).max(99999),
  ]),
  zipCode: z.number().int().min(10000).max(99999),
  capacity: CapacitySchema,
});
export type Facility = z.infer<typeof FacilitySchema>;

// Response schema
export const MatchingResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  match: FacilityMatchSchema.optional(),
});
export type MatchingResponse = z.infer<typeof MatchingResponseSchema>;
