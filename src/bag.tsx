import * as React from 'react';
import { cloneElement, FC, useEffect, useMemo, useState } from 'react';
import { useNotifier } from './context';
import Timer from './Timer';

export const NotificationBag: FC<{
  position?: string;
  duration?: number;
  max?: number;
  onDismiss?: (id: string) => void;
}> = ({ position = 'default', duration = 0, max = null, onDismiss }) => {
  const { notifications, dismiss } = useNotifier();
  const bag = notifications[position] ?? [];

  const displayedNotifications = useMemo(() => {
    return max ? bag.slice(Math.max(bag.length - max, 0)) : bag;
  }, [bag, max]);

  return (
    <>
      {displayedNotifications.map(({ id, children }) => (
        <NotificationWrapper
          key={id}
          duration={duration}
          dismiss={dismiss}
          onDismiss={onDismiss}
          id={id}
        >
          {children}
        </NotificationWrapper>
      ))}
    </>
  );
};

function NotificationWrapper({ children, duration, dismiss, onDismiss, id }) {
  const timer = useMemo(
    () =>
      new Timer(async () => {
        if (onDismiss) await onDismiss(id);
        dismiss(id);
      }, duration),
    [duration, id, dismiss, onDismiss],
  );
  const [running, setRunning] = useState(true);

  useEffect(() => {
    return () => timer.clear();
  }, [timer]);

  useEffect(() => {
    running ? timer.resume() : timer.pause();
  }, [running, timer]);

  return (
    <div
      onMouseEnter={() => setRunning(false)}
      onMouseLeave={() => setRunning(true)}
    >
      {cloneElement(children, { dismiss })}
    </div>
  );
}
