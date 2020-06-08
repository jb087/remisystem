import React from 'react';
import { Link } from 'react-router-dom';

import Reminders from './Reminders';
import NoteForm from './NoteForm';
import ButtonWithSpinner from './ButtonWithSpinner';

export default function NoteCard({
  cardTitle,
  allReminders,
  title,
  description,
  onSave,
  onFormFieldChange,
  onReminderAdd,
  onReminderDelete,
  onNoteDelete,
  isSaving,
  isDeleting,
  error,
  success,
}) {
  return (
    <div className="row justify-content-center" style={{ minWidth: '750px' }}>
      <div className="col-lg-8">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{cardTitle}</h5>
            {onNoteDelete && (
              <ButtonWithSpinner
                type="button"
                className="btn btn-outline-danger"
                onClick={onNoteDelete}
                isDuringProcessing={isDeleting}
                disabled={isSaving}
                label="Delete whole note"
                labelProcessing="Deleting note..."
              />
            )}
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}
            <div className="row">
              <div className="col-sm note__col">
                <NoteForm
                  title={title}
                  description={description}
                  onChange={onFormFieldChange}
                  blocked={isDeleting || isSaving}
                />
              </div>
              <div className="col-sm border-left border-fark">
                <Reminders
                  reminders={allReminders}
                  deleteReminder={onReminderDelete}
                  addReminder={onReminderAdd}
                  blocked={isDeleting || isSaving}
                />
              </div>
            </div>
            <div className="row pt-4">
              <div className="col-sm d-flex justify-content-end">
                {isDeleting || isSaving ? (
                  // we render button because Link cannot be disabled
                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    disabled
                  >
                    Cancel
                  </button>
                ) : (
                  <Link
                    to="/"
                    className="btn btn-outline-warning"
                    role="button"
                  >
                    Cancel
                  </Link>
                )}
              </div>
              <div className="col-sm">
                <ButtonWithSpinner
                  role="button"
                  className="btn btn-outline-primary"
                  onClick={onSave}
                  isDuringProcessing={isSaving}
                  disabled={isDeleting}
                  label="Save"
                  labelProcessing="Saving..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
