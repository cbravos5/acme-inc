import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { cn } from '@/lib/utils';
import { ComponentProps, forwardRef } from 'react';

type Props = {
  label?: string;
  error?: string;
} & ComponentProps<typeof Input>;

export const InputWithLabel = forwardRef<HTMLInputElement, Props>(function ({ label, error, ...props }, ref) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label className={cn(error && 'text-destructive')} htmlFor={props.id}>
        {label}
      </Label>
      <Input ref={ref} {...props} />
      {error && <span className="mt-0.5 text-xs text-destructive">{error}</span>}
    </div>
  );
});
