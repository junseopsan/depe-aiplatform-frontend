/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-background px-6 py-16 text-center">
      <p className="text-[80px] font-bold leading-none text-[var(--primary-500)]">
        404
      </p>
      <h1 className="text-xl font-semibold text-foreground">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="max-w-md text-sm text-[var(--gray-500)]">
        요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex h-9 items-center rounded-lg bg-[var(--primary-500)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--primary-600)]"
      >
        홈으로 가기
      </Link>
    </div>
  )
}
