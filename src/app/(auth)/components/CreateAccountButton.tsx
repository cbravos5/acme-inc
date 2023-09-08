import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function CreateAccountButton() {
  const searchParams = useSearchParams();

  const createAccountUrl = useMemo(() => {
    const checkout = searchParams.get('checkout');
    const product = searchParams.get('product');

    if (checkout) return '/sign-up?checkout=true';
    if (product) return `/sign-up?product=${product}`;

    return '/sign-up';
  }, []);
  
  return (
    <Button variant="secondary" className="w-full bg-gray-200" asChild>
      <Link href={createAccountUrl}>Crie uma conta</Link>
    </Button>
  );
}
