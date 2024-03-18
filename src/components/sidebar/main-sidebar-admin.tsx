'use client';

import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMain,
  SidebarNav,
  SidebarNavMain,
  SidebarNavLink,
  SidebarNavHeader,
  SidebarNavHeaderTitle,
  SidebarFooter
} from '@/components/sidebar/sidebar';

import {
  LuArrowRightLeft,
  LuCalendar,
  LuCalendarCheck,
  LuContact2,
  LuHelpCircle,
  LuInfo,
  LuLayoutDashboard,
  LuSettings,
  LuUsers,
  LuWorkflow
} from 'react-icons/lu';

import {
  IoChatboxEllipsesOutline,
  IoLogoWhatsapp,
  IoPricetags
} from 'react-icons/io5';

export default async function MainSidebarAdmin() {
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
        <SidebarNav>
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

        <SidebarNav className="border-none">
          <SidebarNavHeader>
            <SidebarNavHeaderTitle>Empresa</SidebarNavHeaderTitle>
          </SidebarNavHeader>
          <SidebarNavMain>
            <SidebarNavLink
              href="/app/campaigns"
              active={isActive('/app/campaigns')}
            >
              <LuCalendarCheck className="w-4 h-4 mr-3" />
              Campanhas
            </SidebarNavLink>
            <SidebarNavLink
              href="/app/informative"
              active={isActive('/app/informative')}
            >
              <LuInfo className="w-4 h-4 mr-3" />
              Informações
            </SidebarNavLink>
            <SidebarNavLink
              href="/app/connections"
              active={isActive('/app/connections')}
            >
              <LuArrowRightLeft className="w-4 h-4 mr-3" />
              Conexões
            </SidebarNavLink>
            <SidebarNavLink href="/app/queues" active={isActive('/app/queues')}>
              <LuWorkflow className="w-4 h-4 mr-3" />
              Filas e Chatbot
            </SidebarNavLink>
            <SidebarNavLink href="/app/users" active={isActive('/app/users')}>
              <LuUsers className="w-4 h-4 mr-3" />
              Usuários
            </SidebarNavLink>
            <SidebarNavLink
              href="/app/settings"
              active={isActive('/app/settings')}
            >
              <LuSettings className="w-4 h-4 mr-3" />
              Configurações
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
