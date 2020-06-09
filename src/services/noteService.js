import { getUrl, getRequestInit } from '../utils/requestUtils';
import { deleteReminder, saveReminder } from './reminderService';

export async function saveNote(getIdToken, title, description, newReminders) {
  const token = await getIdToken();
  const response = await fetch(
    getUrl('note-with-reminders'),
    getRequestInit(token, {
      method: 'post',
      body: JSON.stringify({
        note: { title, description },
        reminders: newReminders.map((reminder) => ({
          time: String(reminder.time),
        })),
      }),
    })
  );

  return response.json();
}

export async function updateNote(
  getIdToken,
  { noteId, title, description },
  deletedRemindersIds,
  newReminders
) {
  const token = await getIdToken();
  const getIdTokenInstant = async () => token;
  const noteResponse = fetch(
    getUrl(`note/${noteId}`),
    getRequestInit(token, {
      method: 'put',
      body: JSON.stringify({
        title,
        description,
      }),
    })
  );
  const deleteRemindersResponses = deletedRemindersIds.map(
    (deletedReminderId) => deleteReminder(getIdTokenInstant, deletedReminderId)
  );
  const addRemindersResponses = newReminders.map((reminder) =>
    saveReminder(getIdTokenInstant, noteId, reminder.time)
  );

  return Promise.all([
    noteResponse,
    ...deleteRemindersResponses,
    ...addRemindersResponses,
  ]);
}

export async function deleteNote(getIdToken, noteId) {
  const token = await getIdToken();
  const response = fetch(
    getUrl(`note/${noteId}`),
    getRequestInit(token, {
      method: 'delete',
    })
  );

  return response;
}

export async function getNoteWithReminders(getIdToken, noteId) {
  const token = await getIdToken();
  const noteResponse = fetch(
    getUrl(`note/${noteId}`),
    getRequestInit(token, { method: 'get' })
  );
  const remindersResponse = fetch(
    getUrl(`note/${noteId}/reminders`),
    getRequestInit(token, { method: 'get' })
  );

  return Promise.all([
    noteResponse.then((response) => response.json()),
    remindersResponse.then((response) => response.json()),
  ]);
}

export async function getNotesByUser(getIdToken) {
  const token = await getIdToken();
  const response = await fetch(
    getUrl('notes-by-user'),
    getRequestInit(token, { method: 'get' })
  );

  return response.json();
}
