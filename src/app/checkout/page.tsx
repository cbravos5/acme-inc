'use client';

import { Button } from '@/components/ui/Button';
import { ProductCheckoutCard } from './components/ProductCheckoutCard';
import Link from 'next/link';
import { ArrowLeftCircleIcon } from '@/components/icons/ArrowLeftCircleIcon';
import { useAtom } from 'jotai';
import { cartAtom } from '@/store/cart';
import { useMemo } from 'react';
import { currencyFormater } from '@/lib/utils';

export default function Checkout() {
  const [cart, setCart] = useAtom(cartAtom);

  const total = useMemo(() => cart.reduce((acc, { quantity, price }) => acc + quantity * price, 0), [cart]);

  const onRemoveProduct = (id: string) => {
    setCart((state) => state.filter((product) => product.id !== id));
  };

  if (!cart.length)
    return (
      <div className="mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-center gap-4 p-4">
        <h1 className="text-xl">Parece que seu carrinho está vazio :(</h1>
        <Button variant="secondary" asChild>
          <Link href="/">Ir para a lista de produtos</Link>
        </Button>
      </div>
    );

  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-col items-center gap-4 overflow-hidden p-4">
      <div className="flex w-full items-center justify-between">
        <Button variant="ghost" className="gap-1 " asChild>
          <Link href="/">
            <ArrowLeftCircleIcon className="h-6 w-6" />
            <span className="hidden text-lg sm:inline">Continuar comprando</span>
          </Link>
        </Button>
        <h1 className="text-2xl">Resumo do pedido</h1>
      </div>
      <div className="custom-scrollbar flex max-h-full w-full flex-col gap-5 overflow-x-hidden overflow-y-auto">
        {cart.map((product) => (
          <ProductCheckoutCard key={product.id} onRemove={onRemoveProduct} {...product} />
        ))}
      </div>
      <div className="animate-fade flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary">TOTAL: {currencyFormater.format(total)}</h1>
        <Button className="text-xl">Finalizar</Button>
      </div>
    </div>
  );
}
