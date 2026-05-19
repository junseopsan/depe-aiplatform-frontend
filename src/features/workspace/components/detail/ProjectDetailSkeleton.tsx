/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */

const Bar = ({ w = '60%', h = 14 }: { w?: string; h?: number }) => (
  <div
    className="animate-pulse rounded bg-[var(--gray-100)]"
    style={{ width: w, height: h }}
  />
)

const Section = ({
  index,
  title,
  cols = 2,
}: {
  index: number
  title: string
  cols?: number
}) => (
  <div className="mb-4 rounded-[4px] border border-[var(--gray-200)] bg-white px-7 py-6">
    <div className="mb-4 flex items-center gap-2">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--gray-100)] text-[12px] font-semibold text-[var(--gray-500)]">
        {index}
      </span>
      <span className="text-[14px] font-semibold text-[var(--gray-800)]">{title}</span>
    </div>
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <Bar w="80px" h={12} />
          <Bar w="60%" />
        </div>
      ))}
    </div>
  </div>
)

export const ProjectDetailSkeleton = () => (
  <main className="mx-auto w-full max-w-[1400px] flex-1 overflow-y-auto px-8 pt-8 pb-16">
    <Section index={1} title="식별 및 분류" cols={2} />
    <Section index={2} title="프로젝트 개요" cols={2} />
    <Section index={3} title="기간" cols={2} />
    <Section index={4} title="형태 · 위치" cols={3} />
  </main>
)
