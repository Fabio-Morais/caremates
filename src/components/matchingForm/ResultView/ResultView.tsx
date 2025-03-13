import { Found } from './Found';
import { NotFound } from './NotFound';
import { StatusCodes } from 'http-status-codes';

import { Box } from '@chakra-ui/react';

import { ViewState } from '@/types/ViewType';

type Params = {
  viewState: ViewState;
  handleGoBackForm: () => void;
};

export const ResultView = ({ viewState, handleGoBackForm }: Params) => {
  console.log(viewState.result?.status);
  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      maxWidth={800}
      p={8}
      m="10px auto"
      pr={12}
      pl={12}
    >
      {viewState.result?.status === StatusCodes.OK && (
        <Found result={viewState.result} />
      )}

      {viewState.result?.status === StatusCodes.NOT_FOUND && (
        <NotFound handleGoBackForm={handleGoBackForm} />
      )}
    </Box>
  );
};
