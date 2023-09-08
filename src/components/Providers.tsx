'use client';

import { PropsWithChildren } from 'react';
import { Provider } from 'jotai';
import { ThemeProvider } from './ThemeProvider';
import { StarredProductsProvider } from './StarredProductsProvider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <Provider>
      <StarredProductsProvider>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </StarredProductsProvider>
    </Provider>
  );
}
