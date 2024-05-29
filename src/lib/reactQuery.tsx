'use client'

import * as React from 'react';
import { DefaultOptions, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const ReactQueryProvider: React.FunctionComponent<ReactQueryProviderProps> = ({
  children,
}) => {
  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

  const queryConfig: DefaultOptions = {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      // Globally default to 24 hrs
      staleTime: twentyFourHoursInMs,
    },
  };

  const [queryClient] = React.useState(
    () => new QueryClient({ defaultOptions: queryConfig }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {process.env.NODE_ENV !== 'test' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
