'use client';

import { FilledStarIcon } from './icons/FilledStarIcon';
import { cn } from '@/lib/utils';
import { useAtomValue, useSetAtom } from 'jotai';
import { sessionAtom } from '@/store/session';
import { starredProductsAtom } from '@/store/starred';
import { signInDialogAtom } from '@/store/signInDialog';
import { toggleStarredProduct } from '@/main/registry';

type Props = {
  isStarred: boolean;
  productId: string;
  className?: string;
};

export function StarProduct({ isStarred, productId, className }: Props) {
  const session = useAtomValue(sessionAtom);
  const setStarredProducts = useSetAtom(starredProductsAtom);
  const setSignInDialog = useSetAtom(signInDialogAtom);

  const onStar = async () => {
    if (!session.user) {
      setSignInDialog(true);
      return;
    }

    toggleStarredProduct.execute({ id: productId, userEmail: session.user.email });
    setStarredProducts((state) => ({ ...state, [productId]: !state[productId] }));
  };

  return (
    <button data-testid="star-product" className={cn('!mt-0', className)} onClick={onStar}>
      <FilledStarIcon className={cn('h-6 w-6 text-gray-400', isStarred && 'animate-star')} />
    </button>
  );
}
