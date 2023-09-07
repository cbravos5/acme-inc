import { CartIcon } from '../icons/CartIcon';

const BUTTON_CLASSES = `relative h-10 w-10 rounded-full border-2
                      border-white p-1 transition hover:scale-105`;

export function Cart() {
  return (
    <button className={BUTTON_CLASSES}>
      <CartIcon width="100%" height="100%" color="white" />
      <span className="absolute -bottom-1 -right-2 h-4 w-4 rounded-full bg-white p-0.5 text-xs leading-none">
        3
      </span>
    </button>
  );
}
