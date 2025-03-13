import { z } from 'zod';

export const careTypeSchema = z.enum(['stationary', 'ambulatory', 'dayCare']);

export type CareType = z.infer<typeof careTypeSchema>;
