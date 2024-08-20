"use client";
import {
  ScanFace,
  Folder,
  Home,
  CircleHelp,
  Settings,
  LayoutGrid,
  GitPullRequestCreateArrow,
  Trash,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { ProfileDropdown } from "./profile-dropdown";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string>("Home");
  const router = useRouter();

  // redirection logic
  const handleItemClick = (label: string, path?: string) => {
    // ts ignore
    router.push(path!);
    setActiveItem(label);
  };

  // add logo that redirects bac to landing page

  return (
    <div
      className={cn(
        "lg:w-[260px]  hidden z-50 bg-gray-200/50 rounded-sm border-r left-0 lg:flex flex-col justify-between h-screen p-4",
      )}
    >
      <div className="flex flex-col gap-4 w-full ">
        <Link href="/">
          <span className="flex items-center gap-2">
            <Image
              src="/icon.png"
              alt="logo"
              width={50}
              height={50}
              className="cursor-pointer rounded-lg"
              onClick={() => router.push("/")}
            />
            <h1 className="text-2xl text-primary font-semibold font-sans">
              Filewave
            </h1>
          </span>
        </Link>
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
        <Link href="/changelog">
          <SidebarItem
            label="Changelogs"
            icon={GitPullRequestCreateArrow}
            isActive={activeItem == "browser"}
          />
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <SidebarItem icon={CircleHelp} label="Support" />
        <SidebarItem icon={Settings} label="Settings" />
        <ProfileDropdown />
      </div>
    </div>
  );
};

const sidebarList = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: Folder, label: "Folders", path: "/dashboard/myprojects" },
  { icon: LayoutGrid, label: "All Files", path: "/dashboard/all-files" },
  { icon: ScanFace, label: "Projects", path: "/dashboard/scan" },
  { icon: Trash, label: "Trash", path: "/dashboard/trash" },
];
