'use client';

import Link from 'next/link';
import { Button } from '../ui/Button';
import { SignOutIcon } from '../icons/SignOutIcon';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { useAtom } from 'jotai';
import { sessionAtom } from '@/store/session';

export function SessionStatus() {
  const [session, setSession] = useAtom(sessionAtom);

  if (session.active)
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex flex-col text-white">
            <span className="text-xs">Bem vindo, </span>
            <h2
              className="max-w-[100px] overflow-hidden
                         overflow-ellipsis whitespace-nowrap
                         text-sm md:text-base"
            >
              {session.user?.name}
            </h2>
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-22 rounded-md bg-white p-1 shadow">
          <Button variant="link" onClick={() => setSession({ active: false, user: null })}>
            <SignOutIcon width={20} height={20} /> Sair
          </Button>
        </PopoverContent>
      </Popover>
    );

  return (
    <Button variant="secondary" asChild>
      <Link href="/sign-in">ENTRAR</Link>
    </Button>
  );
}
