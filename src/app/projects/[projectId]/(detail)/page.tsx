/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { LegendAnchor } from '@/features/workspace/components/LegendAnchor'
import { LegendBar } from '@/features/workspace/components/LegendBar'
import { LegendStatusTag } from '@/features/workspace/components/LegendStatusTag'

export default function ProjectPage() {
  return (
    <>
      <LegendBar
        left={
          <>
            <LegendAnchor label="ITB Rev B · 2026.05.03" />
            <div className="flex flex-wrap items-center gap-[18px]">
              <LegendStatusTag status="pre-start" label="작업 대기" count={18} />
              <LegendStatusTag status="generating" label="AI 생성 중" count={9} />
              <LegendStatusTag status="ai-failed" label="AI 생성 실패" count={3} />
              <LegendStatusTag status="review" label="담당자 검토 대기" count={5} />
              <LegendStatusTag status="issued" label="발행" count={20} />
            </div>
          </>
        }
      />
      <div className="flex-1 overflow-y-auto bg-background" />
    </>
  )
}
