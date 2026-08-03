/* ============================================================
   Form field primitives — label, control, error and hint.
   Works directly with react-hook-form register() via ref.
   ============================================================ */

import { forwardRef, useId } from 'react';
import { Icon } from '@/components/ui/Icon';

/* ---------- Field wrapper ---------- */

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Field({ label, htmlFor, error, hint, required, className, children }: FieldProps) {
  const errorId = useId();
  const hintId = useId();

  return (
    <div className={['field', error && 'field--error', className].filter(Boolean).join(' ')}>
      <label className="field__label" htmlFor={htmlFor}>
        {label}
        {required && <span className="field__required" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error ? (
        <p className="field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : (
        hint && (
          <p className="field__hint" id={hintId}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}

/* ---------- Input ---------- */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, className = '', ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={['input', invalid && 'input--invalid', className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
});

/* ---------- Textarea ---------- */

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className = '', ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={['textarea', invalid && 'input--invalid', className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
});

/* ---------- Select ---------- */

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid, className = '', children, ...rest },
  ref,
) {
  return (
    <div className="select-wrap">
      <select
        ref={ref}
        className={['select', invalid && 'input--invalid', className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </select>
      <Icon name="chevron-down" size={16} className="select-wrap__chevron" />
    </div>
  );
});
