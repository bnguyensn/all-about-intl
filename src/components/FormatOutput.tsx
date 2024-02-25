import { ErrorBoundary } from 'react-error-boundary';
import { formatIntlVanilla } from '../lib/formatIntlVanilla.ts';
import './FormatOutput.css';

export interface FormatOutputProps {
  input: string;
  locale: string | undefined;
  options: Intl.NumberFormatOptions;
}

function FormatOutput({ input, locale, options }: FormatOutputProps) {
  return (
    <span>
      {input === '' ? 'Nothing to format' : 'Formatted value: '}
      <span className="formatted-value">
        {formatIntlVanilla(input, {
          locale,
          options,
        })}
      </span>
    </span>
  );
}

function fallbackRender({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="format-output-container">
      <span className="error-message">Error: {error.message}</span>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export function FormatOutputWithErrorBoundary({
  reset,
  ...rest
}: FormatOutputProps & { reset: () => void }) {
  return (
    <ErrorBoundary fallbackRender={fallbackRender} onReset={reset}>
      <FormatOutput {...rest} />
    </ErrorBoundary>
  );
}
