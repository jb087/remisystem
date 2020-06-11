import { useReducer, useCallback } from 'react';

export const ADD = 'ADD';
export const DELETE = 'DELETE';
export const RESET = 'RESET';

function reducer(state, action) {
  switch (action.type) {
    case RESET:
      return {
        reminders: action.reminders,
        newReminders: [],
        deletedRemindersIds: [],
      };
    case ADD:
      return {
        ...state,
        newReminders: [...state.newReminders, action.newReminder],
      };
    case DELETE:
      const { reminderId } = action;
      const isNotDeleted = (reminder) => reminder.id !== reminderId;
      const isNewReminder = state.newReminders.some(
        (reminder) => reminder.id === reminderId
      );
      return isNewReminder
        ? {
            ...state,
            newReminders: state.newReminders.filter(isNotDeleted),
          }
        : {
            ...state,
            reminders: state.reminders.filter(isNotDeleted),
            deletedRemindersIds: [...state.deletedRemindersIds, reminderId],
          };
    default:
      throw new Error();
  }
}

export default function useReminders() {
  const [
    { reminders, newReminders, deletedRemindersIds },
    dispatch,
  ] = useReducer(reducer, {
    reminders: [],
    newReminders: [],
    deletedReminders: [],
  });
  const addReminder = useCallback(
    (newReminder) => dispatch({ type: ADD, newReminder }),
    [dispatch]
  );
  const deleteReminder = useCallback(
    (reminderId) => dispatch({ type: DELETE, reminderId }),
    [dispatch]
  );
  const resetReminders = useCallback(
    //NOSONAR
    (reminders) => dispatch({ type: RESET, reminders }),
    [dispatch]
  );

  return [
    reminders,
    newReminders,
    deletedRemindersIds,
    addReminder,
    deleteReminder,
    resetReminders,
  ];
}
