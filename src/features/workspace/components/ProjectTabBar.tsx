"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";

type Tab = {
  id: string;
  label: string;
  segment: string | null;
};

const TABS: Tab[] = [
  { id: "dashboard", label: "Dashboard", segment: null },
  { id: "itb", label: "ITB", segment: "itb" },
  { id: "irs", label: "IRS", segment: "irs" },
  { id: "dc", label: "Design Criteria", segment: "dc" },
  { id: "mps", label: "MPS", segment: "mps" },
  { id: "pnid", label: "P&ID", segment: "pnid" },
  { id: "compare", label: "문서비교", segment: "compare" },
  { id: "itb-history", label: "ITB 이력", segment: "itb-history" },
];

type ProjectTabBarProps = {
  projectId: string;
};

export const ProjectTabBar = ({ projectId }: ProjectTabBarProps) => {
  const activeSegment = useSelectedLayoutSegment();
  const base = `/projects/${projectId}`;

  return (
    <nav className="flex h-11 shrink-0 items-stretch border-b border-[var(--gray-200)] bg-card px-8">
      {TABS.map((tab, i) => {
        const isActive = activeSegment === tab.segment;
        const href = tab.segment ? `${base}/${tab.segment}` : base;
        return (
          <Link
            key={tab.id}
            href={href}
            className={cn(
              "inline-flex items-center border-b-2 px-5 text-sm font-medium transition-colors",
              i === 0 && "pl-0",
              isActive
                ? "border-[var(--primary-500)] text-[var(--primary-500)]"
                : "border-transparent text-[var(--gray-500)] hover:text-[var(--gray-700)]",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
};
