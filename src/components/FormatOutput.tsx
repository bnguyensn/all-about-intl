import { ErrorBoundary } from 'react-error-boundary';
import './FormatOutput.css';

export interface FormatOutputProps {
  input: string;
  formatter: (input: string) => string;
}

function FormatOutput({ input, formatter }: FormatOutputProps) {
  return (
    <span>
      {input === '' ? 'Nothing to format' : 'Formatted value: '}
      <span className="formatted-value">{formatter(input)}</span>
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
