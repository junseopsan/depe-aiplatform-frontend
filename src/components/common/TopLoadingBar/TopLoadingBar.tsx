'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export const TopLoadingBar = () => {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    // effect 본문에서 동기 setState를 피하기 위해 다음 태스크로 미룸 (eslint 규칙)
    timers.push(
      setTimeout(() => {
        setActive(true)
        setProgress(20)
      }, 0),
    )
    timers.push(setTimeout(() => setProgress(60), 120))
    timers.push(setTimeout(() => setProgress(85), 320))
    timers.push(setTimeout(() => setProgress(100), 520))
    timers.push(setTimeout(() => setActive(false), 720))
    timers.push(setTimeout(() => setProgress(0), 920))

    return () => {
      for (const t of timers) clearTimeout(t)
    }
  }, [pathname])

  return (
    <div className="sticky top-0 z-[100] h-0.5 w-full shrink-0 bg-transparent">
      <div
        className={cn(
          'h-full bg-[var(--primary-500)] transition-[width,opacity] ease-out',
          active ? 'opacity-100 duration-300' : 'opacity-0 duration-200',
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
