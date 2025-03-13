import { useTranslations } from 'next-intl';

import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';

type Params = {
  handleGoBackForm: () => void;
};

export const NotFound = ({ handleGoBackForm }: Params) => {
  const t = useTranslations();

  return (
    <>
      <Box alignItems={'center'} justifyContent={'center'} display={'flex'}>
        <Image src="/notFound.png" alt="placeholder" width={265} />
      </Box>

      <Heading as="h2" size="lg" textAlign="center" mt={6}>
        {t('Results.notFound.title')}
      </Heading>

      <Text size="md" textAlign="center" mt={2}>
        {t('Results.notFound.description')}
      </Text>

      <Button w="100%" colorScheme="blue" mt={6} onClick={handleGoBackForm}>
        {t('Results.notFound.button')}
      </Button>
    </>
  );
};
