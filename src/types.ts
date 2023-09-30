import { ReactNode } from 'react';

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
}
