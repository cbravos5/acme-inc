'use client';

import { sessionAtom } from '@/store/session';
import { useAtomValue } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const session = useAtomValue(sessionAtom);

  useEffect(() => {
    const checkout = searchParams.get('checkout');
    const product = searchParams.get('product');

    if (session.active && checkout) router.push('/checkout');
    else if (session.active && product) router.push(`/product/${product}`);
    else if (session.active) router.push('/');
  }, [session]);

  return children;
}
