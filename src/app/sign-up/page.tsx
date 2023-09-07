'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { InputWithLabel } from '@/components/ui/InputWithLabel';
import { ThemedButton } from '@/components/ThemedButton';
import { signUp } from '@/main/registry';
import { useToast } from '@/components/ui/useToast';
import { PasswordInput } from '@/components/PasswordInput';

import Logo from '@/assets/Logo.svg';

import { UserSchema } from '@/domain/models/User';
import { useRouter, useSearchParams } from 'next/navigation';

const signUpSchema = z
  .object({
    passwordConfirmation: z.string().nonempty('Confirmação de senha é obrigatório')
  })
  .merge(UserSchema)
  .refine((schema) => schema.password === schema.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Senhas devem ser iguais'
  });

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<SignUpForm>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async ({ passwordConfirmation, ...data  }: SignUpForm) => {
    try {
      await signUp.execute(data);

      toast({ title: 'Conta criada com sucesso!' });

      if(searchParams.get('checkout'))
        router.push('/checkout');
      else
        router.push('/');
      
    } catch (error: any) {
      toast({ title: error?.message || 'Ocorreu um erro ao criar sua conta!' })
    }
  };

  return (
    <div className="h-full">
      <main className="flex h-full w-full items-center justify-center">
        <Card className="w-fit md:min-w-md">
          <CardHeader className="items-center">
            <CardTitle className="text-2xl">CRIE SUA CONTA</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
              <InputWithLabel label="Nome" error={errors.name?.message} {...register('name')} />
              <InputWithLabel label="E-mail" error={errors.email?.message} {...register('email')} />
              <Controller
                control={control}
                name="phone"
                defaultValue=""
                render={({ field }) => (
                  <PatternFormat
                    format="(##) #####-####"
                    customInput={InputWithLabel}
                    label="Telefone"
                    name={field.name}
                    error={errors.phone?.message}
                    value={field.value}
                    onBlur={field.onBlur}
                    getInputRef={field.ref}
                    onValueChange={(data) => field.onChange(data.value)}
                  />
                )}
              />

              <PasswordInput label="Senha" error={errors.password?.message} {...register('password')} />
              <PasswordInput
                label="Confirmação de senha"
                error={errors.passwordConfirmation?.message}
                {...register('passwordConfirmation')}
              />

              <ThemedButton isLoading={isSubmitting} className="mt-4">
                Cadastrar
              </ThemedButton>

              <p className="text-sm">
                Já possui uma conta?{' '}
                <Link className="underline hover:text-gray-300" href="/sign-in">
                  Clique aqui
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
