/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
export const ProjectListEmpty = () => {
  return (
    <div className="w-full overflow-hidden rounded-[4px] border border-[var(--gray-200)] bg-white">
      <div className="px-4 py-12 text-center text-[13px] text-[var(--gray-500)]">
        등록된 프로젝트가 없습니다
      </div>
    </div>
  )
}
