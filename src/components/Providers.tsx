'use client';

import { PropsWithChildren } from 'react';
import { Provider } from 'jotai';
import { ThemeProvider } from './ThemeProvider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <Provider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </ThemeProvider>
    </Provider>
  );
}
