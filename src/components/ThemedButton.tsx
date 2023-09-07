import { ComponentProps } from 'react';
import { Button } from './ui/Button';
import { LoadingIcon } from './icons/LoadingIcon';

type Props = {
  isLoading?: boolean;
} & ComponentProps<typeof Button>;

export function ThemedButton({ isLoading, disabled, children, ...props }: Props) {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading && <LoadingIcon className="h-5 w-5 animate-spin" />}
      {!isLoading && children}
    </Button>
  );
}
