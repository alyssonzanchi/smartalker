import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card
} from '@/components/ui/card';
import Link from 'next/link';
import { RegisterForm } from '@/components/auth/register-form';

export default function Register() {
  return (
    <div className="h-screen px-4 py-6 space-y-12 md:px-10 flex items-center justify-center">
      <div className="space-y-2">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Cadastrar</CardTitle>
            <CardDescription>
              Insira suas credenciais abaixo para cadastrar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
            <div className="mt-4 text-center text-sm">
              Já tem uma conta?
              <Link className="underline" href="/auth/login">
                Entrar
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
