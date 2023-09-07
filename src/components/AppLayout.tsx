import { PropsWithChildren } from 'react';
import { Header } from './Header';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full w-full overflow-hidden">
      <Header />
      <div className="h-[calc(100%-64px)] w-full">{children}</div>
    </div>
  );
}
