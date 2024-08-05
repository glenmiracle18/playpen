"use client";

// import { getFiles } from "@/app/actions/actions";
import { useParams } from "next/navigation";
import Uploader from "../../_components/uploader";
import { useState, useEffect } from "react";
import { useAction } from "next-safe-action/hooks";
import { getFilesAction } from "@/app/actions/actions";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { IndividualFile } from "../../_components/file";
import { Loader2 } from "lucide-react";

const FolderPage = () => {
  const { toast } = useToast();
  const pathname = useParams();
  // console.log(pathname.folderId);
  const folderId = `${pathname.folderId}`;
  const [files, setFiles] = useState(null);

  // fetching with tanstack query
  const { data, isLoading, error } = useQuery({
    queryKey: ["files", folderId],
    queryFn: () => getFilesAction({ folderId }),
    staleTime: 60000, // Data will be considered fresh for 1 minute
  });
  console.log(data?.data?.data);
  const allFile = data?.data?.data;

  return (
    <div className="flex flex-col p-6 h-screen w-full">
      <Uploader folderId={folderId} />
      {isLoading ? (
        <div className="mt-4 flex items-center justify-center gap-4">
          <Loader2 className="animate-spin" size="50" />
          <p>Loading ...</p>{" "}
        </div>
      ) : (
        <div className="flex-grow overflow-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-6">
          {allFile?.map((file) => (
            <IndividualFile key={file.file_id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderPage;
