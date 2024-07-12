import { LucideIcon } from "lucide-react";

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
};

export const SidebarItem = ({ icon: Icon, label }: SidebarItemProps) => {
  return (
    <span className="flex gap-2 items-center group hover:bg-gray-200/50 p-2 cursor-pointer rounded-md">
      <Icon className="text-gray-400 group-hover:text-red-400" size="22" />
      <p className="text-gray-500">{label}</p>
    </span>
  );
};
