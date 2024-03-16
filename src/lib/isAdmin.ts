import { getCurrentUser } from '@/lib/session';
import { db as prisma } from '@/lib/db';

export async function isAdmin() {
  const res = await getCurrentUser();
  const email = res?.email;

  const user = await prisma.user.findUnique({
    where: {
      email: email!
    }
  });

  if (user?.admin === false) return false;
  else return true;
}
