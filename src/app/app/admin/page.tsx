import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/isAdmin';

export default async function Dashboard() {
  const admin = await isAdmin();

  if (admin === false) {
    redirect('/denied');
  } else {
    return (
      <div>
        <div>
          <h1>Admin Page</h1>
        </div>
      </div>
    );
  }
}
