'use client';

import { Button } from '@/components/ui/Button';
import { ProductCheckoutCard } from './components/ProductCheckoutCard';
import Link from 'next/link';
import { ArrowLeftCircleIcon } from '@/components/icons/ArrowLeftCircleIcon';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { cartAtom } from '@/store/cart';
import { useMemo } from 'react';
import { cn, currencyFormater } from '@/lib/utils';
import { sessionAtom } from '@/store/session';
import { signInDialogAtom } from '@/store/signInDialog';
import { Cart } from '@/domain/models/Cart';
import { User } from '@/domain/models/User';
import { useBoolean } from 'usehooks-ts';

import checkGif from '@/assets/check.gif';

const generateJsonData = (cart: Cart, user: Omit<User, 'password'>, total: number) => {
  const now = new Date();

  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify({
      products: cart,
      total,
      user,
      when: now.toISOString()
    })
  )}`;

  const fileName = `compra-${user.name}-${now.toLocaleDateString().replace('/', '-')}.json`;

  return { jsonString, fileName };
};

const CONTAINER_CLASSES = `mx-auto flex h-full w-full max-w-4xl
                            flex-col items-center justify-center
                            gap-4 p-4`;

export default function Checkout() {
  const [cart, setCart] = useAtom(cartAtom);
  const session = useAtomValue(sessionAtom);
  const setSignInDialog = useSetAtom(signInDialogAtom);

  const finished = useBoolean(false);

  const total = useMemo(() => cart.reduce((acc, { quantity, price }) => acc + quantity * price, 0), [cart]);

  const onRemoveProduct = (id: string) => {
    setCart((state) => state.filter((product) => product.id !== id));
  };

  const onFinish = () => {
    if (!session.user) {
      setSignInDialog(true);
      return;
    }

    const { fileName, jsonString } = generateJsonData(cart, session.user, total);

    const link = document.createElement('a');
    link.href = jsonString;
    link.download = fileName;
    link.click();
    link.remove();

    finished.setTrue();
    setCart([]);
  };

  if (finished.value)
    return (
      <div className={cn(CONTAINER_CLASSES, 'animate-fade')}>
        <img className="max-w-[33%]" src={checkGif.src} />

        <h1 className="mb-3 mt-2 text-center text-2xl">Compra finalizada com sucesso!</h1>

        <Button variant="link" asChild>
          <Link href="/">Ir para a lista de produtos</Link>
        </Button>
      </div>
    );

  if (!cart.length)
    return (
      <div className={CONTAINER_CLASSES}>
        <h1 className="text-xl">Parece que seu carrinho está vazio :(</h1>
        <Button variant="secondary" asChild>
          <Link href="/">Ir para a lista de produtos</Link>
        </Button>
      </div>
    );

  return (
    <div className={CONTAINER_CLASSES}>
      <div className="flex w-full items-center justify-between">
        <Button variant="ghost" className="gap-1 " asChild>
          <Link href="/">
            <ArrowLeftCircleIcon className="h-6 w-6" />
            <span className="hidden text-lg sm:inline">Continuar comprando</span>
          </Link>
        </Button>
        <h1 className="text-2xl">Resumo do pedido</h1>
      </div>
      <div className="custom-scrollbar flex max-h-full w-full flex-col gap-5 overflow-y-auto overflow-x-hidden">
        {cart.map((product) => (
          <ProductCheckoutCard key={product.id} onRemove={onRemoveProduct} {...product} />
        ))}
      </div>

      <div className="flex w-full animate-fade items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary">TOTAL: {currencyFormater.format(total)}</h1>
        <Button onClick={onFinish} className="text-xl">
          Finalizar
        </Button>
      </div>
    </div>
  );
}
