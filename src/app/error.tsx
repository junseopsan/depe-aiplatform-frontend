/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function ErrorPage({ error, unstable_retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-background px-6 py-16 text-center">
      <p className="text-[80px] font-bold leading-none text-[var(--error)]">
        500
      </p>
      <h1 className="text-xl font-semibold text-foreground">
        문제가 발생했습니다
      </h1>
      <p className="max-w-md text-sm text-[var(--gray-500)]">
        잠시 후 다시 시도해 주세요. 문제가 계속되면 관리자에게 문의해 주세요.
      </p>
      {/* {error.digest && (
        <p className="font-mono text-[11px] text-[var(--gray-400)]">
          ref: {error.digest}
        </p>
      )} */}
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="inline-flex h-9 items-center rounded-lg bg-[var(--primary-500)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--primary-600)]"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="inline-flex h-9 items-center rounded-lg border border-[var(--gray-200)] bg-card px-4 text-sm font-medium text-[var(--gray-700)] transition-colors hover:bg-[var(--gray-50)]"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
