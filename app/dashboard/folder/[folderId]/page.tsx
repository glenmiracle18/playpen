"use client";

// import { getFiles } from "@/app/actions/actions";
import { toast } from "@/components/ui/use-toast";
import { useAction } from "next-safe-action/hooks";
import { useParams, usePathname } from "next/navigation";
import { startTransition, useEffect } from "react";
import Uploader from "../../_components/uploader";
import { useState } from "react";
import UploadForm from "../../_components/upload-form";
import prisma from "@/lib/db";
import { getFolders } from "@/app/actions/actions";

const FolderPage = () => {
  const pathname = useParams();
  // console.log(pathname.folderId);
  const folderId = `${pathname.folderId}`;
  const [file, setFile] = useState(null);

  return (
    <div className="p-6 h-screen w-full">
      <Uploader folderId={folderId} />
      {/* <UploadForm folderId={folderId} /> */}
    </div>
  );
};

export default FolderPage;
