import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const dotVariants = cva("h-2 w-2 shrink-0 rounded-full", {
  variants: {
    status: {
      "pre-start": "bg-[var(--gray-400)]",
      generating: "bg-[var(--primary-500)]",
      "ai-failed": "bg-[var(--error)]",
      review: "bg-[var(--warning)]",
      issued: "bg-[var(--success)]",
    },
  },
  defaultVariants: { status: "pre-start" },
});

type LegendStatusTagProps = {
  label: string;
  count?: number;
} & VariantProps<typeof dotVariants>;

export const LegendStatusTag = ({
  status,
  label,
  count,
}: LegendStatusTagProps) => {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 whitespace-nowrap text-xs font-medium text-[var(--gray-700)]">
      <span aria-hidden className={cn(dotVariants({ status }))} />
      {label}
      {count !== undefined && (
        <span className="ml-0.5 font-semibold text-[var(--gray-500)]">
          {count}
        </span>
      )}
    </span>
  );
};
