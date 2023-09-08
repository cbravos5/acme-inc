import { ProductCard } from '@/app/(home)/components/ProductCard';
import { Product } from '@/domain/models/Product';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockProduct: Product = {
  id: '1',
  name: 'Product 1',
  image: '/path/to/image.jpg',
  price: 100,
  description: 'bla bla bla'
};

describe('ProductCard Component', () => {
  it('renders the component with product details', () => {
    const { getByText, getByAltText } = render(<ProductCard product={mockProduct} isStarred={false} />);

    const productName = getByText('Product 1');
    const productPrice = getByText('R$ 100,00');
    const productImage = getByAltText('Product 1');

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productImage).toBeInTheDocument();
  });

  it('calls StarProduct component with correct props', () => {
    render(<ProductCard product={mockProduct} isStarred={false} />);
    const starProduct = document.querySelector('[data-testid="star-product"]');
    
    expect(starProduct).toBeTruthy();
  });

  it('renders "COMPRAR" button with correct href', () => {
    const { getByText } = render(<ProductCard product={mockProduct} isStarred={false} />);
    const buyButton = getByText('COMPRAR');

    expect(buyButton).toHaveAttribute('href', `/products/${mockProduct.id}`)
  });
});