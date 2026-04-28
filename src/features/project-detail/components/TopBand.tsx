export function TopBand() {
  return (
    <div
      className="sticky top-0 z-50 h-[5px]"
      style={{
        background:
          'linear-gradient(90deg, var(--primary-900), var(--primary-500), var(--primary-300))',
      }}
    />
  )
}
