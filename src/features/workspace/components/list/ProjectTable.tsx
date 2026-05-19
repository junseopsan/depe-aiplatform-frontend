/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { UiPill } from "@/components/ui/UiPill";
import { UiTable, type UiTableColumn } from "@/components/ui/UiTable";
import { useUserRole } from "@/lib/use-user-role";
import type { Project } from "@/features/workspace/types/workspace.types";
import {
  PROJECT_STATUS_BADGE,
  PROJECT_TYPE_BADGE,
} from "@/features/workspace/data/project-badges";
import { ItbUploadModal } from "@/features/workspace/components/list/ItbUploadModal";

type ProjectTableProps = {
  projects: Project[];
};

const baseColumns: UiTableColumn<Project>[] = [
  {
    key: "name",
    header: "프로젝트 이름",
    sortable: true,
    truncate: "360px",
    render: (p) => (
      <span className="font-medium text-[var(--gray-800)]">{p.name}</span>
    ),
  },
  { key: "contractNo", header: "계약번호", width: "150px", mono: true },
  {
    key: "type",
    header: "유형",
    width: "80px",
    render: (p) => {
      const badge = PROJECT_TYPE_BADGE[p.type];
      return <UiPill tone={badge.tone}>{badge.label}</UiPill>;
    },
  },
  {
    key: "status",
    header: "상태",
    width: "100px",
    render: (p) => {
      const badge = PROJECT_STATUS_BADGE[p.status];
      return <UiPill tone={badge.tone}>{badge.label}</UiPill>;
    },
  },
  { key: "client", header: "발주처", width: "180px" },
  {
    key: "period",
    header: "계약기간",
    width: "200px",
    mono: true,
    format: (p) => `${p.startDate} — ${p.endDate}`,
  },
];

const memberActionColumn: UiTableColumn<Project> = {
  key: "action",
  header: "",
  width: "60px",
  align: "center",
  render: (p) => (
    <Link
      href={`/projects/${p.contractNo}/itb`}
      aria-label="프로젝트 워크스페이스"
      className="inline-flex h-7 w-7 items-center justify-center rounded-[4px] text-[var(--gray-500)] transition-colors hover:bg-[var(--gray-100)] hover:text-[var(--gray-800)]"
    >
      <ArrowRight className="size-4" />
    </Link>
  ),
};

export const ProjectTable = ({ projects }: ProjectTableProps) => {
  const router = useRouter();
  const { role } = useUserRole();
  const [uploadTarget, setUploadTarget] = useState<Project | null>(null);

  const running = projects.filter((p) => p.status === "running").length;
  const ended = projects.filter((p) => p.status === "ended").length;

  const columns = useMemo<UiTableColumn<Project>[]>(() => {
    if (role !== "admin") return [...baseColumns, memberActionColumn];

    const adminItbColumn: UiTableColumn<Project> = {
      key: "itb",
      header: "ITB",
      width: "150px",
      align: "center",
      render: (p) => {
        const isClosed = p.status === "ended" || p.status === "canceled";
        const isDisabled = isClosed && p.itbCount === 0;
        const hasDocs = p.itbCount > 0;
        return (
          <button
            type="button"
            disabled={isDisabled}
            onClick={(e) => {
              e.stopPropagation();
              if (p.itbCount === 0) setUploadTarget(p);
            }}
            className={cn(
              "inline-flex h-7 w-[120px] cursor-pointer items-center justify-center rounded-[4px] border text-xs whitespace-nowrap transition-colors",
              hasDocs
                ? "border-[var(--primary-200)] bg-[var(--primary-50)] font-semibold text-[var(--primary-700)] hover:border-[var(--primary-500)]"
                : "border-[var(--gray-300)] bg-white font-medium text-[var(--gray-700)] hover:border-[var(--primary-500)] hover:bg-[var(--primary-50)] hover:text-[var(--primary-700)]",
              isDisabled && "pointer-events-none opacity-40",
            )}
          >
            업로드 문서 {p.itbCount}개
          </button>
        );
      },
    };
    return [...baseColumns, adminItbColumn];
  }, [role]);

  return (
    <div className="contents">
      <UiTable
        columns={columns}
        data={projects}
        rowKey={(p) => p.id}
        onRowClick={(p) => router.push(`/projects/${p.contractNo}`)}
        summary={{
          breakdown: [
            { label: "진행중", value: running },
            { label: "완료", value: ended },
          ],
        }}
      />
      <ItbUploadModal
        open={uploadTarget !== null}
        project={uploadTarget}
        onClose={() => setUploadTarget(null)}
      />
    </div>
  );
};
