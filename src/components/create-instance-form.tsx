'use client';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createInstanceFormSchema = z.object({
  name: z.string().min(1, { message: 'Por favor informe o nome da instância' })
});

type createInstanceFormData = z.infer<typeof createInstanceFormSchema>;

export default function CreateInstanceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<createInstanceFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(createInstanceFormSchema)
  });

  const onSubmit = (data: createInstanceFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center space-x-4 mb-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" {...register('name')} />
      </div>
      {errors.name && (
        <span className="inline-block text-sm text-red-500">
          {errors.name.message}
        </span>
      )}

      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button type="button" variant="destructive">
            Fechar
          </Button>
        </DialogClose>
        <Button type="submit">Salvar</Button>
      </DialogFooter>
    </form>
  );
}
