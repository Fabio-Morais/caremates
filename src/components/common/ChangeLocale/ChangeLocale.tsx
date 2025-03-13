import { useRouter } from 'next/router';

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';

export const ChangeLocale = () => {
  const router = useRouter();
  const { locale: currentLocale } = router;

  const getFlag = (locale: string | undefined) =>
    locale === 'de' ? '🇩🇪' : '🇬🇧';

  const [selectedCountry, setSelectedCountry] = useState(
    getFlag(currentLocale)
  );

  // Update selected country whenever locale changes
  useEffect(() => {
    setSelectedCountry(getFlag(currentLocale));
  }, [currentLocale]);

  const handleChangeLocale = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="white"
        color="gray.700"
        border="1px solid"
        borderColor="gray.300"
        _hover={{ bg: 'gray.100' }}
        _focus={{ boxShadow: 'outline' }}
      >
        <Flex
          flexDirection="row"
          gap="8px"
          alignItems="center"
          justifyContent="center"
        >
          {selectedCountry}
          <ChevronDownIcon boxSize="5" />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => handleChangeLocale('de')}
          bgColor={currentLocale === 'de' ? 'gray.100' : undefined}
        >
          <Box as="span" mr={2}>
            🇩🇪
          </Box>
          <Text as="span">Germany</Text>
          {currentLocale === 'de' && (
            <Box as="span" ml="auto">
              ✓
            </Box>
          )}
        </MenuItem>
        <MenuItem
          onClick={() => handleChangeLocale('en')}
          bgColor={currentLocale === 'en' ? 'gray.100' : undefined}
        >
          <Box as="span" mr={2}>
            🇬🇧
          </Box>
          <Text as="span">English</Text>
          {currentLocale === 'en' && (
            <Box as="span" ml="auto">
              ✓
            </Box>
          )}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
