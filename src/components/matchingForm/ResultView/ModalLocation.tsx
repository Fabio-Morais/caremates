import { useTranslations } from 'next-intl';

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import { useCallback, useLayoutEffect, useState } from 'react';
import { FaExternalLinkAlt, FaMapMarkerAlt } from 'react-icons/fa';

type Params = {
  isOpen: boolean;
  onClose: () => void;
  zipCode: string;
};

export const ModalLocation = ({ zipCode, isOpen, onClose }: Params) => {
  const t = useTranslations();

  const [locationInfo, setLocationInfo] = useState<{
    city?: string;
    state?: string;
  } | null>(null);

  // Simulate a location check based on the postal code
  const checkPostalCode = useCallback(() => {
    let mockLocationInfo;

    if (
      zipCode.startsWith('10') ||
      zipCode.startsWith('12') ||
      zipCode.startsWith('13')
    ) {
      mockLocationInfo = { city: 'Berlin', state: 'Berlin' };
    } else if (zipCode.startsWith('14') || zipCode.startsWith('15')) {
      mockLocationInfo = { city: 'Hamburg', state: 'Hamburg' };
    } else if (zipCode.startsWith('16') || zipCode.startsWith('17')) {
      mockLocationInfo = { city: 'Köln', state: 'Nordrhein-Westfalen' };
    } else if (
      zipCode.startsWith('18') ||
      zipCode.startsWith('19') ||
      zipCode.startsWith('20') ||
      zipCode.startsWith('21')
    ) {
      mockLocationInfo = { city: 'München', state: 'Bayern' };
    } else {
      //choose a default city and state
      mockLocationInfo = { city: 'Frankfurt', state: 'Hessen' };
    }

    setLocationInfo(mockLocationInfo);
  }, [zipCode]);

  // Generate a Google Maps URL based on the location
  const getMapUrl = () => {
    return `https://www.google.com/maps/search/?api=1&query=${locationInfo?.city}+Germany`;
  };

  // Check the postal code on component mount
  useLayoutEffect(() => {
    checkPostalCode();
  }, [checkPostalCode]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('Results.found.modal.title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {locationInfo && (
            <Box>
              <Flex alignItems="center" mb={3}>
                <Icon as={FaMapMarkerAlt} color="teal.500" mr={2} boxSize={5} />
                <Heading size="md">{locationInfo.city}</Heading>
              </Flex>

              <Text fontSize="md" mb={3}>
                <strong>{t('Results.found.modal.state')}</strong>{' '}
                {locationInfo.state}
              </Text>

              <Text fontSize="md" mb={3}>
                <strong>{t('Results.found.modal.zip')}</strong> {zipCode}
              </Text>

              <Text fontSize="md" mb={4}>
                <strong>{t('Results.found.modal.Country')}</strong> Germany
              </Text>

              <Link href={getMapUrl()} isExternal color="teal.500">
                <Button
                  rightIcon={<FaExternalLinkAlt />}
                  colorScheme="teal"
                  width="full"
                >
                  {t('Results.found.modal.googleMaps')}
                </Button>
              </Link>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
