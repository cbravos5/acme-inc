'use client';

import { useState } from 'react';
import { FilledStarIcon } from '../icons/FilledStarIcon';
import { cn } from '@/lib/utils';

type Props = {
  isStarred: boolean;
}

export function StarProduct({ isStarred }: Props) {
  const [starred, setStarred] = useState(isStarred);

  return (
    <button className="!m-0" onClick={() => setStarred((state) => !state)}>
      <FilledStarIcon className={cn('h-6 w-6 text-gray-400', starred && 'animate-star')} />
    </button>
  );
}
