import { Cart } from '@/components/Header/Cart';
import { render } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import React from 'react';

import '@testing-library/jest-dom';

jest.mock('jotai', () => ({
  ...jest.requireActual('jotai'),
  useAtomValue: jest.fn()
}));

describe('Cart Component', () => {
  it('renders the component with cart count', () => {
    (useAtomValue as jest.Mock).mockReturnValue([{ quantity: 2 }, { quantity: 3 }]);

    const { getByText } = render(<Cart />);
    const cartValue = getByText(5);

    expect(cartValue).toBeInTheDocument();
  });

  it('renders the component with no cart count', () => {
    (useAtomValue as jest.Mock).mockReturnValue([]);

    const { queryByText } = render(<Cart />);
    const cartValue = queryByText(/\d/i);

    expect(cartValue).toBeNull();
  });

  it('has correct link to /checkout', () => {
    (useAtomValue as jest.Mock).mockReturnValue([]);

    const { container } = render(<Cart />);
    const linkElement = container.querySelector('a');

    expect(linkElement).toHaveAttribute('href', '/checkout');
  });
});
