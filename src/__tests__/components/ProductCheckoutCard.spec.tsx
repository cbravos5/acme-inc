import { ProductCheckoutCard } from '@/app/checkout/components/ProductCheckoutCard';
import { CartProduct } from '@/domain/models/Cart';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockProduct: CartProduct = {
  id: '1',
  name: 'Product 1',
  image: '/path/to/image.jpg',
  price: 100,
  quantity: 2,
  description: ''
};

const mockOnRemove = jest.fn();

describe('ProductCheckoutCard Component', () => {
  it('renders the component with product details', () => {
    const { getByText } = render(<ProductCheckoutCard {...mockProduct} onRemove={mockOnRemove} />);

    const productName = getByText('Product 1');
    const productPrice = getByText('R$ 200,00');

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });

  it('calls onRemove with correct id when "Trash" is clicked', () => {
    const { getByTestId } = render(<ProductCheckoutCard {...mockProduct} onRemove={mockOnRemove} />);
    const trashButton = getByTestId('trash');

    fireEvent.click(trashButton);

    expect(mockOnRemove).toHaveBeenCalledWith('1');
  });
});
