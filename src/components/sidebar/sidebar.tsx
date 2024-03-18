import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

export type SidebarGenericProps<T = any> = {
  children: React.ReactNode;
  className?: string;
} & T;

export function Sidebar({ className, children }: SidebarGenericProps) {
  return (
    <aside
      className={cn([
        'border-r border-border flex flex-col overflow-y-auto',
        className
      ])}
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({ className, children }: SidebarGenericProps) {
  return <header className={cn(['px-6', className])}>{children}</header>;
}

export function SidebarHeaderTitle({
  className,
  children
}: SidebarGenericProps) {
  return <h2 className={cn(['', className])}>{children}</h2>;
}

export function SidebarMain({ className, children }: SidebarGenericProps) {
  return <main className={cn(['px-3', className])}>{children}</main>;
}

export function SidebarNav({ className, children }: SidebarGenericProps) {
  return (
    <nav className={cn(['border-b border-border mb-4', className])}>
      {children}
    </nav>
  );
}

export function SidebarNavHeader({ className, children }: SidebarGenericProps) {
  return <header className={cn(['', className])}>{children}</header>;
}

export function SidebarNavHeaderTitle({
  className,
  children
}: SidebarGenericProps) {
  return (
    <h4
      className={cn([
        'text-sm uppercase text-muted-foreground justify-center flex',
        className
      ])}
    >
      {children}
    </h4>
  );
}

export function SidebarNavMain({ className, children }: SidebarGenericProps) {
  return <main className={cn(['flex flex-col', className])}>{children}</main>;
}

type SidebarNavLinkProps = {
  href: string;
  active?: boolean;
};

export function SidebarNavLink({
  className,
  children,
  href,
  active
}: SidebarGenericProps<SidebarNavLinkProps>) {
  return (
    <Link
      href={href}
      className={cn([
        'flex items-center text-sm px-3 h-10 rounded-md',
        active && 'bg-secondary',
        className
      ])}
    >
      {children}
    </Link>
  );
}

export function SidebarFooter({ className, children }: SidebarGenericProps) {
  return (
    <footer className={cn(['p-6 mt-auto border-t border-border', className])}>
      {children}
    </footer>
  );
}
