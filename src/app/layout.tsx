import '../styles/globals.css';

import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';

import { AppLayout } from '@/components/AppLayout';
import { Toaster } from '@/components/ui/Toaster';
import { Providers } from '@/components/Providers';

export const raleway = Raleway({
  subsets: ['latin'],
  variable: '--raleway-font'
});

export const metadata: Metadata = {
  title: 'Acme in.',
  description: 'Seu site de compras',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={raleway.variable}>
      <body className="font-raleway">
        <Providers>
          <AppLayout>{children}</AppLayout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
