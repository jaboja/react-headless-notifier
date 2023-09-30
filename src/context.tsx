import * as React from 'react';
import { createContext, FC, ReactNode, useContext } from 'react';
import { useNotifications } from './reducer';
import { INotifierContext } from './types';

export const NotifierContext = createContext<INotifierContext>({
  notifications: {},
  notify: () => {},
  dismiss: () => {},
  dismissAll: () => {},
});

export function useNotifier(): INotifierContext {
  return useContext(NotifierContext);
}

export const NotifierContextProvider: FC<{
  children: ReactNode;
  position?: string;
  duration?: number;
}> = ({ children, position, duration }) => {
  const notifications = useNotifications(position || '', duration);

  return (
    <NotifierContext.Provider value={notifications}>
      {children}
    </NotifierContext.Provider>
  );
};
