import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import CreateInstanceForm from '@/components/create-instance-form';

export default function Connection() {
  return (
    <div>
      <div className="flex items-center justify-between my-5 mx-10">
        <h1>Conexões</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Novo Whatsapp</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Novo Whatsapp</DialogTitle>
              <DialogDescription>
                Insira as informações para adicionar um novo Whatsapp. Clique em
                salvar quando terminar.
              </DialogDescription>
            </DialogHeader>

            <CreateInstanceForm />
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sessão</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody></TableBody>
        </Table>
      </div>
    </div>
  );
}
