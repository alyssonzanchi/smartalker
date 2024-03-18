'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const createUserFormSchema = z
  .object({
    fullname: z
      .string()
      .min(1, { message: 'Por favor informe o seu nome completo' })
      .transform((fullname) => {
        return fullname
          .trim()
          .split(' ')
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
          })
          .join(' ');
      }),
    email: z
      .string()
      .email({ message: 'O email inserido é inválido' })
      .toLowerCase(),
    password: z
      .string()
      .min(6, { message: 'A senha precisa ter 6 caracteres ou mais' }),
    confirm_password: z
      .string()
      .min(1, { message: 'A confirmação da senha é obrigatória' })
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: 'As senhas não são iguais',
    path: ['confirm_password']
  });

type createUserFormData = z.infer<typeof createUserFormSchema>;

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<createUserFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(createUserFormSchema)
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const onSubmit = async (data: createUserFormData) => {
    setIsLoading(true);

    await axios
      .post('../api/users', data, {
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then(function () {
        router.push('/auth/login');
      })
      .catch(function (res) {
        toast.error('Erro', {
          description: res.response.data.error
        });
      });

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullname">Nome completo</Label>
        <Input
          id="fullname"
          placeholder="Enter Full Name"
          disabled={isLoading}
          {...register('fullname')}
        />
        {errors.fullname && (
          <span className="inline-block text-sm text-red-500">
            {errors.fullname.message}
          </span>
        )}
      </div>
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
        <div className="flex items-center">
          <Label htmlFor="password">Senha</Label>
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
      <div className="space-y-2">
        <div className="flex items-center">
          <Label htmlFor="confirm_password">Confirmação da senha</Label>
        </div>
        <div className="relative">
          <Input
            id="confirm_password"
            type={showConfirmPassword ? 'text' : 'password'}
            disabled={isLoading}
            {...register('confirm_password')}
          />

          <Button
            className="absolute bottom-1 right-1 h-7 w-7"
            size="icon"
            variant="ghost"
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            disabled={isLoading}
          >
            {showConfirmPassword && <LuEyeOff className="h-4 w-4" />}
            {!showConfirmPassword && <LuEye className="h-4 w-4" />}
            <span className="sr-only">Alterar visibilidade da senha</span>
          </Button>
        </div>
        {errors.confirm_password && (
          <span className="inline-block text-sm text-red-500">
            {errors.confirm_password.message}
          </span>
        )}
      </div>
      <Button disabled={isLoading} className="w-full" type="submit">
        {isLoading && <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />}
        Cadastrar
      </Button>
    </form>
  );
}
