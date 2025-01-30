import { RefObject, useEffect, useState } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

export function useDimensions(
  ref?: RefObject<HTMLElement | SVGElement | null>,
): Dimensions {
  if (!ref) {
    return { width: 0, height: 0 };
  }
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    const debouncedUpdateDimensions = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 250);
    };

    updateDimensions();

    window.addEventListener('resize', debouncedUpdateDimensions);

    return () => {
      window.removeEventListener('resize', debouncedUpdateDimensions);
      clearTimeout(timeoutId);
    };
  }, [ref]);

  return dimensions;
}
