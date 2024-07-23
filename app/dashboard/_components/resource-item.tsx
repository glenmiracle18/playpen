import { EllipsisVertical } from "lucide-react";
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
      className=" cursor-pointer p-2 flex-col gap-2 flex w-[280px] md:w-[350px]"
    >
      <div className="relative bg-gray-300/20 justify-center items-center py-8 px-16 rounded-md">
        <EllipsisVertical className="absolute top-4 right-4 size-4 text-gray-500 cursor-pointer hover:text-red-400" />
        <Image src="/water.jpeg" alt="resource" width={300} height={200} />
      </div>
      <div className="flex justify-between items-start px-4">
        <span className="flex flex-col gap-[4px]">
          <h1 className="font-medium text-sm text-black">{name}</h1>
          <p className="text-xs text-gray-300">size</p>
        </span>
        <h1 className="text-gray-300 text-sm">92MB</h1>
      </div>
    </Link>
  );
};
