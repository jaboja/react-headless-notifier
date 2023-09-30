import * as React from 'react';
import {
  cloneElement,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNotifier } from './context';
import Timer from './Timer';
import { DEFAULT_DURATION } from './types';

export const NotificationBag: FC<{
  position?: string;
  duration?: number;
  max?: number;
  onDismiss?: (id: string) => void;
}> = ({ position, duration = DEFAULT_DURATION, max = null, onDismiss }) => {
  const { notifications, dismiss } = useNotifier();
  const bag = notifications[position || ''] ?? [];

  const displayedNotifications = useMemo(() => {
    const filtered = max ? bag.slice(Math.max(bag.length - max, 0)) : [...bag];
    filtered.reverse();
    return filtered;
  }, [bag, max]);

  return (
    <>
      {displayedNotifications.map(
        ({ id, children, duration: overrideDuration }) => (
          <NotificationWrapper
            key={id}
            duration={overrideDuration ?? duration}
            dismiss={dismiss}
            onDismiss={onDismiss}
            id={id}
          >
            {children}
          </NotificationWrapper>
        ),
      )}
    </>
  );
};

function NotificationWrapper({ children, duration, dismiss, onDismiss, id }) {
  const timer = useMemo(() => new Timer(duration), [duration]);
  const [running, setRunning] = useState(true);

  const dismissEx = useCallback(async () => {
    if (onDismiss) await onDismiss(id);
    dismiss(id);
  }, [dismiss, id, onDismiss]);

  useEffect(() => {
    timer.callback = dismissEx;
  }, [timer, dismissEx]);

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
      {cloneElement(children, { dismiss: dismissEx })}
    </div>
  );
}
