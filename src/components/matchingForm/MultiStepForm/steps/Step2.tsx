import { useTranslations } from 'next-intl';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from '@chakra-ui/react';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { FormType } from '@/types/FormValidation';

type Params = {
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
};

export const Step2 = ({ register, errors }: Params) => {
  const t = useTranslations();

  return (
    <FormControl isInvalid={!!errors.careType}>
      <FormLabel htmlFor="care-type" fontWeight={'bold'}>
        {t('Form.step2.typeOfCare')}
      </FormLabel>
      <Select
        id="care-type"
        {...register('careType')} // Register the field and validate on blur
      >
        <option value="stationary">{t('Form.step2.stationary')}</option>
        <option value="ambulatory">{t('Form.step2.dayCare')}</option>
        <option value="dayCare">{t('Form.step2.ambulatory')}</option>
      </Select>
      <FormErrorMessage>
        {errors.careType && errors.careType.message}
      </FormErrorMessage>
    </FormControl>
  );
};
