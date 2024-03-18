'use client';

import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMain,
  SidebarNav,
  SidebarNavMain,
  SidebarNavLink,
  SidebarFooter
} from '@/components/sidebar/sidebar';

import {
  LuCalendar,
  LuContact2,
  LuHelpCircle,
  LuLayoutDashboard
} from 'react-icons/lu';

import {
  IoChatboxEllipsesOutline,
  IoLogoWhatsapp,
  IoPricetags
} from 'react-icons/io5';

export default async function MainSidebarUser() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };
  return (
    <Sidebar>
      <SidebarHeader>
        <h1></h1>
      </SidebarHeader>
      <SidebarMain>
        <SidebarNav className="border-none">
          <SidebarNavMain>
            <SidebarNavLink
              href="/app/dashboard"
              active={isActive('/app/dashboard')}
            >
              <LuLayoutDashboard className="w-4 h-4 mr-3" />
              Dashboard
            </SidebarNavLink>
            <SidebarNavLink href="/app/calls" active={isActive('/app/calls')}>
              <IoLogoWhatsapp className="w-4 h-4 mr-3" />
              Atendimentos
            </SidebarNavLink>
            <SidebarNavLink
              href="/app/contacts"
              active={isActive('/app/contacts')}
            >
              <LuContact2 className="w-4 h-4 mr-3" />
              Contatos
            </SidebarNavLink>
            <SidebarNavLink
              href="/app/schedules"
              active={isActive('/app/schedules')}
            >
              <LuCalendar className="w-4 h-4 mr-3" />
              Agendamentos
            </SidebarNavLink>
            <SidebarNavLink href="/app/tags" active={isActive('/app/tags')}>
              <IoPricetags className="w-4 h-4 mr-3 -rotate-90" />
              Tags
            </SidebarNavLink>
            <SidebarNavLink href="/app/chat" active={isActive('/app/chat')}>
              <IoChatboxEllipsesOutline className="w-4 h-4 mr-3" />
              Chat Interno
            </SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>
      </SidebarMain>

      <SidebarFooter>
        <SidebarNav className="border-none mb-0">
          <SidebarNavMain>
            <SidebarNavLink
              href="/app/help"
              className="px-0 py-0 h-0"
              active={isActive('/app/help')}
            >
              <LuHelpCircle className="w-4 h-4 mr-3" />
              Ajuda
            </SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>
      </SidebarFooter>
    </Sidebar>
  );
}
