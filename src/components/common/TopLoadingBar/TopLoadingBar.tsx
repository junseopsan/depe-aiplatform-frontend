/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export const TopLoadingBar = () => {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(true)
    setProgress(20)
    const t1 = setTimeout(() => setProgress(60), 120)
    const t2 = setTimeout(() => setProgress(85), 320)
    const t3 = setTimeout(() => setProgress(100), 520)
    const t4 = setTimeout(() => setActive(false), 720)
    const t5 = setTimeout(() => setProgress(0), 920)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
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
