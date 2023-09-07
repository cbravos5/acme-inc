'use client';

import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { ComponentProps, forwardRef, use, useState } from 'react';
import { OpenEyeIcon } from './icons/OpenEyeIcon';
import { cn } from '@/lib/utils';
import { CloseEyeIcon } from './icons/CloseEyeIcon';

type Props = {
  label?: string;
  error?: string;
} & ComponentProps<typeof Input>;

export const PasswordInput = forwardRef<HTMLInputElement, Props>(function (
  { label, className, error, ...props },
  ref
) {
  const [show, setShow] = useState(false);

  return (
    <div className={cn('relative grid w-full max-w-sm items-center gap-1.5', className)}>
      <Label className={cn(error && 'text-destructive')} htmlFor={props.id}>
        {label}
      </Label>
      <Input className="pr-12" type={show ? 'text' : 'password'} ref={ref} {...props} />
      <button
        type="button"
        onClick={() => setShow((state) => !state)}
        className={cn(
          'absolute right-1 top-1/2 -translate-x-1/2 text-secondary-foreground',
          error && 'top-[calc(50%-10px)]'
        )}
      >
        {show ? <CloseEyeIcon width={20} height={20} /> : <OpenEyeIcon width={20} height={20} />}
      </button>

      {error && <span className="mt-0.5 text-xs text-destructive">{error}</span>}
    </div>
  );
});
