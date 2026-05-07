'use client'

import { useEffect } from 'react'

type GlobalErrorProps = {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

export default function GlobalError({ error, unstable_retry }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full font-sans">
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 py-16 text-center">
          <p className="text-[80px] font-bold leading-none text-[var(--error)]">
            500
          </p>
          <h1 className="text-xl font-semibold text-foreground">
            문제가 발생했습니다
          </h1>
          <p className="max-w-md text-sm text-[var(--gray-500)]">
            애플리케이션에서 예기치 않은 오류가 발생했습니다.
          </p>
          {error.digest && (
            <p className="font-mono text-[11px] text-[var(--gray-400)]">
              ref: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="mt-2 inline-flex h-9 items-center rounded-lg bg-[var(--primary-500)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--primary-600)]"
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  )
}
