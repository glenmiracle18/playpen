"use client";

import { useState } from "react";
import {
  BookmarkPlus,
  FilePlus,
  FolderPlus,
  UserRoundPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NewFolderModal } from "./_components/new-folder-modal";
import { AllFolders } from "./_components/all-folders";

const creationList = [
  { icon: FilePlus, label: "New document" },
  { icon: FolderPlus, label: "New Project" },
  { icon: UserRoundPlus, label: "New team" },
  { icon: BookmarkPlus, label: "New Organization" },
];

const sortingList = [
  { label: "Recents" },
  { label: "Favorites" },
  { label: "Shared" },
  { label: "External" },
  { label: "Archived" },
];

// ts ignore
const DashboardPage = () => {
  const [sortingActive, setSortingActice] = useState("Recents");
  const hanldeSortingItemClick = (label: string) => {
    setSortingActice(label);
  };

  return (
    <div className=" p-4 mt-4 gap-4 mr-2 ml-4 flex flex-col">
      <NewFolderModal label="New Folder" icon={FolderPlus} />

      <div className="mt-4 flex flex-col gap-4">
        <h1 className="text-sm font-semibold">All Folders</h1>

        <div className="w-[398px] rounded-lg flex bg-gray-300/20 ">
          {sortingList.map((item, idx) => (
            <div
              className={cn(
                "text-xs text-gray-400  px-4 0 py-2 cursor-pointer ",
                item.label == sortingActive
                  ? "bg-white border rounded-lg text-black"
                  : " border-none bg-none hover:bg-gray-200/50 hover:text-black rounded-lg",
              )}
              key={idx}
              onClick={() => hanldeSortingItemClick(item.label)}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div>
          <AllFolders state={sortingActive} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
