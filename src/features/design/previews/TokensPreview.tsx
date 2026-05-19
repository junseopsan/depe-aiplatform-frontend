/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */

const PRIMARY_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const
const GRAY_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const
const SEMANTIC = ['success', 'warning', 'error', 'info'] as const

const FONT_SIZES = [
  { token: 'xs', px: 11 },
  { token: 'sm', px: 12 },
  { token: 'body', px: 13 },
  { token: 'base', px: 14 },
  { token: 'lg', px: 15 },
  { token: 'xl', px: 16 },
  { token: '2xl', px: 20 },
] as const

const FONT_WEIGHTS = [
  { token: 'normal', value: 400 },
  { token: 'medium', value: 500 },
  { token: 'semibold', value: 600 },
  { token: 'bold', value: 700 },
] as const

const LINE_HEIGHTS = [
  { token: 'tight', value: 1.2 },
  { token: 'base', value: 1.5 },
  { token: 'relaxed', value: 1.6 },
] as const

const SPACES = [
  { token: '1', px: 4 },
  { token: '2', px: 8 },
  { token: '3', px: 12 },
  { token: '3-5', px: 14 },
  { token: '4', px: 16 },
  { token: '4-5', px: 18 },
  { token: '5', px: 20 },
  { token: '5-5', px: 22 },
  { token: '6', px: 24 },
  { token: '7', px: 28 },
  { token: '8', px: 32 },
] as const

const RADII = [
  { token: 'sm', value: '4px' },
  { token: 'md', value: '6px' },
  { token: 'lg', value: '8px' },
  { token: 'full', value: '999px' },
] as const

const SHADOWS = [
  { token: 'dropdown', desc: 'Select / dropdown floating UI' },
  { token: 'modal', desc: 'UiDialog 모달' },
] as const

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-xs font-semibold tracking-wider text-[var(--gray-400)]">{title}</h3>
    {children}
  </div>
)

const Swatch = ({ name, color }: { name: string; color: string }) => (
  <div className="flex w-[100px] flex-col gap-1.5">
    <div
      className="h-12 w-full rounded-[4px] border border-[var(--gray-200)]"
      style={{ background: color }}
    />
    <div className="text-[11px] text-[var(--gray-700)]">
      <div className="font-mono">{name}</div>
    </div>
  </div>
)

export const TokensPreview = () => (
  <div className="flex w-full max-w-[900px] flex-col gap-10">
    {/* COLOR */}
    <Section title="COLOR — PRIMARY">
      <div className="flex flex-wrap gap-3">
        {PRIMARY_STEPS.map((s) => (
          <Swatch key={s} name={`primary-${s}`} color={`var(--primary-${s})`} />
        ))}
      </div>
    </Section>

    <Section title="COLOR — GRAY">
      <div className="flex flex-wrap gap-3">
        {GRAY_STEPS.map((s) => (
          <Swatch key={s} name={`gray-${s}`} color={`var(--gray-${s})`} />
        ))}
      </div>
    </Section>

    <Section title="COLOR — SEMANTIC (main + bg)">
      <div className="flex flex-wrap gap-6">
        {SEMANTIC.map((s) => (
          <div key={s} className="flex gap-2">
            <Swatch name={s} color={`var(--${s})`} />
            <Swatch name={`${s}-bg`} color={`var(--${s}-bg)`} />
          </div>
        ))}
      </div>
    </Section>

    {/* TYPOGRAPHY */}
    <Section title="TYPOGRAPHY — FONT FAMILY">
      <div className="flex flex-col gap-2 text-[var(--gray-800)]">
        <p style={{ fontFamily: 'var(--font-family-sans)' }}>
          IBM Plex Sans KR — 한글과 영문 본문 (The quick brown fox 가나다라마)
        </p>
        <p style={{ fontFamily: 'var(--font-family-mono)' }}>
          IBM Plex Mono — 계약번호·코드 (JA-2025-078 / 0xDEADBEEF)
        </p>
      </div>
    </Section>

    <Section title="TYPOGRAPHY — SIZE">
      <div className="flex flex-col gap-2">
        {FONT_SIZES.map((f) => (
          <div key={f.token} className="flex items-baseline gap-4 text-[var(--gray-800)]">
            <span className="w-[80px] font-mono text-[11px] text-[var(--gray-500)]">
              {f.token} · {f.px}px
            </span>
            <span style={{ fontSize: `${f.px}px` }}>가나다라 ABC 0123</span>
          </div>
        ))}
      </div>
    </Section>

    <Section title="TYPOGRAPHY — WEIGHT">
      <div className="flex flex-col gap-2">
        {FONT_WEIGHTS.map((w) => (
          <div key={w.token} className="flex items-baseline gap-4 text-[14px] text-[var(--gray-800)]">
            <span className="w-[80px] font-mono text-[11px] text-[var(--gray-500)]">
              {w.token} · {w.value}
            </span>
            <span style={{ fontWeight: w.value }}>가나다라 ABC 0123 — 견본 텍스트</span>
          </div>
        ))}
      </div>
    </Section>

    <Section title="TYPOGRAPHY — LINE-HEIGHT">
      <div className="flex flex-col gap-3">
        {LINE_HEIGHTS.map((l) => (
          <div
            key={l.token}
            className="rounded border border-[var(--gray-200)] p-3 text-[13px] text-[var(--gray-800)]"
            style={{ lineHeight: l.value }}
          >
            <div className="font-mono text-[11px] text-[var(--gray-500)]">
              {l.token} · {l.value}
            </div>
            <div>
              IBM Plex Sans KR 한글 본문은 줄 사이에 충분한 여백이 필요하다. 이 견본은
              line-height 값에 따라 줄 간격이 어떻게 달라지는지 보여 준다.
            </div>
          </div>
        ))}
      </div>
    </Section>

    {/* SPACING */}
    <Section title="SPACING — 4px 베이스">
      <div className="flex flex-col gap-2">
        {SPACES.map((s) => (
          <div key={s.token} className="flex items-center gap-4">
            <span className="w-[80px] font-mono text-[11px] text-[var(--gray-500)]">
              space-{s.token} · {s.px}px
            </span>
            <div
              className="h-3 bg-[var(--primary-500)]"
              style={{ width: `${s.px}px` }}
            />
          </div>
        ))}
      </div>
    </Section>

    {/* RADIUS */}
    <Section title="RADIUS">
      <div className="flex flex-wrap gap-4">
        {RADII.map((r) => (
          <div key={r.token} className="flex flex-col items-center gap-2">
            <div
              className="h-16 w-16 border border-[var(--gray-300)] bg-[var(--gray-50)]"
              style={{ borderRadius: r.value }}
            />
            <span className="font-mono text-[11px] text-[var(--gray-700)]">
              {r.token} · {r.value}
            </span>
          </div>
        ))}
      </div>
    </Section>

    {/* SHADOW */}
    <Section title="SHADOW">
      <div className="flex flex-wrap gap-6 pt-4">
        {SHADOWS.map((s) => (
          <div key={s.token} className="flex flex-col items-center gap-2">
            <div
              className="h-20 w-32 rounded-md bg-white"
              style={{ boxShadow: `var(--shadow-${s.token})` }}
            />
            <span className="font-mono text-[11px] text-[var(--gray-700)]">
              shadow-{s.token}
            </span>
            <span className="text-[11px] text-[var(--gray-500)]">{s.desc}</span>
          </div>
        ))}
      </div>
    </Section>
  </div>
)
