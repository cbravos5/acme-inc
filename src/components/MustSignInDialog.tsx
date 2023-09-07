'use client';

import Link from 'next/link';
import { Button } from './ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/Dialog';
import { useAtom } from 'jotai';
import { signInDialogAtom } from '@/store/signInDialog';
import { usePathname } from 'next/navigation';

const getLinkParams = (path: string) => {
  if (path.includes('/products')) return '?product=' + path.split('/').pop();
  if (path.includes('/checkout')) return '?checkout=true';
  return '';
};

export function MustSignInDialog() {
  const [signInDialog, setSignInDialog] = useAtom(signInDialogAtom);

  const path = usePathname();

  return (
    <Dialog open={signInDialog} onOpenChange={setSignInDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Para continuar você deve possuir uma conta</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Acesse sua conta e comece a usufruir da nossa variada lista de produtos
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => setSignInDialog(false)} asChild>
            <Link href={'/sign-in' + getLinkParams(path)}>Acessar conta</Link>
          </Button>
          <Button onClick={() => setSignInDialog(false)} variant="secondary" asChild>
            <Link href={'/sign-up' + getLinkParams(path)}>Criar conta</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
