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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const onGetProducts = async (page: number) => {
    setIsLoading(true);

    const response = await getProducts.executePaged({ currentPage: page, pageSize: 25 });
    setProducts((state) => state.concat(response.products));
    setTotalPages(response.pagination.totalPages);

    setIsLoading(false);
  };

  useEffect(() => {
    console.log(currentPage, totalPages)

    onGetProducts(currentPage);
  }, [currentPage]);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 p-4">
      <div
        className="custom-scrollbar mx-auto flex max-h-full
                   max-w-5xl flex-wrap justify-center gap-4
                   overflow-y-scroll"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isStarred={starredProducts[product.id]} />
        ))}
      </div>
      <ThemedButton
        onClick={() => setCurrentPage((state) => state + 1)}
        isLoading={isLoading}
        disabled={totalPages <= currentPage}
        className="w-fit"
      >
        Carregar mais
      </ThemedButton>
    </div>
  );
}
