import { Box } from '@chakra-ui/react';

import RiseLoader from 'react-spinners/RiseLoader';

export const LoadingCard = () => {
  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      maxWidth={800}
      h={300}
      p={6}
      m="10px auto"
      flex={1}
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      <RiseLoader
        color={'#8c6ad3'}
        loading={true}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Box>
  );
};
