"use client"

import { TOUR_STEPS } from '@/data/steps';
import React, { useState } from 'react';
import Joyride, { STATUS, Step } from 'react-joyride';

interface Props {
  run: boolean;
  setRun: (val: boolean) => void;
}

const ProductTour = ({ run, setRun }: Props) => {
  const [steps] = useState<Step[]>(TOUR_STEPS);

  const handleJoyrideCallback = (data: any) => {
    const { status, type } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton={false}
      callback={handleJoyrideCallback}
      
      styles={{
        options: {
          arrowColor: '#fff',
          backgroundColor: '#fff',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          primaryColor: '#171717',
          textColor: '#404040',    
          zIndex: 10000,
        },
        tooltipContainer: {
          textAlign: 'left',
          borderRadius: '24px',
          padding: '12px',
        },
        buttonNext: {
          backgroundColor: '#171717',
          borderRadius: '12px',
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: 'bold',
        },
        buttonBack: {
          marginRight: 10,
          fontSize: '14px',
          fontWeight: '600',
          color: '#737373',
        },
        buttonSkip: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#737373',
        }
      }}
    />
  );
};

export default ProductTour;