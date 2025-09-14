import { Context, useContext } from 'react';

function useSafeContext<T>(context: Context<T | null>): T {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error('useSafeContext must be used within a Provider with a valid value');
  }

  return ctx;
}

export { useSafeContext };
