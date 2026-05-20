/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/client";
import { getProject, listProjects } from "@/lib/api/projects";
import type { Project } from "@/features/workspace/types/workspace.types";

/**
 * `contractNo` 로 프로젝트 단건을 조회한다.
 * 도메인 정본: URL/검색은 contractNo, API 는 projectId 를 식별자로 사용 → 두 단계 쿼리 (목록에서 매칭 → 단건).
 *
 * 가시성(role) 필터는 application 계층 책임이라 여기엔 포함하지 않는다 — 호출자가 별도 분기.
 */
export type ProjectByContractNoResult =
  | { status: "loading" }
  | { status: "error"; error: unknown; retry: () => void }
  | { status: "notfound" }
  | { status: "ready"; project: Project };

export const useProjectByContractNo = (
  contractNo: string,
): ProjectByContractNoResult => {
  const listQuery = useQuery({ queryKey: ["projects"], queryFn: listProjects });

  const matched = listQuery.data?.find((p) => p.contractNo === contractNo);
  const projectId = matched?.id;

  const detailQuery = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId as string),
    enabled: !!projectId,
  });

  if (listQuery.isLoading || (projectId && detailQuery.isLoading)) {
    return { status: "loading" };
  }

  if (listQuery.isError) {
    return {
      status: "error",
      error: listQuery.error,
      retry: () => {
        listQuery.refetch();
      },
    };
  }

  // 매칭 실패 + 백그라운드 리페치 진행 중이면 결과 보류
  if (!matched && listQuery.isFetching) return { status: "loading" };

  if (!matched) return { status: "notfound" };

  if (detailQuery.isError) {
    const isNotFound =
      detailQuery.error instanceof ApiError && detailQuery.error.status === 404;
    if (isNotFound) return { status: "notfound" };
    return {
      status: "error",
      error: detailQuery.error,
      retry: () => {
        detailQuery.refetch();
      },
    };
  }

  if (!detailQuery.data) return { status: "notfound" };

  return { status: "ready", project: detailQuery.data };
};
