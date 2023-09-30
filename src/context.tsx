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
}> = ({ children, position }) => {
  const notifications = useNotifications(position ?? 'default');

  return (
    <NotifierContext.Provider value={notifications}>
      {children}
    </NotifierContext.Provider>
  );
};
