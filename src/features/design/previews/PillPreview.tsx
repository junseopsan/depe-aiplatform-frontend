/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { UiPill, type UiPillStatus, type UiPillTone } from '@/components/ui/UiPill'

const TONES: { value: UiPillTone; label: string }[] = [
  { value: 'primary', label: 'Primary' },
  { value: 'gray', label: 'Gray' },
  { value: 'success', label: 'Success' },
  { value: 'warning', label: 'Warning' },
  { value: 'error', label: 'Error' },
  { value: 'info', label: 'Info' },
]

const STATUSES: { value: UiPillStatus; label: string }[] = [
  { value: 'issued', label: 'Issued (발행)' },
  { value: 'review', label: 'Review (검토)' },
  { value: 'generating', label: 'Generating (생성중)' },
  { value: 'failed', label: 'Failed (실패)' },
  { value: 'waiting', label: 'Waiting (대기)' },
]

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-xs font-semibold tracking-wider text-[var(--gray-400)]">{title}</h3>
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  </div>
)

export const PillPreview = () => (
  <div className="flex w-full max-w-[700px] flex-col gap-8">
    <Section title="TONE (의미 기반 팔레트)">
      {TONES.map((t) => (
        <UiPill key={t.value} tone={t.value}>
          {t.label}
        </UiPill>
      ))}
    </Section>

    <Section title="STATUS (워크플로우 상태)">
      {STATUSES.map((s) => (
        <UiPill key={s.value} status={s.value}>
          {s.label}
        </UiPill>
      ))}
    </Section>
  </div>
)
