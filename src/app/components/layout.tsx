import { ComponentDocsSidebar } from '@/features/design/components/ComponentDocsSidebar'

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen font-sans">
      <ComponentDocsSidebar />
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  )
}
