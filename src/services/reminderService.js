import { getUrl, getRequestInit } from '../utils/requestUtils';

export async function saveReminder(getIdToken, noteId, time) {
  const token = await getIdToken();
  return fetch(
    getUrl(`reminder`),
    getRequestInit(token, {
      method: 'post',
      body: JSON.stringify({
        noteId,
        time: time / 1000,
      }),
    })
  );
}

export async function deleteReminder(getIdToken, reminderId) {
  const token = await getIdToken();
  return fetch(
    getUrl(`reminder/${reminderId}`),
    getRequestInit(token, { method: 'delete' })
  );
}
