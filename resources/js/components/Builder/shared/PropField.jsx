import React from 'react';

export function PropField({ label, children }) {
  return (
    <div className="prop-group">
      <label className="prop-group-label">{label}</label>
      {children}
    </div>
  );
}
