import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100">
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
