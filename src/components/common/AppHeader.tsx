/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  USER_ROLE_OPTIONS,
  useUserRole,
  type UserRole,
} from "@/lib/use-user-role";
import { UiBadge } from "@/components/ui/UiBadge";
import { UiSegmented } from "@/components/ui/UiSegmented";
import { TopLoadingBar } from "@/components/common/TopLoadingBar";

/**
 * admin 만 의미 있는 경로들 — member 로 전환 시 목록으로 이동시킨다.
 * 워크스페이스 탭(/projects/[contractNo]/itb 등)은 member 도 접근 가능하므로 제외.
 */
const ADMIN_ONLY_PATTERNS: RegExp[] = [
  /^\/projects\/[^/]+$/, // 상세 (PREPARING/CLOSED 등 member 비가시 상태 가능)
  /^\/projects\/[^/]+\/edit$/, // 수정 (admin 한정 동작)
  /^\/projects\/new$/, // 생성
  /^\/templates(\/|$)/, // 템플릿 (admin 전용 메뉴)
];

const isAdminOnlyPath = (pathname: string) =>
  ADMIN_ONLY_PATTERNS.some((p) => p.test(pathname));

type NavItem = {
  label: string;
  href: string;
  isActive: (pathname: string) => boolean;
  /** 보이는 role 목록. 미지정 시 모든 role에 노출 */
  roles?: UserRole[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Projects",
    href: "/projects",
    isActive: (p) => p.startsWith("/projects"),
  },
  {
    label: "AI Q&A",
    href: "/ai-qna",
    isActive: (p) => p.startsWith("/ai-qna"),
    roles: ["member"],
  },
  {
    label: "Templates",
    href: "/templates",
    isActive: (p) => p.startsWith("/templates"),
    roles: ["admin"],
  },
];

const NOTIFICATION_COUNT = 3;

export const AppHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { role, setRole } = useUserRole();
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);

  useEffect(() => {
    if (!pendingRole || pathname !== "/projects") return;
    // effect 본문에서 동기 setState 회피 (eslint 규칙)
    const id = setTimeout(() => {
      setRole(pendingRole);
      setPendingRole(null);
    }, 0);
    return () => clearTimeout(id);
  }, [pathname, pendingRole, setRole]);

  const navItems = NAV_ITEMS.filter(
    (item) => !item.roles || item.roles.includes(role),
  );

  const handleRoleChange = (next: UserRole) => {
    if (next === "member" && isAdminOnlyPath(pathname)) {
      setPendingRole(next);
      router.push("/projects");
      return;
    }
    setRole(next);
  };

  return (
    <div className="contents">
      <TopLoadingBar />
      <header className="sticky top-0.5 z-[99] grid h-[52px] shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-[var(--gray-200)] bg-card px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary-500)] text-sm font-bold text-white">
            D
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--gray-800)]">
            EPC PE AI-Platform
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = item.isActive(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex h-[52px] items-center border-b-2 px-[18px] text-sm transition-colors",
                  isActive
                    ? "border-[var(--primary-500)] font-semibold text-[var(--primary-500)]"
                    : "border-transparent font-medium text-[var(--gray-500)] hover:text-[var(--gray-700)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <UiSegmented
            name="user-role"
            options={USER_ROLE_OPTIONS}
            value={pendingRole ?? role}
            onChange={handleRoleChange}
            size="sm"
          />
          <button
            type="button"
            aria-label="알림"
            className="relative flex h-8 w-8 items-center justify-center rounded border border-transparent bg-card text-[var(--gray-700)] transition-colors hover:border-[var(--gray-200)] hover:bg-[var(--gray-50)]"
          >
            <Bell size={16} />
            <UiBadge
              count={NOTIFICATION_COUNT}
              pulse
              className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2"
            />
          </button>
        </div>
      </header>
    </div>
  );
};
