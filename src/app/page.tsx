'use client';

import { ProductCard } from '@/components/ProductCard';
import { ThemedButton } from '@/components/ThemedButton';
import { Button } from '@/components/ui/Button';
import { Product } from '@/domain/models/Product';
import { getProducts } from '@/main/registry';
import { starredProductsAtom } from '@/store/starred';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

export default function Home() {
  const starredProducts = useAtomValue(starredProductsAtom);

  const [products, setProducts] = useState([] as Product[]);

  const onGetProducts = async () => {
    const response = await getProducts.executePaged({ currentPage: 1, pageSize: 10 });
    setProducts(response.products);
  };

  useEffect(() => {
    onGetProducts();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center p-4 gap-4">
      <div
        className="custom-scrollbar mx-auto flex max-h-full
                   max-w-5xl flex-wrap justify-center gap-4
                   overflow-y-scroll"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isStarred={starredProducts[product.id]} />
        ))}
      </div>
      <ThemedButton className="w-fit">Carregar mais</ThemedButton>
    </div>
  );
}
