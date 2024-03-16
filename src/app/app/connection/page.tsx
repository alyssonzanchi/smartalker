import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CreateInstanceForm from '@/app/app/connection/_components/create-instance-form';

export default function Connection() {
  return (
    <div>
      <div className="flex justify-between mt-5 mx-10">
        <h1>Connections</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>New Whatsapp</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Whatsapp</DialogTitle>
              <DialogDescription>
                Enter the information to add a new Whatsapp. Click save when
                you&apos;re done.
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
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Session</TableHead>
              <TableHead>Default</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </div>
  );
}
