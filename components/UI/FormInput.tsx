import React, { InputHTMLAttributes } from 'react';

interface BaseFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isLoading?: boolean;
  loadingError?: string | null;
}

export default function FormInput({
  id,
  name,
  label,
  error,
  isLoading,
  loadingError,
  required,
  className,
  ...restProps
}: BaseFormInputProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        name={name || id}
        className={`w-full px-3 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
          className || ''
        }`}
        aria-invalid={error ? 'true' : 'false'}
        disabled={isLoading}
        required={required}
        {...restProps}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {loadingError && (
        <p className="mt-1 text-sm text-red-600">{loadingError}</p>
      )}
    </div>
  );
}
