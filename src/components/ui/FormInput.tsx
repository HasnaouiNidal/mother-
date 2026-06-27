import React from 'react';

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  options?: string[]; // Used for select type
  rows?: number; // Used for textarea type
  className?: string;
  ariaDescribedBy?: string;
}

export default function FormInput({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  options = [],
  rows = 3,
  className = '',
  ariaDescribedBy,
}: FormInputProps) {
  const errorId = `${id}-error`;
  const descId = ariaDescribedBy || (error ? errorId : undefined);

  // Common styling for input elements
  const inputBaseStyles = "w-full px-4 py-3 border rounded-xl font-sans text-xs sm:text-sm text-brand-dark bg-brand-beige-light/50 focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-1 transition-all shadow-inner";
  
  const borderStyles = error
    ? "border-error-red focus:border-error-red"
    : "border-brand-border/50 focus:border-brand-green";

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label
        htmlFor={id}
        className="text-[10px] uppercase tracking-widest text-brand-dark/60 font-bold block font-sans"
      >
        {label} {required && <span className="text-error-red" aria-hidden="true">*</span>}
      </label>

      {type === 'select' ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={descId}
          className={`${inputBaseStyles} ${borderStyles} font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={descId}
          className={`${inputBaseStyles} ${borderStyles} resize-none disabled:opacity-50`}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={descId}
          className={`${inputBaseStyles} ${borderStyles} disabled:opacity-50`}
        />
      )}

      {error && (
        <p
          id={errorId}
          className="text-error-red text-xs font-semibold font-sans mt-1"
          role="alert"
        >
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}
