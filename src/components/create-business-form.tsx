'use client';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const createBusinessFormSchema = z.object({
  name: z.string().min(1, { message: 'Por favor informe o nome da empresa' }),
  cnpj: z.string().min(11, { message: 'CNPJ inválido' })
});

type createBusinessFormData = z.infer<typeof createBusinessFormSchema>;

export default function CreateBusinessForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<createBusinessFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(createBusinessFormSchema)
  });

  const router = useRouter();

  const onSubmit = async (data: createBusinessFormData) => {
    await axios
      .post('../../api/business', data, {
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then(function () {
        toast.success('Sucesso', {
          description: 'Empresa cadastrada com sucesso'
        });
        router.refresh();
      })
      .catch(function (res) {
        toast.error('Erro', {
          description: res.response.data.error
        });
        console.log(res);
      });
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

      <div className="flex items-center space-x-4 mb-2">
        <Label htmlFor="cnpj">CNPJ</Label>
        <Input id="cnpj" {...register('cnpj')} />
      </div>
      {errors.cnpj && (
        <span className="inline-block text-sm text-red-500">
          {errors.cnpj.message}
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
