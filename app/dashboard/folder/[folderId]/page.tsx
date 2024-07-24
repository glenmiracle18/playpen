"use client";

// import { getFiles } from "@/app/actions/actions";
import { toast } from "@/components/ui/use-toast";
import { useAction } from "next-safe-action/hooks";
import { useParams, usePathname } from "next/navigation";
import { startTransition, useEffect } from "react";
import Uploader from "../../_components/uploader";

const FolderPage = () => {
  const pathname = useParams();
  // console.log(pathname.folderId);
  const folderId = `${pathname.folderId}`;

  return (
    <div className="p-6 h-screen w-full">
      <Uploader />
    </div>
  );
};

export default FolderPage;

// get all files
// const { execute, input, hasErrored, result, isExecuting } = useAction(
//   getFiles,
//   {
//     onSuccess() {
//       console.log("success");
//       toast({
//         title: `❇️ Suuccess`,
//         description: ` There is an error on the server`,
//       });
//     },
//     onError(error) {
//       console.log("error", error);
//       toast({
//         variant: "destructive",
//         title: `🚫 Error`,
//         description: ` There is an error on the server`,
//       });
//     },
//   },
// );
