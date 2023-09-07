import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Logo from '@/assets/Logo.svg';
import { InputWithLabel } from '@/components/ui/InputWithLabel';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function SignUp() {
  return (
    <div className="h-full">
      <main className="w-full h-full flex justify-center items-center">
        <Card className="w-fit md:min-w-md" >
          <CardHeader>
            <Image className="block mx-auto" src={Logo.src} width={277} height={61} alt="Acme inc." />
            <CardTitle className="text-xl">Crie sua conta</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-3">
              <InputWithLabel label="Nome" />
              <InputWithLabel label="E-mail" />
              <InputWithLabel label="Telefone" />
              <InputWithLabel label="Senha" type="password" />

              {/* <div className="w-full bg-white/20 h-[1px]"></div> */}

              <Button className='mt-4'>Cadastrar</Button>

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
