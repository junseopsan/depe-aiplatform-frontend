"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileStack,
  MessageSquare,
  Settings,
  BarChart3,
  Users,
  FolderOpen,
  BookTemplate,
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
};

const NAV_MAIN: NavItem[] = [
  { icon: <LayoutDashboard size={18} />, label: "대시보드", disabled: true },
  { icon: <FileStack size={18} />, label: "산출물관리", active: true },
  { icon: <BookTemplate size={18} />, label: "표준템플릿관리", disabled: true },
  { icon: <FolderOpen size={18} />, label: "문서함", disabled: true },
  { icon: <MessageSquare size={18} />, label: "AI Chat", disabled: true },
  { icon: <BarChart3 size={18} />, label: "리포트", disabled: true },
  { icon: <Users size={18} />, label: "팀 관리", disabled: true },
];

const NAV_BOTTOM: NavItem[] = [
  { icon: <Settings size={18} />, label: "설정", disabled: true },
  { icon: <HelpCircle size={18} />, label: "도움말", disabled: true },
];

function NavButton({
  icon,
  label,
  active,
  disabled,
  collapsed,
}: NavItem & { collapsed: boolean }) {
  return (
    <button
      disabled={disabled}
      title={collapsed ? label : undefined}
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
        collapsed && "justify-center px-0",
        active
          ? "bg-[var(--primary-50)] text-[var(--primary-700)]"
          : "text-[var(--gray-500)] hover:bg-[var(--gray-100)] hover:text-[var(--gray-900)]",
        disabled &&
          !active &&
          "cursor-not-allowed opacity-50 hover:bg-transparent hover:text-[var(--gray-500)]",
      )}
    >
      <span
        className={cn(
          "shrink-0 transition-colors",
          active
            ? "text-[var(--primary-500)]"
            : "text-[var(--gray-400)] group-hover:text-[var(--gray-600)]",
          disabled && !active && "group-hover:text-[var(--gray-400)]",
        )}
      >
        {icon}
      </span>
      {!collapsed && (
        <>
          <span className="truncate">{label}</span>
          {active && (
            <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary-500)]" />
          )}
        </>
      )}
    </button>
  );
}

export function SidebarLogo({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center bg-card transition-all duration-200",
        collapsed ? "w-[60px] justify-center px-0" : "w-[220px] gap-2.5 px-4",
      )}
    >
      <button
        onClick={collapsed ? onToggle : undefined}
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-500)] text-[10px] font-bold tracking-wide text-white transition-transform",
          collapsed && "cursor-pointer hover:scale-110",
        )}
        title={collapsed ? "사이드바 펼치기" : undefined}
      >
        {collapsed ? <PanelLeftOpen size={16} /> : <span>AI</span>}
      </button>
      {!collapsed && (
        <>
          <div className="flex-1">
            <p className="text-sm font-semibold leading-tight text-foreground">
              EPC PE
            </p>
            <p className="text-[10px] text-muted-foreground">AI-Platform</p>
          </div>
          <button
            onClick={onToggle}
            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-[var(--gray-400)] transition-colors hover:bg-[var(--gray-100)] hover:text-[var(--gray-600)]"
            title="사이드바 접기"
          >
            <PanelLeftClose size={16} />
          </button>
        </>
      )}
    </div>
  );
}

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col border-r border-border bg-card transition-all duration-200",
        collapsed ? "w-[60px]" : "w-[220px]",
      )}
    >
      {/* Main nav */}
      <nav className={cn("flex flex-1 flex-col gap-1 py-4", collapsed ? "px-2" : "px-3")}>
        {NAV_MAIN.map((item) => (
          <NavButton key={item.label} {...item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Bottom nav */}
      <nav className={cn("flex flex-col gap-1 border-t border-border py-3", collapsed ? "px-2" : "px-3")}>
        {NAV_BOTTOM.map((item) => (
          <NavButton key={item.label} {...item} collapsed={collapsed} />
        ))}

        {/* User */}
        <div
          className={cn(
            "mt-2 flex items-center rounded-lg py-2",
            collapsed ? "justify-center px-0" : "gap-2.5 px-3",
          )}
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--gray-200)] text-[11px] font-medium text-[var(--gray-600)]">
            JS
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-xs font-medium text-foreground">
                준섭
              </p>
              <p className="truncate text-[10px] text-muted-foreground">
                PE Engineer
              </p>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
