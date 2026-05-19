/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { Bell } from 'lucide-react'
import { UiBadge } from '@/components/ui/UiBadge'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-xs font-semibold tracking-wider text-[var(--gray-400)]">{title}</h3>
    <div className="flex flex-wrap items-center gap-8">{children}</div>
  </div>
)

const Cell = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col items-center gap-2">
    {children}
    <span className="text-[11px] text-[var(--gray-500)]">{label}</span>
  </div>
)

const BELL_BTN =
  'relative flex h-8 w-8 items-center justify-center rounded border border-transparent bg-card text-[var(--gray-700)]'

const BADGE_POS = 'absolute right-0 top-0 -translate-y-1/2 translate-x-1/2'

export const BadgePreview = () => (
  <div className="flex w-full max-w-[700px] flex-col gap-8">
    <Section title="알림 벨 위 배치 (호출처 absolute, AppHeader 실제 사용 패턴)">
      <Cell label="기본">
        <button type="button" aria-label="알림" className={BELL_BTN}>
          <Bell size={16} />
          <UiBadge count={3} className={BADGE_POS} />
        </button>
      </Cell>
      <Cell label="pulse">
        <button type="button" aria-label="알림" className={BELL_BTN}>
          <Bell size={16} />
          <UiBadge count={36} pulse className={BADGE_POS} />
        </button>
      </Cell>
      <Cell label="99+ (절단)">
        <button type="button" aria-label="알림" className={BELL_BTN}>
          <Bell size={16} />
          <UiBadge count={150} pulse className={BADGE_POS} />
        </button>
      </Cell>
    </Section>
  </div>
)
