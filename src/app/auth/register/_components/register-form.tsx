'use client';

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
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
      .min(1, { message: 'Please enter your full name' })
      .transform((fullname) => {
        return fullname
          .trim()
          .split(' ')
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
          })
          .join(' ');
      }),
    email: z.string().email({ message: 'Email is invalid' }).toLowerCase(),
    password: z
      .string()
      .min(6, { message: 'Password must be 6 or more characters long' }),
    confirm_password: z
      .string()
      .min(1, { message: 'Confirm password is required' })
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Password doesn't match",
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
    console.log(data);
    setIsLoading(true);

    await axios
      .post('../api/users', data, {
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then(function (res) {
        console.log(res);
        router.push('/auth/login');
      })
      .catch(function (res) {
        toast.error('Error', {
          description: res.response.data.error
        });
      });

    setIsLoading(false);
  };

  return (
    <div className="h-screen px-4 py-6 space-y-12 md:px-10 flex items-center justify-center">
      <div className="space-y-2">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your credentials below to register to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
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
                  <Label htmlFor="password">Password</Label>
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
                    <span className="sr-only">Toggle password visibility</span>
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
                  <Label htmlFor="confirm_password">Confirm Password</Label>
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
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
                {errors.confirm_password && (
                  <span className="inline-block text-sm text-red-500">
                    {errors.confirm_password.message}
                  </span>
                )}
              </div>
              <Button disabled={isLoading} className="w-full" type="submit">
                {isLoading && (
                  <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign up
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?
              <Link className="underline" href="/auth/login">
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
