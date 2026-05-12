import { Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LegendAnchorProps = {
  label: string;
  blocked?: boolean;
};

export const LegendAnchor = ({ label, blocked = false }: LegendAnchorProps) => {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full pl-2.5 pr-3 text-xs font-semibold",
        blocked
          ? "bg-[var(--gray-50)] text-[var(--gray-700)]"
          : "bg-[var(--primary-50)] text-[var(--primary-700)]",
      )}
    >
      <Link2
        aria-hidden
        className={cn(
          "h-3.5 w-3.5 shrink-0",
          blocked ? "text-[var(--gray-500)]" : "text-[var(--primary-500)]",
        )}
        strokeWidth={2}
      />
      <span className="anchor-text">{label}</span>
    </span>
  );
};
