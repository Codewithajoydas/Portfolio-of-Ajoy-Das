
import {
  Zap,
  CheckCircle2,
  BookOpen,
  GraduationCap,
} from "lucide-react";

export type SkillLevel =
  | "Advanced"
  | "Proficient"
  | "Working Knowledge"
  | "Learning";

interface SkillLevelChipProps {
  level: SkillLevel;
  size?: "sm" | "md";
}

const levelConfig = {
  Advanced: {
    icon: Zap,
    styles:
      "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-400/25 dark:bg-blue-400/10 dark:text-blue-300",
  },

  Proficient: {
    icon: CheckCircle2,
    styles:
      "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300",
  },

  "Working Knowledge": {
    icon: BookOpen,
    styles:
      "border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  },

  Learning: {
    icon: GraduationCap,
    styles:
      "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-300",
  },
} satisfies Record<
  SkillLevel,
  {
    icon: typeof Zap;
    styles: string;
  }
>;

export default function SkillLevelChip({
  level,
  size = "sm",
}: SkillLevelChipProps) {
  const config = levelConfig[level];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border font-medium whitespace-nowrap transition-colors ${config.styles} ${
        size === "sm"
          ? "px-2.5 py-1 text-[10px]"
          : "px-3 py-1.5 text-xs"
      }`}
    >
      <Icon
        size={size === "sm" ? 11 : 13}
        strokeWidth={2}
        aria-hidden="true"
      />

      {level}
    </span>
  );
}
