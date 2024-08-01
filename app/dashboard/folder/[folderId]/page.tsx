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

const FolderPage = () => {
  const { toast } = useToast();
  const pathname = useParams();
  // console.log(pathname.folderId);
  const folderId = `${pathname.folderId}`;
  const [files, setFiles] = useState(null);

  // const { executeAsync, result, hasErrored, isExecuting } = useAction(
  //   getFilesAction,
  //   {
  //     onError() {
  //       toast({
  //         description: "☢️ something is holding files back",
  //       });
  //     },
  //   },
  // );

  // useEffect(() => {
  //   const fetchFiles = async () => {
  //     await executeAsync({ folderId: folderId });
  //   };
  //   fetchFiles();
  // }, [executeAsync, folderId]);

  // if (isExecuting) {
  //   return <div>Loading...</div>;
  // }

  // if (hasErrored) {
  //   return <div>Error loading folders</div>;
  // }

  // const { data } = result;
  // console.log(data?.data);

  const { data, isLoading, error } = useQuery({
    queryKey: ["files", folderId],
    queryFn: () => getFilesAction({ folderId }),
    staleTime: 60000, // Data will be considered fresh for 1 minute
  });
  console.log(data?.data?.data);

  return (
    <div className="p-6 h-screen w-full">
      <Uploader folderId={folderId} />
      {isLoading ? (
        <div className="mt-4">Loading... 🔃</div>
      ) : (
        <div className=" mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-2 grid-cols-1">
          {data?.data?.data?.map((file) => (
            <div key={file.file_id}>
              {["image/jpeg", "image/png", "image/jpg"].includes(
                file.file_type,
              ) && (
                <Image
                  className="w-"
                  alt="uploaded image"
                  src={file.file_path}
                  width={200}
                  height={100}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderPage;
