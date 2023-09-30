import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export function SuccessDemoNotification({ dismiss }) {
  return (
    <div className="notification notification-green">
      <h4>Well, hello there</h4>
      <p>
        This is a demo notification, you can customize it live in the editor!
      </p>

      <button type="button" onClick={dismiss}>
        Dismiss
      </button>
    </div>
  );
}

export function InfoDemoNotification({ dismiss }) {
  return (
    <div className="notification notification-blue">
      <h4>Well, hello there</h4>
      <p>
        This is a demo notification, you can customize it live in the editor!
      </p>

      <button type="button" onClick={dismiss}>
        Dismiss
      </button>
    </div>
  );
}

export function WarningDemoNotification({ dismiss }) {
  return (
    <div className="notification notification-yellow">
      <h4>Well, hello there</h4>
      <p>
        This is a demo notification, you can customize it live in the editor!
      </p>

      <button type="button" onClick={dismiss}>
        Dismiss
      </button>
    </div>
  );
}

export function DangerDemoNotification({ dismiss }) {
  return (
    <div className="notification notification-red">
      <h4>Well, hello there</h4>
      <p>
        This is a demo notification, you can customize it live in the editor!
      </p>

      <button type="button" onClick={dismiss}>
        Dismiss
      </button>
    </div>
  );
}
