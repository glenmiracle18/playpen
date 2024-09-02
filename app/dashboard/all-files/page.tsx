"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllFilesAction } from "@/app/actions/actions";
import { IndividualFile } from "../_components/file";
import { ScrollArea } from "@/components/ui/scroll-area";

const AllFiles = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["files"],
    queryFn: () => getAllFilesAction(),
    staleTime: 60000, // Data will be considered fresh for 1 minute
  });

  const allFiles = data?.data?.data;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  console.log("allFiles:", allFiles);

  return (
    <div className="flex items-start flex-col px-10 py-6">
      <h1 className="text-2xl ml-6 font-semibold">
        You can find all files here!
      </h1>
      <div className="flex-grow mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-cols-1 p-4 md:p-6">
        {allFiles?.map((file) => (
          <IndividualFile key={file.file_id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default AllFiles;