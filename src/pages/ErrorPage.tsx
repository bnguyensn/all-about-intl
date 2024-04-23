import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError();
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <main>
      <h1>Oops! Something went wrong.</h1>
    </main>
  );
}
