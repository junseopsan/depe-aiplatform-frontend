/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */

const COL_WIDTHS = ['360px', '150px', '80px', '100px', '180px', '200px', '60px']

export const ProjectListSkeleton = ({ rows = 6 }: { rows?: number }) => (
  <div className="rounded-[4px] border border-[var(--gray-200)] bg-white">
    {/* 헤더 */}
    <div className="flex h-10 items-center gap-4 border-b border-[var(--gray-200)] bg-[var(--gray-50)] px-4">
      {COL_WIDTHS.map((w, i) => (
        <div
          key={i}
          className="h-3 animate-pulse rounded bg-[var(--gray-200)]"
          style={{ width: w === '60px' ? '24px' : '80px' }}
        />
      ))}
    </div>
    {/* 행 */}
    {Array.from({ length: rows }).map((_, r) => (
      <div
        key={r}
        className="flex h-[52px] items-center gap-4 border-b border-[var(--gray-100)] px-4 last:border-b-0"
      >
        {COL_WIDTHS.map((w, i) => (
          <div
            key={i}
            className="h-3 animate-pulse rounded bg-[var(--gray-100)]"
            style={{ width: w }}
          />
        ))}
      </div>
    ))}
  </div>
)
