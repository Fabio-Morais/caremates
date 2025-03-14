import { FormView } from '../FormView/FormView';
import { ResultView } from '../ResultView';

import { LoadingCard } from '@/components/common/LoadingCard';

import { Box } from '@chakra-ui/react';

import { useState } from 'react';

import { MatchingResponse } from '@/pages/api/matchingResponse.dto';

import { useMultiForm } from '@/hooks/useMultiForm';

import { View, ViewState } from '@/types/ViewType';

export const MultiStepForm = () => {
  const [viewState, setViewState] = useState<ViewState>({
    view: 'form',
    result: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false); // for smooth transitions

  // Handle view changes with proper transition states
  const changeView = (view: View, object: MatchingResponse) => {
    setTransitioning(true);
    setIsLoading(true);

    // Simulate api delay
    setTimeout(() => {
      setIsLoading(false);
      setViewState({ view, result: object });

      setTimeout(() => {
        setTransitioning(false);
      }, 50);
    }, 1000);
  };

  // Logic for handling form steps
  const {
    step,
    setStep,
    handleNext,
    handleBack,
    register,
    handleSubmit,
    watch,
    errors,
  } = useMultiForm({ changeView });

  // Handle going back to form
  const handleGoBackForm = () => {
    setViewState({ view: 'form', result: null });
  };

  return (
    <Box position="relative">
      {isLoading && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="10"
          opacity="1"
          transition="opacity 0.2s ease-in-out"
        >
          <LoadingCard />
        </Box>
      )}

      <Box
        display={viewState.view === 'form' ? 'block' : 'none'}
        opacity={viewState.view === 'form' && !transitioning ? 1 : 0}
        transition="opacity 0.2s ease-in-out"
      >
        <FormView
          step={step}
          setStep={setStep}
          handleNext={handleNext}
          handleBack={handleBack}
          watch={watch}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      </Box>

      {/* Result View - Keep in DOM but control visibility */}
      <Box
        display={viewState.view === 'result' ? 'block' : 'none'}
        opacity={viewState.view === 'result' && !transitioning ? 1 : 0}
        transition="opacity 0.2s ease-in-out"
      >
        <ResultView handleGoBackForm={handleGoBackForm} viewState={viewState} />
      </Box>
    </Box>
  );
};
