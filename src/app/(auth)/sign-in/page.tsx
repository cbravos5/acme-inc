'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { InputWithLabel } from '@/components/ui/InputWithLabel';
import { ThemedButton } from '@/components/ThemedButton';
import { signIn } from '@/main/registry';
import { useToast } from '@/components/ui/useToast';
import { PasswordInput } from '@/components/PasswordInput';

import { UserSchema } from '@/domain/models/User';
import { useSetAtom } from 'jotai';
import { sessionAtom } from '@/store/session';
import { Button } from '@/components/ui/Button';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { ArrowLeftCircleIcon } from '@/components/icons/ArrowLeftCircleIcon';

const signInSchema = UserSchema.omit({ name: true, phone: true });

type SignInForm = z.infer<typeof signInSchema>;

export default function SignIn() {
  const { toast } = useToast();

  const setSession = useSetAtom(sessionAtom);
  const searchParams = useSearchParams();

  const createAccountUrl = useMemo(() => {
    const checkout = searchParams.get('checkout');
    const product = searchParams.get('product');

    if (checkout) return '/sign-up?checkout=true';
    if (product) return `/sign-up?product=${product}`;

    return '/sign-up';
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInForm>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: SignInForm) => {
    try {
      const response = await signIn.execute(data);

      setSession({ active: true, user: response });
    } catch (error: any) {
      toast({ title: error?.message || 'Credenciais inválidas!' });
    }
  };

  return (
    <main className="mx-auto flex h-full w-fit flex-col justify-center gap-2">
      <Button variant="ghost" className="gap-1 self-start text-lg" asChild>
        <Link href="/">
          <ArrowLeftCircleIcon className="h-6 w-6" />
          Página inical
        </Link>
      </Button>

      <Card className="w-fit md:min-w-md">
        <CardHeader className="items-center">
          <CardTitle className="text-2xl">ACESSE SUA CONTA</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <InputWithLabel label="E-mail" error={errors.email?.message} {...register('email')} />
            <PasswordInput label="Senha" error={errors.password?.message} {...register('password')} />

            <ThemedButton isLoading={isSubmitting} className="mt-4">
              Entrar
            </ThemedButton>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">ou</span>
            </div>
          </div>
          <Button variant="secondary" className="w-full bg-gray-200" asChild>
            <Link href={createAccountUrl}>Crie uma conta</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
