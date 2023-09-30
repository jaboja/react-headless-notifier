import { ReactNode, useReducer } from 'react';
import { INotification, INotifierContext } from './types';

enum NotificationType {
  ADD,
  DISMISS,
  DISMISS_ALL,
}

type TState = Record<string, ReadonlyArray<INotification>>;

type TAction =
  | { type: NotificationType.ADD; notification: INotification }
  | { type: NotificationType.DISMISS; notification: { id: string } }
  | { type: NotificationType.DISMISS_ALL };

let id = 1;

function reducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case NotificationType.ADD:
      const key = action.notification.position;
      return {
        ...state,
        [key]: [...(state[key] || []), action.notification],
      };
    case NotificationType.DISMISS:
      // we extract the position from the `id`
      const id = action.notification.id;
      const position = id.replace(/-\d+$/, '');
      return state[position]
        ? {
            ...state,
            [position]: state[position].filter(item => item.id !== id),
          }
        : state;
    case NotificationType.DISMISS_ALL:
      return {};
    default:
      return state;
  }
}

export function useNotifications(defaultPosition: string): INotifierContext {
  const [notifications, dispatch] = useReducer(reducer, {});

  const notify = (children: ReactNode, overridePosition?: string) => {
    const position = overridePosition ?? defaultPosition;
    const newId = id++;

    dispatch({
      type: NotificationType.ADD,
      notification: {
        // `id` is compose of the position and a unique number
        // so a first notification created on the top position will have the `id` = "top-1"
        // then the second one on the bottom right will be `bottomRight-2`
        // this system allow us to understand in which array is the notification using only the `id`
        // check `DISMISS` action in the reducer
        id: `${position}-${newId}`,
        children,
        position,
      },
    });
  };

  const dismiss = (id: string) => {
    dispatch({ type: NotificationType.DISMISS, notification: { id } });
  };

  const dismissAll = () => {
    dispatch({ type: NotificationType.DISMISS_ALL });
  };

  return { notifications, notify, dismiss, dismissAll };
}
