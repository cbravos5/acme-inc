'use client';

import { ThemedButton } from '@/components/ThemedButton';
import { Product } from '@/domain/models/Product';
import { getProducts } from '@/main/registry';
import { starredProductsAtom } from '@/store/starred';
import { useAtomValue } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { useBoolean, useDebounce } from 'usehooks-ts';
import { SearchBar } from './components/SearchBar';
import { ProductCard } from './components/ProductCard';

export default function Home() {
  const starredProducts = useAtomValue(starredProductsAtom);

  const [products, setProducts] = useState([] as Product[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search, 500);

  const filterStarred = useBoolean(false);

  const isLoading = useBoolean(true);

  const onGetProducts = async (page: number) => {
    isLoading.setTrue();

    const response = await getProducts.executePaged({ currentPage: page, pageSize: 10 });
    setProducts((state) => state.concat(response.products));
    setTotalPages(response.pagination.totalPages);

    isLoading.setFalse();
  };

  useEffect(() => {
    onGetProducts(currentPage);
  }, [currentPage]);

  const filteredProducts = useMemo(() => {
    const upperCasedSearch = debouncedSearch.toUpperCase();

    let filtered = products.filter(({ name }) => name.toUpperCase().includes(upperCasedSearch));

    if (filterStarred.value) filtered = filtered.filter(({ id }) => starredProducts[id]);

    return filtered;
  }, [products, debouncedSearch, filterStarred, starredProducts]);

  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col items-center gap-4 p-4">
      <SearchBar filterStarred={filterStarred} onChange={(value) => setSearch(value)} />
      <div
        className="custom-scrollbar flex max-h-full
                    flex-wrap justify-center gap-4
                   overflow-y-scroll"
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} isStarred={starredProducts[product.id]} />
        ))}
      </div>
      <ThemedButton
        onClick={() => setCurrentPage((state) => state + 1)}
        isLoading={isLoading.value}
        disabled={totalPages <= currentPage}
        className="w-fit"
      >
        Carregar mais
      </ThemedButton>
    </div>
  );
}
