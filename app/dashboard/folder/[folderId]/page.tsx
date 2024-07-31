"use client";

// import { getFiles } from "@/app/actions/actions";
import { useParams } from "next/navigation";
import Uploader from "../../_components/uploader";
import { useState, useEffect } from "react";
import { useAction } from "next-safe-action/hooks";
import { getFilesAction } from "@/app/actions/actions";
import { useToast } from "@/components/ui/use-toast";

const FolderPage = () => {
  const { toast } = useToast();
  const pathname = useParams();
  // console.log(pathname.folderId);
  const folderId = `${pathname.folderId}`;
  const [files, setFiles] = useState(null);

  const { executeAsync, result, hasErrored, isExecuting } = useAction(
    getFilesAction,
    {
      onSuccess() {
        toast({
          description: "💟 files are here",
        });
      },
      onError() {
        toast({
          description: "☢️ something is holding files back",
        });
      },
    },
  );

  useEffect(() => {
    const fetchFiles = async () => {
      await executeAsync({ folderId: folderId });
    };
    fetchFiles();
  }, [executeAsync, folderId]);

  if (isExecuting) {
    return <div>Loading...</div>;
  }

  if (hasErrored) {
    return <div>Error loading folders</div>;
  }

  const { data } = result;
  console.log(data);

  return (
    <div className="p-6 h-screen w-full">
      <Uploader folderId={folderId} />
      {isExecuting ? (
        <div className="mt-4">Loading... 🔃</div>
      ) : (
        <div className="mt-4">
          <div>
            {data &&
              data?.data?.map((file, idx) => {
                <div>{file.name}</div>;
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderPage;
