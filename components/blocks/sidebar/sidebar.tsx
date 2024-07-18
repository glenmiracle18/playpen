"use client";
import {
  ScanFace,
  Folder,
  Home,
  GlobeIcon,
  CircleHelp,
  Settings,
  LayoutGrid,
  GitPullRequestCreateArrow,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { ProfileDropdown } from "./profile-dropdown";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string>("Home");
  const router = useRouter();

  const handleItemClick = (label: string, path?: string) => {
    router.push(path!);
    setActiveItem(label);
  };
  return (
    <div className="w-[260px] z-50 bg-gray-200/50 rounded-sm border-r left-0 flex flex-col justify-between h-screen p-4">
      <div className="flex flex-col gap-4 w-full ">
        <ProfileDropdown />
        <div className="mt-4 flex flex-col gap-2 w-full">
          {sidebarList.map((item, idx) => (
            <div
              key={item.label}
              onClick={() => handleItemClick(item.label, item.path)}
            >
              <SidebarItem
                isActive={activeItem == item.label}
                icon={item.icon}
                label={item.label!}
              />
            </div>
          ))}
        </div>
        <hr className="w-full px-4" />
        <div onClick={() => handleItemClick("browser")}>
          <SidebarItem
            label="Changelogs"
            icon={GitPullRequestCreateArrow}
            isActive={activeItem == "browser"}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <SidebarItem icon={CircleHelp} label="Support" />
        <SidebarItem icon={Settings} label="Settings" />
      </div>
    </div>
  );
};

const sidebarList = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: ScanFace, label: "My Projects", path: "/dashboard/myprojects" },
  { icon: Folder, label: "Folders", path: "/dashboard/myprojects" },
  { icon: LayoutGrid, label: "All Files", path: "/dashboard/myprojects" },
];
