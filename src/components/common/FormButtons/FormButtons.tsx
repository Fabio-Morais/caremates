import { useTranslations } from 'next-intl';

import { Button, ButtonGroup, Flex } from '@chakra-ui/react';

type Params = {
  step: number;
  isFinalStep: boolean;
  handleBack: () => void;
  handleNext: () => void;
  handleSubmit: (cb: () => void) => () => void;
};

export const FormButtons = ({
  step,
  isFinalStep,
  handleBack,
  handleNext,
  handleSubmit,
}: Params) => {
  const t = useTranslations();

  return (
    <ButtonGroup mt="32px" w="100%">
      <Flex w="100%" justifyContent="space-between">
        <Flex>
          <Button
            onClick={handleBack}
            isDisabled={step === 1}
            colorScheme="teal"
            variant="solid"
            w="7rem"
            mr="5%"
          >
            {t('Form.back')}
          </Button>
          <Button
            w="7rem"
            onClick={handleSubmit(handleNext)}
            colorScheme={isFinalStep ? 'red' : 'teal'}
            variant={isFinalStep ? 'solid' : 'outline'}
          >
            {isFinalStep ? t('Form.submit') : t('Form.next')}
          </Button>
        </Flex>
      </Flex>
    </ButtonGroup>
  );
};
