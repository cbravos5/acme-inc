import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { act } from 'react-dom/test-utils';
import { StarProduct } from '@/components/StarProduct';
import '@testing-library/jest-dom';

// Mocking atoms and functions
jest.mock('jotai', () => ({
  ...jest.requireActual('jotai'),
  useAtomValue: jest.fn(),
  useSetAtom: jest.fn(),
}));

const mockSessionAtom = {
  user: { email: 'test@example.com' }
};

describe('StarProduct Component', () => {
  it('renders the component', () => {
    (useAtomValue as jest.Mock).mockReturnValue(mockSessionAtom);
    (useSetAtom as jest.Mock).mockReturnValue(jest.fn());

    const { container } = render(<StarProduct isStarred={false} productId="1" />);
    expect(container).toBeInTheDocument();
  });

  it('handles star click when user is signed in', async () => {
    (useAtomValue as jest.Mock).mockReturnValue(mockSessionAtom);
    const setStarredProducts = jest.fn();
    (useSetAtom as jest.Mock).mockReturnValue(setStarredProducts);

    const { getByRole } = render(<StarProduct isStarred={false} productId="1" />);
    const starButton = getByRole('button');

    await act(async () => {
      fireEvent.click(starButton);
    });

    expect(setStarredProducts).toHaveBeenCalledTimes(1);
  });

  it('handles star click when user is not signed in', async () => {
    const setSignInDialog = jest.fn();
    // Signed-out user
    (useAtomValue as jest.Mock).mockReturnValue({ user: null }); 
    (useSetAtom as jest.Mock).mockReturnValue(setSignInDialog);

    const { getByRole } = render(<StarProduct isStarred={false} productId="1" />);
    const starButton = getByRole('button');

    await act(async () => {
      fireEvent.click(starButton);
    });

    expect(setSignInDialog).toHaveBeenCalledWith(true);
  });
});