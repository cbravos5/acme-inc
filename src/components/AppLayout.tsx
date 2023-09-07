import { PropsWithChildren } from 'react';
import { Header } from './Header';

import wave from '@/assets/wave.png';
import { MustSignInDialog } from './MustSignInDialog';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full w-full overflow-hidden">
      <Header />
      <div className="h-[calc(100%-64px-48px)] md:h-[calc(100%-64px-80px)] w-full">{children}</div>
      <img draggable={false} src={wave.src} className="w-full h-12 md:h-20"/>

      <MustSignInDialog />
    </div>
  );
}
