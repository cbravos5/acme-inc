import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MustSignInDialog } from '@/components/MustSignInDialog';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/products/some-product'), // Mocking usePathname
}));

jest.mock('jotai', () => ({
  ...jest.requireActual('jotai'),
  useAtom: jest.fn().mockReturnValue([true, jest.fn()]), // Mocking useAtom
}));

describe('MustSignInDialog Component', () => {
  it('renders the component', () => {
    const { getByText } = render(<MustSignInDialog />);
    expect(getByText('Para continuar você deve possuir uma conta')).toBeInTheDocument();
  });

  it('renders correct link for "Acessar conta"', () => {
    const { getByText } = render(<MustSignInDialog />);
    expect(getByText('Acessar conta')).toHaveAttribute('href', '/sign-in?product=some-product');
  });

  it('renders correct link for "Criar conta"', () => {
    const { getByText } = render(<MustSignInDialog />);
    expect(getByText('Criar conta')).toHaveAttribute('href', '/sign-up?product=some-product');
  });

  it('closes the dialog when "Acessar conta" is clicked', () => {
    const setSignInDialogMock = jest.fn();
    jest.spyOn(require('jotai'), 'useAtom').mockReturnValue([true, setSignInDialogMock]);

    const { getByText } = render(<MustSignInDialog />);
    const accessAccountButton = getByText(/Acessar conta/i);

    fireEvent.click(accessAccountButton);

    expect(setSignInDialogMock).toHaveBeenCalledWith(false);
  });

  it('closes the dialog when "Criar conta" is clicked', () => {
    const setSignInDialogMock = jest.fn();
    jest.spyOn(require('jotai'), 'useAtom').mockReturnValue([true, setSignInDialogMock]);

    const { getByText } = render(<MustSignInDialog />);
    const createAccountButton = getByText(/Criar conta/i);

    fireEvent.click(createAccountButton);

    expect(setSignInDialogMock).toHaveBeenCalledWith(false);
  });
});
