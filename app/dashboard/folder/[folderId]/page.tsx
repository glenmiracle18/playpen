"use client";

import { getFiles } from "@/app/actions/actions";
import { toast } from "@/components/ui/use-toast";
import { useAction } from "next-safe-action/hooks";
import { useParams, usePathname } from "next/navigation";
import { startTransition, useEffect } from "react";

const FolderPage = () => {
  const pathname = useParams();
  // console.log(pathname.folderId);
  const folderId = `${pathname.folderId}`;

  const { execute, input, hasErrored, result, isExecuting } = useAction(
    getFiles,
    {
      onSuccess() {
        console.log("success");
        toast({
          title: `❇️ Suuccess`,
          description: ` There is an error on the server`,
        });
      },
      onError(error) {
        console.log("error", error);
        toast({
          variant: "destructive",
          title: `🚫 Error`,
          description: ` There is an error on the server`,
        });
      },
    },
  );

  useEffect(() => {
    execute({ folderId })
  }, [folderId]);

  if (isExecuting) {
    return <div>Loading...</div>;
  }

  if (hasErrored) {
    return <div>Error loading folders</div>;
  }

  const data = result;
  console.log(data);

  return (
    <>
      <div>{folderId}</div>
      <div>
        {data && data.length > 0 ? (
          <ul>
            {data?.map((file) => (
              <li key={file.fileId}>
                <strong>{file.file_name}</strong> (ID: {file.fileId}, Shared: {file.isShared ? "Yes" : "No"})
              </li>
            ))}
          </ul>
        ) : (
          <div>No files found.</div>
        )}
      </div>
    </>
  );
};
  );
};

export default FolderPage;
