import { LegendAnchor } from '@/features/project-workspace/components/LegendAnchor'
import { LegendBar } from '@/features/project-workspace/components/LegendBar'
import { LegendStatusTag } from '@/features/project-workspace/components/LegendStatusTag'

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
