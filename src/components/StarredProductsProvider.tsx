'use client';

import { getStarredProducts } from '@/main/registry';
import { sessionAtom } from '@/store/session';
import { starredProductsAtom } from '@/store/starred';
import { useAtomValue, useSetAtom } from 'jotai';
import { PropsWithChildren, useEffect } from 'react';

export function StarredProductsProvider({ children }: PropsWithChildren) {
  const session = useAtomValue(sessionAtom);
  const setStarredProducts = useSetAtom(starredProductsAtom);

  const onGetStarredProducts = async (userEmail: string) => {
    const products = await getStarredProducts.execute(userEmail);

    const keyValueProducts = products.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {} as Record<string, boolean>);

    setStarredProducts(keyValueProducts);
  };

  useEffect(() => {
    if (session.user) onGetStarredProducts(session.user.email);
    else setStarredProducts({});
  }, [session]);

  return children;
}
