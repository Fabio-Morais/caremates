import { useTranslations } from 'next-intl';
import { withMask } from 'use-mask-input';

import {
  Box,
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

export const Step3 = ({ register, errors }: Params) => {
  const t = useTranslations();

  const registerProps = register('zipCode');

  const combinedRef = (element: HTMLInputElement | null) => {
    if (registerProps.ref) {
      registerProps.ref(element);
    }

    if (element) {
      withMask('99999')(element);
    }
  };

  return (
    <FormControl isInvalid={!!errors.zipCode}>
      <Flex align="center">
        <Box flex="1">
          <FormLabel htmlFor="zip-code" fontWeight={'bold'}>
            {t('Form.step3.title')}
          </FormLabel>
          <Input
            id="zip-code"
            placeholder="10000"
            {...registerProps}
            ref={combinedRef}
          />
          {errors.zipCode && (
            <FormErrorMessage>
              {errors.zipCode.message?.toString()}
            </FormErrorMessage>
          )}
        </Box>
      </Flex>
    </FormControl>
  );
};
