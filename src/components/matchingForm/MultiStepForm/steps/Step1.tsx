import { useTranslations } from 'next-intl';

import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { FormType } from '@/types/FormValidation';

type Params = {
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
};

export const Step1 = ({ register, errors }: Params) => {
  const t = useTranslations();

  return (
    <Flex>
      <FormControl mr="5%" isInvalid={!!errors.firstName}>
        <FormLabel htmlFor="first-name" fontWeight={'bold'}>
          {t('Form.step1.firstName')}
        </FormLabel>
        <Input
          id="first-name"
          placeholder={t('Form.step1.firstName')}
          {...register('firstName')}
        />
        <FormErrorMessage>
          {errors.firstName && errors.firstName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.lastName}>
        <FormLabel htmlFor="last-name" fontWeight={'bold'}>
          {t('Form.step1.lastName')}
        </FormLabel>
        <Input
          id="last-name"
          placeholder={t('Form.step1.lastName')}
          {...register('lastName')}
        />
        <FormErrorMessage>
          {errors.lastName && errors.lastName.message}
        </FormErrorMessage>
      </FormControl>
    </Flex>
  );
};
