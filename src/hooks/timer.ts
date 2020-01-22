import { useState, useRef, useEffect } from 'react';
import { Timer } from 'easytimer.js';

export default function useTimer(minutes: number) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [expired, setExpired] = useState<boolean>(false);

  const setTimeRemainingText = (t: Timer) =>
    setTimeRemaining(t.getTimeValues().toString());

  const timer = useRef<Timer>(
    new Timer({
      countdown: true,
      startValues: { minutes },
      precision: 'seconds',
      callback: t => {
        setTimeRemainingText(t);
      }
    })
  );

  useEffect(() => {
    timer.current.start();
    setTimeRemainingText(timer.current);
  }, []);

  useEffect(() => {
    if (timeRemaining === '00:00:01') {
      setExpired(true);
    }
  }, [timeRemaining]);

  const start = () => timer.current.start();
  const pause = () => timer.current.pause();

  return { timeRemaining, expired, start, pause };
}
