import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
}: SidebarItemProps) => {
  return (
    <span
      className={cn(
        "flex gap-2 items-center group hover:bg:gray-200  p-2 cursor-pointer rounded-lg",
        isActive ? "bg-gray-200/40 " : "bg-none",
      )}
    >
      <Icon
        className={cn(
          "text-gray-500 group-hover:text-primary",
          isActive && "text-primary",
        )}
        size="22"
      />
      <p className={cn("text-gray-500 text-sm", isActive && "text-black")}>
        {label}
      </p>
    </span>
  );
};
