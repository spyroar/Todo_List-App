import React from 'react';
import { STATUS_OPTIONS } from '../utils/constants';

const StatusFilter = ({ onFilterChange }) => {
  return (
    <div className="status-filter">
      <label>Filter by Status: </label>
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">All</option>
        {STATUS_OPTIONS.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </div>
  );
};

export default StatusFilter;