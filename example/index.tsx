import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NotificationBag, NotifierContextProvider, useNotifier } from '../.';
import {
  DangerDemoNotification, InfoDemoNotification, SuccessDemoNotification, WarningDemoNotification
} from './components/DemoNotification';

const App = () => {
  return (
    <NotifierContextProvider duration={10000}>
      <div className="notification-bag-default"><NotificationBag /></div>
      <ShowNotification />
      <div className="notification-bag-top"><NotificationBag position="TOP" /></div>
      <div className="notification-bag-bottom"><NotificationBag position="BOTTOM" /></div>
      <div className="notification-bag-bottom-left"><NotificationBag position="BOTTOM_LEFT" /></div>
    </NotifierContextProvider>
  );
};

function ShowNotification() {
  const { notify, dismissAll } = useNotifier();

  const randomNotification = (position?) => {
    return () => {
      switch (Math.floor(Math.random() * 4)) {
        case 0:
          notify(<WarningDemoNotification />, position)
          break;
        case 1:
          notify(<SuccessDemoNotification />, position)
          break;
        case 2:
          notify(<DangerDemoNotification />, position)
          break;
        default:
          notify(<InfoDemoNotification />, position)
          break;
      }
    };
  }

  React.useEffect(() => {}, []);

  return (
    <div className="button-area">
      <button
        type="button"
        onClick={randomNotification()}
      >
        Default Notification
      </button>

      <button
        type="button"
        onClick={randomNotification("TOP")}
      >
        Top Notification
      </button>

      <button
        type="button"
        onClick={randomNotification("BOTTOM")}
      >
        Bottom Notification
      </button>

      <button
        type="button"
        onClick={randomNotification("BOTTOM_LEFT")}
      >
        Bottom Left Notification
      </button>

      <hr />

      <button type="button" onClick={dismissAll}>
        Dismiss All Notificaitons
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
