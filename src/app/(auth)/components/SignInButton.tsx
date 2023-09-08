import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function SignInButton() {
  const searchParams = useSearchParams();
  
  const signInUrl = useMemo(() => {
    const checkout = searchParams.get('checkout');
    const product = searchParams.get('product');

    if (checkout) return '/sign-in?checkout=true';
    if (product) return `/sign-in?product=${product}`;

    return '/sign-in';
  }, []);


  return (
    <p className="text-sm">
      Já possui uma conta?{' '}
      <Link className="underline hover:text-gray-300" href={signInUrl}>
        Clique aqui
      </Link>
    </p>
  );
}
