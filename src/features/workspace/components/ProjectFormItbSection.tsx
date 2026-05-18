/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
"use client";

import { Upload } from "lucide-react";
import { UiInput } from "@/components/ui/UiInput";
import { ProjectFormSection } from "./ProjectFormSection";

export const ProjectFormItbSection = () => (
  <ProjectFormSection
    index={5}
    title="ITB 업로드"
    description="ITB 업로드 시 후속 산출물 생성이 자동으로 시작됩니다"
  >
    <label className="flex cursor-pointer flex-col items-center gap-1.5 rounded-[4px] border-[1.5px] border-dashed border-[var(--gray-300)] px-5 py-5 text-center text-[13px] text-[var(--gray-500)] transition-colors hover:border-[var(--primary-500)] hover:bg-[var(--primary-50)] hover:text-[var(--primary-700)]">
      <Upload className="size-5" />
      <span>클릭 또는 드래그하여 PDF 파일 선택</span>
      <UiInput type="file" accept=".pdf" className="hidden" />
    </label>
  </ProjectFormSection>
);
