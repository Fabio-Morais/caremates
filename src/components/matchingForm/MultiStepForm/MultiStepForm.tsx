import { FormView } from '../FormView/FormView';
import { ResultView } from '../ResultView';

import { LoadingCard } from '@/components/common/LoadingCard';

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

  const changeView = (view: View, object: MatchingResponse) => {
    setIsLoading(true);

    //simulate api delay
    setTimeout(() => {
      setViewState({ view, result: object });
      setIsLoading(false);
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

  if (isLoading) {
    return <LoadingCard />;
  }

  if (viewState.view === 'form') {
    return (
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
    );
  }

  if (viewState.view === 'result') {
    return (
      <ResultView
        handleGoBackForm={() => setViewState({ view: 'form', result: null })}
        viewState={viewState}
      />
    );
  }
};
