import { ChevronDown, Search } from 'lucide-react'
import { cn } from '../../lib/cn.js'

const CONTROL =
  'w-full rounded-xl border border-navy-100 bg-white text-sm text-ink transition-colors duration-200 placeholder:text-muted/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/10 disabled:cursor-not-allowed disabled:bg-mist'

function FieldShell({ label, htmlFor, error, hint, className, children }) {
  return (
    <div className={cn('min-w-0', className)}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
        >
          {label}
        </label>
      ) : null}
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-[12px] font-medium text-champagne-dark">
          {error}
        </p>
      ) : null}
      {!error && hint ? <p className="mt-1.5 text-[12px] text-muted">{hint}</p> : null}
    </div>
  )
}

export function TextField({ id, label, error, hint, className, inputClassName, ...rest }) {
  return (
    <FieldShell label={label} htmlFor={id} error={error} hint={hint} className={className}>
      <input
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(CONTROL, 'h-11 px-3.5', inputClassName)}
        {...rest}
      />
    </FieldShell>
  )
}

export function SearchField({ id, label, error, className, ...rest }) {
  return (
    <FieldShell label={label} htmlFor={id} error={error} className={className}>
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          strokeWidth={1.8}
        />
        <input
          id={id}
          type="search"
          aria-invalid={error ? 'true' : undefined}
          className={cn(CONTROL, 'h-11 pl-10 pr-3.5')}
          {...rest}
        />
      </div>
    </FieldShell>
  )
}

export function SelectField({ id, label, error, className, options, children, ...rest }) {
  return (
    <FieldShell label={label} htmlFor={id} error={error} className={className}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? 'true' : undefined}
          className={cn(CONTROL, 'h-11 appearance-none pl-3.5 pr-9')}
          {...rest}
        >
          {options
            ? options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            : children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          strokeWidth={1.8}
        />
      </div>
    </FieldShell>
  )
}

export function TextAreaField({ id, label, error, hint, className, rows = 4, ...rest }) {
  return (
    <FieldShell label={label} htmlFor={id} error={error} hint={hint} className={className}>
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(CONTROL, 'resize-y px-3.5 py-2.5 leading-relaxed')}
        {...rest}
      />
    </FieldShell>
  )
}
