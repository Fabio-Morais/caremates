import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';

import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { FormType } from '@/types/FormValidation';

type Props = {
  step: number;
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
  watch: UseFormWatch<FormType>;
};

export const StepsFormRender = ({ step, register, errors, watch }: Props) => {
  const skipStep3 = watch('careType') === 'dayCare';

  return (
    <>
      {step === 1 && <Step1 register={register} errors={errors} />}
      {step === 2 && <Step2 register={register} errors={errors} />}
      {step === 3 && !skipStep3 && (
        <Step3 register={register} errors={errors} />
      )}
    </>
  );
};
