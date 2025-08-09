import { memo, useCallback, useEffect, useRef, useState, useMemo } from "react";

interface TimerDisplayProps {
  onTimerEnd?: () => void;
  initialTime?: number;
  resetTrigger?: number; // Used to reset timer externally
}

function TimerDisplayComponent({ onTimerEnd, initialTime = 180, resetTrigger }: TimerDisplayProps) {
  const [timer, setTimer] = useState(initialTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(
    (time: number) => {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setTimer(time);

      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            onTimerEnd?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [onTimerEnd]
  );

  // Format timer display using useMemo to prevent recalculation
  const formattedTimer = useMemo(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return timer > 0 ? `${minutes}:${seconds.toString().padStart(2, "0")}` : "";
  }, [timer]);

  // Timer display text using useMemo
  const timerText = useMemo(() => {
    if (timer > 0) {
      return `Didn't receive the code? Resend available in ${formattedTimer}`;
    }
    return "Didn't receive the code?";
  }, [timer, formattedTimer]);

  useEffect(() => {
    startTimer(initialTime);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startTimer, initialTime]);

  // Reset timer when resetTrigger changes
  useEffect(() => {
    if (resetTrigger !== undefined && resetTrigger > 0) {
      startTimer(initialTime);
    }
  }, [resetTrigger, startTimer, initialTime]);

  return <div className="text-sm text-muted-foreground">{timerText}</div>;
}

// Memoize the component to prevent unnecessary re-renders
export default memo(TimerDisplayComponent);

// Export timer value and reset function for parent component use
export { TimerDisplayComponent };
