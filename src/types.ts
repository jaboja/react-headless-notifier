import { ReactNode } from 'react';

export const DEFAULT_DURATION = 5000;

export interface INotifierContext {
  notifications: Record<string, ReadonlyArray<INotification>>;
  notify: (children: ReactNode, overridePosition?: string) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

export interface INotification {
  id: string;
  children: ReactNode;
  position: string;
  duration?: number;
}
