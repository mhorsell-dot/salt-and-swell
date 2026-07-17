"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Boxes,
  ChevronRight,
  CircleDollarSign,
  Contact,
  FolderKanban,
  LayoutDashboard,
  Mail,
  Package,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";

type SidebarProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

const mainNavigation = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
];

const catalogueNavigation = [
  {
    label: "Categories",
    href: "/admin/categories",
    icon: Boxes,
  },
  {
    label: "Collections",
    href: "/admin/collections",
    icon: FolderKanban,
  },
];

const contentNavigation = [
  {
    label: "Journal",
    href: "/admin/journal",
    icon: BookOpen,
  },
  {
    label: "Newsletter",
    href: "/admin/newsletter",
    icon: Mail,
  },
  {
    label: "Contacts",
    href: "/admin/contacts",
    icon: Contact,
  },
];

function NavigationLink({
  label,
  href,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition",
        active
          ? "bg-white text-slate-950 shadow-sm ring-1 ring-black/5"
          : "text-slate-400 hover:bg-white/5 hover:text-white",
      ].join(" ")}
    >
      <span className="flex items-center gap-3">
        <Icon
          className={[
            "h-[18px] w-[18px]",
            active ? "text-slate-950" : "text-slate-500 group-hover:text-white",
          ].join(" ")}
        />
        {label}
      </span>

      {active && <ChevronRight className="h-4 w-4 text-slate-400" />}
    </Link>
  );
}

function NavigationSection({
  title,
  items,
  pathname,
  onNavigate,
}: {
  title?: string;
  items: typeof mainNavigation;
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="space-y-2">
      {title && (
        <p className="px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-600">
          {title}
        </p>
      )}

      <nav className="space-y-1">
        {items.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <NavigationLink
              key={item.href}
              {...item}
              active={active}
              onClick={onNavigate}
            />
          );
        })}
      </nav>
    </div>
  );
}

export default function AdminSidebar({
  mobileOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  const content = (
    <aside className="flex h-full flex-col bg-[#101216] px-4 py-5 text-white">
      <div className="mb-8 flex items-center justify-between px-2">
        <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-black text-slate-950">
            S&S
          </div>

          <div>
            <p className="text-base font-bold tracking-tight">Salt & Swell</p>
            <p className="text-[11px] text-slate-500">Commerce administration</p>
          </div>
        </Link>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="Close navigation"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-7 overflow-y-auto">
        <NavigationSection
          items={mainNavigation}
          pathname={pathname}
          onNavigate={onClose}
        />

        <NavigationSection
          title="Catalogue"
          items={catalogueNavigation}
          pathname={pathname}
          onNavigate={onClose}
        />

        <NavigationSection
          title="Content"
          items={contentNavigation}
          pathname={pathname}
          onNavigate={onClose}
        />
      </div>

      <div className="mt-auto space-y-3 pt-6">
        <Link
          href="/admin/settings"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <Settings className="h-[18px] w-[18px]" />
          Settings
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <CircleDollarSign className="h-4 w-4 text-emerald-400" />
            Store status
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-slate-500">Online store</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Active
            </span>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="fixed inset-y-0 left-0 z-40 hidden w-[272px] lg:block">
        {content}
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="relative h-full w-[290px] max-w-[85vw]">{content}</div>
        </div>
      )}
    </>
  );
}
