import { FormStepper } from '../FormStepper';
import { StepsFormRender } from '../MultiStepForm/steps/StepsFormRender';

import { FormButtons } from '@/components/common/FormButtons';

import { Box } from '@chakra-ui/react';

import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

import { FormType } from '@/types/FormValidation';

interface FormViewProps {
  step: number;

  setStep: (step: number) => void;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: UseFormHandleSubmit<FormType>;
  watch: UseFormWatch<FormType>;
  register: UseFormRegister<FormType>;

  errors: FieldErrors<FormType>;
}

export const FormView = ({
  step,
  handleSubmit,
  handleNext,
  handleBack,
  watch,
  register,
  errors,
}: FormViewProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && Object.keys(errors).length === 0) {
      handleNext();
    }
  };

  const isFinalStep = step === 3 || watch('careType') === 'dayCare';

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      maxWidth={800}
      p={6}
      m="10px auto"
      as="form"
      onKeyDown={handleKeyDown}
    >
      <FormStepper activeStep={step} careType={watch('careType') ?? ''} />

      <Box mt="24px">
        <StepsFormRender
          step={step}
          register={register}
          errors={errors}
          watch={watch}
        />
      </Box>

      <FormButtons
        step={step}
        handleBack={handleBack}
        handleNext={handleNext}
        isFinalStep={isFinalStep}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};
