import { Grid2X2, User, Smile, Plus } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

export const Sidebar = () => {
  return (
    <div className="w-[290px] bg-gray-200/20 border-r-2 left-0 h-screen p-4">
      <div className="flex flex-col gap-2 w-full">
        {sidebarList.map((item, idx) => (
          <SidebarItem key={item.label} icon={item.icon} label={item.label!} />
        ))}
      </div>
    </div>
  );
};

const sidebarList = [
  { icon: Grid2X2, label: "All media" },
  { icon: User, label: "Members" },
  { icon: Smile, label: "My media" },
  { icon: Plus, label: "New board" },
];
