import React from 'react';

interface FormFieldProps {
  label: string | React.ReactNode;
  name: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  error,
  required = false,
  className = '',
  children
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {children}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

interface TextInputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date';
  name: string;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  type = 'text',
  name,
  value = '',
  placeholder,
  required = false,
  disabled = false,
  className = '',
  handleChange,
  ...props
}) => {
  return (
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${className}`}
      {...props}
    />
  );
};

interface TextareaProps {
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
  handleChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea: React.FC<TextareaProps> = ({
  name,
  value = '',
  placeholder,
  required = false,
  disabled = false,
  rows = 3,
  className = '',
  handleChange,
  ...props
}) => {
  return (
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      rows={rows}
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${className}`}
      {...props}
    />
  );
};

interface SelectProps {
  name: string;
  value?: string | number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string | number; label: string }>;
  emptyOption?: string;
}

export const Select: React.FC<SelectProps> = ({
  name,
  value = '',
  required = false,
  disabled = false,
  className = '',
  handleChange,
  options,
  emptyOption,
  ...props
}) => {
  return (
    <select
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      required={required}
      disabled={disabled}
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${className}`}
      {...props}
    >
      {emptyOption && (
        <option value="">{emptyOption}</option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default {
  FormField,
  TextInput,
  Textarea,
  Select,
};