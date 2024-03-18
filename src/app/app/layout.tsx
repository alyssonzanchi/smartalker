import MainSidebarAdmin from '@/components/sidebar/main-sidebar-admin';
import MainSidebarSuperAdmin from '@/components/sidebar/main-sidebar-superAdmin';
import MainSidebarUser from '@/components/sidebar/main-sidebar-user';
import { isAdmin } from '@/lib/isAdmin';
import { isSuperAdmin } from '@/lib/isSuperAdmin';
import { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
  const admin = await isAdmin();
  const superAdmin = await isSuperAdmin();

  if (superAdmin === true) {
    return (
      <div className="grid grid-cols-[16rem_1fr] gap-4 h-screen">
        <MainSidebarSuperAdmin />
        <main>{children}</main>
      </div>
    );
  }

  if (admin === true) {
    return (
      <div className="grid grid-cols-[16rem_1fr] gap-4 h-screen">
        <MainSidebarAdmin />
        <main>{children}</main>
      </div>
    );
  }

  if (admin === false && superAdmin === false) {
    return (
      <div className="grid grid-cols-[16rem_1fr] gap-4 h-screen">
        <MainSidebarUser />
        <main>{children}</main>
      </div>
    );
  }
}
