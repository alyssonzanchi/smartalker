import { redirect } from 'next/navigation';
import { isSuperAdmin } from '@/lib/isSuperAdmin';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import CreateBusinessForm from '@/components/create-business-form';
import { getBusiness } from '@/lib/getBusiness';

export default async function AddBusiness() {
  const superAdmin = await isSuperAdmin();

  const business = await getBusiness();

  console.log(business);

  if (superAdmin === false) {
    redirect('/denied');
  } else {
    return (
      <div>
        <div className="flex items-center justify-between my-5 mx-10">
          <h1>Empresas</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Nova Empresa</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Nova Empresa</DialogTitle>
                <DialogDescription>
                  Entre com as informações para adicionar uma nova empresa.
                  Clique em salvar após finalizar.
                </DialogDescription>
              </DialogHeader>

              <CreateBusinessForm />
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {business.map((_, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{business[i].name}</TableCell>
                    <TableCell>{business[i].cnpj}</TableCell>
                    <TableCell>{business[i].status}</TableCell>
                    <TableCell>{business[i].expireAt}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}
