import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { CareType, MatchingRequest } from '@/pages/api/matchingRequest.dto';
import { MatchingResponse } from '@/pages/api/matchingResponse.dto';

import { submitMatchingForm } from '@/services/submitMultiForm';
import { getFormSchema } from '@/types/FormValidation';
import { View } from '@/types/ViewType';

type Params = {
  changeView: (view: View, object: MatchingResponse) => void;
};

export const useMultiForm = ({ changeView }: Params) => {
  const t = useTranslations();

  const [step, setStep] = useState(1);

  // form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    resolver: zodResolver(getFormSchema(step, t)),
    mode: 'onSubmit',
    defaultValues: {
      careType: 'stationary',
    },
  });

  // go to the next step or submit the form
  const handleNext = async () => {
    if (step < 3 && watch('careType') !== 'dayCare') {
      setStep(step + 1);
    } else if (step === 3 || watch('careType') === 'dayCare') {
      // this is the last step
      const careType = getValues('careType');

      if (!careType) return;

      const object: MatchingRequest = {
        careType: careType as CareType,
        firstName: getValues('firstName'),
        lastName: getValues('lastName'),
        zipCode: getValues('zipCode') ?? undefined,
      };
      const response = await submitMatchingForm(object);

      changeView('result', response); // change the view to the result page
    }
  };

  // go back to the previous step
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return {
    step,
    setStep,
    handleNext,
    handleBack,
    register,
    handleSubmit,
    errors,
    watch,
  };
};
