'use client';

import { StarProduct } from '@/components/StarProduct';
import { AddIcon } from '@/components/icons/AddIcon';
import { SubtractIcon } from '@/components/icons/SubtractIcon';
import { Button } from '@/components/ui/Button';
import { ToastAction } from '@/components/ui/Toast';
import { useToast } from '@/components/ui/useToast';
import { Product } from '@/domain/models/Product';
import { currencyFormater } from '@/lib/utils';
import { cartAtom } from '@/store/cart';
import { useSetAtom } from 'jotai';
import Link from 'next/link';
import { useState } from 'react';

const CARD_CLASSES = `relative flex flex-col items-center
                      justify-evenly gap-3 rounded-md bg-primary/20
                      p-3 pt-5 shadow md:w-1/3`;

type Props = Product & { isStarred: boolean };

export function BuyProductCard(props: Props) {
  const [quantity, setQuantity] = useState(1);
  const setCart = useSetAtom(cartAtom);

  const { toast } = useToast();

  const onIncrease = () => setQuantity((state) => (state === 10 ? state : state + 1));
  const onDecrease = () => setQuantity((state) => (state === 1 ? state : state - 1));

  const onBuy = () => {
    setCart((state) => {
      const newState = [...state];

      const product = newState.find(({ id }) => id === props.id);

      if (product) {
        product.quantity += quantity;
        return newState;
      }

      const { isStarred, ...newProduct } = props;
      
      return newState.concat([{ ...newProduct, quantity }]);
    })

    toast({
      className: "flex-col gap-3 items-start",
      title: `Produto adicionado ao carrinho`, 
      description: `${props.name} foi adicionado ao carrinho`,
      action: (
        <ToastAction altText="Ir para o carrinho">
          <Link href="/checkout">Ir para o carrinho</Link>
        </ToastAction>
      )
    })
  }

  return (
    <div className={CARD_CLASSES}>
      <StarProduct isStarred={props.isStarred} productId={props.id} className="absolute right-3 top-3" />

      <h1 className="text-center text-3xl font-bold text-primary">{props.name}</h1>

      <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row md:flex-col">
        <div>
          <h3>Por apenas</h3>
          <h1 className="text-4xl">{currencyFormater.format(props.price)}</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={onDecrease} variant="secondary" className="shadow">
            <SubtractIcon className="h-6 w-6" />
          </Button>

          <h1 className="w-5 text-center text-2xl">{quantity}</h1>

          <Button onClick={onIncrease} variant="secondary" className="shadow">
            <AddIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <Button onClick={onBuy} className="w-full">COMPRAR</Button>
    </div>
  );
}
