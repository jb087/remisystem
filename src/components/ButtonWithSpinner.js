import React from 'react';

export default function ButtonWithSpinner({
  isDuringProcessing,
  label,
  labelProcessing,
  ...buttonAttributes
}) {
  return (
    <button {...buttonAttributes} disabled={isDuringProcessing}>
      {isDuringProcessing && (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      )}
      {isDuringProcessing ? ` ${labelProcessing}` : label}
    </button>
  );
}
