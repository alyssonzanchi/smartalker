'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const loginUserFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'O email inserido é inválido' })
    .toLowerCase(),
  password: z.string().min(1, { message: 'A senha é obrigatória' })
});

type loginUserFormData = z.infer<typeof loginUserFormSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<loginUserFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(loginUserFormSchema)
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (data: loginUserFormData) => {
    setIsLoading(true);

    const res = await signIn<'credentials'>('credentials', {
      ...data,
      redirect: false
    });

    if (res?.error) {
      toast.error('Error', {
        description: res.error
      });
    } else {
      router.push('/app/dashboard');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="m@example.com"
          type="email"
          disabled={isLoading}
          {...register('email')}
        />
        {errors.email && (
          <span className="inline-block text-sm text-red-500">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-x-12">
          <Label htmlFor="password">Senha</Label>
          <Link className="ml-auto inline-block text-sm underline" href="#">
            Esqueceu a senha?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            disabled={isLoading}
            {...register('password')}
          />

          <Button
            className="absolute bottom-1 right-1 h-7 w-7"
            size="icon"
            variant="ghost"
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={isLoading}
          >
            {showPassword && <LuEyeOff className="h-4 w-4" />}
            {!showPassword && <LuEye className="h-4 w-4" />}
            <span className="sr-only">Alterar visibilidade da senha</span>
          </Button>
        </div>
        {errors.password && (
          <span className="inline-block text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>

      <Button disabled={isLoading} className="w-full" type="submit">
        {isLoading && <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />}
        Entrar
      </Button>
    </form>
  );
}
