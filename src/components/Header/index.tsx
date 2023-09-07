

import Image from 'next/image';

import Logo from '@/assets/Logo-white.svg';
import Link from 'next/link';
import { Cart } from './Cart';
import { SessionStatus } from './SessionStatus';

export function Header() {
  return (
    <header className="h-16 w-full bg-primary px-4 py-2">
      <div className="mx-auto flex h-full w-full max-w-3xl items-center justify-between gap-2">
        <Link href="/" className="relative aspect-[277/61] w-40 sm:w-56">
          <Image src={Logo.src} fill alt="Acme inc." />
        </Link>

        <div className="flex items-center gap-2">
          <SessionStatus />
          <Cart />
        </div>
      </div>
    </header>
  );
}
