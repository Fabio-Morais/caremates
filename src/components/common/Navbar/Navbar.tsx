import { ChangeLocale } from '../ChangeLocale';

import { Box, Flex, Image } from '@chakra-ui/react';

export const Navbar = () => {
  return (
    <Box>
      <Flex
        bg="white"
        color="gray.600"
        minH="60px"
        py={2}
        px={4}
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.200"
        align="center"
      >
        {/* Logo */}
        <Flex flex={1} justify="start">
          <Image src="/carematesLogo.png" alt="Caremates Logo" h="40px" />
        </Flex>

        {/* Button */}
        <ChangeLocale />
      </Flex>
    </Box>
  );
};
