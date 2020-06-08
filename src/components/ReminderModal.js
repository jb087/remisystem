import React, { useState, useCallback, useMemo } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

import ReminderModalBackdrop from './ReminderModalBackdrop';
import {
  dateToDailyCron,
  dateToWeeklyCron,
  dateToMonthlyCron,
  reminderToReadableFormat,
} from '../utils/reminderUtils';

const DAILY = 'DAILY';
const WEEKLY = 'WEEKLY';
const MONTHLY = 'MONTHLY';

export default function ReminderModal({ show, onSave, onCancel }) {
  const [date, setDate] = useState(new Date());
  const [isCyclic, setIsCyclic] = useState(false);
  const [cyclisity, setCyclisity] = useState(DAILY);
  const flatpickrMinDate = useMemo(() => new Date(), []);
  const handleRadioChange = useCallback(
    (event) => setCyclisity(event.target.value),
    [setCyclisity]
  );
  const handleFlatpickrChange = useCallback(
    (dates) => {
      if (dates.length === 0 || dates[0] < new Date()) {
        setDate(new Date());
      } else {
        setDate(dates[0]);
      }
    },
    [setDate]
  );
  const handleSave = useCallback(() => {
    let time;

    if (isCyclic) {
      switch (cyclisity) {
        case DAILY:
          time = dateToDailyCron(date);
          break;
        case WEEKLY:
          time = dateToWeeklyCron(date);
          break;
        case MONTHLY:
          time = dateToMonthlyCron(date);
          break;
      }
    } else {
      time = date.getTime();
    }

    onSave(time);
  }, [onSave, date, isCyclic, cyclisity]);

  return (
    <>
      <ReminderModalBackdrop show={show} />
      <div
        className={`modal fade ${show ? 'show' : ''}`}
        style={show ? { display: 'block' } : null}
        tabIndex="-1"
        role="dialog"
      >
        <div
          className="modal-dialog"
          style={{ maxWidth: '680px' }}
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Time</h5>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm">
                  <Flatpickr
                    data-enable-time
                    value={[date]}
                    onChange={handleFlatpickrChange}
                    options={{
                      inline: true,
                      minDate: flatpickrMinDate,
                    }}
                  />
                </div>
                <div className="col-sm border-left border-fark">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isCyclic"
                      onChange={(event) => setIsCyclic(event.target.checked)}
                      checked={isCyclic}
                    />
                    <label className="form-check-label" htmlFor="isCyclic">
                      Cyclic
                    </label>
                  </div>
                  <div className="pl-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="cyclisity"
                        id="daily"
                        value={DAILY}
                        checked={cyclisity === DAILY}
                        onChange={handleRadioChange}
                        disabled={!isCyclic}
                      />
                      <label className="form-check-label" htmlFor="daily">
                        {reminderToReadableFormat(dateToDailyCron(date))}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="cyclisity"
                        id="weekly"
                        value={WEEKLY}
                        checked={cyclisity === WEEKLY}
                        onChange={handleRadioChange}
                        disabled={!isCyclic}
                      />
                      <label className="form-check-label" htmlFor="weekly">
                        {reminderToReadableFormat(dateToWeeklyCron(date))}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="cyclisity"
                        id="monthly"
                        value={MONTHLY}
                        checked={cyclisity === MONTHLY}
                        onChange={handleRadioChange}
                        disabled={!isCyclic}
                      />
                      <label className="form-check-label" htmlFor="monthly">
                        {reminderToReadableFormat(dateToMonthlyCron(date))}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
