import React from 'react';

export const useDoubleClick = (
  onSingleClick: () => void,
  onDoubleClick: () => void,
  delay = 300
) => {
  const clickCount = React.useRef(0);
  const clickTimer = React.useRef<NodeJS.Timeout | null>(null);

  const handleClick = React.useCallback(() => {
    clickCount.current += 1;

    if (clickCount.current === 1) {
      clickTimer.current = setTimeout(() => {
        if (clickCount.current === 1) {
          onSingleClick();
        }
        clickCount.current = 0;
      }, delay);
    } else if (clickCount.current === 2) {
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
        clickTimer.current = null;
      }
      onDoubleClick();
      clickCount.current = 0;
    }
  }, [onSingleClick, onDoubleClick, delay]);

  return handleClick;
};