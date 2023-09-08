import { TrashIcon } from '@/components/icons/TrashIcon';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { CartProduct } from '@/domain/models/Cart';
import { currencyFormater } from '@/lib/utils';
import Link from 'next/link';

type Props = CartProduct & { onRemove: (id: string) => void };

const CONTAINER_CLASSES = `animate-fade-left shrink-0 flex flex-col gap-3
                           md:gap-0 md:flex-row w-full 
                           justify-between overflow-hidden 
                           rounded-md bg-primary/10 shadow`;

export function ProductCheckoutCard(props: Props) {
  return (
    <div className={CONTAINER_CLASSES}>
      <Link className="shrink-0" href={`/products/${props.id}`}>
        <img
          className="h-32 w-full object-cover  object-center md:w-48"
          src={props.image}
        />
      </Link>

      <div className="flex h-full w-full items-center justify-center px-4">
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full flex-col items-center justify-between sm:flex-row">
            <span className="text-2xl text-gray-400 sm:text-3xl">2X</span>
            <h1 className="text-center text-xl font-medium sm:text-2xl">{props.name}</h1>
            <h1 className="whitespace-nowrap text-xl font-medium sm:text-2xl">
              {currencyFormater.format(props.price)}
            </h1>
          </div>

          <Separator className="my-2" />
          <h1 className="text-2xl font-medium text-primary sm:text-3xl">
            {currencyFormater.format(props.quantity * props.price)}
          </h1>
        </div>
      </div>

      <Button onClick={() => props.onRemove(props.id)} variant="destructive" className="h-full">
        <TrashIcon className="h-6 w-6" />
      </Button>
    </div>
  );
}
