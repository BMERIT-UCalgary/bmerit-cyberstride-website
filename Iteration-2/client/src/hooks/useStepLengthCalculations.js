import { useState, useEffect } from 'react';

export function useStepLengthCalculation(distance, totalSteps) {
  const [stepLength, setStepLength] = useState(0);

  // Calculate step length whenever distance or totalSteps changes
  useEffect(() => {
    if (totalSteps > 0) {
      // Distance divided by total steps (each step has two foot strikes)
      const calculatedStepLength = distance / (2 * totalSteps);
      setStepLength(calculatedStepLength);
    } else {
      setStepLength(0);
    }
    console.log("Effect triggered with distance:", distance, "totalSteps:", totalSteps);
  }, [distance, totalSteps]);

  return {
    stepLength
  };
}
