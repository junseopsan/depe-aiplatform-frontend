/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";
import { PROJECT_TABS } from "../data/project-tabs";

type ProjectTabBarProps = {
  projectId: string;
};

export const ProjectTabBar = ({ projectId }: ProjectTabBarProps) => {
  const activeSegment = useSelectedLayoutSegment();
  const base = `/projects/${projectId}`;

  return (
    <nav className="flex h-11 shrink-0 items-stretch border-b border-[var(--gray-200)] bg-card px-8">
      {PROJECT_TABS.map((tab) => {
        const isActive = activeSegment === tab.segment;
        const href = tab.segment ? `${base}/${tab.segment}` : base;
        return (
          <Link
            key={tab.id}
            href={href}
            className={cn(
              "inline-flex items-center border-b-2 px-5 text-sm font-medium transition-colors first:pl-0",
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
