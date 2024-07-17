import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
export const ResourceItem = () => {
  return (
    <div className=" cursor-pointer p-2 flex-col gap-2 flex w-[280px] md:w-[250px] xl:w-[450px] ">
      <div className="relative bg-gray-300/20 justify-center items-center py-8 px-16 rounded-md">
        <EllipsisVertical className="absolute top-4 right-4 size-4 text-gray-500 cursor-pointer hover:text-red-400" />
        <Image src="/water.jpeg" alt="resource" width={300} height={200} />
      </div>
      <div className="flex justify-between items-start px-4">
        <span className="flex flex-col gap-[4px]">
          <h1 className="font-medium text-sm text-black">3D Renders</h1>
          <p className="text-xs text-gray-300">18 images</p>
        </span>
        <h1 className="text-gray-300 text-sm">92MB</h1>
      </div>
    </div>
  );
};
