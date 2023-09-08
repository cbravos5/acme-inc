'use client';

import { useEffect, useState } from 'react';
import { BuyProductCard } from './components/BuyProductCard';
import { Product } from '@/domain/models/Product';
import { getProducts } from '@/main/registry';
import { useAtomValue } from 'jotai';
import { starredProductsAtom } from '@/store/starred';

const CONTAINER_CLASSES = `custom-scrollbar mx-auto flex h-full
                           max-h-full w-full max-w-6xl flex-col
                           items-center md:justify-center gap-4
                           overflow-y-auto p-4`;

export default function Product({ params }: { params: { id: string; } }) {
  const [product, setProduct] = useState(null as Product | null);
  const starredProducts = useAtomValue(starredProductsAtom);

  const onGetProduct = async () => {
    const response = await getProducts.executeSingle(params.id);

    setProduct(response);
  }

  useEffect(() => {
    onGetProduct();
  },[])

  if (!product) return (
    <div className={CONTAINER_CLASSES}>
      <div className='h-full w-full bg-primary/10 rounded-md animate-pulse'></div>
    </div>
  )

  return (
    <div className={CONTAINER_CLASSES}>
      <div className="flex w-full flex-col justify-center gap-5 md:flex-row md:gap-10">
        <img className="rounded-md md:w-2/3" src={product.image} />

        <BuyProductCard {...product} isStarred={starredProducts[product.id]} />
      </div>

      <div className="w-full">
        <h2 className="text-2xl font-medium">Sobre o produto</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
