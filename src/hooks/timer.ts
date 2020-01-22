import { useState, useRef } from 'react';
import { Timer } from 'easytimer.js';

export default function useTimer(minutes: number) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  const timer = useRef<Timer>(
    new Timer({
      countdown: true,
      startValues: { minutes },
      precision: 'seconds',
      callback: t => {
        setTimeRemaining(timer.current.getTimeValues().toString());
      }
    })
  );

  timer.current.start();

  const start = () => timer.current.start();
  const pause = () => timer.current.pause();

  return { timeRemaining, start, pause };
}
