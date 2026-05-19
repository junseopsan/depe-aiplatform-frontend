/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { UiButton } from '@/components/ui/UiButton'

type SectionProps = {
  title: string
  children: React.ReactNode
}

const Section = ({ title, children }: SectionProps) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-xs font-semibold tracking-wider text-[var(--gray-400)]">{title}</h3>
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  </div>
)

export const ButtonPreview = () => (
  <div className="flex w-full max-w-[700px] flex-col gap-8">
    <Section title="VARIANT">
      <UiButton>Primary</UiButton>
      <UiButton variant="secondary">Secondary</UiButton>
      <UiButton variant="ghost-danger">Ghost danger</UiButton>
      <UiButton variant="outline">Outline</UiButton>
      <UiButton variant="ghost">Ghost</UiButton>
      <UiButton variant="dark">Dark</UiButton>
      <UiButton variant="destructive">Destructive</UiButton>
      <UiButton variant="link">Link</UiButton>
    </Section>

    <Section title="SIZE">
      <UiButton size="default">Default (36px)</UiButton>
      <UiButton size="legend">Legend (32px)</UiButton>
      <UiButton size="sm">Small (28px)</UiButton>
      <UiButton size="xs">XS (24px)</UiButton>
    </Section>

    <Section title="DISABLED (opacity 40%)">
      <UiButton disabled>Primary</UiButton>
      <UiButton variant="secondary" disabled>
        Secondary
      </UiButton>
      <UiButton variant="ghost-danger" disabled>
        Ghost danger
      </UiButton>
    </Section>
  </div>
)
