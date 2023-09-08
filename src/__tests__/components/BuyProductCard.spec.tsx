import { BuyProductCard } from '@/app/products/[id]/components/BuyProductCard';
import { useToast } from '@/components/ui/useToast';
import { fireEvent, render } from '@testing-library/react';
import { useSetAtom } from 'jotai';

import '@testing-library/jest-dom';

const mockProduct = {
  id: '1',
  name: 'Product 1',
  price: 100,
  isStarred: false,
  description: '',
  image: ''
};

jest.mock('jotai', () => ({
  ...jest.requireActual('jotai'),
  useSetAtom: jest.fn()
}));

jest.mock('@/components/ui/useToast', () => ({
  ...jest.requireActual('@/components/ui/useToast'),
  useToast: jest.fn()
}));

describe('BuyProductCard Component', () => {
  it('renders the component with product details', () => {
    (useToast as jest.Mock).mockReturnValue({ toast: jest.fn() });

    const { getByText } = render(<BuyProductCard {...mockProduct} />);
    const productName = getByText(/Product 1/i);
    const productPrice = getByText(/100/i);

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });

  it('increases quantity when add button is clicked', () => {
    (useToast as jest.Mock).mockReturnValue({ toast: jest.fn() });

    const { getByTestId } = render(<BuyProductCard {...mockProduct} />);
    const addButton = getByTestId('add-button');

    fireEvent.click(addButton);

    const quantityDisplay = getByTestId('quantity-display');
    expect(quantityDisplay.textContent).toBe('2');
  });

  it('decreases quantity when subtract button is clicked', () => {
    (useToast as jest.Mock).mockReturnValue({ toast: jest.fn() });

    const { getByTestId } = render(<BuyProductCard {...mockProduct} />);
    const subtractButton = getByTestId('subtract-button');

    fireEvent.click(subtractButton);

    const quantityDisplay = getByTestId('quantity-display');
    expect(quantityDisplay.textContent).toBe('1');
  });

  it('calls setCart and displays toast when "COMPRAR" is clicked', () => {
    const setCartMock = jest.fn();
    const toastMock = jest.fn();

    (useSetAtom as jest.Mock).mockReturnValue(setCartMock);
    (useToast as jest.Mock).mockReturnValue({ toast: toastMock });

    const { getByText } = render(<BuyProductCard {...mockProduct} />);

    const buyButton = getByText(/COMPRAR/i);
    fireEvent.click(buyButton);

    expect(setCartMock).toHaveBeenCalled();
    expect(toastMock).toHaveBeenCalledWith({
      className: 'flex-col gap-3 items-start',
      title: 'Produto adicionado ao carrinho',
      description: 'Product 1 foi adicionado ao carrinho',
      action: expect.anything()
    });
  });
});
