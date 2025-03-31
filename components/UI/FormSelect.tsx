import React, { SelectHTMLAttributes } from 'react';

interface BaseFormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  error?: string;
  isLoading?: boolean;
  loadingError?: string | null;
}

export default function FormSelect({
  id,
  name,
  label,
  options,
  error,
  isLoading,
  loadingError,
  required,
  className,
  ...restProps
}: BaseFormSelectProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={id}
        name={name || id}
        className={`w-full px-3 py-2 border cursor-pointer ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
          className || ''
        }`}
        aria-invalid={error ? 'true' : 'false'}
        disabled={isLoading}
        required={required}
        {...restProps}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {loadingError && (
        <p className="mt-1 text-sm text-red-600">{loadingError}</p>
      )}
    </div>
  );
}
