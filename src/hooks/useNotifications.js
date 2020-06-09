import { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { socketUri } from '../utils/requestUtils';

import { UserContext } from '../providers/UserProvider';

function notify(note) {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    createNotification(note);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        createNotification(note);
      }
    });
  }
}

function createNotification(note) {
  new Notification(note.title, { body: note.description });
}

export default function useNotifications() {
  const { user } = useContext(UserContext);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!user) {
      setToken(null);
      return;
    }

    user.userAuth.getIdToken().then(setToken);
  }, [user, setToken]);

  useEffect(() => {
    if (!token) {
      return;
    }

    const socketIO = io(socketUri, { query: { token: token } });

    socketIO.on('reminder', (reminder) => {
      notify(reminder);
    });

    return () => {
      socketIO.disconnect();
    };
  }, [token]);
}
