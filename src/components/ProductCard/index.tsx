import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { StarProduct } from './StarProduct';
import { Product } from '@/domain/models/Product';

type Props = {
  product: Product;
  isStarred: boolean;
};

const currencyFormater = new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' })

export function ProductCard(props: Props) {
  const { isStarred, product } = props;

  return (
    <Card className="w-full max-w-xs p-1">
      <CardHeader className="flex-row items-center justify-between p-2">
        <CardTitle className="text-xl leading-none">{product.name}</CardTitle>
        <StarProduct isStarred={isStarred} />
      </CardHeader>
      <CardContent className="p-2">
        <Link
          className="block max-h-24 max-w-full overflow-hidden rounded-xl"
          href={`/product/${product.id}`}
        >
          <img
            draggable="false"
            className="h-full w-full object-cover object-center transition hover:scale-110"
            src={product.image}
          />
        </Link>
      </CardContent>
      <CardFooter className="items-center justify-between gap-2 p-2">
        <h1 className="w-full text-center text-xl font-bold">{currencyFormater.format(product.price)}</h1>
        <Button asChild>
          <Link href={`/product/${product.id}`}>COMPRAR</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
