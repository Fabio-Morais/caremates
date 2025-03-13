import { useTranslations } from 'next-intl';

import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';

type Props = {
  activeStep: number;
  careType: string;
};

export const FormStepper = ({ activeStep, careType }: Props) => {
  const t = useTranslations();

  const isDayCare = careType === 'dayCare';

  const steps = [
    { title: t('Form.step1.title'), description: t('Form.step1.description') },
    { title: t('Form.step2.title'), description: t('Form.step2.description') },
    {
      title: t('Form.step3.title'),
      description: t('Form.step3.description'),
      disabled: isDayCare,
    },
  ];

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Stepper
      index={activeStep}
      orientation={isMobile ? 'vertical' : 'horizontal'}
      width={isMobile ? '100%' : 'auto'}
    >
      {steps.map((step, index) => (
        <Tooltip
          label={step.disabled ? t('Form.step1.tooltip') : ''}
          hasArrow
          placement="top"
          key={index}
        >
          <Step>
            <StepIndicator opacity={step.disabled ? 0.3 : 1}>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle
                fontSize={{ base: 'sm', md: 'md' }}
                color={step.disabled ? 'gray.400' : undefined}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {step.title}
              </StepTitle>
              {!isMobile && (
                <StepDescription
                  fontSize={{ base: 'xs', md: 'sm' }}
                  color={step.disabled ? 'gray.400' : undefined}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="normal"
                  maxWidth="240px"
                >
                  {step.description}
                </StepDescription>
              )}
            </Box>

            {!isMobile && <StepSeparator />}
          </Step>
        </Tooltip>
      ))}
    </Stepper>
  );
};
