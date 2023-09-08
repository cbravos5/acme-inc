'use client';

import { useAtomValue } from 'jotai';
import { CartIcon } from '../icons/CartIcon';
import { cartAtom } from '@/store/cart';
import { useMemo } from 'react';

const BUTTON_CLASSES = `relative h-10 w-10 rounded-full border-2
                      border-white p-1 transition hover:scale-105`;

export function Cart() {
  const cart = useAtomValue(cartAtom);

  const itemsLength = useMemo(() => cart.reduce((acc, { quantity }) => acc + quantity, 0),[cart]);

  return (
    <button className={BUTTON_CLASSES}>
      <CartIcon width="100%" height="100%" color="white" />
      {itemsLength ? (
        <span className="absolute -bottom-1 -right-2 aspect-square w-fit rounded-full bg-white p-[2px] text-xs leading-none">
          {itemsLength}
        </span>
      ) : null }
    </button>
  );
}
