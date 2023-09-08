import { LinkProps } from 'next/link';
import React, { PropsWithChildren } from 'react';

import '@testing-library/jest-dom';
import { useAtom } from 'jotai';
import { SessionStatus } from '@/components/Header/SessionStatus';
import { fireEvent, render } from '@testing-library/react';

jest.mock('jotai', () => ({
  ...jest.requireActual('jotai'),
  useAtom: jest.fn()
}));

const mockecActiveUser = { active: true, user: { name: 'João Doe' } };

describe('SessionStatus Component', () => {
  it('renders the component when active session', () => {
    (useAtom as jest.Mock).mockReturnValue([mockecActiveUser, jest.fn()]);

    const { getByText } = render(<SessionStatus />);
    const welcomeText = getByText('Bem vindo,');

    expect(welcomeText).toBeInTheDocument();
  });

  it('renders the component when no active session', () => {
    (useAtom as jest.Mock).mockReturnValue([{ active: false, user: null }, jest.fn()]);

    const { getByText } = render(<SessionStatus />);
    const signInButton = getByText('ENTRAR');

    expect(signInButton).toBeInTheDocument();
  });

  it('triggers sign out when clicked', async () => {
    const setSessionMock = jest.fn();
    (useAtom as jest.Mock).mockReturnValue([mockecActiveUser, setSessionMock]);

    const { getByText, findByText } = render(<SessionStatus />);

    const userSessionButton = getByText('Bem vindo,');

    fireEvent.click(userSessionButton);

    const signOutButton = await findByText('Sair');

    fireEvent.click(signOutButton);

    expect(setSessionMock).toHaveBeenCalledWith({ active: false, user: null });
  });
});
