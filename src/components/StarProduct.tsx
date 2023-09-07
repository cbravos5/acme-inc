'use client';

import { useState } from 'react';
import { FilledStarIcon } from './icons/FilledStarIcon';
import { cn } from '@/lib/utils';
import { useAtomValue, useSetAtom } from 'jotai';
import { sessionAtom } from '@/store/session';
import { starredProductsAtom } from '@/store/starred';
import { useBoolean } from 'usehooks-ts';
import { signInDialogAtom } from '@/store/signInDialog';

type Props = {
  isStarred: boolean;
};

export function StarProduct({ isStarred }: Props) {
  const session = useAtomValue(sessionAtom);
  const setStarredProducts = useSetAtom(starredProductsAtom);
  const setSignInDialog = useSetAtom(signInDialogAtom);

  const [starred, setStarred] = useState(isStarred);

  const onStar = async () => {
    if (!session.user) {
      setSignInDialog(true);
      return;
    }
  };

  return (
    <button className="!m-0" onClick={onStar}>
      <FilledStarIcon className={cn('h-6 w-6 text-gray-400', starred && 'animate-star')} />
    </button>
  );
}
