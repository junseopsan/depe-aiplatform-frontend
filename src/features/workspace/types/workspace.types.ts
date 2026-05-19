/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */

/** 프로젝트 구분 — 도메인 정본 영문 enum */
export type ProjectType = "ESTIMATE" | "EXECUTION";

/** 프로젝트 상태 — 도메인 정본 영문 enum */
export type ProjectStatus =
  | "PREPARING"
  | "IN_PROGRESS"
  | "CLOSED"
  | "CANCELLED";

export type Project = {
  id: string;
  name: string;
  contractNo: string;
  type: ProjectType;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  customer: string;
  itbCount: number;
  budgetCode?: string;
  description?: string;
  projectForm?: string;
  region?: string;
  location?: string;
  archivedAt?: string | null;
};

export type ProjectTab = {
  id: string;
  label: string;
  segment: string | null;
};
