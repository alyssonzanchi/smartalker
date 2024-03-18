import { redirect } from 'next/navigation';
import { isSuperAdmin } from '@/lib/isSuperAdmin';

export default async function AdminDashboard() {
  const superAdmin = await isSuperAdmin();

  if (superAdmin === false) {
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
