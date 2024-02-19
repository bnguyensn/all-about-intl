import { ErrorBoundary } from 'react-error-boundary';
import { format } from '../lib/format.ts';
import './FormatOutput.css';

export interface FormatOutputProps {
  input: string;
  locale: string;
  options: Intl.NumberFormatOptions;
}

function FormatOutput({ input, locale, options }: FormatOutputProps) {
  return (
    <span>
      {input === '' ? 'Nothing to format' : 'Formatted value: '}
      <span className="formatted-value">
        {format(input, {
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
    <div>
      <span className="error-message">{error.message}</span>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export function FormatOutputWithErrorBoundary(props: FormatOutputProps) {
  return (
    <ErrorBoundary
      fallbackRender={fallbackRender}
      onReset={() => {
        window.location.reload();
      }}
    >
      <FormatOutput {...props} />
    </ErrorBoundary>
  );
}
