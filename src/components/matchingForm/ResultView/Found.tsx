import { ModalLocation } from './ModalLocation';
import { useTranslations } from 'next-intl';

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { FaMapMarkerAlt } from 'react-icons/fa';

import { MatchingResponse } from '@/pages/api/matchingResponse.dto';

type Params = {
  result: MatchingResponse;
};

export const Found = ({ result }: Params) => {
  const t = useTranslations();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box alignItems={'center'} justifyContent={'center'} display={'flex'}>
        <Image src="/found.jpg" alt="placeholder" width={265} />
      </Box>
      <Heading as="h2" size="lg" textAlign="center" mt={6}>
        {t('Results.found.title', { name: result?.match?.name ?? 'Facility' })}
      </Heading>
      <Flex justifyContent="center" alignItems="center" mt={3} mb={4}>
        <Badge
          colorScheme="teal"
          fontSize="md"
          px={3}
          py={1}
          borderRadius="full"
          display="flex"
          alignItems="center"
        >
          <Icon as={FaMapMarkerAlt} mr={2} />
          {result?.match?.zipCode || 'No ZIP code available'}
        </Badge>
      </Flex>
      <Text textAlign="center" fontSize="md" color="gray.600">
        {t('Results.found.description')}
      </Text>

      <Flex justifyContent="center" mt={6}>
        <Button
          colorScheme="teal"
          variant="outline"
          size="sm"
          w="100%"
          leftIcon={<FaMapMarkerAlt />}
          onClick={onOpen}
          loadingText="Checking location"
        >
          {t('Results.found.checkLocation')}
        </Button>
      </Flex>

      <ModalLocation
        isOpen={isOpen}
        onClose={onClose}
        zipCode={result?.match?.zipCode.toString() ?? '1000'}
      />
    </>
  );
};
