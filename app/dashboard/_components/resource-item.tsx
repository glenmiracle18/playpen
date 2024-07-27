import { EllipsisVertical, FolderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ResourceItemProps = {
  name: string;
  url: string;
};
export const ResourceItem = ({ name, url }: ResourceItemProps) => {
  return (
    <Link
      href={url}
      className=" cursor-pointer p-2  gap-2  w-[280px] md:w-[350px]"
    >
      <div className="hover:bg-gray-400/20 bg-gray-300/20 justify-center items-center py-4 px-6 rounded-xl">
        <div className="flex justify-between items-center px-4">
          <span className="flex items-center gap-[8px]">
            <FolderIcon className="size-10 text-red-500 font-medium" />
            <div>
              <h1 className="font-medium text-sm text-black">{name}</h1>
              <h1 className="text-gray-300 text-xs">92MB</h1>
            </div>
          </span>
          <EllipsisVertical className="text-bold top-4 items-center right-4 size-4 text-gray-500 cursor-pointer hover:text-red-400" />
        </div>
      </div>
    </Link>
  );
};
