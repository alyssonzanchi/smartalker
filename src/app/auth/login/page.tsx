import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card
} from '@/components/ui/card';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';

export default function Login() {
  return (
    <div className="h-screen px-4 py-6 space-y-12 md:px-10 flex items-center justify-center">
      <div className="space-y-2">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
            <CardDescription>
              Insira suas credenciais abaixo para entrar em sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <div className="mt-4 text-center text-sm">
              Não tenho uma conta?
              <Link className="underline" href="/auth/register">
                Cadastrar
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
