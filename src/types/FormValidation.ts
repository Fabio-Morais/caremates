import { z } from 'zod';

export const getFormSchema = (
  currentStep: number,
  t: (key: string) => string
) => {
  return z
    .object({
      // Step 1 fields
      firstName:
        currentStep === 1
          ? z.string().min(3, t('Form.step1.firstNameError'))
          : z.string(),
      lastName:
        currentStep === 1
          ? z.string().min(1, t('Form.step1.lastNameError'))
          : z.string(),

      // Step 2 fields
      careType:
        currentStep >= 2
          ? z.enum(['stationary', 'ambulatory', 'dayCare'], {
              required_error: t('Form.step2.error'),
            })
          : z.enum(['stationary', 'ambulatory', 'dayCare']).optional(),

      // Step 3 fields
      zipCode: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (currentStep === 3 && data.careType !== 'dayCare') {
        if (!data.zipCode) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['zipCode'],
            message: t('Form.step3.error'),
          });
        } else if (!/^\d{5}$/.test(data.zipCode)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['zipCode'],
            message: t('Form.step3.error'),
          });
        }
      }
    });
};

export type FormType = z.infer<ReturnType<typeof getFormSchema>>;
